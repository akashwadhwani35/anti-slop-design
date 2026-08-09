# The tell catalog

Every tell lists: what it is, why it reads generated, the fix, and how to detect it. Detection marked `scan` is covered by `scripts/scan.mjs`; `eye` means it needs the rendered page.

Sources are cited inline. The recurring ones: [impeccable.style/slop](https://impeccable.style/slop/) (the canonical detector catalog), [925studios' AI slop guide](https://www.925studios.co/blog/ai-slop-web-design-guide), [kill-ai-slop's 35-tell taxonomy](https://github.com/yetone/kill-ai-slop), [unslop-ui-skill's master catalog](https://github.com/claudiusararu/unslop-ui-skill) (~100 tells; several typography tells here were mined from it), [Hallmark's slop-test gates](https://github.com/nutlope/hallmark), the [YC Design Review episode on vibe-coded sites](https://www.ycombinator.com/library/NL-common-mistakes-with-vibe-coded-websites) (Aaron Epstein and Raphael Schaad), and [Sascha Becker's anatomy of AI design sameness](https://saschb2b.com/blog/same-same-but-different).

---

## A. Typography

### A1. Eyebrow / kicker above a headline
A small label above a heading ("BEFORE WE START", "METHODOLOGY", "part one · the invention"). The eyebrow → headline → subhead stack is the default AI hero and the default AI section opener. impeccable.style: *"a tracked uppercase label above a heading borrows editorial authority it has not earned."* Lowercase versions count; the shape is the tell, not the case.
**Fix:** delete it, or promote the label to be the headline itself. If the eyebrow carried a real concept ("Parameters", "Methodology"), that concept becomes the display element: big term, short definition, body. Like a dictionary entry, never a flat sentence. Do not silently dissolve a concept label into prose; that destroys the hierarchy it was carrying.
**Detect:** `scan` (eyebrow/kicker/overline class names; uppercase + tracking combos) + `eye`.

### A2. Letterspaced-uppercase mono labels
`text-transform: uppercase` + wide `letter-spacing`, usually on a monospace font, on kickers, section markers, nav items, chart labels. Reads as template, not editorial.
**Fix:** monospace is allowed only as a quiet lowercase voice for pure data: coordinates, timestamps, axis ticks, HUD numbers. The moment words form a sentence they get the body face. Headlines carry structure alone.
**Detect:** `scan` (`text-transform: uppercase`, `tracking-wide` + `uppercase`).

### A3. All-caps display type
Uppercase kills reading speed: continuous all-caps reads about 12% slower than mixed case (Tinker, *Legibility of Print*, 1963, sustained-reading trials). At display sizes it also flattens every word into a rectangle.
**Fix:** sentence-case the big type. Caps only for one-or-two-word labels.
**Detect:** `scan` + `eye`.

### A4. The italic-serif hero
Oversized italic Fraunces / Instrument Serif as the primary headline. impeccable.style: *"reads as taste in isolation but has become the universal AI-startup landing page hero."* On editorial pages judge by context, but combined with cream + grain (B2) it is the full AI-editorial fingerprint.
**Fix:** set it roman, or move to a display face with actual personality that isn't the season's default.
**Detect:** `scan` (font names) + `eye`.

### A5. Inter-everywhere, or font soup
One neutral sans doing every job (impeccable.style: *"no typographic hierarchy, no personality, no design"*), or the opposite failure: four families mixed evenly. Both are generated signatures; a human picks two and commits.
**Fix:** one display face with personality + one neutral text face, used with tension. Big size jumps between levels; hierarchy by weight and color, not size inflation.
**Detect:** `scan` (Inter/Space Grotesk defaults) + `eye` (count families actually rendering).

### A6. Flat type hierarchy
Every size within a timid ratio. impeccable.style flags steps under 1.25×.
**Fix:** fewer sizes, more contrast between them.
**Detect:** `eye`, or diff the font-size tokens.

### A7. Gradient text
`background-clip: text` on headlines or big numbers. Pure generated decoration.
**Fix:** solid ink, scale up if it needs more presence.
**Detect:** `scan`.

### A8. The lone italic accent word
One serif-italic word dropped into a sans hero ("build *beautiful* products"), often as part of the trending Space Grotesk + Instrument Serif italic + Inter trio. The unslop-ui-skill catalog nails it: *"canned add-personality move; reads as a unit, not a choice."*
**Fix:** commit serif/sans as a system or drop it. Emphasize by weight and position, one voice.
**Detect:** `scan`.

### A9. Heading-wrap gimmicks
`text-wrap: balance` painted on everything (pyramid headlines, stranded last lines), forced `<br>` in headings that break wrong at other widths, four-line headlines with one-word orphans.
**Fix:** balance only on genuine 2-3 line headings, `text-pretty` for body, control wrap with a `max-width` in `ch`.
**Detect:** `scan` (balance) + `eye`.

### A10. Non-tabular numerals in data
Proportional figures in stats, tables, prices, and tick labels wobble and misalign. On a data page this is the difference between typeset and generated.
**Fix:** `font-variant-numeric: tabular-nums` on anything columnar or counting.
**Detect:** manual (scanner reminds).

### A11. Blanket tracking and justification
Negative tracking copied from display sizes down to body and labels; `text-align: justify` on web columns (rivers, no hyphenation control).
**Fix:** body tracking 0, ragged-right. Negative tracking scales with size and stops at display.
**Detect:** `scan` (justify) + `eye`.

## B. Color and surface

### B1. Purple-to-blue / indigo-to-violet gradients
The AI palette, on buttons, text, backgrounds, orbs. Named as the primary tell by every catalog (impeccable.style: *"the new make-it-pop"*; Rottoways; Sailop; Becker: *"the indigo. Always the indigo."*).
**Fix:** one committed accent, flat fill, against a restrained base.
**Detect:** `scan` (indigo/violet/purple gradient stops).

### B2. The cream "AI editorial" stack
Warm-paper background (#F3F0E7 territory) + grain overlay + italic serif + mono labels + an accent per chapter. This became the house style of AI-generated data journalism around 2025-2026 and now reads generated on sight, which is bitter, because each ingredient was once an editorial-craft signal. The combination is the tell. Independently corroborated by the [Reddit-mined tells study](https://github.com/JCarterJohnson/vibecoded-design-tells), which flags "the newer cream-plus-serif-plus-sage tasteful default" as exactly the trap of trading one default for another.
**Fix:** keep at most one ingredient and make a different committed choice elsewhere. Or: light⇄dark full-bleed section splits as structure instead of one continuous paper wash.
**Detect:** `eye`.

### B3. Neon glow on dark
Cyan/violet glowing cards, glowing status dots, atmospheric radial gradients behind heroes. Hackathon-project energy (impeccable.style: "Lazy Cool").
**Fix:** flat dark surfaces, defined edges, one accent.
**Detect:** `scan` (glow shadows) + `eye`.

### B4. Color that means nothing
Six equal category chips, an accent per section, decorative rainbow charts. On a data page every color is a claim; readers try to decode it.
**Fix:** color appears only when it encodes something, one hue family otherwise. On charts: position first, color only ever with meaning.
**Detect:** `eye`.

### B5. Decorative glassmorphism
`backdrop-filter: blur` cards solving no layering problem (impeccable.style).
**Fix:** solid surfaces unless something genuinely sits behind.
**Detect:** `scan`.

### B6. Hairline border + wide diffuse shadow
Both an edge and an elevation on every card. impeccable.style: *"commit to one: a defined edge or a soft elevation, not both at once."*
**Fix:** one shadow philosophy for the whole page.
**Detect:** `scan` (heuristic) + `eye`.

### B7. Colored left-border callout
The thick side-tab accent on a rounded card. impeccable.style calls the side-tab *"the single most recognizable tell of AI-generated UI."* In editorial pages it appears as the default pull-quote and note style.
**Fix:** for pull quotes: outdent them, scale them, or set them in the display face. For notes: run them as body with a small inline label.
**Detect:** `scan` (`border-l-4`, thick border-left).

### B8. Over-rounding and uniform radius
24px+ radius on small cards; one radius token painted on everything. impeccable.style: cards top out around 12-16px, full-pill is for tags and buttons; 925studios flags uniform 16px radius as a core slop signal.
**Fix:** a small radius scale, applied by role, with sharp corners as a legitimate option.
**Detect:** `scan` (rounded-2xl/3xl, radius ≥ 24px) + `eye`.

### B9. Decorative grid-line background
A faint grid covering a surface that supports no canvas, map, or measurement task (impeccable.style).
**Fix:** product structure or a plain field.
**Detect:** `eye`.

### B10. Gray body text
`text-gray-400/500` (#9ca3af / #6b7280) on white, `slate-400` on dark, as *body* text. An AI tell and a WCAG failure at once; generators reach for gray to look refined and lose the reader instead.
**Fix:** near-black body ink; grays reserved for genuinely secondary metadata, still at 4.5:1.
**Detect:** `scan`.

### B11. Dark-only mode and pure black
Defaulting the whole page to dark because "dark = premium" (it also hides layout sins), and `#000` as the page ground, which vibrates against white text and kills any elevation ramp.
**Fix:** light default unless the subject genuinely lives at night; off-black with a temperature (#0e0e10, warm #14110f) when dark is the right call.
**Detect:** `scan` (pure black) + `eye`.

## C. Structure (the editorial layer)

These matter most on content pages. In the 2026 Reddit-brigade case (see `craft.md`), the page had zero surface tells and was still identified by this layer alone.

### C1. The three-stat block
Three big rounded numbers in three equal cards ("242 catalogued / 170+ pieces / 2035 deadline"). The universal AI proof-section.
**Fix:** one inline sentence holding one number: "242 stations catalogued, half with audio, most going quiet by 2035." A sentence shows judgment; a stat grid shows a template.
**Detect:** `scan` (stat/metric class names) + `eye`.

### C2. Repeated uniform card grids
Multiple identical grids down the page. The brigaded page had four card grids in eight sections. impeccable.style: "Copy-Paste Layouts", *"when every section looks the same, nothing stands out."*
**Fix:** at most one card grid per page. Give other sections other forms: timeline, full-bleed image, pull quote, plain table, single wide-margin column, a scrolly step.
**Detect:** `scan` (grid-cols-3 counts) + `eye`.

### C3. Icon-tile-above-heading feature card
Small rounded-square icon container stacked above a heading. impeccable.style: *"the universal AI feature-card template. Every generator outputs this exact shape."*
**Fix:** icon beside the heading, in flow, or no icon.
**Detect:** `eye` + `scan` (heuristic).

### C4. Centered everything, template rhythm
Centered hero, centered headline, centered cards, the hero → three features → CTA skeleton with different colors (Sailop; Shuffle; Becker all document the convergence).
**Fix:** asymmetry as structure: left-aligned hero, 60/40 splits, elements bleeding off-edge, light⇄dark section alternation.
**Detect:** `eye`.

### C5. Cards inside cards
Nesting levels each with their own padding, border, and shadow (impeccable.style: "Cardocalypse").
**Fix:** flatten; whitespace does the grouping.
**Detect:** `eye`.

### C6. Uniform spacing, no visible decision
Every section the same height, every gap the same token. Even spacing itself reads generated because no human decision is visible.
**Fix:** vary deliberately. One section tight and dense, the next airy. More whitespace than feels natural, then a little more.
**Detect:** `eye`.

### C7. "01 / 02 / 03" section markers
Numbered kickers as fake editorial chrome.
**Fix:** if order matters, the content shows it; if it doesn't, the numbers are decoration.
**Detect:** `scan`.

### C8. Invented metrics
"+47% conversion", "trusted by 50,000+ teams", any number the source material didn't contain. Hallmark's honest-copy discipline states it exactly: a stat is slop the moment it's invented. On a data page this is fatal rather than embarrassing.
**Fix:** real numbers with sources, a labelled placeholder, or a different structure.
**Detect:** manual, against the source data.

## D. Motion

### D1. Uniform fade-in on every section
One IntersectionObserver adding fade-in-up to everything. Named as a top vibe-code tell in the YC Design Review episode ("sections that fade as you scroll") and by 925studios.
**Fix:** kill decorative reveals. Motion is reserved for state: loading, playing, selected, error. If an animation communicates nothing, delete it.
**Detect:** `scan` (IntersectionObserver + fade/reveal classes).

### D2. Scroll hijacking
Replacing native scroll with a driven camera or snapped sections. Distinct from scroll-*driven* animation (scrubbing a timeline from native scroll position), which is fine.
**Fix:** native scroll always; scrub, don't hijack.
**Detect:** `scan` (scroll-behavior overrides, wheel preventDefault) + `eye`.

### D3. Hover effects on everything
scale(1.05) and glow on every card and button (YC episode: "annoying hover effects").
**Fix:** hover feedback on interactive elements only, and subtle.
**Detect:** `scan` (hover:scale).

### D4. Stock easing everywhere
Default ease-in-out on every transition is the motion equivalent of Inter.
**Fix:** author the ease and the stagger, or don't animate.
**Detect:** `eye`.

### D5. `transition: all`
The blanket transition, usually paired with the blanket hover. Also a performance smell.
**Fix:** name the properties that change.
**Detect:** `scan`.

### D6. Motion without a reduced-motion fallback
Keyframes and animations with no `@media (prefers-reduced-motion: reduce)` alternative. Hallmark treats this as a hard gate and it's right to: it's the accessibility tell.
**Fix:** every motion gets a reduced or disabled variant.
**Detect:** `scan` (file-level check).

## E. Imagery, naming, copy

### E1. Emoji as icons, plastic AI illustration, stock diversity photos
All three are one-second identifications.
**Fix:** real assets: archival images, Wikimedia Commons, your own photography, real screenshots, or nothing.
**Detect:** `eye`.

### E2. Amateur hand-drawn SVG scenes
Hand-coded SVG mascots and illustrations read as doodles, not whimsy (impeccable.style).
**Fix:** real assets or no illustration.
**Detect:** `eye`.

### E3. Curator naming
"The X Museum", "The X Atlas", "The X Vault", "A Listening Museum". Stock AI gravitas; real practitioners title the thing what it is.
**Fix:** "Tokyo train melodies, 2026" beats "The Bells of Tokyo: A Listening Museum."
**Detect:** `scan` (title patterns).

### E4. Vague headlines
"Build the future", "Reimagining X". Specificity with a real date and a real name is among the strongest human signals: "On March 11, 1989, Shinjuku and Shibuya went live."
**Fix:** every headline carries a fact.
**Detect:** manual.

### E5. Generated-voice tics in page copy
Em dashes as rhythm, "not just X, it's Y", rule-of-three punches, one-line dramatic paragraphs, keyword-highlight spans, redundant label + sublabel + helper saying the same thing (impeccable.style: "Redundant UX Writing"; kill-ai-slop catalogs the voice tics).
**Fix:** say the specific thing once, plainly. Periods and colons over dashes.
**Detect:** `scan` (em dashes in visible text) + read-aloud.

### E6. Fabricated social proof
Five-star rows (★★★★★) under testimonials, DiceBear/pravatar avatar fallbacks, logo walls of companies that never agreed to appear, "Trusted by 50,000+ teams." [Rottoways](https://rottoways.com/blog/vibecoding-design-problem) names the five-star testimonial row and the avatar fallback among the eight universal vibe-code patterns. On an editorial page the equivalent is the invented pull quote.
**Fix:** real quotes from named people who said them, or no testimonials. An editorial page rarely needs social proof; the data is the proof.
**Detect:** `scan` (star runs, avatar services).

## G. Charts and dashboards

The layer no other anti-slop skill covers, and the one that matters most on a data page: a reader who catches one dishonest or decorated chart distrusts every number after it. Sources: [Microsoft's Power BI anti-pattern catalog](https://github.com/microsoft/skills-for-fabric/blob/main/skills/powerbi-report-design/references/anti-patterns.md) (an LLM "refusal list" for dashboard generation), [the dashboard-density essay](https://uxskill.laithjunaidy.com/blog/ai-dashboard-design-generic.html), and the classical canon (Tufte's data-ink ratio, Cairo/Alberto's honesty rules).

### G1. Truncated bar baseline
Bars starting above zero exaggerate every difference. The single most damaging chart tell: it converts a design review into a credibility review.
**Fix:** bars start at 0, always. If the interesting range is narrow, use a dot plot or a line, which honestly encode position rather than length.
**Detect:** manual, against the axis.

### G2. Decorated data ink
3D effects, drop shadows on marks, gradient fills on bars and areas, glow on lines. Microsoft's catalog is blunt: perspective distortion destroys precision; shadows are "pure decoration; visual weight without information."
**Fix:** flat 2D marks. Depth belongs to the page, never to the data.
**Detect:** `scan` (gradient fills on SVG marks) + `eye`.

### G3. Rainbow and Skittles palettes
Seventeen categorical colors, rainbow heatmaps, a different hue per bar of the same variable. Color that doesn't encode is noise the reader tries to decode.
**Fix:** one hue ramp (light to dark) for magnitude; categorical colors only when categories are the point, capped near 6; gray for context series, one accent for the series the story is about.
**Detect:** `eye`.

### G4. The donut cemetery
Pie and donut charts as the default for every composition. Angle is the weakest encoding a chart can use.
**Fix:** sorted horizontal bars for comparison; a single number plus sparkline for total-and-trend; if a donut survives, cap it at 3 slices.
**Detect:** `eye`.

### G5. Gallery spacing on a cockpit surface
The generated dashboard centroid: sidebar, four stat cards with deltas, one full-width line chart regardless of data shape, a zebra-striped table, airy 24px gaps everywhere. The density essay names the failure exactly: models trained on marketing screenshots apply gallery spacing to a surface whose job is density. Editorial pages inherit it as charts padded like hero sections.
**Fix:** decide where this surface sits on the gallery-to-cockpit spectrum, then set density deliberately. A chart embedded in prose earns its footprint by information, not padding.
**Detect:** `eye`.

### G6. Count-up numbers and animated stats
Numbers that tick up from zero on scroll. Motion applied to the one element whose whole job is to be read precisely.
**Fix:** the number, printed, in tabular figures. If change over time is the story, show a sparkline of it.
**Detect:** `scan` (count-up libraries).

### G7. The unannotated insight
The chart shows the data; the headline above it states the insight; the reader has to connect them. Generators separate chart from claim because template slots do.
**Fix:** annotate the insight directly on the chart, at the data point where it lives. The reveal happens in the chart, not the headline.
**Detect:** `eye`.

## H. Scaffold residue

Leftovers that prove nobody looked before shipping. Individually small; together they are the most conclusive tell there is, because they can't be a taste choice. Detection services ([slopdar](https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated), [isitvibecoded.com](https://isitvibecoded.com/), the [Meridian Lab hygiene scanner](https://hallmark.themeridianlab.com/)) lead with this layer because it's near-deterministic.

### H1. Default framework title
"Vite + React", "Create React App", "Next.js App" still in the title bar.
**Fix:** a real title; it's also the page's search result and share card.
**Detect:** `scan`.

### H2. Placeholder debris
Lorem ipsum, "© Your Company", example.com links, test strings, TODO markers in shipped markup.
**Fix:** search and destroy before every deploy.
**Detect:** `scan`.

### H3. Localhost links in production
`http://localhost:3000` or `127.0.0.1` in shipped hrefs and configs.
**Detect:** `scan`.

### H4. Missing page furniture
No favicon, no OG image, no meta description, no viewport meta. Blank tab icon, blank share cards on every platform your page might spread through, broken mobile scaling. For a page that lives by being shared, a missing OG image is a distribution bug, not a polish bug.
**Fix:** favicon, `og:image` (test the share card), description, viewport, on every page.
**Detect:** `scan` (file-level checks on HTML).

### H5. Builder watermarks
"Made with Lovable/Framer/Wix" badges, builder hosting subdomains, generator meta tags. The tool literally signs the work.
**Fix:** ship from your own domain, strip attribution defaults you didn't choose.
**Detect:** `scan` + view-source.

### H6. Console noise
`console.log` debris in shipped page source; errors on load.
**Fix:** clean console on a fresh load is part of the page.
**Detect:** `scan` (HTML files) + devtools.
