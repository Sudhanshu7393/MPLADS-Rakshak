# MPLADS Rakshak - 1-Click PowerShell Launch Script
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "               MPLADS RAKSHAK - SMART 1-CLICK LAUNCH SCRIPT" -ForegroundColor Cyan
Write-Host "          AI-Powered Anomaly Intelligence Layer for e-SAKSHI (MoSPI)" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan

Write-Host "Starting ML Microservice (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/ml_service'; pip install -r requirements.txt; python -m uvicorn main:app --host 127.0.0.1 --port 8000"

Write-Host "Starting Spring Boot Backend (Port 8080)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/backend'; if (Test-Path 'mvnw.cmd') { .\mvnw.cmd spring-boot:run } else { mvn spring-boot:run }"

Write-Host "Starting React Vite Frontend (Port 5173)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/frontend'; if (-not (Test-Path 'node_modules')) { Write-Host 'Installing node_modules...'; npm install }; npm run dev"

Write-Host "All services launched! Opening browser in 8 seconds..." -ForegroundColor Magenta
Start-Sleep -Seconds 8
Start-Process "http://localhost:5173/"
