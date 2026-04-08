# Brand Context — [Brand Name]

This folder is the single source of truth for [Brand Name]'s brand identity and buyer strategy. Claude reads from here automatically.

---

## Structure

```
brand-context/
  identity/     — Visual identity: design tokens, guidelines, voice, assets, brand book
  strategy/     — Buyer research: positioning, ICP, belief stack, proof, content, SEO
```

## What to Load

| Task | Load |
|---|---|
| Design / UI work | `identity/design-system.json` + `identity/guidelines.md` |
| Writing copy | `identity/voice.md` + `strategy/icp.md` + `strategy/positioning.md` |
| Building website | All of `identity/` |
| Ads / campaigns | `identity/voice.md` + `strategy/` (all) |
| Strategy / positioning | `strategy/` (all) + `identity/voice.md` |
| SEO / content | `strategy/keyword-clusters.md` + `strategy/content-hooks.md` + `identity/voice.md` |

## Identity Files

| File | What it contains |
|---|---|
| `identity/design-system.json` | Machine-readable tokens: colors, fonts, spacing, components |
| `identity/guidelines.md` | Logo rules, photography style, animation, do/don't |
| `identity/voice.md` | Tone, writing style, words used/avoided, examples |
| `identity/assets.md` | Index of all brand assets with paths |
| `identity/brand-book.html` | Visual brand guide (open in browser) |

## Strategy Files

| File | What it contains |
|---|---|
| `strategy/positioning.md` | One-liner, offers, differentiators, competitive landscape |
| `strategy/icp.md` | Buyer profile, JTBD, language bank, archetypes |
| `strategy/belief-stack.md` | SWT 4 belief layers, decision triggers |
| `strategy/proof.md` | Case studies, testimonials, proof by stage |
| `strategy/content-hooks.md` | Content hooks and angles by belief stage |
| `strategy/keyword-clusters.md` | SEO keyword groups mapped to belief stages |

## Asset Folders

| Folder | What goes in it |
|---|---|
| `identity/assets/logos/` | All logo variations (icon, wordmark, stacked, favicon) |
| `identity/assets/fonts/` | Self-hosted brand fonts (if not using Google Fonts) |
| `identity/assets/images/` | Brand photography, product images, hero shots |
| `identity/assets/brand-kit/` | Full brand kit exports (Figma, PDFs) |

## Visual Reference

Open `identity/brand-book.html` in a browser for the full visual brand guide.

## Setup

1. Run `/brand-setup` — populates `identity/` with design tokens, voice, and generates the brand book
2. Run `/brand-research` — populates `strategy/` with buyer investigation and content planning
