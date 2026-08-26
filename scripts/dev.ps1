[CmdletBinding()]
param(
  [int]$FrontendPort = 5173,
  [int]$BackendPort = 8080
)

$RepoRoot = Split-Path -Parent $PSScriptRoot

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  Launching Stirling PDF (Backend + Frontend)            " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

# Launch backend in a separate terminal window
Write-Host "[1/2] Starting backend on port $BackendPort in new window..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "$RepoRoot\scripts\dev-backend.ps1", "-Port", "$BackendPort"

# Wait a brief moment then launch frontend
Start-Sleep -Seconds 2
Write-Host "[2/2] Starting frontend dev server on port $FrontendPort..." -ForegroundColor Yellow
powershell -ExecutionPolicy Bypass -File "$RepoRoot\scripts\dev-frontend.ps1" -Port $FrontendPort -BackendUrl "http://localhost:$BackendPort"
