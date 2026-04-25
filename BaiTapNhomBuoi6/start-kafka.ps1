# Script to start Kafka for LAN deployment (Fixed IP: 192.168.137.25)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ip = "192.168.137.25"

Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "KAFKA SERVER IP: $ip" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "Starting Docker Kafka..."

$env:HOST_IP = $ip
docker-compose up -d

Write-Host "`nSUCCESS! Other machines must connect to: ${ip}:9092" -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
