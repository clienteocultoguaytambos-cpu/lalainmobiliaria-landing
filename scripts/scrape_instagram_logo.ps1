$envFile = Join-Path $PSScriptRoot "..\.env"
$tokenLine = Get-Content $envFile | Where-Object { $_ -match "^APIFY_API_TOKEN=(.+)$" }
$token = $matches[1].Trim()

Write-Host "Consultando perfil de Instagram @lalainmobiliaria en Apify..." -ForegroundColor Yellow

$payload = @{
    usernames = @("lalainmobiliaria")
} | ConvertTo-Json -Depth 5

$url = "https://api.apify.com/v2/acts/apify~instagram-profile-scraper/runs?token=$token"

try {
    $run = Invoke-RestMethod -Uri $url -Method Post -Body $payload -ContentType "application/json; charset=utf-8"
    $runId = $run.data.id
    $dsId = $run.data.defaultDatasetId
    Write-Host "Run iniciado: $runId" -ForegroundColor Green

    $status = "RUNNING"
    $att = 0
    while ($status -in @("RUNNING", "READY") -and $att -lt 25) {
        Start-Sleep -Seconds 4
        $att++
        $chk = Invoke-RestMethod -Uri "https://api.apify.com/v2/actor-runs/$runId`?token=$token"
        $status = $chk.data.status
        Write-Host "Estado ($att/25): $status" -ForegroundColor Gray
    }

    if ($status -eq "SUCCEEDED") {
        $items = Invoke-RestMethod -Uri "https://api.apify.com/v2/datasets/$dsId/items?token=$token&format=json"
        $out = Join-Path $PSScriptRoot "..\instagram_data.json"
        $items | ConvertTo-Json -Depth 6 | Set-Content -Path $out -Encoding UTF8
        Write-Host "Datos guardados en instagram_data.json" -ForegroundColor Green

        $profile = $items[0]
        Write-Host "Nombre: $($profile.fullName)" -ForegroundColor Cyan
        Write-Host "Bio: $($profile.biography)" -ForegroundColor Cyan
        Write-Host "Foto de perfil / Logo URL: $($profile.profilePicUrlHD -or $profile.profilePicUrl)" -ForegroundColor Cyan

        $picUrl = $profile.profilePicUrlHD
        if (-not $picUrl) { $picUrl = $profile.profilePicUrl }

        if ($picUrl) {
            $assetsDir = Join-Path $PSScriptRoot "..\public"
            if (-not (Test-Path $assetsDir)) { New-Item -ItemType Directory -Path $assetsDir -Force }
            $logoPath = Join-Path $assetsDir "logo.jpg"
            Invoke-WebRequest -Uri $picUrl -OutFile $logoPath
            Write-Host "LOGO DESCARGADO EXITOSAMENTE EN: $logoPath" -ForegroundColor Green
        }
    } else {
        Write-Warning "Finalizó con estado: $status"
    }
} catch {
    Write-Error "Error extrayendo Instagram: $_"
}
