#!/bin/bash
# Local dev playground: compare a release ("before") with live src/ ("after").
# Usage: yarn playground [git-ref]   (defaults to the latest release tag)
set -e

REF=${1:-$(git tag --sort=-v:refname | head -1)}
mkdir -p playground/baseline
git show "$REF:dist/ok.min.css" > playground/baseline/ok.min.css
echo "$REF" > playground/baseline/REF

echo "OK.css playground: http://localhost:4321/playground/ (before = $REF, after = src/)"
npx serve -l 4321 .
