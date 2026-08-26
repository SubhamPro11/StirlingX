[CmdletBinding()]
param(
  [string]$Mode = "core"
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$FrontendDir = Join-Path $RepoRoot "frontend"
$DistDir = Join-Path $FrontendDir "editor\dist"
$CustomStaticDir = Join-Path $RepoRoot "customFiles\static"

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Stirling PDF - Custom UI Build and Deploy Tool    " -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Ensure dependencies and environment are prepared
Write-Host "[1/3] Preparing build environment..." -ForegroundColor Yellow
Push-Location $FrontendDir
try {
  npx tsx editor/scripts/setup-env.mts
  node editor/scripts/generate-icons.js
  node editor/scripts/generate-og-metadata.mjs

  # 2. Build production assets with Vite
  Write-Host "[2/3] Building production frontend ($Mode)..." -ForegroundColor Yellow
  npx vite build editor --mode $Mode

  if (-not (Test-Path $DistDir)) {
    throw "Build failed: $DistDir does not exist."
  }
}
finally {
  Pop-Location
}

# 3. Deploy to customFiles/static/
Write-Host "[3/3] Deploying static override files to $CustomStaticDir..." -ForegroundColor Yellow
if (-not (Test-Path $CustomStaticDir)) {
  New-Item -ItemType Directory -Path $CustomStaticDir -Force | Out-Null
}

# Clean old hashed assets while preserving directory structure
Get-ChildItem -Path $CustomStaticDir -Recurse | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copy all built assets recursively
Copy-Item -Path "$DistDir\*" -Destination $CustomStaticDir -Recurse -Force

$DeployedCount = (Get-ChildItem -Path $CustomStaticDir -Recurse -File).Count
Write-Host ""
Write-Host "Success: $DeployedCount static files deployed to customFiles/static/" -ForegroundColor Green
Write-Host "Mount ./customFiles:/customFiles:rw in docker-compose or run Stirling-PDF to serve the new UI." -ForegroundColor Green
