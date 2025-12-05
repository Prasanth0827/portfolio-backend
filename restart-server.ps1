# Restart Backend Server Script
# Kills any process on port 5000 and starts fresh

Write-Host "🔄 Restarting Backend Server..." -ForegroundColor Cyan

# Find and kill process using port 5000
Write-Host "⏹️  Stopping old server on port 5000..." -ForegroundColor Yellow
try {
    $process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Old server stopped" -ForegroundColor Green
        Start-Sleep -Seconds 1
    } else {
        Write-Host "ℹ️  No server running on port 5000" -ForegroundColor Gray
    }
} catch {
    Write-Host "ℹ️  Port 5000 is free" -ForegroundColor Gray
}

# Start new server
Write-Host ""
Write-Host "🚀 Starting backend server..." -ForegroundColor Cyan
npm run dev

