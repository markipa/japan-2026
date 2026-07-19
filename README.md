# Japan 2026 — ten-day itinerary

A single-page, self-contained trip planner for **Tokyo and Osaka**: five nights in Tokyo, one
bullet train, four nights working out of Osaka with Kyoto and Nara in reach.

Built for two adults travelling with an infant, costed in yen across three budget tiers, and
dated to the late-autumn colour window.

## What's in it

- **Ten day-by-day cards**, colour-coded by the rail line that gets you there — Tokyo Metro,
  Toei, JR and Osaka Metro official line colours
- **Every stop costed** for two adults, with a note wherever the baby goes free
- **A drawn illustration per day** — ten hand-authored SVGs, no photographs, no external assets
- **Two map views** — a diagram drawn from real coordinates that works offline, and a real
  OpenStreetMap layer with every stop clickable
- **37 restaurants** across both cities with price bands, and a note on which ones take a pram
- **Hotels in three tiers**, priced for a room of three (Japanese hotels enforce occupancy)
- **A live budget** that recalculates when you switch tier
- **Month-by-month climate**, with the travel window called out
- **Infant logistics** — station lifts, nursing rooms, the car-seat exemption for taxis

## Files

| File | Purpose |
| --- | --- |
| `japan-10-day.html` | **Source of truth.** Body-only fragment (no `<head>`), the format the claude.ai artifact host expects. |
| `build.js` | Wraps the source into a complete HTML document. |
| `index.html` | Generated. What GitHub Pages serves. Do not edit by hand. |
| `robots.txt` | Keeps the page out of search results. |

## Building

```bash
node build.js
```

Edit `japan-10-day.html`, re-run the build, commit both. Keeping one source file means the
artifact and the published site can't drift apart.

No build toolchain and no package manager — the page is one file with inline CSS, inline
JavaScript and inline SVG. Open `index.html` in a browser and everything works offline.

The one exception is the **Real map** toggle, which lazily fetches Leaflet from a CDN and tiles
from OpenStreetMap. It is progressive enhancement: nothing loads until you click it, subresource
integrity hashes are pinned so a substituted script cannot execute, and if the request is blocked
— as it is wherever the page is embedded under a strict content security policy — the toggle
falls back to the drawn diagram and says so. The rest of the page never touches the network.

## A note on visibility

This repository is public because GitHub Pages requires it on a free plan, but the page is
served with `noindex` and a disallow-all `robots.txt`. It is reachable by link and should not
appear in search results.

## Accuracy

Prices are planning estimates in yen based on published 2025 rates, and will drift. Child pricing
thresholds vary by venue — most sights here are free under 6, Osaka Castle under 15, teamLab
under 3. Verify opening hours on each venue's own site before building a day around it.
