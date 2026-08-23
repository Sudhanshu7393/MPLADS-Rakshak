@echo off
title MPLADS Rakshak - 1-Click Complete Startup
color 0B
echo ===============================================================================
echo                MPLADS RAKSHAK - SMART 1-CLICK LAUNCH SCRIPT
echo           AI-Powered Anomaly Intelligence Layer for e-SAKSHI (MoSPI)
echo ===============================================================================
echo.

echo [1/3] Launching Python ML Microservice (Port 8000)...
start "MPLADS - ML Service (Port 8000)" cmd /k "cd ml_service && pip install -r requirements.txt && python -m uvicorn main:app --host 127.0.0.1 --port 8000"

echo [2/3] Launching Spring Boot Backend (Port 8080)...
start "MPLADS - Backend (Port 8080)" cmd /k "cd backend && (if exist mvnw.cmd (call mvnw.cmd spring-boot:run) else (mvn spring-boot:run))"

echo [3/3] Launching React Vite Frontend (Port 5173)...
start "MPLADS - Frontend (Port 5173)" cmd /k "cd frontend && (if not exist node_modules (echo Installing frontend packages... && npm install)) && npm run dev"

echo.
echo ===============================================================================
echo Services are starting up! Please wait 10 seconds for initial initialization...
echo   - Frontend:    http://localhost:5173/
echo   - Backend:     http://localhost:8080/
echo   - ML Service:  http://127.0.0.1:8000/
echo ===============================================================================
echo.
timeout /t 8 /nobreak >nul
start http://localhost:5173/
