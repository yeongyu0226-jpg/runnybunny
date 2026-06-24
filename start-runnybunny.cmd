@echo off
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
echo Starting RunnyBunny...
echo.
echo If the browser does not open automatically, visit:
echo http://127.0.0.1:5173
echo.
start "" "http://127.0.0.1:5173"
call "C:\Program Files\nodejs\npm.cmd" run dev
pause
