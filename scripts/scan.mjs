#!/usr/bin/env node
// anti-slop-design scanner. Dependency-free, read-only.
// Usage: node scripts/scan.mjs <path> [--json]
// Prints grouped file:line hits for the grep-detectable tells in references/tells.md.
// Output is a map, not a verdict: confirm every hit by reading the code and the rendered page.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXT = new Set(['.html', '.htm', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.md', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'out', '.git', '.next', '.nuxt', 'vendor', 'coverage', '.cache']);
const SKIP_FILE = /\.(min|bundle)\.|package-lock|yarn\.lock|pnpm-lock/;

const RULES = [
  { id: 'A1', name: 'eyebrow/kicker class', re: /\b(eyebrow|kicker|overline|pretitle|pre-title)\b/i, note: 'delete it or promote the label to the headline (tells.md A1)' },
  { id: 'A2a', name: 'uppercase transform', re: /text-transform:\s*uppercase/i, note: 'mono/labels: lowercase data voice only (A2); caps ok only for 1-2 word labels' },
  { id: 'A2b', name: 'tailwind uppercase+tracking', re: /\buppercase\b(?=.*\btracking-(wide|widest)\b)|\btracking-(wide|widest)\b(?=.*\buppercase\b)/, note: 'letterspaced-caps label (A2)' },
  { id: 'A4', name: 'italic-serif hero face', re: /["'](Fraunces|Instrument Serif|Playfair Display)["']/, note: 'the universal AI hero face; judge by context (A4)' },
  { id: 'A5', name: 'default font stack', re: /["']Inter["']|["']Space Grotesk["']/, note: 'the median choice; pick a face with personality (A5)' },
  { id: 'A7', name: 'gradient text', re: /background-clip:\s*text|-webkit-background-clip:\s*text|\bbg-clip-text\b/i, note: 'solid ink, scale up instead (A7)' },
  { id: 'B1a', name: 'purple gradient (tailwind)', re: /\b(from|via|to)-(indigo|violet|purple|fuchsia)-\d/, note: 'the AI palette; one flat accent instead (B1)' },
  { id: 'B1b', name: 'purple gradient (css)', re: /linear-gradient\([^)]*#(6366f1|7c3aed|8b5cf6|a855f7|4f46e5|9333ea|6d28d9|c084fc)/i, note: 'the AI palette; one flat accent instead (B1)' },
  { id: 'B5', name: 'glassmorphism', re: /backdrop-filter:\s*blur|\bbackdrop-blur\b/i, note: 'solves no layering problem? remove (B5)' },
  { id: 'B7', name: 'colored left-border callout', re: /\bborder-l-4\b|border-left:\s*[3-9]px\s+solid/i, note: 'the side-tab tell; outdent or restyle the quote/note (B7)' },
  { id: 'B8', name: 'over-rounding', re: /\brounded-(2xl|3xl|\[(2[4-9]|[3-9]\d)px\])\b|border-radius:\s*(2[4-9]|[3-9]\d)px/i, note: 'cards top out ~12-16px; pill is for tags (B8)' },
  { id: 'C2', name: 'three-card grid', re: /\bgrid-cols-3\b|grid-template-columns:\s*repeat\(\s*3\s*,/i, note: 'max one card grid per page; vary section forms (C2)' },
  { id: 'C1', name: 'stat-block class', re: /\b(stat|stats|metric|metrics)[-_]?(card|grid|block|row|box)\b/i, note: 'one sentence holding one number instead (C1)' },
  { id: 'C7', name: '01/02/03 section markers', re: /\b0[1-9]\s*[·./]\s+[A-Za-z]/, note: 'numbered kickers are decoration (C7)' },
  { id: 'D1', name: 'observer scroll-reveal', re: /IntersectionObserver/, note: 'if it adds fade/reveal classes uniformly, kill it; motion = state only (D1)', pair: /\b(fade|reveal|animate-in|in-view|aos)\b/i },
  { id: 'D2', name: 'scroll hijack', re: /addEventListener\(\s*["']wheel["'][^)]*preventDefault|scroll-snap-type:\s*[xy]\s+mandatory/i, note: 'native scroll always; scrub, never hijack (D2)' },
  { id: 'D3', name: 'hover scale', re: /\bhover:scale-\d|:hover[^{]{0,40}\{[^}]{0,80}transform:\s*scale\(/i, note: 'hover feedback on interactive elements only (D3)' },
  { id: 'E3', name: 'curator naming', re: /The\s+[A-Z][a-z]+\s+(Museum|Atlas|Vault|Archive|Library|Observatory|Codex)\b/, note: 'name the thing what it is (E3)' },
  { id: 'E5', name: 'em dash in copy', re: /—/, note: 'generated-voice tic in visible copy; period or colon (E5). Skip code/comments hits.' },
  { id: 'F1', name: 'undersized text', re: /font-size:\s*(?:0\.[0-6]\d*rem|[1-9]px|1[01]px)\b|text-\[(?:[1-9]|1[01])px\]/i, note: 'functional text >= 12px, body >= 16px (legibility floors)' },
];

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const root = args.find((a) => !a.startsWith('--')) || '.';

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
const files = rootStat.isDirectory() ? [...walk(root)] : [root];

for (const file of files) {
  fileCount++;
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  const lines = text.split('\n');
  for (const rule of RULES) {
    // paired rules require both patterns somewhere in the file
    if (rule.pair && !(rule.pair.test(text))) continue;
    lines.forEach((line, i) => {
      if (line.length > 500) return; // skip minified-ish lines
      const trimmed = line.trim();
      if (rule.id === 'E5' && (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('<!--'))) return;
      if (rule.re.test(line)) {
        (hits[rule.id] ||= { rule, locs: [] }).locs.push(`${file}:${i + 1}`);
      }
    });
  }
}

if (asJson) {
  const out = Object.values(hits).map(({ rule, locs }) => ({ id: rule.id, name: rule.name, note: rule.note, hits: locs }));
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
      for (const l of locs.slice(0, 12)) console.log(`  ${l}`);
      if (locs.length > 12) console.log(`  … ${locs.length - 12} more`);
    }
    console.log(`\n${groups.length} tell group${groups.length > 1 ? 's' : ''} across ${fileCount} files. Every hit needs human triage: slop vs. intentional.`);
    console.log('Then check the rendered page for the structural tells the grep cannot see (tells.md C1-C8, D4, E1-E4).');
  }
}
