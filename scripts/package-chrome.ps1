param(
  [string]$Version = "0.1.0"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$dist = Join-Path $root "dist"
$zip = Join-Path $dist "linkedin-feedless-chrome-v$Version.zip"

New-Item -ItemType Directory -Force -Path $dist | Out-Null

if (Test-Path -LiteralPath $zip) {
  Remove-Item -LiteralPath $zip
}

$items = @(
  Join-Path $root "manifest.json"
  Join-Path $root "assets"
  Join-Path $root "src"
  Join-Path $root "popup"
  Join-Path $root "dashboard"
  Join-Path $root "README.md"
)

Compress-Archive -Path $items -DestinationPath $zip
Write-Host "Created $zip"
