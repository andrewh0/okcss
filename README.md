<h1 align="center">🆗 OK.css</h1>
<p align="center">Sensible styling defaults for your web page</p>
<p align="center"><a href="https://okcss.netlify.app/">Project page</a> · <a href="https://okcss.netlify.app/demo/">Demo</a></p>

---

**OK.css** is a
[classless CSS framework](https://css-tricks.com/no-class-css-frameworks/). Dropping it into your HTML will make your page look decent — no need to reference documentation, think about responsiveness, or account for browser differences as long as your markup is semantically-correct.

To use it, you can [download the CSS file directly](https://cdn.jsdelivr.net/gh/andrewh0/okcss@v1/dist/ok.min.css) or add the following line to your HTML `<head>`:

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andrewh0/okcss@v1/dist/ok.min.css" />
```

Note that [normalize.css](https://github.com/necolas/normalize.css/) is included in **OK.css**.

**OK.css** is somewhere between a CSS normalizer and a full-fledged framework like [Bootstrap](https://getbootstrap.com/)</a> or [Tailwind](https://tailwindcss.com/)</a>. It's great for blogs or small single-page applications, but might not be so great for large, interactive apps that require JavaScript or custom elements.

## Development

Install dependencies with `yarn install`.

You can start a local server with `yarn start`. By default, the page will be available at `http://localhost:5000`.

Make updates to the CSS file in `./src/ok.css` and `yarn build` to create a minified version available in `./dist/ok.min.css`.

This repo is set up with [Netlify's continuous deployment](https://docs.netlify.com/configure-builds/get-started/). `yarn deploy` copies files into a `.gitignore`d directory called `_site` and `_site` is hosted on Netlify.

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
