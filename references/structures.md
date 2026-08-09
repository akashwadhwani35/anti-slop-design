# The section-form palette

The core insight, stated best by [Hallmark](https://github.com/nutlope/hallmark): **"Structural sameness is the AI fingerprint, not visual sameness."** Most generated pages are visually distinct but structurally identical. Two pages should never share the same structural fingerprint, and within one page, adjacent sections should never share a form.

This file is the editorial version of that idea: a palette of section forms for data stories, essays, and longform, so "vary the sections" is a menu rather than a vibe.

## The rule

- **Within a page:** no two adjacent sections use the same form, and no form appears more than twice (card grids: once, see tells.md C2).
- **Across pages:** your new page must not share its fingerprint (hero form + dominant body form + divider language) with the last page you shipped. Colour swaps don't count as variety.
- **Choose the form from the content**, not the other way around. A ranking wants a table or bar chart; a single testimony wants a quote form; a place wants full-bleed photography; a process wants a timeline. If you catch yourself pouring unlike content into one repeated card recipe, that's the tell forming.

## Section forms

**Narrative:**
- **Single measured column.** 45–75ch, the reading default. Most of an essay should be this; the other forms punctuate it.
- **Scrolly step.** Sticky graphic, stepping text. One per page; reserve it for the reveal the piece exists for, not decoration.
- **Inline chart.** The chart interrupts the column at content width, annotated directly on the marks, the insight in the annotation rather than the headline above it.
- **Full-bleed break.** One image or chart at viewport width as a chapter turn. The scale change is the divider.

**Evidence:**
- **Plain table.** Underused and immune to slop-reading. Tabular numerals, hairline rules, no zebra striping. A table says "here is the data" with no chrome to distrust.
- **The one-number sentence.** Replaces the stat block. One number inside a sentence with judgment in it.
- **Raw artifact.** The primary source itself: the scanned document, the actual screenshot, the audio player, the quote at length. Artifacts carry authority no layout can fake.
- **Timeline.** For genuinely sequential material only; dates as data, not "01/02/03" chrome.

**Voice:**
- **Pull quote, outdented or oversized.** Never the colored-left-border callout (tells.md B7). The quote earns emphasis through scale or position.
- **Marginalia / sidenote.** Tufte-style notes in the outer margin. Reads scholarly because it is; generators never produce it.
- **Letter / direct address.** Body text that speaks as the author, signed. Pairs with the byline.

**Structure chrome:**
- **Heading placement:** pick one language per page: hanging in negative space, inline emerging from the flow, bottom-anchored, or overlapping an image. Never the eyebrow stack (A1), never "01." beside the heading (C7).
- **Divider language:** pick one: hairline rule, negative space alone, or a background shift at the section edge. Not all three, not per-section variety for its own sake.
- **The asymmetry decision:** at least one section breaks the page's own grid: an outdent, a 60/40 split, an element bleeding off-edge. One is a decision; everywhere is noise.

## The fingerprint stamp

Borrowing Hallmark's log discipline: stamp the page so your next build can check it.

```css
/* anti-slop-design · forms: column + scrolly + table + full-bleed · headings: hanging · divider: space */
```

Before building the next page, read the last stamp and change the fingerprint.
