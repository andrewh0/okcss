/*
 * OK.css playground: compare the latest release ("before") with live src/ ("after").
 * The dials only affect "after". At their defaults they reproduce OK.css exactly,
 * so any visible difference comes from src/ edits or dial changes.
 */
(() => {
  const { createDialRoot, createDialKit } = window.DialKit;

  const PAGES = {
    article: "/playground/pages/article.html",
    demo: "/demo.html",
    index: "/index.html",
  };
  const BEFORE_CSS = ["/playground/baseline/ok.min.css"];
  // Optional extra comparison: drop a stylesheet at this path (git-ignored) to compare it,
  // layered on the release, in the before pane. Falls back to the release if missing.
  const FIRST_STYLE_CSS = "/playground/baseline/first-style.css";
  const AFTER_CSS = ["/src/core.css", "/src/forms.css", "/src/tables.css"];
  const FONTS = {
    inter: '"Inter var", var(--ok-sans)',
    system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    serif: 'ui-serif, "New York", Georgia, serif',
  };

  // Defaults mirror src/core.css so "after" matches OK.css until a dial moves.
  const config = {
    view: {
      type: "select",
      default: "split",
      options: [
        { value: "split", label: "Side by side" },
        { value: "wipe", label: "Before / after" },
        { value: "after", label: "After only" },
        { value: "before", label: "Before only" },
      ],
    },
    page: {
      type: "select",
      default: "article",
      options: [
        { value: "article", label: "Article" },
        { value: "demo", label: "Demo (all elements)" },
        { value: "index", label: "Project page" },
      ],
    },
    compareWith: {
      type: "select",
      default: "release",
      options: [
        { value: "release", label: "Before: release" },
        { value: "first", label: "Before: first style" },
      ],
    },
    theme: { type: "select", default: "light", options: ["light", "dark", "system"] },
    width: {
      type: "select",
      default: "fill",
      options: [
        { value: "fill", label: "Fill pane" },
        { value: "390", label: "390 · phone" },
        { value: "768", label: "768 · tablet" },
        { value: "1024", label: "1024" },
        { value: "1280", label: "1280" },
      ],
    },
    syncScroll: true,
    applyDials: true,
    debug: {
      baselineGrid: false,
      outlineBoxes: false,
      wipePosition: [50, 0, 100, 1],
    },
    // Plain values: font sizes in rem, line heights as multipliers, spacing in px (at 16px base).
    type: {
      font: {
        type: "select",
        default: "inter",
        options: [
          { value: "inter", label: "Inter" },
          { value: "system", label: "System UI" },
          { value: "serif", label: "Serif" },
        ],
      },
      baseSize: [16, 12, 22, 1],
      h1: [2.5, 1, 4, 0.125],
      h2: [2, 0.875, 3, 0.125],
      h3: [1.5, 0.875, 2.5, 0.125],
      small: [0.75, 0.625, 1, 0.125],
      lineHeight: [1.5, 1.1, 2.2, 0.025],
      h1LineHeight: [1.25, 1, 1.8, 0.025],
      h2LineHeight: [1.25, 1, 1.8, 0.025],
      h3LineHeight: [1.25, 1, 1.8, 0.025],
      smallLineHeight: [1.5, 1, 2, 0.025],
      // fixed line height in px for small text, captions and code; 0 keeps the multiplier above
      smallLinePx: [0, 0, 32, 1],
      h6Style: {
        type: "select",
        default: "caps",
        options: [
          { value: "caps", label: "Uppercase (OK.css)" },
          { value: "muted", label: "Normal case, muted" },
        ],
      },
      h1Tracking: [0, -0.06, 0.04, 0.005],
      headingWeight: [700, 300, 900, 100],
      strongWeight: [700, 300, 900, 100],
    },
    spacing: {
      measure: [80, 40, 110, 1],
      paragraph: [24, 0, 64, 2],
      beforeH2: [40, 0, 96, 2],
      afterH2: [16, 0, 48, 2],
      beforeH3: [40, 0, 96, 2],
      afterH3: [16, 0, 48, 2],
      titleToDate: [16, 0, 48, 2],
      titleBlock: [24, 0, 64, 2],
      listItems: [8, 0, 32, 2],
      listIndent: [32, 0, 48, 2],
      beforeHr: [24, 0, 96, 2],
      afterHr: [24, 0, 96, 2],
      quoteIndent: [32, 0, 48, 2],
      quoteBar: [4, 0, 8, 1],
    },
    // Experiments from Practical Typography (practicaltypography.com) and Obsidian Minimal
    prose: {
      paragraphStyle: {
        type: "select",
        default: "space",
        options: [
          { value: "space", label: "Space between" },
          { value: "indent", label: "First-line indent" },
        ],
      },
      indent: [1.5, 1, 4, 0.25],
      capsTracking: [0, 0, 0.15, 0.01],
      textWrap: {
        type: "select",
        default: "off",
        options: [
          { value: "off", label: "Browser default" },
          { value: "pretty", label: "Pretty + balanced headings" },
        ],
      },
      hyphenate: false,
      quoteSize: [1, 0.75, 1.125, 0.0625],
      quoteLineHeight: [0, 0, 2, 0.025],
      listMarker: { type: "select", default: "disc", options: ["disc", "circle"] },
      codePadding: {
        type: "select",
        default: "em",
        options: [
          { value: "em", label: "0.2em 0.4em (OK.css)" },
          { value: "px", label: "2px 4px" },
        ],
      },
      markerColor: { type: "select", default: "body", options: ["body", "muted"] },
    },
    links: {
      style: {
        type: "select",
        default: "accent",
        options: [
          { value: "accent", label: "Blue, no underline" },
          { value: "accentUnderline", label: "Blue + underline" },
          { value: "underline", label: "Quiet underline" },
        ],
      },
      weight: [600, 300, 800, 100],
      underlineOffset: [4, 0, 10, 1],
      underlineThickness: [1, 0.5, 3, 0.25],
      hoverThickness: [1.5, 0.5, 4, 0.25],
    },
    light: {
      _collapsed: true,
      strong: "#000000",
      body: "#000000",
      muted: "#747474",
      link: "#3173de",
      code: "#c23a30",
      background: "#ffffff",
      surface: "#f0f0f0",
      rule: "#cbcbcb",
      underline: "#d4d4d4",
      placeholder: "#848484",
      border: "#cbcbcb",
      borderHover: "#848484",
      button: "#3e67fa",
      buttonHover: "#4788ff",
      highlight: "#ffcf30",
    },
    dark: {
      _collapsed: true,
      strong: "#ffffff",
      body: "#ffffff",
      muted: "#ababab",
      link: "#5c9aff",
      code: "#ed5853",
      background: "#000000",
      surface: "#212121",
      rule: "#747474",
      underline: "#404040",
      placeholder: "#929292",
      border: "#747474",
      borderHover: "#929292",
      button: "#3e67fa",
      buttonHover: "#4788ff",
      highlight: "#ffcf30",
    },
    loadRefined: { type: "action", label: "Load refined prototype" },
    loadButterick: { type: "action", label: "Load Butterick rules" },
    loadMinimal: { type: "action", label: "Load Obsidian Minimal" },
    copyCss: { type: "action", label: "Copy CSS" },
    resetAll: { type: "action", label: "Reset to OK.css" },
  };

  // Refined direction: plain values that land on whole pixels.
  // Type (size / line): h1 30/36, h2 20/26, h3 16/20, body 16/26, small/code 14/24.
  // Spacing: 4 · 8 · 16 · 20 · 24 · 32 · 40 · 56px (matches the original prototype). OK.css colors with softer body text,
  // blue links always underlined (thin, thicker on hover), pretty/balanced wrapping.
  const REFINED = {
    type: {
      h1: 1.875, h2: 1.25, h3: 1, small: 0.875,
      lineHeight: 1.625, h1LineHeight: 1.2, h2LineHeight: 1.3, h3LineHeight: 1.25, smallLineHeight: 1.5, smallLinePx: 24,
      h1Tracking: -0.02, headingWeight: 600, strongWeight: 600, h6Style: "muted",
    },
    spacing: {
      measure: 65, paragraph: 24, beforeH2: 56, afterH2: 16, beforeH3: 32, afterH3: 8, titleToDate: 4, titleBlock: 24,
      listItems: 4, listIndent: 20, beforeHr: 40, afterHr: 24, quoteIndent: 16, quoteBar: 2,
    },
    links: { style: "accentUnderline", weight: 500, underlineOffset: 2, underlineThickness: 1, hoverThickness: 1.5 },
    prose: { textWrap: "pretty", markerColor: "muted", codePadding: "px" },
    // softer body text; fixes for WCAG AA: button hover darkens (white on #4788ff was 3.4:1),
    // input border #cbcbcb was 1.6:1 (needs 3:1), placeholder #848484 was 3.7:1 (needs 4.5:1)
    light: { body: "#202020", buttonHover: "#2c4ee0", border: "#949494", placeholder: "#767676" },
    // Dark mode gets its own values. Light neutrals come down
    // because light-on-black glows (irradiation); saturated colors keep OKLCH lightness and
    // hue but lose ~30% chroma (Helmholtz-Kohlrausch). Every pair meets WCAG AA.
    dark: {
      strong: "#f2f2f2", body: "#b8b8b8", muted: "#8c8c8c", placeholder: "#7a7a7a",
      link: "#719ce2", code: "#d56f67", border: "#636363", borderHover: "#868686",
      button: "#4667c9", buttonHover: "#4b6dcf", highlight: "#e5c569",
    },
  };
  // Practical Typography: 15–25px web text, 120–145% leading, 45–90 characters per line,
  // headings only slightly larger and bold, 50–100% of the text size between paragraphs,
  // 5–12% tracking on caps, smaller/tighter block quotes, subtle hollow bullets.
  const BUTTERICK = {
    type: { baseSize: 18, h1: 1.375, h2: 1.125, h3: 1, small: 0.875, lineHeight: 1.444, h1LineHeight: 1.2, h2LineHeight: 1.3, h3LineHeight: 1.333, smallLineHeight: 1.5, h1Tracking: 0, headingWeight: 600, strongWeight: 600 },
    spacing: { measure: 70, paragraph: 12, beforeH2: 32, afterH2: 8, beforeH3: 24, afterH3: 8, titleToDate: 8, titleBlock: 24, listItems: 4, beforeHr: 24, afterHr: 24 },
    prose: { capsTracking: 0.08, quoteSize: 0.9375, quoteLineHeight: 1.375, listMarker: "circle", markerColor: "muted" },
  };
  // Obsidian Minimal (kepano/obsidian-minimal): 40rem width, line-height 1.5, headings
  // 1.125/1.05/1em at 600/600/500, --p-spacing 1.75rem, --heading-spacing 2em, faint markers.
  const MINIMAL = {
    type: { baseSize: 16, h1: 1.125, h2: 1.0625, h3: 1, small: 0.875, lineHeight: 1.5, h1LineHeight: 1.333, h2LineHeight: 1.412, h3LineHeight: 1.5, smallLineHeight: 1.5, h1Tracking: 0, headingWeight: 600, strongWeight: 600 },
    spacing: { measure: 67, paragraph: 28, beforeH2: 32, afterH2: 8, beforeH3: 32, afterH3: 8, titleToDate: 8, titleBlock: 28, listItems: 2, beforeHr: 28, afterHr: 28 },
    prose: { markerColor: "muted" },
  };
  const mergeDeep = (a, b) => {
    const out = { ...a };
    for (const [k, v] of Object.entries(b)) out[k] = v && typeof v === "object" && !Array.isArray(v) ? mergeDeep(a[k] || {}, v) : v;
    return out;
  };

  const $ = (s) => document.querySelector(s);
  const frames = { before: $("#frame-before"), after: $("#frame-after") };
  let values = null;
  let rendered = { page: null };
  const baseCss = { before: "", after: "" };
  const beforeCss = { release: "", first: "" };

  /* ---------- CSS generated from the dials ---------- */

  // select dropdown arrow, filled with the muted (normal) or placeholder (disabled) color
  const arrow = (fill) =>
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='8' viewBox='0 0 12 8' width='24' fill='none'%3E%3Cpath d='M6 6h0l4-4h1s0 0 0 0v1-1L6 7s0 0 0 0L1 2h1l4 4z' fill='${fill.replace("#", "%23")}'/%3E%3C/svg%3E")`;

  function palette(c) {
    return `--ok-tc-0: ${c.strong}; --pg-body: ${c.body}; --ok-tc-1: ${c.muted}; --ok-tc-2: ${c.placeholder}; --ok-tc-accent: ${c.link}; --ok-tc-code: ${c.code}; --ok-bg-0: ${c.background}; --ok-bg-1: ${c.surface}; --pg-rule: ${c.rule}; --pg-underline: ${c.underline};
    --ok-b-0: 1px solid ${c.border}; --ok-b-1: 1px solid ${c.borderHover}; --ok-accent-0: ${c.button}; --ok-accent-1: ${c.buttonHover}; --ok-t-hl: ${c.highlight};
    --ok-down-0: ${arrow(c.muted)}; --ok-down-1: ${arrow(c.placeholder)};`;
  }

  const rem = (px) => `${px / 16}rem`;

  function proseCss(p) {
    let css = "";
    if (p.paragraphStyle === "indent") {
      // indents replace the space between paragraphs, never both; the first paragraph isn't indented
      css += `p:has(+ p) { margin-bottom: 0; }\np + p { text-indent: ${p.indent}em; }\n`;
    }
    if (p.capsTracking > 0) css += `h6, legend, thead tr, tfoot tr { letter-spacing: ${p.capsTracking}em; }\n`;
    if (p.textWrap === "pretty") css += `p, li, blockquote, figcaption { text-wrap: pretty; }\nh1, h2, h3, h4, h5, h6 { text-wrap: balance; }\n`;
    if (p.hyphenate) css += `p, li { hyphens: auto; }\nh1, h2, h3, h4, h5, h6 { hyphens: none; }\n`;
    if (p.quoteSize !== 1) css += `blockquote { font-size: ${p.quoteSize}em; }\nblockquote :is(p, li) { font-size: inherit; }\n`;
    if (p.quoteLineHeight > 0) css += `blockquote, blockquote p { line-height: ${p.quoteLineHeight}; }\n`;
    if (p.listMarker !== "disc") css += `ul { list-style-type: ${p.listMarker}; }\n`;
    if (p.markerColor === "muted") css += `li::marker { color: var(--ok-tc-1); }\n`;
    if (p.codePadding === "px") css += `code, samp, mark { padding: 0.125rem 0.25rem; }\npre code { padding: 0; }\n`;
    return css;
  }

  function tuningCss(v) {
    const t = v.type, l = v.links, s = v.spacing;
    let css = `:root {
  --ok-fs-0: ${t.h1}rem; --ok-fs-1: ${t.h2}rem; --ok-fs-2: ${t.h3}rem; --ok-fs-5: ${t.small}rem;
  --ok-lh-body: ${t.lineHeight};
  --ok-fw-2: ${t.strongWeight}; --ok-fw-3: ${t.headingWeight};
  --ok-s-4: ${rem(s.paragraph)};
  ${palette(v.light)}
}
@media (prefers-color-scheme: dark) {
  :root { ${palette(v.dark)} }
}
html { font-size: ${t.baseSize}px; font-family: ${FONTS[t.font]}; color: var(--pg-body); }
h1, h2, h3, h4, h5, h6, strong, b, dt { color: var(--ok-tc-0); }
body { max-width: ${s.measure}ch; }
h1 { line-height: ${t.h1LineHeight}; letter-spacing: ${t.h1Tracking}em; margin-bottom: ${rem(s.afterH2)}; }
h2 { line-height: ${t.h2LineHeight}; margin-top: ${rem(s.beforeH2)}; margin-bottom: ${rem(s.afterH2)}; }
h3, h4, h5, h6 { line-height: ${t.h3LineHeight}; margin-top: ${rem(s.beforeH3)}; margin-bottom: ${rem(s.afterH3)}; }
:is(h1, h2, h3, h4, h5, h6, hr) + * { margin-top: 0; }
header > h1:has(+ *) { margin-bottom: ${rem(s.titleToDate)}; }
header:has(> h1) { margin-bottom: ${rem(s.titleBlock)}; }
li, li p + p { margin-top: ${rem(s.listItems)}; }
hr { margin-top: ${rem(s.beforeHr)}; margin-bottom: ${rem(s.afterHr)}; border-bottom-color: var(--pg-rule); }
ul, ol { padding-left: ${rem(s.listIndent)}; }
blockquote { padding-left: ${rem(s.quoteIndent)}; }
blockquote::before { width: ${s.quoteBar}px; }
small, time, figcaption, footer, pre, code, samp, kbd { line-height: ${t.smallLinePx > 0 ? rem(t.smallLinePx) : t.smallLineHeight}; }
${t.h6Style === "muted" ? "h6 { text-transform: none; color: var(--ok-tc-1); }" : ""}
sub, sup { line-height: 0; }
${proseCss(v.prose)}
a, a:visited { font-weight: ${l.weight}; }
`;
    if (l.style === "accentUnderline") {
      css += `a, a:visited {
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-decoration-thickness: ${l.underlineThickness}px;
  text-underline-offset: ${l.underlineOffset}px;
  transition: text-decoration-thickness 120ms ease;
}
a:hover { text-decoration-thickness: ${l.hoverThickness}px; }
`;
    }
    if (l.style === "underline") {
      css += `a, a:visited {
  color: var(--ok-tc-0);
  text-decoration: underline;
  text-decoration-color: var(--pg-underline);
  text-decoration-thickness: ${l.underlineThickness}px;
  text-underline-offset: ${l.underlineOffset}px;
}
a:hover { text-decoration-color: currentColor; }
`;
    }
    return css;
  }

  function debugCss(v) {
    let css = "";
    if (v.debug.baselineGrid) {
      // one line per body line, measured from the top of the text column
      css += `body { background-image: repeating-linear-gradient(to bottom, rgb(255 45 111 / 0.35) 0 1px, transparent 1px calc(var(--ok-lh-body) * 1rem)); background-origin: content-box; background-clip: content-box; }\n`;
    }
    if (v.debug.outlineBoxes) {
      css += `body, body * { outline: 1px solid rgb(255 45 111 / 0.35); outline-offset: -1px; }\n`;
    }
    return css;
  }

  // Defaults for the style folders only, so a reset keeps view, page, theme and debug settings.
  function styleDefaults() {
    const pick = (cfg) => {
      const out = {};
      for (const [k, def] of Object.entries(cfg)) {
        if (k === "_collapsed") continue;
        if (Array.isArray(def)) out[k] = def[0];
        else if (def && typeof def === "object") out[k] = "default" in def ? def.default : pick(def);
        else out[k] = def;
      }
      return out;
    };
    const out = {};
    for (const k of ["type", "spacing", "prose", "links", "light", "dark"]) out[k] = pick(config[k]);
    return out;
  }

  function changedFromDefaults(v) {
    const out = [];
    const walk = (cfg, val, path) => {
      for (const [k, def] of Object.entries(cfg)) {
        if (k === "_collapsed" || (def && def.type === "action")) continue;
        const p = path ? `${path}.${k}` : k;
        const d = Array.isArray(def) ? def[0] : def && typeof def === "object" && "default" in def ? def.default : def;
        if (def && typeof def === "object" && !Array.isArray(def) && !("type" in def)) walk(def, val[k], p);
        else if (val[k] !== d) out.push(`${p}: ${d} → ${val[k]}`);
      }
    };
    for (const k of ["type", "spacing", "prose", "links", "light", "dark"]) walk(config[k], v[k], k);
    return out;
  }

  /* ---------- theme ---------- */

  // Force light or dark by rewriting color-scheme media queries, so the toggle
  // works regardless of the OS setting or browser emulation.
  function themed(css) {
    if (values.theme === "system") return css;
    const dark = values.theme === "dark";
    return css
      .replace(/@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)/g, dark ? "@media all" : "@media not all")
      .replace(/@media\s*\(\s*prefers-color-scheme\s*:\s*light\s*\)/g, dark ? "@media not all" : "@media all")
      + `\n:root { color-scheme: ${values.theme}; }`;
  }

  const fetchText = (u) => fetch(u, { cache: "no-store" }).then((r) => r.text());
  const loadCss = (list) => Promise.all(list.map(fetchText)).then((t) => t.join("\n"));

  /* ---------- frames ---------- */

  const pageCache = new Map();
  async function pageHtml(page) {
    if (!pageCache.has(page)) pageCache.set(page, fetch(PAGES[page], { cache: "no-store" }).then((r) => r.text()));
    return pageCache.get(page);
  }

  async function render(side) {
    const frame = frames[side];
    const html = await pageHtml(values.page);
    const base = PAGES[values.page].replace(/[^/]*$/, "");
    let doc = html.replace(/<link[^>]*href="[^"]*ok(\.min)?\.css"[^>]*>/g, "");
    doc = doc.replace(/<head>/i, `<head><base href="${base}" />`);
    doc = doc.replace(/<\/head>/i, `<style id="pg-base"></style><style id="pg-tuning"></style><style id="pg-debug"></style></head>`);

    const doc0 = frame.contentDocument;
    const ratio = doc0 && doc0.scrollingElement ? scrollRatio(doc0) : 0;
    await new Promise((resolve) => {
      frame.onload = resolve;
      frame.srcdoc = doc;
    });
    frame.contentWindow.addEventListener("scroll", () => onFrameScroll(side), { passive: true });
    // srcdoc pages resolve "#" links against about:srcdoc; keep in-page anchors from navigating away
    frame.contentDocument.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute("href").slice(1);
      if (id) frame.contentDocument.getElementById(id)?.scrollIntoView();
    });
    applyStyles(side);
    await frame.contentDocument.fonts?.ready;
    setScrollRatio(frame.contentDocument, ratio);
    showCpl();
  }

  // Average characters per full line across body paragraphs (Butterick: aim for 45–90).
  function charsPerLine(side) {
    const d = frames[side].contentDocument;
    if (!d || !d.body) return null;
    let chars = 0, lines = 0;
    for (const p of d.querySelectorAll("main p, article p, body > p")) {
      const lh = parseFloat(getComputedStyle(p).lineHeight);
      const n = Math.round(p.getBoundingClientRect().height / lh);
      if (!lh || n < 2) continue;
      chars += p.textContent.replace(/\s+/g, " ").trim().length;
      lines += n - 0.5; // the last line is on average half full
    }
    return lines ? Math.round(chars / lines) : null;
  }
  function showCpl() {
    for (const side of ["before", "after"]) {
      const n = charsPerLine(side);
      const el = document.getElementById(`cpl-${side}`);
      if (el) el.textContent = n ? `· ${n} chars/line${n < 45 || n > 90 ? " ⚠" : ""}` : "";
    }
  }

  function applyStyles(side) {
    const d = frames[side].contentDocument;
    if (!d || !d.getElementById("pg-tuning")) return;
    d.getElementById("pg-base").textContent = themed(baseCss[side]);
    d.getElementById("pg-tuning").textContent = side === "after" && values.applyDials ? themed(tuningCss(values)) : "";
    d.getElementById("pg-debug").textContent = debugCss(values);
    requestAnimationFrame(showCpl);
  }

  function layoutFrames() {
    for (const f of Object.values(frames)) {
      const pane = f.parentElement;
      const pw = pane.clientWidth, ph = pane.clientHeight;
      const w = values.width === "fill" ? pw : Number(values.width);
      const scale = Math.min(1, pw / w);
      f.style.width = `${w}px`;
      f.style.height = `${ph / scale}px`;
      f.style.transform = `translateX(-50%) scale(${scale})`;
    }
  }

  /* ---------- scroll sync and wipe ---------- */

  let syncing = false;
  const scrollRatio = (d) => {
    const s = d.scrollingElement;
    const max = s.scrollHeight - s.clientHeight;
    return max > 0 ? s.scrollTop / max : 0;
  };
  const setScrollRatio = (d, r) => {
    const s = d.scrollingElement;
    s.style.scrollBehavior = "auto";
    s.scrollTop = r * (s.scrollHeight - s.clientHeight);
  };
  function onFrameScroll(side) {
    if (!values.syncScroll || syncing) return;
    const other = side === "before" ? "after" : "before";
    const from = frames[side].contentDocument, to = frames[other].contentDocument;
    if (!from || !to || !to.scrollingElement) return;
    syncing = true;
    setScrollRatio(to, scrollRatio(from));
    requestAnimationFrame(() => (syncing = false));
  }

  const handle = $("#wipe-handle");
  handle.addEventListener("pointerdown", (e) => {
    handle.setPointerCapture(e.pointerId);
    document.body.classList.add("dragging");
  });
  handle.addEventListener("pointermove", (e) => {
    if (!handle.hasPointerCapture(e.pointerId)) return;
    const r = $("#panes").getBoundingClientRect();
    const pct = Math.round(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
    kit.setValue("debug.wipePosition", pct);
  });
  handle.addEventListener("pointerup", () => document.body.classList.remove("dragging"));

  /* ---------- live reload of src/ ---------- */

  async function pollSrc() {
    try {
      const css = await loadCss(AFTER_CSS);
      if (css !== baseCss.after) {
        baseCss.after = css;
        applyStyles("after");
        $("#after-note").textContent = `updated ${new Date().toLocaleTimeString()}`;
      }
    } catch {}
    setTimeout(pollSrc, 1000);
  }

  /* ---------- wiring ---------- */

  async function update(v) {
    const comparisonChanged = !values || values.compareWith !== v.compareWith;
    values = v;
    if (comparisonChanged) {
      baseCss.before = v.compareWith === "first" && beforeCss.first ? beforeCss.first : beforeCss.release;
      $("#before-ref").textContent = v.compareWith === "first" && beforeCss.first ? "first style" : releaseRef;
    }
    document.body.dataset.view = v.view;
    $("#panes").style.setProperty("--wipe", `${v.debug.wipePosition}%`);
    layoutFrames();
    if (rendered.page !== v.page) {
      rendered.page = v.page;
      await Promise.all([render("before"), render("after")]);
    } else {
      applyStyles("before");
      applyStyles("after");
    }
    showCpl();
  }

  async function copyCss() {
    const changes = changedFromDefaults(values);
    const header = `/* OK.css playground tuning. Changed from defaults:\n${changes.map((c) => ` *   ${c}`).join("\n") || " *   (nothing)"}\n */\n`;
    const css = header + tuningCss(values);
    try {
      await navigator.clipboard.writeText(css);
      $("#after-note").textContent = `copied CSS (${changes.length} changes)`;
    } catch {
      console.log(css);
      $("#after-note").textContent = "clipboard blocked; CSS logged to console";
    }
  }

  createDialRoot({ mode: "inline", target: $("#dials"), theme: "system" });
  const kit = createDialKit("OK.css", config, {
    id: "okcss-playground",
    persist: true,
    onAction: (action) => {
      if (action === "loadRefined") kit.setValues(mergeDeep(styleDefaults(), REFINED));
      if (action === "loadButterick") kit.setValues(mergeDeep(mergeDeep(styleDefaults(), REFINED), BUTTERICK));
      if (action === "loadMinimal") kit.setValues(mergeDeep(mergeDeep(styleDefaults(), REFINED), MINIMAL));
      if (action === "copyCss") copyCss();
      if (action === "resetAll") kit.setValues(styleDefaults());
    },
  });

  let releaseRef = "release";
  fetch("/playground/baseline/REF", { cache: "no-store" })
    .then((r) => (r.ok ? r.text() : "release"))
    .then((ref) => {
      releaseRef = ref.trim();
      if (!values || values.compareWith !== "first") $("#before-ref").textContent = releaseRef;
    });
  window.addEventListener("resize", () => { if (values) { layoutFrames(); showCpl(); } });
  const firstStyle = fetch(FIRST_STYLE_CSS, { cache: "no-store" }).then((r) => (r.ok ? r.text() : ""));
  Promise.all([loadCss(BEFORE_CSS), loadCss(AFTER_CSS), firstStyle]).then(([before, after, first]) => {
    beforeCss.release = before;
    beforeCss.first = first ? `${before}\n${first}` : "";
    baseCss.before = before;
    baseCss.after = after;
    kit.subscribe(update);
    setTimeout(pollSrc, 1000);
  });
  window.playground = { kit, tuningCss: () => tuningCss(values), frames };
})();
