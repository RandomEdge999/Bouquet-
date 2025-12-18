$ports = 5173, 5174
Write-Host "Scanning for zombie processes on ports $ports..."

foreach ($port in $ports) {
    if (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue) {
        $proc = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
        Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue
        Write-Host "Killed process on port $port"
    }
}
Write-Host "Starting Venooo..."
npm run dev
