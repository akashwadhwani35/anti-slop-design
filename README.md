# anti-slop-design

A Claude Code skill that removes the visual tells of AI-generated design: eyebrow labels, mono caps, three-stat blocks, purple gradients, uniform card grids, decorative scroll-reveals, and the rest of the template fingerprint.

AI coding tools output the statistical median of the design they trained on. Readers have learned to recognize it, and on Reddit or Hacker News the aesthetic alone now gets work dismissed as "AI slop" before anyone reads it. This skill encodes the specific patterns critics flag, plus the craft signals that read as human: a byline, real asymmetry, one committed accent, a concept native to the subject.

It also enforces the legibility floors that AI layouts routinely break: line length, minimum sizes, contrast, sentence-case display type.

## Install

Copy the skill into your project (or `~/.claude/skills/` for all projects):

```sh
mkdir -p .claude/skills/anti-slop-design
curl -o .claude/skills/anti-slop-design/SKILL.md \
  https://raw.githubusercontent.com/akashwadhwani35/anti-slop-design/main/SKILL.md
```

Claude Code picks it up automatically. Invoke it explicitly with `/anti-slop-design`, or just build UI; the skill triggers on design work and pre-ship reviews.

## What it covers

- **Typography**: no eyebrows/kickers, no mono caps, no all-caps display, two fonts with tension instead of defaults or font soup
- **Legibility**: 45–75 char measure, size and contrast floors, word shapes
- **Color**: banned gradient combos, one committed accent, color only when it means something
- **Structure**: no stat-blocks, max one card grid, visible asymmetric decisions
- **Motion**: no decorative reveals, never hijack scroll, motion only for state
- **Naming and copy**: no "The X Museum" branding, no vague headlines, no em dashes
- **A 10-step pre-ship audit** you can run against any rendered page

## Why these rules

Every tell in the list is corroborated by at least one independent catalog of AI design patterns ([impeccable.style/slop](https://impeccable.style/slop/), [925studios](https://www.925studios.co/blog/ai-slop-web-design-guide), and others cited in the skill) and by field experience shipping data-viz pages to audiences that actively hunt for AI tells. The structural rules matter most: pages with a clean surface still get identified by their stat-blocks and repeated grids.

## License

MIT
