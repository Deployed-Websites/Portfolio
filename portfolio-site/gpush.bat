@echo off
setlocal enabledelayedexpansion

set "CONFIG=%USERPROFILE%\.gpush_path"

:: ─── GET TARGET DIR ───────────────────────────────────────────

if not "%~1"=="" (
    set "NEW_PATH=%~1"
    :: resolve to git root
    for /f "delims=" %%i in ('git -C "!NEW_PATH!" rev-parse --show-toplevel 2^>nul') do set "NEW_PATH=%%i"
    echo.
    echo [?] New path: !NEW_PATH!
    set /p "CONFIRM=Are you sure you want to use this path? (y/n): "
    if /i "!CONFIRM!" neq "y" (
        set /p "NEW_PATH=Enter new path: "
        for /f "delims=" %%i in ('git -C "!NEW_PATH!" rev-parse --show-toplevel 2^>nul') do set "NEW_PATH=%%i"
    )
    echo !NEW_PATH!> "!CONFIG!"
    set "TARGET_DIR=!NEW_PATH!"

) else if exist "!CONFIG!" (
    set /p "TARGET_DIR="< "!CONFIG!"
    echo.
    echo [~] Using saved path: !TARGET_DIR!
    set /p "CONFIRM=Continue? (y/n): "
    if /i "!CONFIRM!" neq "y" (
        set /p "TARGET_DIR=Enter new path: "
        for /f "delims=" %%i in ('git -C "!TARGET_DIR!" rev-parse --show-toplevel 2^>nul') do set "TARGET_DIR=%%i"
        echo !TARGET_DIR!> "!CONFIG!"
    )

) else (
    echo [x] No saved path.
    set /p "TARGET_DIR=Enter new path: "
    for /f "delims=" %%i in ('git -C "!TARGET_DIR!" rev-parse --show-toplevel 2^>nul') do set "TARGET_DIR=%%i"
    echo !TARGET_DIR!> "!CONFIG!"
)

:: ─── REPO SAFETY CHECK ────────────────────────────────────────

for /f "delims=" %%i in ('git -C "!TARGET_DIR!" rev-parse --show-toplevel 2^>nul') do set "TARGET_ROOT=%%i"
for /f "delims=" %%i in ('git rev-parse --show-toplevel 2^>nul') do set "CURRENT_ROOT=%%i"

if not "!CURRENT_ROOT!"=="" (
    if /i "!CURRENT_ROOT!" neq "!TARGET_ROOT!" (
        echo.
        echo [BLOCKED] You're inside a different git repo:
        echo    Current: !CURRENT_ROOT!
        echo    Saved:   !TARGET_ROOT!
        echo    Navigate out of this repo or run: gpush C:\your\new\path
        exit /b 1
    )
)

:: ─── COMMIT ───────────────────────────────────────────────────

cd /d "!TARGET_DIR!" || (
    echo [x] Path not found: !TARGET_DIR!
    exit /b 1
)

echo.
echo [+] %CD%
set /p "MSG=Commit message: "

if "!MSG!"=="" (
    echo [x] Commit message can't be empty.
    exit /b 1
)

git add .
git commit -m "!MSG!"
git push