@echo off
echo Starting Real-Time Chat Application...
echo.
echo Opening 2 terminals for Server and Client...
echo.

REM Start server in a new window
start cmd /k "cd server && npm start"

REM Wait a moment for server to start
timeout /t 2 /nobreak

REM Start client in a new window
start cmd /k "npm run dev"

echo.
echo Servers are starting...
echo Server: http://localhost:3001
echo Client: http://localhost:5173 (or 5174 if port is in use)
echo.
pause
