#!/bin/bash

# This script cleans up broken import paths in the components/ui folder.

UI_DIR="src/components/ui"

# Check if the directory exists
if [ ! -d "$UI_DIR" ]; then
  echo "Error: Directory $UI_DIR not found."
  echo "Please run this script from your project's root folder."
  exit 1
fi

echo "Scanning for files with versioned imports in $UI_DIR..."

# Use find to get all .tsx files and pipe them to sed
# This will find any import path like "@radix-ui/react-accordion@1.2.3"
# and replace it with "@radix-ui/react-accordion"

# For macOS (uses -E for extended regex and -i '' for in-place edit)
if [[ "$OSTYPE" == "darwin"* ]]; then
  find "$UI_DIR" -name "*.tsx" -print0 | xargs -0 sed -E -i '' "s/(@[a-zA-Z0-9\/-]+)@[0-9\.]+\"/\1\"/g"
  find "$UI_DIR" -name "*.tsx" -print0 | xargs -0 sed -E -i '' "s/([a-zA-Z0-9-]+)@[0-9\.]+\"/\1\"/g"
  find "src/components/ui" -name "utils.ts" -print0 | xargs -0 sed -E -i '' "s/([a-zA-Z0-9-]+)@[0-9\.]+\"/\1\"/g"
# For Linux (uses -r for extended regex and -i for in-place edit)
else
  find "$UI_DIR" -name "*.tsx" -print0 | xargs -0 sed -r -i "s/(@[a-zA-Z0-9\/-]+)@[0-9\.]+\"/\1\"/g"
  find "$UI_DIR" -name "*.tsx" -print0 | xargs -0 sed -r -i "s/([a-zA-Z0-9-]+)@[0-9\.]+\"/\1\"/g"
  find "src/components/ui" -name "utils.ts" -print0 | xargs -0 sed -r -i "s/([a-zA-Z0-9-]+)@[0-9\.]+\"/\1\"/g"
fi

echo "Done! All import paths have been cleaned."