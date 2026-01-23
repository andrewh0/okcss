<h1 align="center">🆗 OK.css</h1>
<p align="center">Sensible styling defaults for your web page</p>
<p align="center"><a href="https://okcss.netlify.app/">Project page</a> · <a href="https://okcss.netlify.app/demo/">Demo</a></p>

---

**OK.css** is a
[classless CSS framework](https://css-tricks.com/no-class-css-frameworks/). Dropping it into your HTML will make your page look decent — no need to reference documentation, think about responsiveness, or account for browser differences as long as your markup is semantically-correct.

To use it, you can [download the CSS file directly](https://cdn.jsdelivr.net/gh/andrewh0/okcss@1/dist/ok.min.css) or add the following line to your HTML `<head>`:

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andrewh0/okcss@1/dist/ok.min.css" />
```

Note that [normalize.css](https://github.com/necolas/normalize.css/) is included in **OK.css**.

**OK.css** is somewhere between a CSS normalizer and a full-fledged framework like [Bootstrap](https://getbootstrap.com/)</a> or [Tailwind](https://tailwindcss.com/)</a>. It's great for blogs or small single-page applications, but might not be so great for large, interactive apps that require JavaScript or custom elements.

## Development

Install dependencies with `yarn install`.

You can start a local server with `yarn start`. By default, the page will be available at `http://localhost:5000`.

Make updates to the CSS file in `./src/ok.css` and `yarn build` to create a minified version available in `./dist/ok.min.css`.

The build uses [Lightning CSS](https://lightningcss.dev/) for minification and autoprefixing. The version number in the CSS header is automatically synced from `package.json`.

This repo is set up with [Netlify's continuous deployment](https://docs.netlify.com/configure-builds/get-started/). `yarn deploy` copies files into a `.gitignore`d directory called `_site` and `_site` is hosted on Netlify.

## Releasing

Releases are automated via GitHub Actions. When a PR is merged to `main`, a new version is released based on the label in the PR body.

### How to release

1. Create a PR with your changes
2. In the PR body, check one of the version labels:
   - `patch` - Bug fixes and minor changes (1.0.0 → 1.0.1)
   - `minor` - New features (1.0.0 → 1.1.0)
   - `major` - Breaking changes (1.0.0 → 2.0.0)
   - `skip-release` - No release needed
3. Merge the PR to `main`
4. GitHub Actions will automatically:
   - Bump the version in `package.json`
   - Update the version in CSS files
   - Create a git tag
   - Create a GitHub Release with assets
   - Update CHANGELOG.md
   - Comment on the PR with the released version

### Prereleases

Use the `next` branch to build up changes for a major release without publishing to `main`.

1. Create and push the `next` branch from `main`:
   ```
   git checkout main
   git pull
   git checkout -b next
   git push -u origin next
   ```

2. Merge PRs into `next` instead of `main`. Each merge creates a prerelease version (e.g., `2.0.0-next.0`, `2.0.0-next.1`).

3. When ready to release, merge `next` into `main`:
   ```
   git checkout main
   git merge next
   git push
   ```
   This creates the final release (e.g., `2.0.0`).

### Manual release (if needed)

Preview what would be released:

```
yarn release:dry
```

Create a release manually:

```
yarn release
```

## Contributing

Pull requests are welcome! If you find a bug or have a feature request, please submit a GitHub issue.

## Alternative features

Not all UI features can be implemented with classless CSS while remaining accessible and supported cross-browser. For more complex features, you may need to supplement this framework with additional HTML, CSS, or JavaScript.

Here are some suggestions for altering the behavior of certain elements.

**Feature**

Make `table`s scroll horizontally when they are wider than the main content width.

Desired behavior:

![HTML table with horizontal scroll](https://user-images.githubusercontent.com/2905455/120902460-6bbadd80-c5f5-11eb-9d9d-1aea260b7f8f.gif)

Note: In **OK.css**, `table`s are set to `display: table` for [accessibility reasons](https://www.tpgi.com/short-note-on-what-css-display-properties-do-to-table-semantics/).

**Implementation**

Wrap the table in a `<div>` with `overflow-x: scroll;`:

```
<div style="overflow-x: scroll">
  <table>
  ...
  </table>
</div>
```

One caveat is that this can prevent the table heading from sticking when scrolling vertically.
