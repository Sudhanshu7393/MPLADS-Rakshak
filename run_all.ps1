# MPLADS Rakshak - 1-Click PowerShell Launch Script
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "               MPLADS RAKSHAK - 1-CLICK LOCAL STARTUP SCRIPT" -ForegroundColor Cyan
Write-Host "          AI-Powered Anomaly Intelligence Layer for e-SAKSHI (MoSPI)" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan

Write-Host "Starting ML Microservice (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/ml_service'; python -m uvicorn main:app --host 127.0.0.1 --port 8000"

Write-Host "Starting Spring Boot Backend (Port 8080)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/backend'; mvn spring-boot:run"

Write-Host "Starting React Vite Frontend (Port 5173)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/frontend'; npm run dev"

Write-Host "All services launched! Opening browser in 4 seconds..." -ForegroundColor Magenta
Start-Sleep -Seconds 4
Start-Process "http://localhost:5173/"
