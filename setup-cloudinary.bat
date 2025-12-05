@echo off
echo.
echo ========================================
echo  Cloudinary Setup Helper
echo ========================================
echo.

set /p CLOUD_NAME="Enter your Cloudinary Cloud Name: "
set /p API_KEY="Enter your Cloudinary API Key: "
set /p API_SECRET="Enter your Cloudinary API Secret: "

echo.
echo Adding Cloudinary credentials to .env...
echo.

(
echo # Cloudinary Configuration ^(for image uploads^)
echo # Get these from: https://cloudinary.com/console
echo CLOUDINARY_CLOUD_NAME=%CLOUD_NAME%
echo CLOUDINARY_API_KEY=%API_KEY%
echo CLOUDINARY_API_SECRET=%API_SECRET%
) >> .env

echo.
echo ✅ Cloudinary credentials added to .env!
echo.
echo Now restart your backend server:
echo   npm run dev
echo.
pause

