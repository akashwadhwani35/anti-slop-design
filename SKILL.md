---
name: anti-slop-design
description: Audit and fix the visual patterns that mark a web page, landing page, dashboard, or data-viz piece as AI-generated. Use BEFORE writing any UI code and again before shipping. Triggers on "make this look less AI", "this looks generic", "design review", "does this look templated", or any request to build a public-facing page.
---

# Anti-slop design

LLMs output the statistical median of the design they trained on. The result is a recognizable house style, and readers have learned to spot it. On social platforms the aesthetic now triggers hostility before anyone reads the content: real pages have been brigaded as "AI slop" over their look alone, while the underlying work was sound.

The fix is never "add more polish." Slop is average taste. The antidote, everywhere, is to replace the median choice with a specific, committed, slightly uncomfortable one.

This skill is two lists: the tells to remove, and the craft signals to add. Run both.

## Part 1: The tells

### Typography

**No eyebrows, no kickers.** The small label above a headline ("BEFORE WE START", "01 · PARAMETERS", "STEP BACK") is the single most reliable AI tell. Every generated page reaches for the eyebrow → headline → subhead stack. Lowercase eyebrows count too. A section headline stands alone.

If the eyebrow carried a real concept label ("Methodology", "Parameters"), promote it to be the headline itself, as the primary display element. Do not dissolve it into a sentence.

**No mono caps.** Never combine `text-transform: uppercase` with wide `letter-spacing` on a monospace font. This is the #1 "looks generated" signal in labels, kickers, and section markers. Monospace is allowed only as a quiet lowercase voice for pure data: coordinates, timestamps, axis labels, HUD numbers. The moment words form a sentence, they get the body face.

Sweep before shipping: `grep -n "uppercase\|letter-spacing" file.html` should return nothing meaningful.

**No all-caps display type.** Uppercase kills word shapes; readers recognize words by their outline, and caps flatten every outline into a rectangle. Sentence-case the big type. If you must use caps, reserve them for short labels of one or two words.

**No default-font-used-the-default-way.** Inter, Geist, Space Grotesk, or an italic-serif hero (Fraunces, Instrument Serif) deployed exactly as every template deploys them. The problem is not the font; it is the font doing the obvious job. Pick a display face with actual personality and pair it with a neutral text face. Two fonts, used with tension. Not four fonts mixed evenly (font soup is its own tell).

**Hierarchy by weight and color, not size inflation.** Generated pages either keep every size within a timid 1.25 ratio (no hierarchy) or crank tracking negative on huge type until it's unreadable. Big size jumps between levels, modest tracking, and weight/color doing the secondary work.

### Legibility floors (non-negotiable)

- 45–75 characters per line for body text.
- Body text never below ~16px; secondary text never below ~13px, and never in low-contrast gray.
- Meet WCAG AA contrast on every text element, including text over images and gradients.
- Line-height ~1.5 for body, tighter for display.
- Left-align body text. Centered paragraphs are for wedding invitations.

A page that fails these is broken regardless of how it scores on everything else.

### Color

**The banned combos.** Purple-to-blue or indigo-to-violet gradients. Gradient text on headlines or big numbers. Cyan-on-dark neon glow cards. And the "premium editorial" version: cream/warm-paper background + italic serif + grain overlay, which became the AI data-viz default and now reads as generated on sight.

**One committed accent.** One electric accent color used bravely against a restrained base beats six tasteful category chips. Flat fills, not gradients. If a color appears in a chart, it must mean something.

### Layout and structure

These are the hard ones. Pages that dodge every visual tell still get identified by structure.

**No three-stat blocks.** Three big rounded numbers in three equal cards ("242 catalogued / 170+ pieces / 2035 deadline") is the universal AI feature-card template. Replace with one inline sentence holding one number: "242 stations catalogued, half with audio, most going quiet by 2035."

**At most one card grid per page.** Repeated uniform card grids are a template fingerprint. Vary the section formats: timeline, full-bleed image, pull quote, plain table, single column with wide margins.

