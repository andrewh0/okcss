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

# Build bundled ok.min.css by concatenating source files
# Note: Cannot use --bundle because core.css has external @import that lightningcss tries to resolve
cat src/core.css src/forms.css src/tables.css | npx lightningcss --minify --targets '>= 0.25%' -o dist/ok.min.css

# Build individual minified files for selective imports
npx lightningcss --minify --targets '>= 0.25%' src/core.css -o dist/core.min.css
npx lightningcss --minify --targets '>= 0.25%' src/forms.css -o dist/forms.min.css
npx lightningcss --minify --targets '>= 0.25%' src/tables.css -o dist/tables.min.css
