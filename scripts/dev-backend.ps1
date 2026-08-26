[CmdletBinding()]
param(
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  Starting Stirling PDF Spring Boot Backend    " -ForegroundColor Cyan
Write-Host "  Port: $Port                                  " -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

Push-Location $RepoRoot
try {
  $env:SERVER_PORT = "$Port"
  .\gradlew.bat bootRun
}
finally {
  Pop-Location
}
