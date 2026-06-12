// Aquatic Ambience — Scizzie (orig. David Wise, DKC), arr. Mr. Tyler Larson (MuseScore, piano solo)
// Source score: musescore.com/user/36816858/scores/21830113 (read via SVG note-extraction, exact pitches)
// Key: F# minor (3#), 4/4, dotted ♩=140 -> setcpm(35). 58 bars ≈ 1:39, matches original score length.
//
// Song form — the 58 bars are built from 6 reusable section blocks (each block = N bars = N cycles):
//   intro      6 bars   rising add9 arpeggios split LH->RH (F#m / D / Bm), each held a bar
//   themeA    10 bars   pickup + main melody over harp-like LH runs, high a6-g#6-e6 turnaround
//   interlude  6 bars   LH solo arpeggios w/ turn-back figures (RH tacet)
//   turn       2 bars   two-bar turnaround figure
//   bridge     8 bars   rhythmic pedal riff C#2 -> D2 -> B1 under melody fragments
//   outro      4 bars   turnaround + final rising run onto held e5
//   Order:  intro · themeA · interlude · themeA · intro · turn · bridge · intro · outro   (= 58 bars)
//
// This is a structural cleanup of a hand-written version — verified to produce the EXACT same notes
// (same 201 onsets over 58 cycles). Each section is written once as a `<...>` block and reused via
// arrange([bars, block], ...), which stitches the blocks back-to-back at one bar per cycle.
//
// Two strudel.cc gotchas this layout works around:
//   1. No `//` comments inside a note(`...`) string — the mini-notation parser rejects them.
//      So all labels/comments live OUT here in JS; the `<...>` blocks stay pure notes.
//   2. No `${...}` interpolation inside a note(`...`) string either — strudel transpiles the whole
//      backtick as mini-notation, so a `${x}` blows up the parser. Reuse is done with arrange()
//      on real patterns instead of by gluing strings together.
//
// Visuals (动效): each hand is tinted with an aquatic palette that drifts bar-by-bar, and the whole
// stack is drawn as a scrolling ._pianoroll() — purely visual, the audio is untouched.
//
// Paste the whole file into https://strudel.cc and press play.

setcpm(35);

// ---------------------------------------------------------------------------
// Right hand / melody — section blocks (one bar per line)
// ---------------------------------------------------------------------------
const rhIntro = `<
  [~@4 e4 gs4 a4 e5]
  e5
  [~@4 cs5 gs5 a5 e5]
  e5
  [~@4 a4 e5 fs5 a4]
  a4
>`;

// rhTheme split in two so the red-box phrase can get its own mix: the first 2
// bars are the "head" and bars 3-10 — the red-box phrase — are the "tail". Both
// halves stay on piano, but the tail is reassembled below as a separate, softer
// and wetter layer (lower gain, more room, its own color) via arrange().
const rhThemeHead = `<
  [~@4 a5 gs5 e5 a4]
  [~ a5 gs5 e5 a4 a6 gs6 e6]
>`; // 2 bars -> piano

const rhThemeSynth = `<
  [~@4 a5@2 gs5 e5]
  [e5@2 cs5 e5@3 a4 cs5]
  [cs5@3 ~ cs5 gs5 a5 e5]
  [e5@3 a4 b4 a4 e5@2]
  [~@4 a5@2 gs5 e5]
  [e5@2 e5 e5@2 fs5 a4@2]
  [a4@4 a5 gs5 e5 a4]
  [~ a5 gs5 e5 a4 a6 gs6 e6]
>`; // 8 bars -> tail (softer/wetter piano)

const rhInterlude = `< ~ ~ ~ ~ ~ ~ >`; // RH rests while the LH plays its solo

const rhTurn = `<
  [~@4 a5 gs5 e5 a4]
  [~ a5 gs5 e5 a4 a6 gs6 e6]
>`;

const rhBridge = `<
  [~@4 a5@2 gs5 e5]
  [e5@2 cs5 e5@3 a4 cs5]
  ~
  [~@3 a4 b4 a4 e5@2]
  [~@4 a5 fs5 gs5 [e5,a4]]
  [e5@2 e5 e5 e5@2 fs5 a4]
  a4
  [~ a5 gs5 e5 a4 a6 gs6 e6]
>`;

const rhOutro = `<
  [~@4 a5 gs5 e5 a4]
  [~ a5 gs5 e5 a4 a6 gs6 e6]
  [~@4 e4 gs4 a4 e5]
  e5
>`;

// ---------------------------------------------------------------------------
// Left hand / bass — section blocks (one bar per line)
// ---------------------------------------------------------------------------
const lhIntro = `<
  [fs2 cs3 gs3 a3 ~@4]
  ~
  [d3 a3 e4 fs4 ~@4]
  ~
  [b2 fs3 cs4 d4 ~@4]
  ~
>`;

