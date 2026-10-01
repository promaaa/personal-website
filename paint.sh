#!/usr/bin/env bash
# ==============================================================================
# Make a page's painting and its social card. Needs ImageMagick 7.
#
#   ./paint.sh dots <4:5 image> <prefix>    coloured dots  -> <prefix>-800/1200/1600.webp
#   ./paint.sh ink  <4:5 image> <prefix>    blue ink dots  -> the same three files
#   ./paint.sh card <prefix> <title> <line> <footer> <out.jpg>   1200x630 social card
#
# A painting is 400x500 dots (an 8x8 ordered dither), scaled 2x, 3x and 4x
# without smoothing and saved as lossless WebP: every dot stays sharp, and the
# files weigh 40 to 100 KB, far less than any lossy setting of the same image.
# ==============================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
FONT=assets/fonts/ComicShannsMono-Regular.ttf
mode=${1:-}; shift || true

case $mode in
  dots|ink)
    [ $# -eq 2 ] || { echo "usage: $0 $mode <4:5 image> <prefix>" >&2; exit 1; }
    tmp=$(mktemp --suffix=.png); trap 'rm -f "$tmp"' EXIT
    if [ "$mode" = dots ]; then
      magick "$1" -resize 400x500! -ordered-dither o8x8,5 "$tmp"
    else # the site's ink (#114678) on its paper (#f2f4f6); dark mode inverts it in CSS
      magick "$1" -resize 400x500! -colorspace gray -level 6%,94% -ordered-dither o8x8 +level-colors '#114678','#f2f4f6' "$tmp"
    fi
    for k in 2 3 4; do
      magick "$tmp" -filter point -resize $((k * 100))% -define webp:lossless=true -define webp:method=6 -strip "$2-$((k * 400)).webp"
    done
    ls -l "$2"-*.webp ;;
  card)
    [ $# -eq 5 ] || { echo "usage: $0 card <prefix> <title> <line> <footer> <out.jpg>" >&2; exit 1; }
    magick -size 1200x630 xc:'#f2f4f6' \
      \( "$1-1200.webp" -resize 504x630! \) -geometry +0+0 -composite \
      \( -background none -font "$FONT" -fill '#c92a2a' -pointsize 62 -interline-spacing -6 -size 580x caption:"$2" \
         \( -size 580x28 xc:none \) \
         \( -fill '#114678' -pointsize 29 -interline-spacing 8 -size 580x caption:"$3" \) -append \) \
      -gravity southwest -geometry +564+122 -composite \
      \( +size -background none -font "$FONT" -fill '#495057' -pointsize 22 label:"$4" \) -geometry +564+60 -composite \
      -strip -quality 86 "$5"
    ls -l "$5" ;;
  *) sed -n '3,11p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
