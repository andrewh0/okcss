#!/bin/bash
VERSION=$(node -p "require('./package.json').version")

# Update version in source CSS (cross-platform sed)
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/ok.css
else
  sed -i "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/ok.css
fi

npx lightningcss --minify --targets '>= 0.25%' src/ok.css -o dist/ok.min.css
