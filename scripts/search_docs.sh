#!/bin/bash
# Search across Nebula documentation files
# Usage: ./search_docs.sh "search term"

if [ $# -eq 0 ]; then
  echo "Please provide a search term"
  exit 1
fi

rg -i "$1" --type md -C 2 .