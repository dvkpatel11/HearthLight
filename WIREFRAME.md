# Hearthlight v2 — Wireframe & Experience Design

## Design Philosophy
**"Every screen is a scene."**
This isn't a form that generates a card. It's a studio that crafts a film — and the recipient is the star. Mobile-first, cinematic always. Think DreamWorks title sequence energy: every transition has weight, every moment has intention, every pixel earns its place.

---

## PART 1: CREATOR FLOW (The Studio)

The creator is a director. The wizard is their storyboard room. Dark, focused UI — matte blacks, warm golds, soft glows. Every step feels like crafting something premium.

---

### Screen 0: Landing — "The Invitation"

```
┌─────────────────────────────┐
│                             │
│    ✦  (soft floating        │
│        particle glow)       │
│                             │
│      H E A R T H L I G H T │
│                             │
│   "Craft a moment they'll   │
│    never forget."           │
│                             │
│  ┌─────────────────────┐    │
│  │  ✨ Create a Chronicle │  │
│  └─────────────────────┘    │
│                             │
│   ┌──────┐ ┌──────┐        │
│   │ 🎂   │ │ 🎓   │ ...   │
│   │B-day │ │Grad  │        │
│   └──────┘ └──────┘        │
│   Occasion quick-picks      │
│   (float in staggered)      │
│                             │
│  "See an example →"         │
│  (opens demo chronicle)     │
│                             │
└─────────────────────────────┘
```

**Animation:**
- Background: slow-drifting bokeh particles (warm amber, soft white)
- Logo assembles letter-by-letter with a gentle ember glow
- Occasion chips float in from bottom with spring physics
- CTA button has a breathing glow pulse

**Transition out:** Screen dissolves into warm light → wizard fades in

---

### Screen 1: "The Star" — Photo & Identity

```
┌─────────────────────────────┐
│ ← Back              Step 1/5│
│ ─────●────────────────────  │
│                             │
│   WHO IS THIS FOR?          │
│                             │
│   ┌───────────────────┐     │
│   │                   │     │
│   │   ┌───────────┐   │     │
│   │   │           │   │     │
│   │   │  📷 +     │   │     │
│   │   │  Upload   │   │     │
│   │   │  Photo    │   │     │
│   │   │           │   │     │
│   │   └───────────┘   │     │
│   │                   │     │
│   │  (drag or tap)    │     │
│   └───────────────────┘     │
│                             │
│   After upload:             │
│   ┌───────────────────┐     │
│   │  [Photo preview]  │     │
│   │   Styled as a     │     │
│   │   polaroid with   │     │
│   │   slight tilt     │     │
│   │   + soft shadow   │     │
│   └───────────────────┘     │
│                             │
│   Name ___________________  │
│   Age (opt) ______________  │
│                             │
│   Relationship:             │
│   ┌──────┐ ┌──────┐ ┌────┐ │
│   │Friend│ │Parent│ │ +  │ │
│   └──────┘ └──────┘ └────┘ │
│                             │
│   Occasion:                 │
│   ┌──────┐ ┌──────┐ ┌────┐ │
│   │B-day │ │Anniv │ │ +  │ │
│   └──────┘ └──────┘ └────┘ │
│                             │
│   Language: [English ▾]     │
│                             │
│  ┌─────────────────────┐    │
│  │     Next →           │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

**Animation:**
- Upload zone: dashed border animates like a slow marquee
- On photo drop: photo falls in with physics (slight bounce, settles into polaroid frame with tape effect)
- Photo auto-crops face, shows subtle AI processing shimmer as avatar style is previewed
- Chips: press → satisfying scale bounce + haptic (on mobile)

**DreamWorks moment:** After uploading the photo, a tiny sparkle trail circles the photo and a miniature stylized avatar preview peeks out from the corner — "We see them already." This is the first taste of the magic.

**Transition:** Photo shrinks into a floating orb that carries to the next screen

---

### Screen 2: "Their Story" — Personality & Connection

```
┌─────────────────────────────┐
│ ← Back              Step 2/5│
│ ───────────●──────────────  │
│                             │
│   TELL US ABOUT THEM        │
│                             │
│   ┌─ [mini avatar] ────┐   │
│   │  "Sarah"            │   │
│   └─────────────────────┘   │
│                             │
│   What makes them THEM?     │
│   (pick 3-5)                │
│   ┌──────┐ ┌──────┐ ┌────┐ │
│   │Funny │ │Kind  │ │Bold│ │
│   ├──────┤ ├──────┤ ├────┤ │
│   │Wise  │ │Warm  │ │Wild│ │
│   ├──────┤ ├──────┤ ├────┤ │
│   │Loyal │ │Dream │ │Calm│ │
│   └──────┘ └──────┘ └────┘ │
│                             │
│   The "Uniquely Them" moment│
│   ┌─────────────────────┐   │
│   │ "She laughs so hard │   │
│   │  she snorts and     │   │
│   │  it's the best..." │   │
│   │                     │   │
│   └─────────────────────┘   │
│   ↕ grows as you type       │
│                             │
│   ── What's happening ──    │
│      in their life?         │
│   ┌─────────────────────┐   │
│   │ "Starting a new job │   │
│   │  next month..."     │   │
│   └─────────────────────┘   │
│                             │
│   ── Your connection ────   │
│   Why do they matter to you?│
│   ┌─────────────────────┐   │
│   │ "She believed in me │   │
│   │  before I did..."   │   │
│   └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐    │
│  │     Next →           │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

