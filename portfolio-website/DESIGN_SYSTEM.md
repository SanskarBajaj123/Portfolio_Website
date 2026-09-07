# Portfolio Design System — Workflow Canvas

Reference doc for `Portfolio.dc.html`. Use this to add nodes, tweak theme, or extend the canvas without re-deriving the layout math.

## 1. Concept
A single-page portfolio styled as an automation-workflow canvas (n8n-inspired): the visitor's info is modeled as connected "nodes" on a pannable, zoomable canvas. Clicking a node opens its full content in a right-side detail panel. A "Run workflow" button animates execution across the graph.

## 2. Palette (theme tokens)
Defined in `THEMES` (dark/light) in the `<script data-dc-script>` block:

| Token | Dark | Light | Used for |
|---|---|---|---|
| `bg` | `#141414` | `#f3f3f0` | page background |
| `topbar` | `#1a1a1c` | `#ffffff` | top bar, panels |
| `border` | `#2a2a2c` | `#dcdcd8` | all hairline borders |
| `text` | `#f2f2f2` | `#181818` | primary text |
| `textSub` | `#8a8a8d` | `#5f5f62` | secondary/muted text |
| `nodeBg` | `#1e1e20` | `#ffffff` | node box fill |
| `chipBg` | `#232325` | `#f0f0ec` | pills, inputs, stat cards |
| `dot` | `#2a2a2c` | `#d6d6d2` | canvas dot-grid |
| `panelBg` | `#1a1a1c` | `#ffffff` | side panel / help panel |
| `shadow` | soft black | soft warm-grey | node box-shadow (theme-aware) |

Accent colors are **not** theme-dependent (`ACCENT` map) — one hue per node category, used for glyph color, connector dots, node border tint, and wire color:
`trigger #ff6d5a` (coral) · `about #5699ff` (blue) · `skill_* #54b8c9` (teal) · `exp_* #f92` (amber) · `proj_* #9b6dd5` (violet) · `achievements #31c4ab` (green) · `contact #3dd68c` (mint).

Running-state border is always n8n's exact orange-red `#ff6d5a`, animated via a rotating conic-gradient (`spinRing` keyframe).

## 3. Typography
- Sans: **Inter** (400–800) — all UI text.
- Mono: **Fira Code** (400–600) — labels, tags, code-ish chrome (subtitles, tech-stack pills, log lines, section placeholders).
- Body copy in the detail panel: 13px / 1.6 line-height, `textSub` color; headings use `text` color, 700–800 weight.

## 4. Canvas layout
Content area is a fixed **1500×660px** virtual canvas, panned/scaled via `transform: translate() scale()`. All node positions live in the `DIMS` object (`{x, y, w, h}` per node id) — edit these to move nodes without touching anything else; wires and the minimap recompute automatically from `DIMS` + live drag state.

Default node box: **80×80px**, `border-radius:16px`. Trigger node only: **100×64px**, pill radius `32px 16px 16px 32px` (matches n8n's trigger shape). Glyph icon centered, 38px, in the node's accent color. Two 10px connector dots (accent-colored) sit at the vertical mid-point of the left/right edges.

### Column map (x-position → cluster)
| x | Cluster | Nodes |
|---|---|---|
| 40 | Trigger | `trigger` |
| 220 | Profile | `about` |
| 420 | Skills (vertical stack, y: 54/174/294/414/534) | `skill_ai, skill_product, skill_frameworks, skill_lang, skill_cloud` |
| 620 / 760 | Experience (horizontal pair, same y) | `exp_fact → exp_kookar` |
| 960 | Projects (vertical stack, y: 34/154/274/394/514) | `proj_vendor, proj_taste, proj_spent, proj_emotion, proj_sentiment` |
| 1160 | Achievements | `achievements` |
| 1360 | Contact | `contact` |

Each cluster has a bold, color-matched, uppercase Fira Code label (12px/800) placed ~26–30px above its topmost node — see the literal label `<div>`s right after the `<svg>` wires block. **If you move a cluster's y-position, move its label to match** (label y ≈ cluster's min node y − 28).

### Wires
`WIRES` is a flat list of `[fromId, toId, color]`. Flow: `trigger → about → (all 5 skills) → exp_fact → exp_kookar → (all 5 projects) → achievements → contact`. Rendered as animated dashed SVG bezier paths (`flow` keyframe), color = the *source* node's accent.

## 5. Node data
Per-category constants at the top of the script:
- `ACCENT`, `GLYPH`, `LABEL` — keyed by node id, drive the collapsed canvas node's look.
- `SKILL_CATS` — 5 categories, each with an `items` array of `{name, icon}` (icon = an Iconify URL via the `si()`/`iconify()` helpers, or omitted for a text-only row).
- `EXPERIENCE` — 2 roles, each with `bullets` (shown in the panel).
- `PROJECTS` — 5 projects, each with `problem` / `design` / `built` (arrays of bullet strings, rendered as three labeled lists in the panel), `technologies`, `links`.
- `ACHIEVEMENTS` — flat `{title, organization}` list, rendered as a table in the panel.

**To add a new node:** add an entry to `DIMS`, `ACCENT`, `GLYPH`, `LABEL`, add its wire(s) to `WIRES`, add it to `EXEC_ORDER` (for the run-workflow animation and its log line in `LOG_LINES`), and add a matching `<sc-if value="{{ selected === 'your_id' }}">` block in the detail panel template with its content.

## 6. Interaction rules
- **Click** a node (no drag) → opens the right-side detail panel (`state.selected`).
- **Drag** a node → repositions it (`state.pos`); movement >4px cancels the click-to-open.
- **Drag empty canvas** (mouse or touch) → pans (`state.pan`).
- **Scroll wheel** → zooms (`state.zoom`, clamped 0.3–1.6); **Fit view** resets pan/zoom (auto-picks a smaller zoom under 680px viewport width).
- **Run workflow** button → steps through `EXEC_ORDER` on a 420ms interval, marking each node `running` (spinning conic border) then `success` (checkmark badge + steady accent ring), appending a line to the execution-log panel (bottom-left).
- **Theme toggle** (top bar) → flips `state.theme`, swaps every `T.*` token live.
- **Help ("?")** → top-left collapsible panel with usage instructions; defaults to collapsed so it never overlaps the Profile label.

## 7. Responsive / mobile
- `@media (max-width:680px)` (in `<helmet><style>`) hides the subtitle line, the status pill, zoom controls, Fit view, log panel, minimap, and the "Get in touch" button (`.tb-hide-sm`), and forces the detail panel to full width (`.panel-drawer`).
- All pan/drag logic is duplicated for touch via `getXY(e)` (normalizes mouse vs. `e.touches[0]`) and mirrored `touchstart/touchmove/touchend` listeners.

## 8. Editing checklist
- Content/copy: edit the literal strings in `SKILL_CATS`, `EXPERIENCE`, `PROJECTS`, `ACHIEVEMENTS`, or the trigger/about `<sc-if>` blocks directly — nothing else needs to change.
- New skill logo: use `si('simple-icons-slug', 'HEXCOLOR')`; for a non-branded/generic icon use `iconify('collection', 'icon-name', 'hexcolor')` (e.g. `iconify('ph','cpu-bold','8a8a8d')`).
- Colors/fonts: only ever edit `THEMES` and the two Google Fonts families in `<helmet>` — never hardcode a new color inline elsewhere.
- Never wrap `dc_write`/`dc_html_str_replace`/`dc_js_str_replace` content in `<![CDATA[ ]]>` — it breaks the logic-class `<script>` block (raw text, not XML).
