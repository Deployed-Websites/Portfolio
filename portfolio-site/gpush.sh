
gpush() {
  local config_file="$HOME/.gpush_path"
  local target_dir

  format_path() {
    echo "$1" | tr -d '"' | sed 's|\\|/|g' | sed 's|^\([A-Za-z]\):/|/\L\1/|'
  }

  if [[ -n "$1" ]]; then
    local formatted
    formatted=$(format_path "$1")
    echo ""
    echo "📁 New path: $formatted"
    read -p "Are you sure you want to use this path? (y/n): " confirm
    if [[ "$confirm" != "y" ]]; then
      read -rp "Enter new path: " raw
      formatted=$(format_path "$raw")
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
      target_dir=$(format_path "$raw")
      echo "$target_dir" > "$config_file"
    fi

  else
    echo "❌ No saved path."
    read -rp "Enter new path: " raw
    target_dir=$(format_path "$raw")
    echo "$target_dir" > "$config_file"
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
