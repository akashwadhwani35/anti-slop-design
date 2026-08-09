# Fix patterns

Before→after for the highest-frequency tells. Directions, not find-and-replace: adapt to the project's tokens. Format borrowed from [kill-ai-slop](https://github.com/yetone/kill-ai-slop)'s fixes reference.

Order of operations: tokens first (fonts, colors, radius; many hits vanish at once), then components, then call sites, then copy.

### A1 · Eyebrow above a headline

```diff
- <p class="eyebrow">Methodology</p>
- <h2>How we counted the bells</h2>
+ <h2>How we counted the bells</h2>
```

When the eyebrow carried a real concept, the concept becomes the display element, not a buried sentence:

```diff
- <p class="eyebrow">Parameters</p>
- <h3>Parameters are how big the model is.</h3>
+ <h3 class="term">Parameters</h3>
+ <p class="definition"><em>How big the model is.</em></p>
+ <p>GPT-2 had 1.5 billion. …</p>
```

### A2 · Letterspaced-caps mono label

```diff
- <span style="font-family:monospace;text-transform:uppercase;letter-spacing:.14em">ACT II · THE MAP DRAWS ITSELF</span>
+ <h2>The map draws itself</h2>
```

Mono survives only as a lowercase data voice:

```diff
- .label { font-family: mono; text-transform: uppercase; letter-spacing: .12em }
+ .datum { font-family: mono; font-size: .8rem }   /* 51.5074° N, 0.1278° W · 1854 */
```

### C1 · Three-stat block

```diff
- <div class="stats-grid">
-   <div class="stat"><b>242</b><span>catalogued</span></div>
-   <div class="stat"><b>170+</b><span>with audio</span></div>
-   <div class="stat"><b>2035</b><span>deadline</span></div>
- </div>
+ <p>242 stations catalogued, half with audio, most going quiet by 2035.</p>
```

The sentence contains a judgment ("most going quiet"); the grid contained a template.

### C2 · The second card grid

Don't restyle it; change its form to match its content (see structures.md):

```diff
- <div class="grid grid-cols-3">   <!-- 8 studio "cards" -->
+ <table>                          <!-- studios are tabular: name, year, count -->
```

```diff
- <div class="grid grid-cols-3">   <!-- 6 photo "cards" -->
+ <figure class="full-bleed">      <!-- photos are a photo essay: one at a time, captioned -->
```

### D1 · Uniform scroll-reveal

```diff
- const io = new IntersectionObserver(es => es.forEach(e =>
-   e.target.classList.toggle('fade-in', e.isIntersecting)));
- document.querySelectorAll('section').forEach(s => io.observe(s));
+ /* deleted. sections are visible. motion is reserved for state:
+    .playing, .loading, .selected */
```

### B2 · The cream "AI editorial" stack

Keep one ingredient, change the structure:

```diff
- body { background:#f3f0e7; font-family:'Fraunces' }
- .grain { opacity:.06 }  .kicker { font-family:mono; text-transform:uppercase }
+ body { background: var(--paper) }          /* paper OR the serif, not the stack */
+ .chapter--dark { background: var(--ink); color: var(--paper) }  /* structure from light⇄dark splits */
```

### B7 · Colored left-border pull quote

```diff
- <blockquote class="border-l-4 border-emerald-500 pl-4">
+ <blockquote class="pullquote">   /* outdented into the margin, display face, no box */
```

### E3 · Curator title

```diff
- <title>The Bells of Tokyo: A Listening Museum</title>
+ <title>Tokyo train melodies, 2026</title>
```

### E5 · Generated-voice copy

```diff
- This isn't just a dataset — it's a portrait of a vanishing soundscape.
+ 242 melodies, recorded before the 2035 retirement date.
```

### B10 · Gray body text

```diff
- <p class="text-gray-400">The survey ran from March to June…</p>
+ <p class="text-[--ink]">The survey ran from March to June…</p>
+ <span class="text-[--ink-2]">Updated 9 Aug 2026</span>   /* grays only for true metadata, ≥4.5:1 */
```

### A10 · Wobbling numbers in a table

```diff
  td.value { text-align: right;
+   font-variant-numeric: tabular-nums;
  }
```

### F-layer · The measure

```diff
- article { max-width: 900px }
+ article { max-width: 68ch }    /* 45–75ch; charts and figures may break out */
```