**Animation:**
- Mini avatar floats at top, gently bobbing — reacts to trait selections (selects "Funny" → avatar does a little laugh animation)
- Trait chips: selected chips glow and float slightly above unselected
- Text areas: as user types, subtle warmth gradient builds behind the text — the more they write, the warmer it gets. Visual feedback that says "this is the good stuff."
- Each section reveals with a gentle unfold, not all at once

**DreamWorks moment:** The avatar in the corner subtly mirrors trait selections — pick "Bold" and it strikes a pose, pick "Warm" and it gives a little hug gesture. It's alive. It's already becoming *them*.

---

### Screen 3: "The Mood" — Tone, Music & Voice

```
┌─────────────────────────────┐
│ ← Back              Step 3/5│
│ ──────────────●───────────  │
│                             │
│   SET THE MOOD              │
│                             │
│   How should it feel?       │
│                             │
│   ┌─────────┐ ┌─────────┐  │
│   │ 💛      │ │ 😂      │  │
│   │Heartfelt│ │ Funny   │  │
│   │ soft    │ │ bright  │  │
│   │ glow bg │ │ glow bg │  │
│   └─────────┘ └─────────┘  │
│   ┌─────────┐ ┌─────────┐  │
│   │ 🎭      │ │ ⚡      │  │
│   │ Poetic  │ │ Epic    │  │
│   │         │ │         │  │
│   └─────────┘ └─────────┘  │
│                             │
│   Each card: subtle ambient │
│   animation that previews   │
│   the mood (particles,      │
│   color temp, motion speed) │
│                             │
│   ── Music Vibe ──          │
│   ┌──────┐ ┌──────┐ ┌────┐ │
│   │Acous-│ │Orche-│ │Jazz│ │
│   │tic 🎸│ │stral🎻│ │ 🎷│ │
│   ├──────┤ ├──────┤ ├────┤ │
│   │Lo-fi │ │Pop   │ │Folk│ │
│   │  🎧  │ │  🎤  │ │ 🪕│ │
│   └──────┘ └──────┘ └────┘ │
│   ▶ [5s audio preview]     │
│                             │
│   ── Your Words ──          │
│   Greeting:                 │
│   "Hey Sar Bear..."        │
│                             │
│   Sign-off:                 │
│   "Love always, Danny"     │
│                             │
│   ▸ Advanced voice/style    │
│     (collapsible)           │
│     Literary style: [     ] │
│     Metaphor density: ●──── │
│                             │
│  ┌─────────────────────┐    │
│  │     Next →           │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

**Animation:**
- Tone cards: each has a living background — "Heartfelt" has slow-drifting warm particles, "Funny" has playful bouncing dots, "Epic" has sweeping light streaks, "Poetic" has ink-in-water effects
- Selecting a tone card → entire screen color temperature shifts to match
- Music chips: tapping plays a 5-second AI-generated preview snippet in that genre. Crossfade between selections.
- Background music softly plays matching the current genre selection as user continues filling out the form

**DreamWorks moment:** When tone is selected, the avatar (still floating in corner) adapts its posture and expression to match. "Epic" → heroic stance. "Funny" → playful lean. The whole screen *becomes* the mood.

---

### Screen 4: "The World" — Visual Theme & Scene

```
┌─────────────────────────────┐
│ ← Back              Step 4/5│
│ ─────────────────●────────  │
│                             │
│   BUILD THEIR WORLD         │
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │  [LIVE THEME        │   │
│   │   PREVIEW]          │   │
│   │                     │   │
│   │  Full-bleed preview │   │
│   │  of the selected    │   │
│   │  theme with avatar  │   │
│   │  composited in,     │   │
│   │  parallax on gyro/  │   │
│   │  mouse              │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
│   Theme:                    │
│   ┌────┐┌────┐┌────┐┌────┐ │
│   │    ││    ││    ││    │ │
│   │Ench││Gold││Cele││Sere│ │
│   │ant ││Hour││sti ││ne  │ │
│   │For ││    ││al  ││Gar │ │
│   │est ││    ││    ││den │ │
│   └────┘└────┘└────┘└────┘ │
│   (horizontal scroll,       │
│    mini preview cards)      │
│                             │
│   ▸ Scene Details           │
│     (collapsible)           │
│     Environment: [preset ▾] │
│     Atmosphere: "________"  │
│                             │
│  ┌─────────────────────┐    │
│  │     Next →           │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

