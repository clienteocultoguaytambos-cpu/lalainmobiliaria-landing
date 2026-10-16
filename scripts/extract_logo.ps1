$envFile = Join-Path $PSScriptRoot "..\.env"
$tokenLine = Get-Content $envFile | Where-Object { $_ -match "^APIFY_API_TOKEN=(.+)$" }
$token = $matches[1].Trim()

Write-Host "Extrayendo información y logo de Lala Inmobiliaria ACBRP en Facebook..." -ForegroundColor Yellow

$payload = @{
    startUrls = @(
        @{ url = "https://www.facebook.com/people/Lala-Inmobiliaria-ACBRP/61566442654406/" }
    )
} | ConvertTo-Json -Depth 5

$url = "https://api.apify.com/v2/acts/apify~facebook-pages-scraper/runs?token=$token"

try {
    $run = Invoke-RestMethod -Uri $url -Method Post -Body $payload -ContentType "application/json; charset=utf-8"
    $runId = $run.data.id
    $dsId = $run.data.defaultDatasetId
    Write-Host "Run iniciado: $runId" -ForegroundColor Green

    $status = "RUNNING"
    $att = 0
    while ($status -in @("RUNNING", "READY") -and $att -lt 30) {
        Start-Sleep -Seconds 5
        $att++
        $chk = Invoke-RestMethod -Uri "https://api.apify.com/v2/actor-runs/$runId`?token=$token"
        $status = $chk.data.status
        Write-Host "Estado ($att/30): $status" -ForegroundColor Gray
    }

    if ($status -eq "SUCCEEDED") {
        $items = Invoke-RestMethod -Uri "https://api.apify.com/v2/datasets/$dsId/items?token=$token&format=json"
        $out = Join-Path $PSScriptRoot "..\facebook_page_data.json"
        $items | ConvertTo-Json -Depth 6 | Set-Content -Path $out -Encoding UTF8
        Write-Host "Datos guardados en facebook_page_data.json" -ForegroundColor Green
        
        # Mostrar URLs de logo/imágenes encontradas
        $first = $items[0]
        Write-Host "Página: $($first.title)" -ForegroundColor Cyan
        Write-Host "Foto de perfil / Logo URL: $($first.profilePictureUrl)" -ForegroundColor Cyan
        Write-Host "Foto de portada: $($first.coverPhotoUrl)" -ForegroundColor Cyan
    } else {
        Write-Warning "Finalizó con estado: $status"
    }
} catch {
    Write-Error "Error extrayendo Facebook: $_"
}
