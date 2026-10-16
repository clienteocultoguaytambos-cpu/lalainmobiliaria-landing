# ==============================================================================
# SCRIPT DE INVESTIGACIÓN PROFUNDA: TIKTOK TRENDS + PUNTOS DE DOLOR EN GOOGLE
# ==============================================================================

$envFile = Join-Path $PSScriptRoot "..\.env"
$tokenLine = Get-Content $envFile | Where-Object { $_ -match "^APIFY_API_TOKEN=(.+)$" }
$token = $matches[1].Trim()

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "ESTUDIO PROFUNDO DE MERCADO: LALAINMOBILIARIA (APIFY)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# ------------------------------------------------------------------------------
# PARTE 1: TIKTOK TRENDS (Contenido viral de bienes raíces en el Austro / Ecuador)
# ------------------------------------------------------------------------------
Write-Host "`n[1/2] Iniciando extracción de TikTok con clockworks/tiktok-scraper..." -ForegroundColor Yellow

$tiktokPayload = @{
    searchQueries = @(
        "bienes raices azogues",
        "casas en venta azogues",
        "bienes raices cuenca ecuador",
        "comprar casa ecuador desde usa"
    )
    resultsPerPage = 8
    videoSearchSorting = 1  # Más gustados / populares
    shouldDownloadVideos = $false
    shouldDownloadCovers = $false
    shouldDownloadSlideshowImages = $false
} | ConvertTo-Json -Depth 5

$tiktokUrl = "https://api.apify.com/v2/acts/clockworks~tiktok-scraper/runs?token=$token"

try {
    $ttRun = Invoke-RestMethod -Uri $tiktokUrl -Method Post -Body $tiktokPayload -ContentType "application/json; charset=utf-8"
    $ttRunId = $ttRun.data.id
    $ttDatasetId = $ttRun.data.defaultDatasetId
    Write-Host "  -> TikTok Run iniciado. ID: $ttRunId" -ForegroundColor Green

    # Esperar TikTok
    $status = "RUNNING"
    $attempts = 0
    while ($status -in @("RUNNING", "READY") -and $attempts -lt 25) {
        Start-Sleep -Seconds 5
        $attempts++
        $check = Invoke-RestMethod -Uri "https://api.apify.com/v2/actor-runs/$ttRunId`?token=$token"
        $status = $check.data.status
        Write-Host "  -> TikTok estado ($attempts/25): $status" -ForegroundColor Gray
    }

    if ($status -eq "SUCCEEDED") {
        $ttItems = Invoke-RestMethod -Uri "https://api.apify.com/v2/datasets/$ttDatasetId/items?token=$token&format=json"
        $ttOutput = Join-Path $PSScriptRoot "..\tiktok_real_estate_trends.json"
        $ttItems | ConvertTo-Json -Depth 6 | Set-Content -Path $ttOutput -Encoding UTF8
        Write-Host "  -> [OK] TikTok guardado en tiktok_real_estate_trends.json (Total videos: $($ttItems.Count))" -ForegroundColor Green
    } else {
        Write-Warning "  -> TikTok finalizó con estado: $status"
    }
} catch {
    Write-Error "Error en extracción de TikTok: $_"
}

# ------------------------------------------------------------------------------
# PARTE 2: RESEÑAS DE GOOGLE & PUNTOS DE FRICCIÓN (Google Places)
# ------------------------------------------------------------------------------
Write-Host "`n[2/2] Iniciando extracción de Reseñas & Puntos de Dolor en Google Maps..." -ForegroundColor Yellow

$mapsPayload = @{
    searchStringsArray = @(
        "inmobiliaria Azogues Ecuador",
        "bienes raices Azogues Ecuador",
        "inmobiliarias en Cuenca Ecuador"
    )
    maxCrawledPlacesPerSearch = 6
    maxReviews = 10
    scrapeReviewsPersonalData = $true
    reviewsSort = "newest"
    language = "es"
} | ConvertTo-Json -Depth 5

$mapsUrl = "https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token=$token"

try {
    $gmRun = Invoke-RestMethod -Uri $mapsUrl -Method Post -Body $mapsPayload -ContentType "application/json; charset=utf-8"
    $gmRunId = $gmRun.data.id
    $gmDatasetId = $gmRun.data.defaultDatasetId
    Write-Host "  -> Google Maps Run iniciado. ID: $gmRunId" -ForegroundColor Green

    # Esperar Google Maps
    $status = "RUNNING"
    $attempts = 0
    while ($status -in @("RUNNING", "READY") -and $attempts -lt 25) {
        Start-Sleep -Seconds 5
        $attempts++
        $check = Invoke-RestMethod -Uri "https://api.apify.com/v2/actor-runs/$gmRunId`?token=$token"
        $status = $check.data.status
        Write-Host "  -> Google Maps estado ($attempts/25): $status" -ForegroundColor Gray
    }

    if ($status -eq "SUCCEEDED") {
        $gmItems = Invoke-RestMethod -Uri "https://api.apify.com/v2/datasets/$gmDatasetId/items?token=$token&format=json"
        $gmOutput = Join-Path $PSScriptRoot "..\google_reviews_friction_points.json"
        $gmItems | ConvertTo-Json -Depth 6 | Set-Content -Path $gmOutput -Encoding UTF8
        Write-Host "  -> [OK] Reseñas guardadas en google_reviews_friction_points.json (Total lugares: $($gmItems.Count))" -ForegroundColor Green
    } else {
        Write-Warning "  -> Google Maps finalizó con estado: $status"
    }
} catch {
    Write-Error "Error en extracción de Google Maps: $_"
}

Write-Host "`nExtracciones finalizadas con éxito." -ForegroundColor Cyan
