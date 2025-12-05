@echo off
echo.
echo ========================================
echo  Cleaning up port 5000 and restarting
echo ========================================
echo.

echo Stopping all processes on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process ID: %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo.
echo Starting backend server...
echo.
npm run dev

