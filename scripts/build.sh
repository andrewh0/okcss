#!/bin/bash
VERSION=$(node -p "require('./package.json').version")

# Update version in all source CSS files (cross-platform sed)
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/ok.css
  sed -i '' "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/core.css
  sed -i '' "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/forms.css
  sed -i '' "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/tables.css
else
  sed -i "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/ok.css
  sed -i "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/core.css
  sed -i "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/forms.css
  sed -i "s/OK.css v[0-9]*\.[0-9]*\.[0-9]*/OK.css v$VERSION/" src/tables.css
fi

# Create temporary bundled file by concatenating (core.css already has the header)
cat src/core.css src/forms.css src/tables.css > dist/ok.bundled.css

# Minify the bundled version
npx lightningcss --minify --targets '>= 0.25%' dist/ok.bundled.css -o dist/ok.min.css

# Clean up temp file
rm dist/ok.bundled.css

# Build individual minified files for selective imports
npx lightningcss --minify --targets '>= 0.25%' src/core.css -o dist/core.min.css
npx lightningcss --minify --targets '>= 0.25%' src/forms.css -o dist/forms.min.css
npx lightningcss --minify --targets '>= 0.25%' src/tables.css -o dist/tables.min.css
