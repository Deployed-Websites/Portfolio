gpush() {
  local config_file="$HOME/.gpush_path"
  local target_dir

  format_path() {
    printf '%s' "$1" | tr -d '"' | sed 's|\\|/|g' | sed 's|^\([A-Za-z]\):/|/\L\1/|'
  }
  
  resolve_to_git_root() {
    local formatted
    formatted=$(printf '%s' "$1" | tr -d '"' | sed 's|\\|/|g' | sed 's|^\([A-Za-z]\):/|/\L\1/|')
    # if it's a file, use its parent directory
    if [[ -f "$formatted" ]]; then
      formatted=$(dirname "$formatted")
    fi
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
    echo "📁 New path: $formatted"
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
    echo "📁 Using saved path: $target_dir"
    read -p "Continue? (y/n): " confirm
    if [[ "$confirm" != "y" ]]; then
      read -rp "Enter new path: " raw
      target_dir=$(resolve_to_git_root "$raw")
      echo "$target_dir" > "$config_file"
    fi

  else
    echo "❌ No saved path."
    read -rp "Enter new path: " raw
    target_dir=$(resolve_to_git_root "$raw")
    echo "$target_dir" > "$config_file"
  fi

  # Get the git root of the saved target path
  local target_git_root
  target_git_root=$(git -C "$target_dir" rev-parse --show-toplevel 2>/dev/null)

  # Get the git root of the current directory
  local current_git_root
  current_git_root=$(git -C "$PWD" rev-parse --show-toplevel 2>/dev/null)

  # Block if current directory belongs to a different git repo
  if [[ -n "$current_git_root" && "$current_git_root" != "$target_git_root" ]]; then
    echo ""
    echo "⛔ You're inside a different git repo:"
    echo "   Current: $current_git_root"
    echo "   Saved:   $target_git_root"
    echo "   Navigate out of this repo or update your saved path with: gpush /new/path"
    return 1
  fi

  cd "$target_dir" || { echo "❌ Path not found: $target_dir"; return 1; }

  echo ""
  echo "📁 $(pwd)"
  read -p "Commit message: " msg
  if [[ -z "$msg" ]]; then
    echo "❌ Commit message can't be empty."
    return 1
  fi

  git add .
  git commit -m "$msg"
  git push
}