**Animation:**
- Hero area: LIVE preview — not a static thumbnail. The selected theme renders as an animated scene with depth layers (foreground, midground, background) responding to device gyroscope (mobile) or mouse position (desktop)
- Avatar is composited into the scene, standing in the world
- Theme cards: horizontal carousel with momentum scroll. Each card is a mini living scene (subtle animation loops)
- Switching themes: crossfade with a dimensional warp — the world *transforms* around the avatar

**DreamWorks moment:** This is the "through the wardrobe" screen. When you select a theme, the preview expands to fill the screen for 1.5 seconds — you're *inside* the world. Then it settles back into the UI frame. The avatar waves at you from inside the scene.

---

### Screen 5: "The Premiere" — Generate, Preview & Share

```
┌─────────────────────────────┐
│ ← Back              Step 5/5│
│ ────────────────────────●   │
│                             │
│   YOUR CHRONICLE            │
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │  GENERATING...      │   │
│   │                     │   │
│   │  [Avatar animates   │   │
│   │   through a         │   │
│   │   mini-story:       │   │
│   │                     │   │
│   │   1. Sits at desk   │   │
│   │   2. Writes with    │   │
│   │      quill          │   │
│   │   3. Music notes    │   │
│   │      float up       │   │
│   │   4. Paints a scene │   │
│   │   5. Holds up       │   │
│   │      finished work  │   │
│   │      + sparkle]     │   │
│   │                     │   │
│   │  "Crafting Sarah's  │   │
│   │   story..." (prose) │   │
│   │  "Composing her     │   │
│   │   melody..."(music) │   │
│   │  "Painting her      │   │
│   │   world..."(image)  │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
│   ── AFTER GENERATION ──    │
│                             │
│   ▶ [Full Preview Button]   │
│   (plays the entire         │
│    chronicle experience)    │
│                             │
│   ┌─ Prose ─────────────┐   │
│   │ "Hey Sar Bear..."   │   │
│   │  [generated prose]   │   │
│   │ "Love always, Danny"│   │
│   │         [Edit ✏️]    │   │
│   └─────────────────────┘   │
│                             │
│   ♫ Music Preview ▶ ────── │
│   🖼 Scene Preview (thumb)  │
│   🧑 Avatar Preview         │
│                             │
│   ┌─────────────────────┐   │
│   │  ✨ Share Chronicle   │   │
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │  Copy Link 🔗        │   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**Animation:**
- THE GENERATION SCREEN IS THE SHOW. While AI models work (15-30s), the avatar performs a crafting story. Not a spinner. Not a progress bar. A **performance**.
- Stage 1: Avatar sits at a tiny desk, picks up a quill → "Writing their story..."
- Stage 2: Musical notes float from the quill → "Composing their melody..."
- Stage 3: Avatar lifts a paintbrush, paints in the air → "Painting their world..."
- Stage 4: Everything swirls together → avatar holds up a glowing scroll → "Ready!"
- Each stage maps to real generation progress (prose → music → image)

**DreamWorks moment:** The loading experience is so good people don't want it to end. It's the Pixar lamp. The DreamWorks kid on the moon. It's *branded entertainment* that masks wait time.

---

## PART 2: VIEWER FLOW (The Experience)

This is the main event. The recipient opens a link and experiences a 60-90 second cinematic journey. Every frame is intentional. No UI chrome. No nav bars. Pure theater.

---

### Scene 1: "The Arrival" — Envelope/Gift

```
┌─────────────────────────────┐
│                             │
│                             │
│                             │
│                             │
│      ┌───────────────┐      │
│      │               │      │
│      │   ✉️           │      │
│      │   Beautiful    │      │
│      │   envelope     │      │
│      │   with wax     │      │
│      │   seal         │      │
│      │               │      │
│      │  "For Sarah"  │      │
│      │               │      │
│      └───────────────┘      │
│                             │
│     (floating particles     │
│      drift around it)       │
│                             │
│   "Tap to open"             │
│   (gentle pulse)            │
│                             │
│                             │
└─────────────────────────────┘
```

**Full-screen. No chrome.** Dark background with volumetric light behind the envelope.

**Animation:**
- Envelope drifts down from above with physics (slight rotation, air resistance)
- Wax seal has the occasion icon embossed (cake for birthday, etc.)
- Particles orbit the envelope — warm golden fireflies
- Recipient's name in elegant script on the front
- Envelope has subtle paper texture, shadow responds to gyro/mouse
- "Tap to open" text breathes (opacity pulse)

**On tap/click:**
- Wax seal cracks with a satisfying snap (haptic + sound)
- Envelope unfolds — light pours out from inside
- Camera zooms INTO the light
- 0.8s white flash transition

**Audio:** Soft ambient drone. Seal crack sound. Whoosh into light.

---

### Scene 2: "The Reveal" — Avatar Entrance

```
┌─────────────────────────────┐
│                             │
│  (Theme world fills the     │
│   entire screen — parallax  │
│   depth layers moving)      │
│                             │
│                             │
│                             │
│         ┌─────────┐         │
│         │         │         │
│         │ AVATAR  │         │
│         │ emerges │         │
│         │ from    │         │
│         │ light   │         │
│         │         │         │
│         └─────────┘         │
│                             │
│      "Sarah"                │
│      (name writes itself    │
│       in elegant script)    │
│                             │
│                             │
│                             │
└─────────────────────────────┘
```

**Animation:**
- White flash resolves into the generated theme world (Enchanted Forest, Golden Hour, etc.)
- Parallax layers establish depth — camera slowly pushes in
- Avatar materializes: starts as a silhouette of light particles → particles condense → avatar forms → does a signature gesture (wave, smile, twirl based on traits)
- Name writes itself below in script font with ink-flow animation
- Background music begins — first notes of the personalized track

**Duration:** ~5 seconds

**Audio:** Music fades in. Soft magical chime on avatar reveal.

---

### Scene 3: "The Greeting" — Sender's Voice

```
┌─────────────────────────────┐
│                             │
│  (World + avatar still      │
│   visible, slightly         │
│   depth-of-field blurred)   │
│                             │
│                             │
│                             │
│      ┌─────────────────┐    │
│      │                 │    │
│      │ "Hey Sar Bear"  │    │
│      │                 │    │
│      │  (handwritten   │    │
│      │   style, writes │    │
│      │   itself)       │    │
│      │                 │    │
│      └─────────────────┘    │
│                             │
│                             │
│                             │
│                             │
│                             │
└─────────────────────────────┘
```

**Animation:**
- World shifts to softer focus — avatar settles into a resting pose
- Greeting text appears in handwritten font, animated stroke-by-stroke as if being written in real-time
- Subtle paper/parchment texture behind text (glass card, very transparent)
- Text glows warmly once complete
- Holds for 2 beats, then transitions

**Audio:** Music continues softly. Optional: ElevenLabs reads the greeting in a warm voice.

**Duration:** ~3 seconds

---

### Scene 4: "The Chronicle" — The Main Reading

```
┌─────────────────────────────┐
│                             │
│  (World in background,      │
│   reading overlay active)   │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │  [Glassmorphism card] │  │
│  │                       │  │
│  │  Prose appears line   │  │
│  │  by line, paragraph   │  │
│  │  by paragraph.        │  │
│  │                       │  │
│  │  Key emotional words  │  │
│  │  glow briefly as      │  │
│  │  they appear.         │  │
│  │                       │  │
│  │  "You've always been  │  │
│  │   the kind of person  │  │
│  │   who makes a room    │  │
│  │   brighter just by    │  │
│  │   walking in..."      │  │
│  │                       │  │
│  │  Avatar peeks from    │  │
│  │  the side, reacting   │  │
│  │  to the prose.        │  │
│  │                       │  │
│  │  ↓ scroll / auto      │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ♫ ▶ ━━━━━━━●━━━━━ 🔊      │
│  (minimal music controls)   │
│                             │
└─────────────────────────────┘
```

**Animation:**
- Glassmorphism reading card slides up from bottom
- Prose appears with a typewriter cadence — not instant, not painfully slow. Rhythmic.
- Key emotional words (detected by sentiment) briefly glow gold
- Background world still moves with parallax but overlay is lighter (~20% opacity) so it remains vivid
- Avatar is positioned to the side/corner, making small reactions:
  - Laughs at funny parts
  - Puts hand on heart at emotional parts
  - Looks up dreamily at poetic parts
- User can scroll manually OR let it auto-advance (toggle)
- Paragraphs have breathing room — generous whitespace

**Audio:** Personalized music plays throughout. Optionally, ElevenLabs narrates the prose (toggle: "Listen" mode vs "Read" mode).

**Duration:** User-paced, ~20-40 seconds typical

---

### Scene 5: "The Crescendo" — The Wish Moment

```
┌─────────────────────────────┐
│                             │
│  (Reading card fades away)  │
│                             │
│  (World INTENSIFIES —       │
│   colors saturate,          │
│   particles multiply,       │
│   music swells)             │
│                             │
│                             │
│                             │
│         ┌─────────┐         │
│         │         │         │
│         │ AVATAR  │         │
│         │ center  │         │
│         │ stage,  │         │
│         │ BIG     │         │
│         │         │         │
│         └─────────┘         │
│                             │
│   ✨ "Happy 30th Birthday,  │
│       Sarah!" ✨             │
│                             │
│   (Text EXPLODES in with    │
│    particle burst +         │
│    occasion-specific        │
│    effects: candles,        │
│    confetti, fireworks,     │
│    floating lanterns)       │
│                             │
│                             │
└─────────────────────────────┘
```

**This is the CLIMAX. This is the poster shot. The DreamWorks money frame.**

**Animation:**
- Reading card dissolves into particles that scatter
- Camera pulls back — reveals the full world in maximum glory
- Colors punch to full saturation
- Music hits the chorus / swell
- Avatar moves to center, grows larger, does a celebration animation:
  - Birthday: blows out candles that float up as stars
  - Graduation: tosses cap, cap turns into shooting star
  - Anniversary: two avatar silhouettes dance
  - General: arms wide, fireworks behind
- Wish text flies in with kinetic typography — each word lands with weight
- Occasion-specific particle effects ERUPT:
  - Birthday: confetti + candle flames that become fireflies
  - Graduation: paper planes + golden ribbons
  - Anniversary: floating hearts + rose petals
  - Farewell: floating lanterns ascending
- Everything holds at peak for 3 beats

**Audio:** Music PEAKS. Sound effects layer on (confetti pop, whoosh, magical shimmer). If Suno generated lyrics, the recipient's name is sung HERE.

**Duration:** ~5-8 seconds of pure spectacle

---

### Scene 6: "The Farewell" — Sign-Off

```
┌─────────────────────────────┐
│                             │
│  (World settles to gentle   │
│   warmth. Particles slow.   │
│   Music softens to final    │
│   notes.)                   │
│                             │
│                             │
│                             │
│                             │
│   "Love always,"            │
│                             │
│   "Danny"                   │
│                             │
│   (handwritten, same style  │
│    as greeting — bookends)  │
│                             │
│                             │
│  Avatar gives a final       │
│  gesture — a wave, a bow,   │
│  blowing a kiss — then      │
│  slowly fades into          │
│  particles that drift       │
│  upward like embers.        │
│                             │
│                             │
│                             │
│                             │
└─────────────────────────────┘
```

**Animation:**
- World de-saturates gently to a warm, soft palette
- Particles slow down, become fewer, larger, more peaceful
- Sign-off text appears in same handwritten stroke animation as greeting
- Avatar does one final gesture (contextual) then dissolves gracefully:
  - Particles lift upward like embers from a campfire
  - Each particle twinkles once before fading
- Music resolves to its final chord
- World slowly dims

**Audio:** Music winds down to final notes. Soft ambient returns. Silence.

**Duration:** ~5 seconds + hold

---

### Scene 7: "The Afterglow" — Post-Experience

```
┌─────────────────────────────┐
│                             │
│  (Soft dark background,     │
│   a few remaining           │
│   floating embers)          │
│                             │
│                             │
│      You received a         │
│      Chronicle from         │
│      Danny ♡                │
│                             │
│                             │
│  ┌─────────────────────┐    │
│  │  ▶ Experience Again  │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  💛 Send a Reply     │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  ✨ Create Your Own   │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  📥 Save to Photos   │    │
│  └─────────────────────┘    │
│                             │
│                             │
│      Crafted with           │
│      Hearthlight ✦          │
│                             │
└─────────────────────────────┘
```

**Animation:**
- Fades in gently from the farewell darkness
- Buttons appear staggered, floating up
- "Experience Again" has a subtle loop animation suggesting replay
- "Create Your Own" is the viral hook — this is how the product spreads

**Key features:**
- **Replay** — relive the full experience
- **Reply** — create a chronicle BACK (viral loop!)
- **Save** — export as video/image for social sharing (generates a highlight reel)
- **Create** — the growth engine

---

## PART 3: TECHNICAL ANIMATION STACK

### Recommended Technologies
```
Animation Layer:
├── framer-motion          — page transitions, layout animations, gestures
├── @react-spring/web      — physics-based spring animations
├── lottie-react           — pre-built micro-animations (confetti, sparkles)
├── three.js + @react-three/fiber  — 3D particle systems, depth, parallax
├── GSAP                   — timeline sequencing for the viewer experience
└── CSS Houdini / View Transitions API — smooth page morphs

