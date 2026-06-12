// Children — Robert Miles (1995, the dream-trance landmark) · Strudel remake
// Pitches from: a public piano arrangement on flat.io (flat.io/score/662561435af52f030f4c10b8-children,
//          extracted note-by-note from its revisions/last/json MusicXML-JSON, F minor / 4 flats)
// Harmony/key cross-checked against Hooktheory (F minor, 138 BPM, 4/4, the VI chord = Db)
// Chord loop: Dbmaj7 -> Bbm7 -> Fm7 -> Fm7 (a 4-bar loop running through the whole track)
//
// Arrangement (44 bars per round, 1 bar = 1 cycle, setcpm(34.5) = 138 BPM, whole track loops after ~76s):
//   intro      8 bars   warm pad + the signature sustained theme (score M1-8, original form)
//   verse      8 bars   piano theme + left-hand broken chords (score M9-16), no drums
//   build      8 bars   four-on-the-floor kick enters + off-beat hi-hat + off-beat bass
//   drop       8 bars   full arrangement: supersaw chord stabs + snare + two-layer hats
//   breakdown  4 bars   only pad + the B-section melody (Db5-C5-Ab4... a descending resolution)
//   final      8 bars   the full arrangement once more, then the track loops from intro
//
// House rules: comments live outside the backticks only; no .arp(); no template-string interpolation.

setcpm(34.5)

// ---- Theme A · intro sustained version (score M1-8) ----
const introMel = note(`<
  f5
  [f5@4 ab5@2 g5 eb5]
  eb5
  [eb5@4 ab5@2 g5 c5]
  c5
  [c5@4 ab5@2 g5 ab4]
  ab4
  [ab4@6 [f4 g4] [ab4 c5]]
>`)

// ---- Theme A+B · full 8-bar verse (score M9-16) ----
const verseMel = note(`<
  f5
  [f5@4 ab5@2 g5 eb5]
  eb5
  [eb5@6 eb5 [db5 c5]]
  [db5@2 c5 ab4@5]
  [ab4 g4@3 ab4@2 c5 f4]
  f4
  [f4@6 [f4 g4] [ab4 c5]]
>`)

// ---- Theme B · breakdown 4 bars (score M13-16) ----
const breakMel = note(`<
  [db5@2 c5 ab4@5]
  [ab4 g4@3 ab4@2 c5 f4]
  f4
  [f4@6 [f4 g4] [ab4 c5]]
>`)

// ---- Piano left-hand broken chords (score M9-12 as-is, root-5th-9th) ----
const arpBass = note(`<
  [db3 ab3 eb4 db3 ab3 eb4@3]
  [bb2 f3 c4 bb2 f3 c4@3]
  [f3 c4 g4 f3 c4 g4 f3 c4]
  [g4 f3 c4 g4 f3 c4 eb4@2]
>`)

// ---- trance off-beat bass ----
const offBass = note(`<
  [~ db1 ~ db1 ~ db1 ~ db1]
  [~ bb1 ~ bb1 ~ bb1 ~ bb1]
  [~ f1 ~ f1 ~ f1 ~ f1]
  [~ f1 ~ f1 ~ f1 ~ f1]
>`)

// ---- supersaw chord stabs (off-beats in the drop) ----
const stabs = note(`<
  [~ [db4,f4,ab4] ~ [db4,f4,ab4] ~ [db4,f4,ab4] ~ [db4,f4,ab4]]
  [~ [bb3,db4,f4] ~ [bb3,db4,f4] ~ [bb3,db4,f4] ~ [bb3,db4,f4]]
  [~ [c4,f4,ab4] ~ [c4,f4,ab4] ~ [c4,f4,ab4] ~ [c4,f4,ab4]]
  [~ [c4,f4,ab4] ~ [c4,f4,ab4] ~ [c4,f4,ab4] ~ [c4,f4,ab4]]
>`)

// ---- harmony pad (4-bar loop auto-aligns to the 8-bar sections) ----
const pad = chord("<Dbmaj7 Bbm7 Fm7 Fm7>").dict('ireal').voicing()
  .s("supersaw").detune(0.2)
  .lpf(sine.slow(16).range(500, 2200))
  .attack(0.8).release(1.5).room(0.8)

const REST = note("~")

stack(
  // 🎹 lead piano — the soul of Children is this piano
  arrange(
    [8, introMel],
    [8, verseMel],
    [8, verseMel],
    [8, verseMel],
    [4, breakMel],
    [8, verseMel]
  ).sound("piano").gain(0.9).room(0.5).delay(0.25).delaytime(0.33).delayfeedback(0.3),

  // 🌫️ pad bed — always present, brighter in the drop
  arrange(
    [8, pad.gain(0.25)],
    [8, pad.gain(0.16)],
    [8, pad.gain(0.2)],
    [8, pad.gain(0.28)],
    [4, pad.gain(0.25)],
    [8, pad.gain(0.28)]
  ),

  // 🎸 bass — verse uses the score's left-hand piano; electronic sections use an off-beat saw
  arrange(
    [8, REST],
    [8, arpBass.sound("piano").gain(0.55).room(0.4)],
    [8, offBass.sound("sawtooth").lpf(700).decay(0.18).sustain(0).gain(0.55)],
    [8, offBass.sound("sawtooth").lpf(900).decay(0.18).sustain(0).gain(0.6)],
    [4, REST],
    [8, offBass.sound("sawtooth").lpf(900).decay(0.18).sustain(0).gain(0.6)]
  ),

  // ⚡ supersaw stab — drop / final only
  arrange(
    [8, REST],
    [8, REST],
    [8, REST],
    [8, stabs.s("supersaw").detune(0.15).lpf(2400).attack(0.01).decay(0.15).sustain(0.1).room(0.4).gain(0.18)],
    [4, REST],
    [8, stabs.s("supersaw").detune(0.15).lpf(2400).attack(0.01).decay(0.15).sustain(0.1).room(0.4).gain(0.18)]
  ),

  // 🥁 kick — enters at build
  arrange(
    [8, s("~")],
    [8, s("~")],
    [8, s("bd*4").gain(0.5)],
    [8, s("bd*4").gain(0.58)],
    [4, s("~")],
    [8, s("bd*4").gain(0.58)]
  ),

  // 🥁 snare on 2 & 4 — drop / final only
  arrange(
    [8, s("~")],
    [8, s("~")],
    [8, s("~")],
    [8, s("~ sd ~ sd").gain(0.28)],
    [4, s("~")],
    [8, s("~ sd ~ sd").gain(0.28)]
  ),

  // 🎩 hi-hat — off-beats at build, denser in the drop
  arrange(
    [8, s("~")],
    [8, s("~")],
    [8, s("[~ hh]*4").gain(0.18)],
    [8, s("hh*8").gain(0.13)],
    [4, s("~")],
    [8, s("hh*8").gain(0.13)]
  )
)
