#!/usr/bin/env bash
# ==============================================================================
# Generate the bookshelf (HTML) and the reading guides (PDF) from books/*.json
# ==============================================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Locate tectonic: prefer the project-local binary, fall back to PATH.
TECTONIC_BIN="$ROOT_DIR/.tools/tectonic"
if [ ! -x "$TECTONIC_BIN" ]; then
  TECTONIC_BIN="$(command -v tectonic || true)"
fi
if [ -z "$TECTONIC_BIN" ] || [ ! -x "$TECTONIC_BIN" ]; then
  echo "Error: tectonic not found. Install it into .tools/tectonic or add 'tectonic' to PATH." >&2
  echo "       See: https://tectonic-typesetting.github.io/" >&2
  exit 1
fi

DOCS_DIR="$ROOT_DIR/assets/docs"
FONT="$ROOT_DIR/assets/fonts/ComicShannsMono-Regular.ttf"

if [ ! -f "$FONT" ]; then
  echo "Error: font missing at $FONT" >&2
  exit 1
fi

mkdir -p "$DOCS_DIR"

echo "==> Using tectonic: $TECTONIC_BIN"

# 1. Regenerate the shelf pages and the LaTeX documents from the JSON data.
echo "==> Generating the shelf and the LaTeX documents..."
python3 "$ROOT_DIR/books/generate.py"

# 2. Compile each language into assets/docs/, renaming to the published names.
compile() {
  local src="$1"
  local out_name="$2"
  local tmp
  tmp="$(mktemp -d)"
  echo "==> Compiling $out_name..."
  "$TECTONIC_BIN" --outdir "$tmp" "$src"
  mv "$tmp/$(basename "$src" .tex).pdf" "$DOCS_DIR/$out_name"
  rm -rf "$tmp"
}

compile "$ROOT_DIR/books/books-en.tex" "books-recommendations-en.pdf"
compile "$ROOT_DIR/books/books-fr.tex" "livres-recommandes-fr.pdf"

echo "==> Generated successfully:"
ls -lh "$DOCS_DIR/books-recommendations-en.pdf" "$DOCS_DIR/livres-recommandes-fr.pdf"