Avatar System:
├── InstantID / IP-Adapter — photo → consistent stylized character
├── LivePortrait           — single image → animated expressions
├── Rive                   — interactive avatar state machine
└── Spine (2D) or Ready Player Me (3D)  — if going deeper

Audio:
├── Suno API               — personalized music with lyrics
├── ElevenLabs API         — prose narration
├── Howler.js              — audio playback, crossfade, sync
└── Tone.js                — if doing any realtime audio effects

Visual Generation:
├── Runway / Kling / Veo   — video backdrop (5-10s loops)
├── Flux / DALL-E 3        — static scene generation (current)
└── Stable Video Diffusion — image-to-video for parallax scenes
```

### Performance Budget (Mobile)
```
Target: 60fps on iPhone 12 / mid-range Android
- Three.js scene: < 50k triangles, 1 draw call for particles
- Lottie files: < 100KB each
- Total JS bundle: < 300KB gzipped
- Image assets: WebP, lazy-loaded, max 500KB hero
- Video backdrop: 720p WebM, < 3MB, loop
- Music: 128kbps AAC, streamed
- First meaningful paint: < 2s
- Time to interactive: < 3s
```

### Animation Timeline (Viewer Experience)
```
0.0s  ──── Envelope arrives (drift down, settle)
1.5s  ──── "Tap to open" appears
TAP   ──── Seal cracks → light burst → zoom in
+0.8s ──── White flash
+1.5s ──── World resolves, parallax establishes
+3.0s ──── Avatar materializes from particles
+4.5s ──── Name writes itself
+6.0s ──── Greeting appears (handwritten)
+9.0s ──── Reading card slides up, prose begins
       ──── (user-paced section, ~20-40s)
