@echo off
echo Creating .env file from env.example...

if exist .env (
    echo.
    echo WARNING: .env file already exists!
    echo If you want to recreate it, delete the existing .env file first.
    echo.
    pause
    exit /b
)

copy env.example .env >nul
if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: .env file created successfully!
    echo.
    echo Please edit .env file with your actual values:
    echo   - MongoDB Atlas connection string
    echo   - JWT secret (generate with: openssl rand -base64 32)
    echo   - Cloudinary credentials (if using image uploads)
    echo   - Frontend URL for CORS
    echo.
) else (
    echo.
    echo ERROR: Failed to create .env file
    echo.
)

pause

