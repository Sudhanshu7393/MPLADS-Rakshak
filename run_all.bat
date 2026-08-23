@echo off
title MPLADS Rakshak - 1-Click Startup Script
color 0B
echo ===============================================================================
echo                MPLADS RAKSHAK - 1-CLICK LOCAL STARTUP SCRIPT
echo           AI-Powered Anomaly Intelligence Layer for e-SAKSHI (MoSPI)
echo ===============================================================================
echo.

echo [1/3] Starting ML Microservice (FastAPI on Port 8000)...
start "MPLADS - ML Microservice (Port 8000)" cmd /k "cd ml_service && python -m uvicorn main:app --host 127.0.0.1 --port 8000"

echo [2/3] Starting Spring Boot Backend (Port 8080)...
start "MPLADS - Backend (Port 8080)" cmd /k "cd backend && mvn spring-boot:run"

echo [3/3] Starting React Vite Frontend (Port 5173)...
start "MPLADS - Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"

echo.
echo ===============================================================================
echo ALL 3 SERVICES ARE LAUNCHING IN SEPARATE TERMINALS:
echo   - Frontend:    http://localhost:5173/
echo   - Backend:     http://localhost:8080/
echo   - ML Service:  http://127.0.0.1:8000/
echo ===============================================================================
echo.
echo Opening browser in 4 seconds...
timeout /t 4 /nobreak >nul
start http://localhost:5173/