**No uniform everything.** Uniform border-radius on every element, identical padding rhythm on every section, everything centered, cards nested inside cards. Even spacing everywhere is itself a tell; it reads as generated because no human decision is visible. Vary intentionally: outdent a pull quote, let one section bleed off the edge, use a 60/40 split, alternate light and dark full-bleed sections as structure.

**More whitespace than feels natural.** Then a little more. Cramped uniform padding is the template default; generous asymmetric space is a decision.

### Motion

**Kill the decorative scroll-reveal.** A uniform fade-in-up on every section from one IntersectionObserver is a tell, not a delight. Reserve motion for state changes: loading, playing, selected, error. If an element animates in and the animation communicates nothing, delete it.

**Never hijack scroll.** Native scroll only. Scroll-driven animation is fine (scrub a timeline from scroll position); replacing the scroll mechanic is not.

**No stock easing everywhere.** Default ease-in-out on everything is the motion equivalent of Inter. If you animate, author the ease and stagger deliberately, and keep hover effects off elements that don't need them (scale(1.05) on every card is a tell).

### Imagery and naming

- No emoji as icons. No stock "diverse team at laptops." No plastic AI illustration. Use real assets: archival images, Wikimedia Commons, your own photos, or nothing.
- No curator branding. "The X Museum", "The X Atlas", "The X Vault" is stock AI naming. Name the thing what it is: "Tokyo train melodies, 2026" beats "The Bells of Tokyo: A Listening Museum."
- No vague headlines ("Build the future"). Specificity with a real date and a real name is one of the strongest human signals available.
- No em dashes in interface copy or headlines. They read as a generated-text tic. Use a period, colon, or comma.

## Part 2: Craft signals to add

Each costs minutes and reads as a human decision:

1. **A byline and a date.** "By [name] · [site] · [date]". Anonymous pages read generated; owned pages read authored.
2. **A visible changelog or errata line.** Small note listing recent fixes, crediting whoever flagged them. Reframes the page from "AI exhibit" to "working document."
3. **A raw data link.** If the page shows data, link the CSV. Real practitioners show their work.
4. **One native visual concept.** Ask: what is this subject's own primitive? (For a running app it's the activity polyline; for street data it's the panorama.) Build the page from a primitive native to the subject, not a premium shell wrapped around it. The test: if the page could be reskinned for any client by swapping the headline and accent color, it has no concept.
5. **At least three deliberate non-default choices.** A committed accent, a real asymmetry, a two-font tension, an authored ease. Three visible decisions is roughly the floor at which a page stops reading as generated.

## Part 3: Pre-ship audit

Run this against the actual rendered page, not the code:

1. Grep for `uppercase` and `letter-spacing`. Anything on a label or heading fails.
2. Count eyebrows/kickers above headlines. Must be zero, any case.
3. Count card grids. More than one fails.
4. Count stat-blocks (2–4 equal cards with big numbers). Must be zero.
5. Squint test: is spacing/radius uniform everywhere? If no asymmetric decision is visible, add one.
6. Check the palette against the banned combos (purple gradient, gradient text, neon-on-dark, cream + italic serif + grain).
7. Disable JavaScript. Does anything animate that communicated nothing? Delete it.
8. Read every line of copy for em dashes, vague headlines, and curator naming.
9. Verify legibility floors: measure, contrast, minimum sizes, line-height.
10. The final gut check: **"Would a language model asked to 'make a premium site for X' have produced this layout by default?"** If yes, you are not done. Find the three deliberate choices.

## Sources

The tell lists here are corroborated by independent catalogs of AI-generated design patterns:

- [Slop — impeccable.style](https://impeccable.style/slop/) (the canonical catalog, 37 patterns)
- [AI Slop Web Design: Complete Guide — 925studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [Why Do Most AI-Generated Websites Look the Same? — Shuffle](https://shuffle.dev/blog/2026/01/why-do-most-ai-generated-websites-look-the-same/)
- [I Analyzed 100 Vibe-Coded Websites — DEV Community](https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275)

Plus field experience: a real data-viz page brigaded on Reddit as "AI slop" was audited pattern by pattern; the structural tells (stat blocks, repeated card grids, curator naming) turned out to matter more than the visual ones, because trained-eye critics flag structure even when the surface looks clean.
