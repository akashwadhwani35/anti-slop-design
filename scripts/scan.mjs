#!/usr/bin/env node
// anti-slop-design scanner. Dependency-free, read-only.
//
// Usage: node scripts/scan.mjs <path> [--json] [--only=A1,C2] [--skip=E5] [--exclude=legacy]
//
// Prints grouped file:line hits for the grep-detectable tells in references/tells.md.
// Output is a map, not a verdict: confirm every hit by reading the code and the rendered page.
//
// Pinning intentional choices in source (id-scoped forms preferred so new tells still surface):
//   /* antislop-ignore */            on the hit line
//   /* antislop-ignore-next-line A2 */
//   /* antislop-ignore-file */       anywhere in the file

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXT = new Set(['.html', '.htm', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.md', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'out', '.git', '.next', '.nuxt', 'vendor', 'coverage', '.cache']);
const SKIP_FILE = /\.(min|bundle)\.|package-lock|yarn\.lock|pnpm-lock/;

// note = the fix direction; fp = known false positives to triage away.
const RULES = [
  { id: 'A1', name: 'eyebrow/kicker class', re: /\b(eyebrow|kicker|overline|pretitle|pre-title)\b/i, note: 'delete it or promote the label to the headline (tells.md A1)' },
  { id: 'A2a', name: 'uppercase transform', re: /text-transform:\s*uppercase/i, note: 'labels: lowercase data voice only (A2); caps ok for 1-2 word labels', fp: 'a short button/tag label can be fine' },
  { id: 'A2b', name: 'tailwind uppercase+tracking', re: /\buppercase\b(?=.*\btracking-(wide|widest)\b)|\btracking-(wide|widest)\b(?=.*\buppercase\b)/, note: 'letterspaced-caps label (A2)' },
  { id: 'A4', name: 'italic-serif hero face', re: /["'](Fraunces|Instrument Serif|Playfair Display)["']/, note: 'the universal AI hero face; judge by context (A4)', fp: 'a genuinely editorial voice may keep it, set roman' },
  { id: 'A5', name: 'default font stack', re: /["']Inter["']|["']Space Grotesk["']|--font-geist/, note: 'the median choice; pick a face with personality (A5)' },
  { id: 'A7', name: 'gradient text', re: /background-clip:\s*text|-webkit-background-clip:\s*text|\bbg-clip-text\b/i, note: 'solid ink, scale up instead (A7)' },
  { id: 'A8', name: 'lone italic accent word', re: /<(em|i)[^>]*class="[^"]*(serif|italic)[^"]*"[^>]*>\s*\w+\s*<\/(em|i)>/i, note: 'the canned "add personality" move; commit to a system or drop it (A8)' },
  { id: 'A9', name: 'text-wrap balance everywhere', re: /text-wrap:\s*balance|\btext-balance\b/i, note: 'only on 2-3 line headings; text-pretty for body (A9)', fp: 'fine on an actual multi-line heading' },
  { id: 'A10', name: 'stats without tabular numerals', re: /\b(stat|metric|count|price)[^{]*\{[^}]*font-variant/i, invert: true, note: 'manual check: numbers in stats/tables need font-variant-numeric: tabular-nums (A10)', manual: true },
  { id: 'B1a', name: 'purple gradient (tailwind)', re: /\b(from|via|to)-(indigo|violet|purple|fuchsia)-\d/, note: 'the AI palette; one flat accent instead (B1)' },
  { id: 'B1b', name: 'purple gradient (css)', re: /linear-gradient\([^)]*#(6366f1|7c3aed|8b5cf6|a855f7|4f46e5|9333ea|6d28d9|c084fc)/i, note: 'the AI palette; one flat accent instead (B1)' },
  { id: 'B5', name: 'glassmorphism', re: /backdrop-filter:\s*blur|\bbackdrop-blur\b/i, note: 'solves no layering problem? remove (B5)' },
  { id: 'B7', name: 'colored left-border callout', re: /\bborder-l-4\b|border-left:\s*[3-9]px\s+solid/i, note: 'the side-tab tell; outdent or restyle the quote/note (B7)' },
  { id: 'B8', name: 'over-rounding', re: /\brounded-(2xl|3xl|\[(2[4-9]|[3-9]\d)px\])\b|border-radius:\s*(2[4-9]|[3-9]\d)px/i, note: 'cards top out ~12-16px; pill is for tags (B8)', fp: 'a pill on a small tag/button is fine' },
  { id: 'B10', name: 'low-contrast body gray', re: /text-gray-[45]00\b|text-slate-400\b|#9ca3af|#6b7280/i, note: 'near-black body, grays only for genuinely secondary metadata; verify 4.5:1 (B10)', fp: 'ok on true metadata if it passes contrast' },
  { id: 'B11', name: 'pure black background', re: /background(?:-color)?:\s*#000\b|\bbg-black\b/i, note: 'off-black with a temperature + real elevation ramp (B11)', fp: 'deliberate high-contrast art direction can keep it' },
  { id: 'C2', name: 'three-card grid', re: /\bgrid-cols-3\b|grid-template-columns:\s*repeat\(\s*3\s*,/i, note: 'max one card grid per page; vary section forms (C2, structures.md)' },
  { id: 'C1', name: 'stat-block class', re: /\b(stat|stats|metric|metrics)[-_]?(card|grid|block|row|box)\b/i, note: 'one sentence holding one number instead (C1)' },
  { id: 'C7', name: '01/02/03 section markers', re: /\b0[1-9]\s*[·./]\s+[A-Za-z]/, note: 'numbered kickers are decoration (C7)', fp: 'real ordered data (chapter lists, rankings) is fine' },
  { id: 'D1', name: 'observer scroll-reveal', re: /IntersectionObserver/, note: 'if it adds fade/reveal classes uniformly, kill it; motion = state only (D1)', pair: /\b(fade|reveal|animate-in|in-view|aos)\b/i, fp: 'observers for lazy-loading or analytics are fine' },
  { id: 'D2', name: 'scroll hijack', re: /addEventListener\(\s*["']wheel["'][^)]*preventDefault|scroll-snap-type:\s*[xy]\s+mandatory/i, note: 'native scroll always; scrub, never hijack (D2)' },
  { id: 'D3', name: 'hover scale', re: /\bhover:scale-\d|:hover[^{]{0,40}\{[^}]{0,80}transform:\s*scale\(/i, note: 'hover feedback on interactive elements only (D3)' },
  { id: 'D5', name: 'transition-all', re: /transition:\s*all\b|\btransition-all\b/i, note: 'specify the transitioning properties (D5)' },
  { id: 'E3', name: 'curator naming', re: /The\s+[A-Z][a-z]+\s+(Museum|Atlas|Vault|Archive|Library|Observatory|Codex)\b/, note: 'name the thing what it is (E3)', fp: 'a real institution\'s actual name' },
  { id: 'E5', name: 'em dash in copy', re: /—/, note: 'generated-voice tic in visible copy; period or colon (E5)', fp: 'verbatim quotes keep their punctuation; code/comments don\'t count' },
  { id: 'F1', name: 'undersized text', re: /font-size:\s*(?:0\.[0-6]\d*rem|[1-9]px|1[01]px)\b|text-\[(?:[1-9]|1[01])px\]/i, note: 'functional text >= 12px, body >= 16px (legibility floors)' },
  { id: 'F2', name: 'justified text', re: /text-align:\s*justify|\btext-justify\b/i, note: 'ragged-right left-align; justified web columns make rivers (F2)' },
  { id: 'G2', name: 'gradient fill on chart marks', re: /<(rect|path|circle|area)[^>]{0,200}fill=["']url\(#/i, note: 'flat 2D data ink; depth belongs to the page, not the data (G2)', fp: 'gradient fills on decorative (non-data) SVG art' },
  { id: 'G6', name: 'count-up number animation', re: /\b(countup|count-up|CountUp)\b/, note: 'print the number in tabular figures; sparkline if change is the story (G6)' },
  { id: 'H1', name: 'default framework title', re: /<title>\s*(Vite \+ React|Create React App|Next\.js App|React App|Vite App)/i, note: 'a real title; it is also the search result and share card (H1)' },
  { id: 'H2a', name: 'lorem ipsum', re: /lorem ipsum/i, note: 'placeholder debris; search and destroy (H2)' },
  { id: 'H2b', name: 'placeholder copyright/links', re: /©\s*(Your Company|Company Name)|href=["']https?:\/\/example\.com/i, note: 'placeholder debris (H2)' },
  { id: 'H3', name: 'localhost link', re: /https?:\/\/(localhost|127\.0\.0\.1)/, note: 'localhost in shipped hrefs/configs (H3)', fp: 'dev-only config files' },
  { id: 'H5', name: 'builder watermark / avatar service', re: /made with (lovable|framer|bolt|wix)|\.lovable\.app|dicebear|pravatar\.cc|ui-avatars\.com/i, note: 'builder signatures and fake-avatar services (H5, E6)' },
  { id: 'E6', name: 'star-row social proof', re: /[★⭐]{4,}/, note: 'real quotes from named people, or none; the data is the proof (E6)' },
  { id: 'H6', name: 'console.log in shipped HTML', re: /\bconsole\.log\(/, ext: ['.html', '.htm'], note: 'debug debris; a clean console is part of the page (H6)', fp: 'an intentional easter egg for view-source readers' },
];

// File-level checks: flag once per file when `when` matches but `unless` doesn't.
const FILE_RULES = [
  { id: 'D6', name: 'motion without reduced-motion fallback', when: /@keyframes|animation:/, unless: /prefers-reduced-motion/, note: 'every motion needs a @media (prefers-reduced-motion: reduce) alternative (D6)' },
  { id: 'H4a', name: 'page without favicon', when: /<head[\s>]/i, unless: /rel=["'](icon|shortcut icon|apple-touch-icon)/i, ext: ['.html', '.htm'], note: 'blank tab icon (H4)', fp: 'a site-root /favicon.ico still renders without the link tag' },
  { id: 'H4b', name: 'page without og:image', when: /<head[\s>]/i, unless: /property=["']og:image/i, ext: ['.html', '.htm'], note: 'blank share card everywhere the page spreads; a distribution bug (H4)' },
  { id: 'H4c', name: 'page without meta description', when: /<head[\s>]/i, unless: /name=["']description/i, ext: ['.html', '.htm'], note: 'no search/share summary (H4)' },
  { id: 'H4d', name: 'page without viewport meta', when: /<head[\s>]/i, unless: /name=["']viewport/i, ext: ['.html', '.htm'], note: 'broken mobile scaling (H4)' },
];

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const getFlag = (name) => (args.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1];
const only = getFlag('only')?.split(',').map((s) => s.trim().toUpperCase());
const skip = getFlag('skip')?.split(',').map((s) => s.trim().toUpperCase());
const exclude = getFlag('exclude');
const root = args.find((a) => !a.startsWith('--')) || '.';

const active = (id) => (!only || only.includes(id.toUpperCase().replace(/[AB]$/, '')) || only.includes(id.toUpperCase())) && !(skip && (skip.includes(id.toUpperCase()) || skip.includes(id.toUpperCase().replace(/[AB]$/, ''))));

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name) && !name.startsWith('.')) yield* walk(p);
    } else if (EXT.has(extname(name)) && !SKIP_FILE.test(name)) {
      yield p;
    }
  }
}

const hits = {};
let fileCount = 0;
const rootStat = statSync(root);
let files = rootStat.isDirectory() ? [...walk(root)] : [root];
if (exclude) files = files.filter((f) => !f.includes(exclude));

for (const file of files) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  if (text.includes('antislop-ignore-file')) continue;
  fileCount++;
  const lines = text.split('\n');

  const fileExt = extname(file);
  for (const rule of FILE_RULES) {
    if (!active(rule.id)) continue;
    if (rule.ext && !rule.ext.includes(fileExt)) continue;
    if (rule.when.test(text) && !rule.unless.test(text)) {
      (hits[rule.id] ||= { rule, locs: [] }).locs.push(`${file} (file-level)`);
    }
  }

  for (const rule of RULES) {
    if (!active(rule.id) || rule.manual) continue;
    if (rule.ext && !rule.ext.includes(fileExt)) continue;
    if (rule.pair && !rule.pair.test(text)) continue;
    lines.forEach((line, i) => {
      if (line.length > 500) return; // skip minified-ish lines
      if (line.includes('antislop-ignore')) return;
      const prev = i > 0 ? lines[i - 1] : '';
      if (prev.includes('antislop-ignore-next-line')) {
        const ids = prev.match(/antislop-ignore-next-line\s+([A-Z0-9, ]+)/i)?.[1];
        if (!ids || ids.toUpperCase().includes(rule.id.toUpperCase().replace(/[AB]$/, ''))) return;
      }
      const trimmed = line.trim();
      if (rule.id === 'E5' && (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('<!--'))) return;
      if (rule.re.test(line)) {
        (hits[rule.id] ||= { rule, locs: [] }).locs.push(`${file}:${i + 1}`);
      }
    });
  }
}

if (asJson) {
  const out = Object.values(hits).map(({ rule, locs }) => ({ id: rule.id, name: rule.name, note: rule.note, falsePositives: rule.fp, hits: locs }));
  console.log(JSON.stringify({ scanned: fileCount, groups: out }, null, 2));
} else {
  const groups = Object.values(hits);
  if (!groups.length) {
    console.log(`Scanned ${fileCount} files. No grep-detectable tells found.`);
    console.log('The structural tells (stat blocks, card-grid rhythm, uniform spacing, centered-everything) need the rendered page: see references/tells.md sections C and D.');
  } else {
    for (const { rule, locs } of groups) {
      console.log(`\n[${rule.id}] ${rule.name} — ${locs.length} hit${locs.length > 1 ? 's' : ''}`);
      console.log(`  fix: ${rule.note}`);
      if (rule.fp) console.log(`  not slop when: ${rule.fp}`);
      for (const l of locs.slice(0, 12)) console.log(`  ${l}`);
      if (locs.length > 12) console.log(`  … ${locs.length - 12} more`);
    }
    console.log(`\n${groups.length} tell group${groups.length > 1 ? 's' : ''} across ${fileCount} files. Every hit needs human triage: slop vs. intentional.`);
    console.log('Pin confirmed-intentional hits with antislop-ignore comments. Then check the rendered page for the structural tells the grep cannot see (tells.md C, D, E).');
  }
}