const lhTheme = `<
  [b2 fs3 cs4 d4 fs4@4]
  [cs3 gs3 cs4 e4 gs4 a4@3]
  [fs2 cs3 gs3 a3 e4 gs4 a4@2]
  a4
  [d3 a3 e4 fs4 ~@4]
  ~
  [b2 fs3 cs4 d4 a4 e5 fs5 a4]
  a4
  [b2 fs3 cs4 d4 fs4@4]
  [cs3 gs3 cs4 e4 gs4 a4@3]
>`;

const lhInterlude = `<
  [fs2 cs3 gs3 a3 e4 gs3 a3 a3]
  a3
  [d3 a3 e4 fs4 cs4 gs4 a4 a4]
  a4
  [b2 fs3 cs4 d4 a3 e3 fs3 fs3]
  fs3
>`;

const lhTurn = `<
  [b2 fs3 cs4 d4 fs4@4]
  [cs3 gs3 cs4 e4 gs4 a4@3]
>`;

const lhBridge = `<
  [cs2@2 cs2 cs2 cs3@2 cs2 cs2]
  [cs2 cs2 cs3@2 ~ cs2 cs2 cs2]
  [d2@2 d2 d2 d3@2 d2 d2]
  [d2 d2 d3@2 ~ d2 d2 d2]
  [b1@2 b1 b1 b2@2 b1 b1]
  [b1 b1 b2@2 ~ b1 b1 b1]
  [b1 b1 b2@2 ~ b1 fs2 b2]
  [cs3 gs3 cs4 e4 gs4 a4@3]
>`;

const lhOutro = `<
  [b2 fs3 cs4 d4 fs4@4]
  [cs3 gs3 cs4 e4 gs4 a4@3]
  [fs2 cs3 gs3 a3 ~@4]
  ~
>`;

// ---------------------------------------------------------------------------
// Stitch the section blocks into the full 58-bar form (one bar per cycle).
// Both hands share the exact same running order; [bars, block] gives each block its length.
// ---------------------------------------------------------------------------
// Right hand is split into two piano layers. Each [10, rhTheme] becomes
// [2, rhThemeHead] (head) + [8, rhThemeSynth] (tail); the OTHER layer rests
// (silence) during those bars. Both arrangements still sum to 58 cycles, so they
// stay bar-aligned with the bass.
const melodyPiano = arrange(
  [6, rhIntro], //  1-6   intro
  [2, rhThemeHead], //  7-8   theme A head (piano)
  [8, silence], //  9-16  theme A tail -> tail layer
  [6, rhInterlude], // 17-22  interlude (RH tacet)
  [2, rhThemeHead], // 23-24  theme A repeat head (piano)
  [8, silence], // 25-32  theme A repeat tail -> tail layer
  [6, rhIntro], // 33-38  intro arpeggios again
  [2, rhTurn], // 39-40  turnaround
  [8, rhBridge], // 41-48  bridge
  [6, rhIntro], // 49-54  intro arpeggios again
  [4, rhOutro], // 55-58  outro
);

const melodySynth = arrange(
  [6, silence], //  1-6   intro (piano)
  [2, silence], //  7-8   theme A head (piano)
  [8, rhThemeSynth], //  9-16  theme A tail
  [6, silence], // 17-22  interlude
  [2, silence], // 23-24  theme A repeat head (piano)
  [8, rhThemeSynth], // 25-32  theme A repeat tail
  [6, silence], // 33-38  intro
  [2, silence], // 39-40  turn
  [8, silence], // 41-48  bridge
  [6, silence], // 49-54  intro
  [4, silence], // 55-58  outro
);

const bass = arrange(
  [6, lhIntro], //  1-6
  [10, lhTheme], //  7-16
  [6, lhInterlude], // 17-22
  [10, lhTheme], // 23-32
  [6, lhIntro], // 33-38
  [2, lhTurn], // 39-40
  [8, lhBridge], // 41-48
  [6, lhIntro], // 49-54
  [4, lhOutro], // 55-58
);

stack(
  // ===== right hand / melody (piano) ===== bright surface ripples
  note(melodyPiano)
    .sound("piano")
    .gain(0.85)
    .room(0.5)
    .color("<aqua turquoise paleturquoise deepskyblue>"),

  // ===== right hand / melody (tail) ===== the red-box phrase, a softer/wetter piano sub-mix
  note(melodySynth)
    .sound("piano")
    .attack(0.02)
    .release(0.3)
    .gain(0.5)
    .room(0.7)
    .color("<gold coral orange>"),

  // ===== left hand / bass ===== deeper water tones
  note(bass)
    .sound("piano")
    .gain(0.5)
    .room(0.4)
    .color("<teal darkcyan steelblue>"),
)._pianoroll();
