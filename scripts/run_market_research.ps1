# ==============================================================================
# SCRIPT DE INVESTIGACIÓN DE MERCADO INMOBILIARIO CON APIFY
# Objetivo: Extraer competidores, teléfonos, ratings y reseñas en Cañar y Azogues
# ==============================================================================

$envFile = Join-Path $PSScriptRoot "..\.env"
if (-not (Test-Path $envFile)) {
    Write-Error "No se encontró el archivo .env"
    exit 1
}

# Leer APIFY_API_TOKEN del .env
$tokenLine = Get-Content $envFile | Where-Object { $_ -match "^APIFY_API_TOKEN=(.+)$" }
if (-not $tokenLine) {
    Write-Error "No se encontró APIFY_API_TOKEN en el archivo .env"
    exit 1
}
$token = $matches[1].Trim()

Write-Host "Iniciando estudio de competidores para LALAINMOBILIARIA..." -ForegroundColor Cyan
Write-Host "Token detectado: $($token.Substring(0, 15))..." -ForegroundColor Gray

# Configurar Actor de Google Maps en Apify
$actorId = "compass~crawler-google-places"
$runUrl = "https://api.apify.com/v2/acts/$actorId/runs?token=$token"

$payload = @{
    searchStringsArray = @(
        "inmobiliaria Azogues Ecuador",
        "bienes raices Azogues Ecuador",
        "inmobiliaria Cañar Ecuador"
    )
    maxCrawledPlacesPerSearch = 6
    language = "es"
    maxReviews = 5
    scrapeResponseHeaders = $false
    skipClosedPlaces = $true
} | ConvertTo-Json -Depth 5

Write-Host "Enviando solicitud de extracción a Apify (Compass Google Places)..." -ForegroundColor Yellow

try {
    $runResponse = Invoke-RestMethod -Uri $runUrl -Method Post -Body $payload -ContentType "application/json; charset=utf-8"
    $runId = $runResponse.data.id
    $datasetId = $runResponse.data.defaultDatasetId
    Write-Host "Ejecución iniciada con éxito. Run ID: $runId" -ForegroundColor Green
    Write-Host "Dataset ID: $datasetId" -ForegroundColor Green

    # Esperar que finalice la ejecución (polling cada 5 segundos)
    $statusUrl = "https://api.apify.com/v2/actor-runs/$runId`?token=$token"
    $maxAttempts = 30
    $attempt = 0
    $status = "RUNNING"

    while ($status -in @("RUNNING", "READY") -and $attempt -lt $maxAttempts) {
        Start-Sleep -Seconds 5
        $attempt++
        $statusCheck = Invoke-RestMethod -Uri $statusUrl
        $status = $statusCheck.data.status
        Write-Host "Estado actual ($attempt/30): $status" -ForegroundColor Gray
    }

    if ($status -eq "SUCCEEDED") {
        Write-Host "¡Extracción completada con éxito!" -ForegroundColor Green
        $datasetUrl = "https://api.apify.com/v2/datasets/$datasetId/items?token=$token&format=json"
        $items = Invoke-RestMethod -Uri $datasetUrl

        $outputFile = Join-Path $PSScriptRoot "..\market_research_competitors.json"
        $items | ConvertTo-Json -Depth 6 | Set-Content -Path $outputFile -Encoding UTF8
        Write-Host "Resultados guardados en: $outputFile" -ForegroundColor Cyan
        Write-Host "Total de competidores analizados: $($items.Count)" -ForegroundColor Green

        # Mostrar resumen en consola
        Write-Host "`n--- RESUMEN DE COMPETIDORES EN CAÑAR / AZOGUES ---" -ForegroundColor Yellow
        foreach ($comp in $items) {
            Write-Host "• $($comp.title) | Rating: $($comp.totalScore)/5 ($($comp.reviewsCount) resenas) | Tel: $($comp.phone)" -ForegroundColor White
        }
    } else {
        Write-Warning "La ejecución finalizó con estado: $status"
    }
} catch {
    Write-Error "Error ejecutando Apify: $_"
}
