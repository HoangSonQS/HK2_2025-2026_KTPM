# File: run-gateway.ps1
# Use specific environment variables for clean overrides

# Clear any conflicting legacy environment variables from previous attempts
Get-ChildItem Env:SPRING_CLOUD_GATEWAY_ROUTES_* | Remove-Item -ErrorAction SilentlyContinue

$env:USER_SERVICE_URL="http://192.168.137.194:8081"
$env:MOVIE_SERVICE_URL="http://192.168.137.132:8082"
$env:BOOKING_SERVICE_URL="http://192.168.137.26:8083"

Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "CLEANING UP LEGACY CONFIGURATION..." -ForegroundColor Gray
Write-Host "GATEWAY CONFIGURATION:" -ForegroundColor Yellow
Write-Host "USER_SERVICE_URL    -> $env:USER_SERVICE_URL"
Write-Host "MOVIE_SERVICE_URL   -> $env:MOVIE_SERVICE_URL"
Write-Host "BOOKING_SERVICE_URL -> $env:BOOKING_SERVICE_URL"
Write-Host "------------------------------------------------" -ForegroundColor Cyan

./mvnw spring-boot:run -pl api-gateway
