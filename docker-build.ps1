# Docker build workaround for OneDrive "invalid file request" on Windows.
# Copies project to C:\temp (outside OneDrive) and builds from there.

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
# Use C:\temp if it exists (usually outside OneDrive); else use system temp
$BuildDir = if (Test-Path "C:\temp") { "C:\temp\wildart-build" } else { Join-Path $env:TEMP "wildart-build" }

Write-Host "Copying project to $BuildDir..." -ForegroundColor Cyan
if (Test-Path $BuildDir) { Remove-Item -Recurse -Force $BuildDir }
New-Item -ItemType Directory -Path $BuildDir -Force | Out-Null

# Exclude node_modules, .next, .git to speed up copy
$exclude = @("node_modules", ".next", ".git", "*.log")
robocopy $ProjectRoot $BuildDir /E /XD node_modules .next .git /XF *.log /NFL /NDL /NJH /NJS /nc /ns /np

if ($LASTEXITCODE -ge 8) {
    Write-Host "Copy failed (robocopy exit $LASTEXITCODE)" -ForegroundColor Red
    exit 1
}

Write-Host "Building Docker images from $BuildDir..." -ForegroundColor Cyan
Push-Location $BuildDir
try {
    docker compose up -d --build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nDone. Frontend: http://localhost:3001  Backend: http://localhost:4001" -ForegroundColor Green
    } else {
        exit $LASTEXITCODE
    }
} finally {
    Pop-Location
}
