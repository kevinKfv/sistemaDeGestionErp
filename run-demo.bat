@echo off
echo Intentando ejecutar el demo...
echo.

REM Buscar Node.js en ubicaciones comunes
if exist "C:\Program Files\nodejs\npm.cmd" (
    echo Encontrado Node.js en Program Files
    "C:\Program Files\nodejs\npm.cmd" install
    "C:\Program Files\nodejs\npm.cmd" run dev
    goto :end
)

if exist "C:\Program Files (x86)\nodejs\npm.cmd" (
    echo Encontrado Node.js en Program Files (x86)
    "C:\Program Files (x86)\nodejs\npm.cmd" install
    "C:\Program Files (x86)\nodejs\npm.cmd" run dev
    goto :end
)

REM Intentar con npm directamente
npm --version >nul 2>&1
if %errorlevel% == 0 (
    echo npm disponible en PATH
    npm install
    npm run dev
    goto :end
)

echo.
echo ============================================
echo Node.js no encontrado o no configurado
echo ============================================
echo.
echo Por favor:
echo 1. Descarga Node.js desde https://nodejs.org/
echo 2. Instala la version LTS
echo 3. Reinicia tu terminal/IDE
echo 4. Ejecuta este archivo nuevamente
echo.
echo O presiona cualquier tecla para abrir el navegador
echo con instrucciones de instalacion...
pause >nul
start https://nodejs.org/

:end
pause