DONE  ──── Reading card dissolves
+1.0s ──── World intensifies, music swells
+2.5s ──── Avatar centers, celebration animation
+3.5s ──── WISH TEXT EXPLODES IN
+4.0s ──── Particle effects peak
+7.0s ──── Effects settle, world softens
+9.0s ──── Sign-off appears
+12.0s ──── Avatar farewell → ember dissolve
+15.0s ──── Fade to afterglow screen

Total: ~60-90 seconds
```

---

## PART 4: DATA MODEL

### ChronicleInput (Creator submits)
```typescript
interface ChronicleInput {
  // The Star
  photo: File                           // 1 required (up to 3)
  recipientName: string
  recipientAge?: number
  relationship: RelationshipType
  occasion: OccasionType
  language: string

  // Their Story
  traits: string[]                      // 3-5 selections
  uniquelyThem: string                  // free text, the personal moment
  lifeContext?: string                  // what's happening in their life
  whyTheyMatter: string                // the connection

  // The Mood
  tone: 'heartfelt' | 'funny' | 'poetic' | 'epic'
  musicMood: 'warm' | 'celebratory' | 'nostalgic' | 'epic' | 'playful'
  musicGenre: 'acoustic' | 'orchestral' | 'jazz' | 'pop' | 'lofi' | 'folk'
  greeting: string                      // human-written
  signOff: string                       // human-written
  senderName: string

