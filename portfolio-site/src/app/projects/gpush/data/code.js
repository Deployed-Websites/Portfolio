export const bashCode = `gpush() {
  local config_file="$HOME/.gpush_path"
  local target_dir

  format_path() {
    printf '%s' "$1" | tr -d '"' | sed 's|\\\\|/|g' | sed 's|^\\([A-Za-z]\\):/|/\\L\\1/|'
  }

  resolve_to_git_root() {
    local formatted
    formatted=$(printf '%s' "$1" | tr -d '"' | sed 's|\\\\|/|g' | sed 's|^\\([A-Za-z]\\):/|/\\L\\1/|')
    local root
    root=$(git -C "$formatted" rev-parse --show-toplevel 2>/dev/null)
    if [[ -z "$root" ]]; then
      echo "$formatted"
    else
      echo "$root"
    fi
  }

  if [[ -n "$1" ]]; then
    local formatted
    formatted=$(resolve_to_git_root "$1")
    echo ""
    echo "New path: $formatted"
    read -p "Are you sure you want to use this path? (y/n): " confirm
    if [[ "$confirm" != "y" ]]; then
      read -rp "Enter new path: " raw
      formatted=$(resolve_to_git_root "$raw")
    fi
    echo "$formatted" > "$config_file"
    target_dir="$formatted"

  elif [[ -f "$config_file" ]]; then
    target_dir=$(cat "$config_file")
    echo ""
    echo "Using saved path: $target_dir"
    read -p "Continue? (y/n): " confirm
    if [[ "$confirm" != "y" ]]; then
      read -rp "Enter new path: " raw
      target_dir=$(resolve_to_git_root "$raw")
      echo "$target_dir" > "$config_file"
    fi

  else
    echo "No saved path."
    read -rp "Enter new path: " raw
    target_dir=$(resolve_to_git_root "$raw")
    echo "$target_dir" > "$config_file"
  fi

  local target_git_root
  target_git_root=$(git -C "$target_dir" rev-parse --show-toplevel 2>/dev/null)

  local current_git_root
  current_git_root=$(git -C "$PWD" rev-parse --show-toplevel 2>/dev/null)

  if [[ -n "$current_git_root" && "$current_git_root" != "$target_git_root" ]]; then
    echo ""
    echo "BLOCKED - You're inside a different git repo:"
    echo "   Current: $current_git_root"
    echo "   Saved:   $target_git_root"
    echo "   Navigate out of this repo or update your saved path with: gpush /new/path"
    return 1
  fi

  cd "$target_dir" || { echo "Path not found: $target_dir"; return 1; }

  echo ""
  echo "$(pwd)"
  read -p "Commit message: " msg
  if [[ -z "$msg" ]]; then
    echo "Commit message can't be empty."
    return 1
  fi

  git add .
  git commit -m "$msg"
  git push
}`;

export const cmdCode = `@echo off
setlocal enabledelayedexpansion

set "CONFIG=%USERPROFILE%\\.gpush_path"

if not "%~1"=="" (
    set "NEW_PATH=%~1"
    for /f "delims=" %%i in ('git -C "!NEW_PATH!" rev-parse --show-toplevel 2^>nul') do set "NEW_PATH=%%i"
    echo.
    echo New path: !NEW_PATH!
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
    echo Using saved path: !TARGET_DIR!
    set /p "CONFIRM=Continue? (y/n): "
    if /i "!CONFIRM!" neq "y" (
        set /p "TARGET_DIR=Enter new path: "
        for /f "delims=" %%i in ('git -C "!TARGET_DIR!" rev-parse --show-toplevel 2^>nul') do set "TARGET_DIR=%%i"
        echo !TARGET_DIR!> "!CONFIG!"
    )

) else (
    echo No saved path.
    set /p "TARGET_DIR=Enter new path: "
    for /f "delims=" %%i in ('git -C "!TARGET_DIR!" rev-parse --show-toplevel 2^>nul') do set "TARGET_DIR=%%i"
    echo !TARGET_DIR!> "!CONFIG!"
)

for /f "delims=" %%i in ('git -C "!TARGET_DIR!" rev-parse --show-toplevel 2^>nul') do set "TARGET_ROOT=%%i"
for /f "delims=" %%i in ('git rev-parse --show-toplevel 2^>nul') do set "CURRENT_ROOT=%%i"

if not "!CURRENT_ROOT!"=="" (
    if /i "!CURRENT_ROOT!" neq "!TARGET_ROOT!" (
        echo.
        echo BLOCKED - You're inside a different git repo:
        echo    Current: !CURRENT_ROOT!
        echo    Saved:   !TARGET_ROOT!
        echo    Navigate out of this repo or run: gpush C:\\your\\new\\path
        exit /b 1
    )
)

cd /d "!TARGET_DIR!" || (
    echo Path not found: !TARGET_DIR!
    exit /b 1
)

echo.
echo %CD%
set /p "MSG=Commit message: "

if "!MSG!"=="" (
    echo Commit message can't be empty.
    exit /b 1
)

git add .
git commit -m "!MSG!"
git push`;