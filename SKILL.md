---
name: anti-slop-design
description: Remove the visual and structural patterns that mark editorial, data-viz, and content pages as AI-generated. Covers data stories, essays, scrollytelling, portfolios, newsletters, and longform pages, where the tells are structural (stat blocks, repeated card grids, curator naming, uniform scroll reveals) rather than the SaaS-landing-page tells other skills cover. Use BEFORE building any content-driven page and again as a pre-ship audit. Triggers on "this looks AI", "make it look less generated", "design review", "audit this page", "is this ready to ship", or any request to build an editorial or data-driven page.
---

# anti-slop-design

An anti-AI-slop skill for pages where the content is the product: data stories, visual essays, scrollytelling, portfolios, newsletters, longform.

**Why this lane needs its own skill.** The existing anti-slop skills (Hallmark, kill-ai-slop, Anthropic's frontend-design) target SaaS landing pages and app UI. Editorial pages fail differently. In 2026 a real, factually-researched data piece was posted to a large subreddit and brigaded as "AI slop" before anyone engaged with the data; the top comments named the *aesthetic*, not the content. The postmortem found the page had already avoided every surface tell (no Inter, no purple gradient, no stock photos). What got it identified was **structure**: four uniform card grids in eight sections, three-stat blocks, "The X Museum" curator naming, and a fade-in on every section. Trained-eye critics flag structure even when the surface is clean. This skill exists to catch that layer.

The root cause, on every layer: language models emit the statistical median of their training data, so a generated page is a stack of most-probable choices. The antidote is never "more polish." It is replacing median choices with specific, committed ones. Slop is average taste; the fix is visible decisions.

## Modes

**Build mode** (you are about to write a page): read `references/tells.md`, `references/structures.md`, and `references/craft.md` first, then design. Choose each section's form from the content using the section-form palette; the page must not share its structural fingerprint with the previous page (structures.md). Apply the legibility floors below as hard constraints. Before emitting, run the pre-emit self-critique, then the pre-ship audit.

### Pre-emit self-critique (build mode)

Adapted from Hallmark's discipline. Before handing back any page, score the planned output 1–5 on five axes. **Any axis below 3 forces a revision pass before the audit.** Two passes is normal; needing a third means the concept is wrong, not the styling, so go back to the reskin test rather than iterating the surface.

| Axis | What you're scoring |
| --- | --- |
| **Concept** | Is the page built from a primitive native to the subject, or is it chrome? (The reskin test, craft.md) |
| **Structure** | Do section forms vary with their content? Would the fingerprint survive the "same as my last page?" check? |
| **Honesty** | Every number real and sourced, axes honest, nothing invented, nothing over-claimed? |
| **Specificity** | Does copy carry dates, names, and checkable numbers, or vibes? |
| **Legibility** | Do the floors below all pass, measured? |

Stamp the scores and the structural fingerprint in a comment at the top of the file so the next build can diff against it:
`/* anti-slop-design · C4 S5 H5 Sp4 L5 · forms: column+scrolly+table · headings: hanging */`

**Audit mode** (a page exists): follow the workflow below. Never mass-edit before the user has seen the findings.

### Audit workflow

1. **Scan.** Run the bundled scanner for the grep-detectable tells:
   ```
   node scripts/scan.mjs <path>              # human-readable
   node scripts/scan.mjs <path> --json       # machine-readable
   node scripts/scan.mjs <path> --only=A1,C2 --skip=E5 --exclude=legacy
   ```
   It is dependency-free, read-only, and prints grouped `file:line` hits with per-rule false-positive notes. Treat output as a map, not a verdict. Hits the user confirms as intentional get pinned in source with `antislop-ignore`, `antislop-ignore-next-line A2`, or `antislop-ignore-file` comments; prefer the id-scoped form so new tells still surface.
2. **Look at the rendered page.** Half the tells (uniform rhythm, stat blocks, card-grid repetition, motion) are only visible in a browser. Screenshot or open it; judge structure against `references/tells.md` sections C and D.
3. **Triage.** For every hit decide slop vs. intentional. A serif italic, a gradient, or a mono label can be a defended choice; flag only defaults. Respect authorship: when unsure, ask, don't strip.
4. **Report.** Grouped summary: tell, confirmed `file:line` hits, one line on why it reads generated, proposed fix. Then ask which groups to apply.
5. **Fix.** Minimal change that removes the tell and preserves intent. Use the before→after patterns in `references/fixes.md`. Tokens first (fonts, colors, radius; many hits vanish at once), then components, then call sites, then copy. When a repeated card grid falls, replace it with a form matched to its content from `references/structures.md`, don't restyle the grid. Re-run the scanner; look at the page again. A passing scan is not the same as a better page.

## Legibility floors (hard constraints, both modes)

These are not style opinions. A page that fails them is broken regardless of aesthetics.

- **Measure:** 45–75 characters per line for body text; ~66 is the classical ideal (Bringhurst, *The Elements of Typographic Style*). 40–50 for multi-column.
- **No all-caps running text or display headlines.** Continuous all-caps is read about 12% slower than mixed case over sustained reading (Tinker, *Legibility of Print*, 1963). Sentence-case the big type; caps only for labels of a word or two.
- **Contrast:** WCAG 2.2 AA minimum, 4.5:1 for body text, 3:1 for large text, including text over images and gradients. Gray-on-colored-background is the most common generated failure.
- **Size:** functional text (links, labels, table cells, captions) never below 12px; body never below 16px.
- **Body text is left-aligned** with line-height around 1.5. Centered paragraphs are for invitations.
- Tight negative tracking scales *down* as type gets huge, not up. Over-tight display type is unreadable and reads generated.

## The tell catalog (summary)

Full catalog with why, fix, and detection pattern per tell: `references/tells.md`. The layers:

- **A. Typography:** eyebrows/kickers above headlines (any case, any font); letterspaced-uppercase mono labels; all-caps display; italic-serif hero; the lone italic accent word; Inter-everywhere or font soup; flat size hierarchy (steps under 1.25×); gradient text; heading-wrap gimmicks; non-tabular numerals in data; blanket tracking and justification.
- **B. Color and surface:** purple/indigo-to-violet gradients; the cream + grain + italic-serif "AI editorial" stack; neon-glow-on-dark; six meaningless category colors; decorative glassmorphism; hairline border plus wide diffuse shadow; colored left-border callouts; over-rounding and uniform radius; gray body text; dark-only mode and pure-black grounds.
- **C. Structure (the editorial layer, weight these highest):** three-stat blocks; more than one card grid per page; icon-tile-above-heading feature cards; centered-everything with the hero → cards → CTA rhythm; cards nested in cards; uniform spacing with no visible decision; "01 / 02 / 03" section markers; invented metrics.
- **D. Motion:** uniform fade-in-up on every section; scroll hijacking; hover scale/glow on everything; stock easing everywhere; `transition: all`; motion without a reduced-motion fallback; decorative motion that communicates no state.
- **E. Imagery and naming:** emoji as icons; plastic AI illustration; amateur hand-drawn SVG scenes; "The X Museum / Atlas / Vault" curator naming; vague headlines; em dashes and "not just X, it's Y" voice tics in page copy.

## Craft signals (what to add)

Full detail and the case study: `references/craft.md`. The floor is **three visible deliberate choices** per page; below that, pages read generated even with zero tells present.

1. A byline and a date. Anonymous pages read generated; owned pages read authored.
2. A visible changelog or errata line crediting whoever flagged each fix.
3. A raw-data link when the page shows data.
4. **The reskin test:** if the page could serve any other client by swapping the headline and accent, it has no concept. Build from a primitive native to the subject (a running app's polyline, a street dataset's panoramas), not a premium shell around it.
5. One committed accent, one real asymmetry, a two-font pairing with tension, an authored ease.

## Pre-ship audit

Run against the rendered page:

1. `node scripts/scan.mjs <path>` returns nothing you can't defend.
2. Zero eyebrows/kickers above headlines, any case.
3. At most one card grid; zero stat-blocks; zero icon-tile feature cards.
4. Squint test: at least one asymmetric, non-uniform decision is visible.
5. Palette clear of the banned combos; every color on a chart encodes something.
6. Nothing animates that communicates nothing.
7. Copy clear of em dashes, vague headlines, curator naming, invented numbers.
8. Legibility floors all pass, measured, not eyeballed.
9. The reskin test passes and three deliberate choices are nameable.
10. Final gut check: *"Would a model asked for 'a premium page about X' have produced this layout by default?"* If yes, not done.
