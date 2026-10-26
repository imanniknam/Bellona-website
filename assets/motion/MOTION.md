# Hero logo motion spec

Source of truth: `motion.css` (all keyframes are pre-sampled at 40–60 steps with **linear** timing, so motion is velocity-continuous; do not re-time with ease curves) and `hero-mark.svg` (markup + class names). The working prototype is `reference/LogoMotion.dc.html` (its `class Component` holds the scheduler logic below).

## 1. Intro (plays once on mount, 3.7 s)

| Element | Animation | Delay | Duration |
|---|---|---|---|
| `.bm-slab` plinth | `bmRise` fade + settle | 0 | 0.9 s |
| `.bm-bottom` cube 1 | `bmDrop` spring drop from −170 | 0.35 s | 1.1 s |
| `.bm-top` cube 2 | `bmDrop` | 0.9 s | 1.1 s |
| `.bm-wedge` | `bmSnap` spring from left | 1.75 s | 0.8 s |
| `.bm-trace` circuit lines | `bmTrace` dash draw + fade | 2.0 s | 1.3 s |
| `.bm-via` | `bmPop` spring scale | 3.0 s | 0.7 s |

## 2. Idle shuffle (starts at 3.8 s, never a fixed loop)

After the intro, add the class `settled` to `.bm-top`, `.bm-bottom`, `.bm-wedge` and `.bm-ghost`. This switches off their intro animations so they don't replay. Then repeat:

1. Pick a move at random from the pool. Exclude the last 2 moves played (exclude only the last 1 when the pool has 3 or fewer moves).
2. Add `mv-<move>` to the same four groups for the move's duration, plus about 60 ms.
3. Remove it, rest 1.2–3.2 s (random), and pick the next move.

| Move class | Duration | What happens |
|---|---|---|
| `mv-swapL` | 2.8 s | wedge unlocks, cubes exit to opposite sides, trade levels, wedge relocks |
| `mv-swapR` | 2.8 s | mirror of swapL |
| `mv-leap` | 3.2 s | bottom cube leapfrogs over the top one |
| `mv-hop` | 1.8 s | top cube hops and spins 360°, small landing squash |
| `mv-drawer` | 2.6 s | bottom cube slides out like a drawer and back |
| `mv-wedge` | 1.9 s | wedge pops out, spins, relocks |
| `mv-spin` | 2.4 s | both cubes counter-rotate 360° |
| `mv-orbit` | 6.0 s | both cubes fly one lap around the hero, spinning, and land |
| `mv-twin` | 3.2 s | calm out-of-phase float (breather between big moves) |

Every move ends at the identity pose (swaps end in an identical-looking pose), so removing the class never causes a visible jump. To restart the same move twice in a row, remove the class, wait at least one frame (40 ms is safe), then add it again.

## 3. Production rules
- `prefers-reduced-motion: reduce`: show the final static mark. No intro, no shuffle.
- **Off-screen hero:** pause the scheduler when the hero is off-screen (IntersectionObserver), and resume it when the hero is visible again.
- **Mobile, under 768 px:** pool = `twin, hop, wedge, swapL, swapR`. Orbit and leap travel too far for small screens.
- **Overflow:** the SVG uses `overflow: visible`, so orbit/leap travel outside its box. The hero section must clip with `overflow: hidden`.
- **Bundle:** keep motion.css scoped to the hero. Inline the SVG; don't load it with `<img>`.
