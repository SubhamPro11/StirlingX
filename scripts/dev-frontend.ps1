[CmdletBinding()]
param(
  [int]$Port = 5173,
  [string]$BackendUrl = "http://localhost:8080"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$FrontendDir = Join-Path $RepoRoot "frontend"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Starting Stirling PDF Frontend Dev Server    " -ForegroundColor Cyan
Write-Host "  Port: $Port | Backend: $BackendUrl           " -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

Push-Location $FrontendDir
try {
  $env:BACKEND_URL = $BackendUrl
  npx vite editor --port $Port --open
}
finally {
  Pop-Location
}
