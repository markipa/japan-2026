/**
 * Wraps the artifact-format source (body-only, no <head>) into a complete
 * standalone HTML document for GitHub Pages.
 *
 *   node build.js   ->   japan-10-day.html  +  index.html
 *
 * Keeping one source file means the claude.ai artifact and the published site
 * never drift apart. Edit japan-10-day.html, re-run this, commit both.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'japan-10-day.html');
const OUT = path.join(__dirname, 'index.html');

const src = fs.readFileSync(SRC, 'utf8');

// The source opens with <title>…</title>; that belongs in <head>, not <body>.
const titleMatch = src.match(/^\s*<title>([\s\S]*?)<\/title>/);
const title = titleMatch ? titleMatch[1].trim() : 'Japan — 10 Day Itinerary';
const body = titleMatch ? src.slice(titleMatch[0].length) : src;

const DESCRIPTION =
  'An illustrated ten-day Osaka and Tokyo itinerary for two adults and an infant, ' +
  'costed in yen across three budget tiers.';

const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${DESCRIPTION}">

<!-- Unlisted by design: reachable by link, not through search. -->
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="googlebot" content="noindex, nofollow">

<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#F3F4F0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E1220" media="(prefers-color-scheme: dark)">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='14' font-size='14'>🗼</text></svg>">
<style>
  /* Reset the artifact host normally supplies. */
  *,*::before,*::after{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%}
  body{margin:0}
  img,svg{max-width:100%}

  /* Theme switch — the artifact host provides one; standalone needs its own. */
  #themeToggle{position:fixed;right:14px;bottom:14px;z-index:80;
    width:42px;height:42px;border-radius:50%;cursor:pointer;
    border:1px solid var(--line);background:var(--surface);color:var(--tx-2);
    font-family:var(--f-data);font-size:15px;line-height:1;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 10px rgba(0,0,0,.16)}
  #themeToggle:hover{color:var(--tx);border-color:var(--accent-ink)}
  #themeToggle:focus-visible{outline:2px solid var(--accent-ink);outline-offset:2px}
  @media print{#themeToggle{display:none}}
</style>
</head>
<body>
${body.trim()}

<button id="themeToggle" type="button" aria-label="Switch between light and dark theme">◐</button>
<script>
(function(){
  var root = document.documentElement, btn = document.getElementById('themeToggle');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) root.setAttribute('data-theme', saved);
  btn.addEventListener('click', function(){
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, doc);
console.log('built index.html  (' + doc.length.toLocaleString() + ' bytes)  title: ' + title);
