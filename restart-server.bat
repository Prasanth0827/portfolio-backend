@echo off
echo.
echo ========================================
echo  Restarting Backend Server
echo ========================================
echo.

echo Stopping old server on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /F /PID %%a 2>nul
)

timeout /t 2 /nobreak >nul

echo.
echo Starting backend server...
echo.
npm run dev

