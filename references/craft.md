# Craft signals, the reskin test, and the case study

Removing tells gets a page to neutral. These are the additions that read as authored. Each costs minutes.

## The additive signals

**1. A byline and a date.** "By [name] · [site] · [date] · v1.3". Anonymous pages read generated; owned pages read authored. This is the cheapest strong signal that exists.

**2. A visible changelog or errata line.** Small text listing the last few fixes, crediting the person who flagged each one. Reframes the page from "AI exhibit" to "working document maintained by a human who answers for it."

**3. A raw-data link.** If the page shows data: "Download the dataset (CSV, 242 rows)" in the footer, next to the methodology. Real data journalists show their work; generators don't, because there is no work to show.

**4. Real assets.** Archival photography, Wikimedia Commons with credits, your own phone photos, actual screenshots. One real photograph outweighs any amount of generated illustration.

**5. Specific copy.** A date, a proper noun, and a number the reader can check. Specificity is expensive to fake at scale, which is exactly why it signals a human.

## The reskin test

The deepest failure has no tell to grep for: a technically clean "premium" page with no native concept.

**The test:** could this page serve any other client by swapping the headline and the accent color? If yes, it has no concept; it is chrome wrapped around content.

The alternative is to build the page from a primitive native to the subject. Strava's Year in Sport (by Hello Monday) builds its entire visual language from the activity polyline, the one graphic Strava owns. The Pudding's NYC piece builds from OCR'd storefront panoramas, the subject's own material. Ask, before any layout work: *what is this subject's polyline?* A piece about iPhone ads might build from Apple's own title-card typography; a piece about postal history from the artifacts themselves. The page should be impossible to reskin because its structure IS the subject.

**The floor: three deliberate non-default choices.** A committed accent, a real asymmetry, a two-font pairing with tension, an authored ease, a native primitive. Below roughly three visible decisions, a page reads generated even with zero tells present, because "no decisions visible" is itself the fingerprint of the median.

## Case study: identified by structure alone

In May 2026 a data piece about Tokyo train-departure melodies (real dataset, hundreds of catalogued stations, real archival audio) was posted to r/Tokyo. It reached ~28K views; the top three comments were "Very Claude coded" (+53), "AI slop" (+40), and "Fuck is this" (+34). Every reply defending the piece was downvoted. The hostility triggered on the aesthetic before anyone engaged with the data.

The postmortem is the reason this skill weights structure over surface. The page had already avoided every surface tell: no Inter (display serif + display sans), no purple gradient (ivory/red/sumi palette), no stock photos (Wikimedia CC and original photography), no buzzwords. What it kept was the structural layer:

- four uniform card grids across eight sections
- three three-stat blocks
- a decorative fade-in on every section
- "A Listening Museum" curator framing in the title

Critics with a trained eye flag the structural layer even when the surface is clean, and the crowd follows the first confident "AI slop" comment. The fixes (one grid maximum, stat sentences, motion only for state, name the thing what it is) are all in `tells.md` sections C, D, and E.

The commercial version of the same lesson: 925studios reports that founders arrive after AI-built sites flatline, "not because the site is broken, but because it is invisible. It looks like everything else." And the YC Design Review episode (Aaron Epstein, Raphael Schaad) opens with the same recognition: viewers already know the look ("the purple gradients, annoying hover effects, sections that fade as you scroll") before any individual site is shown.

## Sources

Catalogs and detectors:
- [Slop, by impeccable.style](https://impeccable.style/slop/) — the canonical catalog; per-rule detectors, era toggle (2022 vs 2026 patterns)
- [925studios: AI Slop Web Design guide](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [kill-ai-slop taxonomy (yetone)](https://github.com/yetone/kill-ai-slop) — 35 tells with detection regexes for app UI
- [Hallmark (Nutlope / Together AI)](https://github.com/nutlope/hallmark) — the honest-copy and structural-variety disciplines

Why convergence happens (and the measurements):
- Goree, Doosti, Crandall & Su (CHI 2021): computer vision over 227,000 screenshots of ~10,000 websites, 2003–2019. Average layout distance between websites **fell 44% between 2010 and 2019**, before generative AI; shared frameworks and templates drove it. Generative tools are the third convergence wave, not the first. (Surfaced via [Sascha Becker's anatomy of AI design sameness](https://saschb2b.com/blog/same-same-but-different), which also covers the RLHF safe-bias mechanism: evaluators rate "safe" above "interesting," so models learn the median.)
- [The Reddit-mined tells ranking](https://github.com/JCarterJohnson/vibecoded-design-tells): 3.2M posts across 47 subreddits. The loudest complaint is recognizability itself ("they all look the same," ~13% of on-topic posts); among specific features, shadcn/Tailwind defaults and the "AI purple" gradient lead. Notably, the meme tells (bento grids, glassmorphism, aurora) rank near the bottom; the discourse grew ~150x from 2023 to 2024.
- [Rottoways: the vibecoding design problem](https://rottoways.com/blog/vibecoding-design-problem) — eight patterns with their generating LLM behavior; "aggressively mediocre" as the diagnosis
- [Sailop: Why Every AI-Generated Website Looks the Same](https://sailop.com/blog/why-every-ai-generated-website-looks-the-same) — mode collapse + Tailwind defaults in training data
- [Shuffle: Why Do Most AI-Generated Websites Look the Same?](https://shuffle.dev/blog/2026/01/why-do-most-ai-generated-websites-look-the-same/)

Charts and dashboards:
- [Microsoft's Power BI anti-pattern catalog](https://github.com/microsoft/skills-for-fabric/blob/main/skills/powerbi-report-design/references/anti-patterns.md) — an LLM refusal list for dashboard generation (3D, shadows on visuals, truncated baselines, saturated backgrounds)
- [Why AI-generated dashboards all look the same](https://uxskill.laithjunaidy.com/blog/ai-dashboard-design-generic.html) — the gallery-vs-cockpit density argument

Detection services (the residue layer):
- [slopdar's field guide](https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated) · [isitvibecoded.com](https://isitvibecoded.com/) · [Meridian Lab's hygiene scanner](https://hallmark.themeridianlab.com/) — builder fingerprints, default titles, placeholder debris, missing page furniture

Practitioner reviews:
- [YC Design Review: Common Mistakes With Vibe Coded Websites](https://www.ycombinator.com/library/NL-common-mistakes-with-vibe-coded-websites)
- [I Analyzed 100 Vibe-Coded Websites (dev.to)](https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275) — the technical/accessibility failure layer

Legibility research:
- Robert Bringhurst, *The Elements of Typographic Style* — 45–75 characters per line satisfactory, 66 ideal; 40–50 for multi-column
- Miles A. Tinker, *Legibility of Print* (1963) — all-caps continuous text read ~12% slower than mixed case ([full text](https://gwern.net/doc/design/typography/1963-tinker-legibilityofprint.pdf))
- [WCAG 2.2, Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — 4.5:1 body, 3:1 large text
