# strudel-dreamcore

A small, growing collection of **dreamcore-style** music written in
[Strudel](https://strudel.cc) — the browser version of TidalCycles for live-coding
music. Slow, washed-out, drifting loops meant to play in the background while you
work, read, or zone out.

## How to play

No install required:

1. Open [strudel.cc](https://strudel.cc).
2. Copy a whole `.js` file from this repo and paste it into the editor.
3. Press `Ctrl+Enter` (macOS: `Cmd+Enter`) to play, `Ctrl+.` to stop.

Each track also renders a little visualization (a scrolling `._pianoroll()`) as it plays.

## Tracks

| File | Style | Notes |
|------|-------|-------|
| [`aquatic-ambience.js`](aquatic-ambience.js) | Underwater dreamcore | A piano arrangement of *Aquatic Ambience* (David Wise, *Donkey Kong Country*) — flowing arpeggios, suspended harmony, and heavy reverb. F# minor, ~58 bars, built from reusable section blocks stitched together with `arrange()`. Tinted with a drifting aquatic palette. |
| [`children.js`](children.js) | Dream trance | A remake of Robert Miles' *Children* (1995), the genre's landmark. F minor, 138 BPM, a 44-bar arrangement that grows intro → verse → build → drop → breakdown → final — piano lead, supersaw pad, off-beat bass, and four-on-the-floor drums, layered per-part with `arrange()`. |

## What is "dreamcore"?

Dreamcore is **background music, not foreground music**. Where pop wants to grab you
with a hook, dreamcore wants to surround you and let you float. The recipe is three
feelings — **slow, blurred, drifting** — usually layered as:

- a slow pad of extended chords (maj7 / m7 / add9) drowned in reverb,
- a sparse, repeating melody on a bell-like voice (music box, vibraphone),
- a soft low-passed bass walking the chord roots,
- the occasional high sparkle, and maybe some tape/rain noise underneath.

The goal is a **seamless loop**, not a build to a climax.

## A note on the `.js` extension

The `.js` suffix is only there for editor syntax highlighting. The contents are Strudel
*pattern* syntax (mini-notation like `<...>`, `[...]`, `~`, `,`, `@`), **not** plain
JavaScript — they only run inside Strudel.

## License

Original arrangements and code here are free to use and remix. Note that the underlying
*compositions* may be under their own copyright (e.g. *Aquatic Ambience* is by David Wise
/ Nintendo); the files in this repo are transcriptions/arrangements for educational and
live-coding purposes.