  // The World
  visualTheme: ThemeType
  sceneEnvironment?: string
  sceneAtmosphere?: string

  // Advanced (collapsible)
  literaryStyle?: string
  metaphorDensity?: number              // 0-1 slider
  additionalNotes?: string
}
```

### Chronicle (Stored + served to viewer)
```typescript
interface Chronicle {
  id: string
  slug: string
  createdAt: string

  // Identity
  recipientName: string
  recipientAge?: number
  occasion: OccasionType
  senderName: string

  // Generated content
  prose: string
  greeting: string
  signOff: string

  // Generated assets
  avatarUrl: string                     // stylized avatar image/animation
  avatarAnimationData?: object          // Rive/Spine state machine data
  backgroundUrl: string                 // scene image or video loop URL
  musicUrl: string                      // generated music track URL
  narrationUrl?: string                 // ElevenLabs prose narration

  // Theme & styling
  visualTheme: ThemeType
  tone: ToneType
  colorPalette: {
    primary: string
    accent: string
    background: string
    text: string
  }

  // Viewer experience config
  occasionEffects: OccasionEffectType   // confetti, lanterns, fireworks, etc.
  avatarGestures: string[]              // celebration, wave, laugh, etc.
}
```

---

## Summary: What Makes This "DreamWorks Level"

1. **No dead pixels** — every screen has ambient life (particles, parallax, micro-motion)
2. **The loading screen IS content** — avatar crafting story > spinner
3. **The viewer experience is a FILM** — 7 acts, scored music, choreographed
4. **The avatar is a character** — it reacts, emotes, celebrates, says goodbye
5. **Sound design matters** — seal crack, whoosh, musical sync, ambient layers
6. **Transitions are invisible** — no hard cuts, everything morphs/dissolves/transforms
7. **The human bookends** — greeting and sign-off in handwritten style = authenticity
8. **The afterglow is a growth engine** — reply + create your own = viral loop
