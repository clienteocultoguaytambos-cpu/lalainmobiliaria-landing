$envFile = Join-Path $PSScriptRoot "..\.env"
$tokenLine = Get-Content $envFile | Where-Object { $_ -match "^APIFY_API_TOKEN=(.+)$" }
$token = $matches[1].Trim()

# 1. Esperar y recoger Google Maps
Write-Host "Verificando estado de Google Maps (Run: 5OU9vtN0RAkMV8mqk)..." -ForegroundColor Yellow
$mapsRunId = "5OU9vtN0RAkMV8mqk"
$status = "RUNNING"
while ($status -in @("RUNNING", "READY")) {
    Start-Sleep -Seconds 6
    $chk = Invoke-RestMethod -Uri "https://api.apify.com/v2/actor-runs/$mapsRunId`?token=$token"
    $status = $chk.data.status
    Write-Host "  -> Maps Estado: $status" -ForegroundColor Gray
}

if ($status -eq "SUCCEEDED") {
    $dsId = $chk.data.defaultDatasetId
    $items = Invoke-RestMethod -Uri "https://api.apify.com/v2/datasets/$dsId/items?token=$token&format=json"
    $mapsOut = Join-Path $PSScriptRoot "..\google_reviews_friction_points.json"
    $items | ConvertTo-Json -Depth 6 | Set-Content -Path $mapsOut -Encoding UTF8
    Write-Host "  -> [OK] Google Maps guardado con $($items.Count) lugares y resenas." -ForegroundColor Green
}

# 2. Ejecutar TikTok con parámetros válidos
Write-Host "`nEjecutando TikTok Scraper..." -ForegroundColor Yellow
$ttPayload = @{
    searchQueries = @(
        "bienes raices azogues",
        "casas en venta azogues",
        "bienes raices cuenca",
        "comprar casa ecuador migrantes"
    )
    resultsPerPage = 8
    searchSection = "/video"
    videoSearchSorting = "MOST_LIKED"
    shouldDownloadVideos = $false
    shouldDownloadCovers = $false
    shouldDownloadSlideshowImages = $false
} | ConvertTo-Json -Depth 5

$ttUrl = "https://api.apify.com/v2/acts/clockworks~tiktok-scraper/runs?token=$token"
$ttRun = Invoke-RestMethod -Uri $ttUrl -Method Post -Body $ttPayload -ContentType "application/json; charset=utf-8"
$ttRunId = $ttRun.data.id
$ttDsId = $ttRun.data.defaultDatasetId
Write-Host "  -> TikTok Run ID: $ttRunId" -ForegroundColor Green

$ttStatus = "RUNNING"
$att = 0
while ($ttStatus -in @("RUNNING", "READY") -and $att -lt 30) {
    Start-Sleep -Seconds 6
    $att++
    $ttChk = Invoke-RestMethod -Uri "https://api.apify.com/v2/actor-runs/$ttRunId`?token=$token"
    $ttStatus = $ttChk.data.status
    Write-Host "  -> TikTok Estado ($att/30): $ttStatus" -ForegroundColor Gray
}

if ($ttStatus -eq "SUCCEEDED") {
    $ttItems = Invoke-RestMethod -Uri "https://api.apify.com/v2/datasets/$ttDsId/items?token=$token&format=json"
    $ttOut = Join-Path $PSScriptRoot "..\tiktok_real_estate_trends.json"
    $ttItems | ConvertTo-Json -Depth 6 | Set-Content -Path $ttOut -Encoding UTF8
    Write-Host "  -> [OK] TikTok guardado con $($ttItems.Count) videos y metricas." -ForegroundColor Green
} else {
    Write-Warning "TikTok finalizó con: $ttStatus"
}

Write-Host "`nPROCESO COMPLETO." -ForegroundColor Cyan
