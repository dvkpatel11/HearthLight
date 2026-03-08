import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const generateRouter = express.Router();

const NANOBANANA_BASE = "https://api.nanobananaapi.ai/api/v1/nanobanana";

async function getRandomAsset(dir) {
  try {
    const fullPath = path.join(__dirname, "..", "assets", dir);
    const files = await fs.readdir(fullPath);
    const validFiles = files.filter((f) => !f.startsWith("."));
    if (validFiles.length === 0) return null;
    const randomFile = validFiles[Math.floor(Math.random() * validFiles.length)];
    return `/assets/${dir}/${randomFile}`;
  } catch (e) {
    return null;
  }
}

// Submit a text-to-image task to NanoBanana, return taskId
async function nanoBananaSubmit(prompt) {
  const apiKey = process.env.NANOBANANA_API_KEY;
  if (!apiKey) throw new Error("NANOBANANA_API_KEY not configured");

  const res = await fetch(`${NANOBANANA_BASE}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      type: "TEXTTOIAMGE", // NanoBanana's spelling
      numImages: 1,
      watermark: false,
    }),
  });

  const data = await res.json();
  if (!res.ok || data.code !== 200) {
    throw new Error(`NanoBanana submit failed: ${data.msg || res.statusText}`);
  }
  return data.data.taskId;
}

// Poll until resultImageUrl is available
async function nanoBananaPoll(taskId, { maxAttempts = 30, intervalMs = 3000 } = {}) {
  const apiKey = process.env.NANOBANANA_API_KEY;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, intervalMs));

    const res = await fetch(`${NANOBANANA_BASE}/record-info?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`NanoBanana poll failed: ${res.statusText}`);

    const status = data?.data?.status;
    const imageUrl = data?.data?.info?.resultImageUrl;

    if (imageUrl) return imageUrl;
    if (status === "FAILED" || status === "failed") {
      throw new Error(`NanoBanana task ${taskId} failed`);
    }
  }

  throw new Error(`NanoBanana task ${taskId} timed out`);
}

/**
 * Generate an image via NanoBanana, download it immediately, and save it to
 * client/public/assets/backgrounds/<theme>.webp — the exact path themeAssets.ts
 * expects. Returns the stable public URL so chronicles never have broken images.
 */
async function nanoBananaGenerateImage(prompt, theme = "golden-warmth") {
  const taskId = await nanoBananaSubmit(prompt);
  const cdnUrl = await nanoBananaPoll(taskId);

  // Download from CDN while the URL is still live
  const dlRes = await fetch(cdnUrl);
  if (!dlRes.ok) throw new Error(`Failed to download NanoBanana image: ${dlRes.status}`);

  const buffer = Buffer.from(await dlRes.arrayBuffer());

  // Write to client/public/assets/backgrounds/<theme>.webp
  // Matches the paths in themeAssets.ts, served by Vite / express.static in prod
  const dir = path.join(__dirname, "..", "..", "client", "public", "assets", "backgrounds");
  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, `${theme}.webp`);
  await fs.writeFile(filePath, buffer);

  return `/assets/backgrounds/${theme}.webp`;
}

const THEMES = {
  "golden-warmth": {
    label: "Golden Warmth",
    imagePrompt:
      "warm golden hour light, soft bokeh, autumn leaves, amber tones, cinematic depth of field, photorealistic, 8k, no people, no text",
  },
  "midnight-bloom": {
    label: "Midnight Bloom",
    imagePrompt:
      "midnight garden, moonlit flowers blooming in darkness, deep indigo and violet tones, ethereal glow, cinematic, 8k, no people, no text",
  },
  "ocean-calm": {
    label: "Ocean Calm",
    imagePrompt:
      "serene ocean at dawn, soft teal and pearl light, gentle waves, mist on water, peaceful, photorealistic, 8k, no people, no text",
  },
  "forest-dawn": {
    label: "Forest Dawn",
    imagePrompt:
      "misty forest at dawn, shafts of golden light through ancient trees, emerald and gold tones, cinematic atmosphere, 8k, no people, no text",
  },
  celestial: {
    label: "Celestial",
    imagePrompt:
      "deep cosmos, nebula in rose gold and midnight blue, stars, vast and intimate simultaneously, cinematic space photography, 8k, no people, no text",
  },
};

function buildProsePrompt(body) {
  const { recipient = {}, occasion = {}, narrative = {}, narrativeContext, language = "English" } = body || {};

  const ctx = narrativeContext || {};

  const subject = ctx.subject || {};
  const relationshipPerspective = ctx.relationshipPerspective || {};
  const settingMood = ctx.settingMood || {};
  const lifeContext = ctx.lifeContext || {};
  const connectionSignal = ctx.connectionSignal || {};
  const messageIntent = ctx.messageIntent || {};
  const closingStyle = ctx.closingStyle || {};
  const styleLayer = ctx.styleLayer || {};

  const traitsFromContext = Array.isArray(ctx.traits) ? ctx.traits : [];
  const traitsFromLegacy =
    typeof narrative.traits === "string"
      ? narrative.traits
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
  const allTraits = traitsFromContext.length ? traitsFromContext : traitsFromLegacy;

  const displayName = subject.displayName || recipient.name || "them";
  const milestone = subject.milestone || occasion.label || "";
  const lifePhase = subject.lifePhase || "";

  const behaviorExample = ctx.behaviorExample || connectionSignal.behaviorOrDynamic || narrative.sharedMemory || "";

  const relationshipType = relationshipPerspective.relationshipType || recipient.relationship || "";
  const narratorPersona = relationshipPerspective.narratorPersona || "";
  const emotionalStance = relationshipPerspective.emotionalStance || "";

  const environmentMood = settingMood.environmentMood || "";
  const symbolicStyle = settingMood.symbolicStyle || "";
  const emotionalAtmosphere = settingMood.emotionalAtmosphere || "";

  const recentChallenges = lifeContext.recentChallenges || "";
  const transitionMoment = lifeContext.transitionMoment || "";
  const chapterTone = lifeContext.chapterTone || narrative.tone || "";

  const sharedMemoryTone = connectionSignal.sharedMemoryTone || narrative.sharedMemory || "";
  const whyTheyMatter = connectionSignal.whyTheyMatter || "";

  const primaryGoal = messageIntent.primaryGoal || "celebrate";
  const emotionalMix = Array.isArray(messageIntent.emotionalMix) ? messageIntent.emotionalMix : ["warm"];

  const wishIntensity = closingStyle.wishIntensity || "poetic";
  const futureOrientation = closingStyle.futureOrientation || "";

  const literaryStyle = styleLayer.literaryStyle || "modern literary, gently luminous, intimate";
  const metaphorDensity = styleLayer.metaphorDensity || "medium";

  const traitsLine = allTraits.length ? `Core traits: ${allTraits.join(", ")}.` : "";
  const emotionalMixLine = emotionalMix.length ? `Emotional mix: ${emotionalMix.join(", ")}.` : "";

  const settingLines = [
    environmentMood && `Environment: ${environmentMood}.`,
    symbolicStyle && `Symbolic setting style: ${symbolicStyle}.`,
    emotionalAtmosphere && `Atmosphere: ${emotionalAtmosphere}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const lifeContextLines = [
    milestone && `Milestone or moment: ${milestone}.`,
    lifePhase && `Life phase descriptor: ${lifePhase}.`,
    transitionMoment && `Current transition or chapter: ${transitionMoment}.`,
    recentChallenges && `Recent responsibilities or challenges: ${recentChallenges}.`,
    chapterTone && `Emotional tone of this chapter: ${chapterTone}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const connectionLines = [
    behaviorExample && `One small behavior or dynamic that captures the relationship: ${behaviorExample}.`,
    sharedMemoryTone && `Shared memory tone or moment to gently weave in: ${sharedMemoryTone}.`,
    whyTheyMatter && `Why they matter to the narrator: ${whyTheyMatter}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const additionalNotes = narrative.notes ? `Additional context from user: ${narrative.notes}` : "";

  const ageInstruction = recipient.age
    ? `Recipient age: ${recipient.age}. Calibrate reading level, emotional pitch, and vocabulary accordingly.`
    : "";

  const tonePermission =
    narrative.tone === "playful & light" || narrative.tone === "celebratory & joyful"
      ? `Tone permission: light wordplay, gentle humour, and an energetic cadence are welcome here. Do not default to literary solemnity. Let the prose smile.`
      : "";

  const styleOverride =
    styleLayer.literaryStyle === "conversational"
      ? `Style override: write as a warm, articulate friend would speak — natural contractions, simple vocabulary, short sentences are fine. Avoid ornate metaphors and literary distance.`
      : "";

  const professionalNote = ["Colleague", "Mentor"].includes(relationshipType)
    ? `Relationship note: maintain professional warmth. Genuine but not overly intimate.`
    : "";

  const sensitiveOccasionNote = (() => {
    const lbl = (occasion.label || "").toLowerCase();
    return lbl.includes("sympathy") || lbl.includes("loss")
      ? `Sensitive occasion: Do NOT use silver-lining framing, toxic positivity, or future-oriented wish language. Honour the weight of the moment. Be present, gentle, and honest.`
      : "";
  })();

  const specialInstructions = [ageInstruction, tonePermission, styleOverride, professionalNote, sensitiveOccasionNote]
    .filter(Boolean)
    .join("\n");

  return `You are an elegant literary author crafting a deeply personal, heartfelt message in ${language}.

Write a beautifully composed personal message for the following person and moment in ${language}. The writing should feel warm, intimate, and genuinely meaningful - not generic.

IMPORTANT: You MUST write the entire prose body in ${language}. Do not provide an English translation unless specifically requested in the user notes. Use the natural idioms, cultural nuances, and polite forms of address appropriate for ${language}.

=== Subject identity ===
Recipient display name: ${displayName}
Relationship archetype: ${relationshipType || "unspecified"}
${lifeContextLines || ""}

${traitsLine || ""}

=== Relationship perspective ===
Narrator relationship: ${relationshipType || "unspecified"}
Narrator persona: ${narratorPersona || "a quiet, observant voice"}
Emotional stance toward them: ${emotionalStance || "tender admiration and care"}

=== Setting mood ===
${settingLines || "Use a subtle, atmospheric backdrop that fits the tone."}

=== Connection signal ===
${connectionLines || "Let the relationship feel specific and lived-in, not abstract."}

=== Message intent ===
Primary goal: ${primaryGoal}
${emotionalMixLine || "Emotional mix: warm."}

=== Closing wish style ===
Closing intensity: ${wishIntensity}
Future orientation: ${futureOrientation || "Offer a blessing for the chapters ahead, grounded in who they already are."}

=== Style layer ===
Literary style: ${literaryStyle}
Metaphor density: ${metaphorDensity}

${additionalNotes ? `=== User Notes ===\n${additionalNotes}` : ""}

${specialInstructions ? `=== Special instructions ===\n${specialInstructions}` : ""}

=== Additional guidance ===
- Prioritize emotional specificity over plot detail.
- You may gently infer connective tissue between details, but do not invent elaborate fictional events.
- Weave in any specific details, traits, or memories so they feel discovered inside the prose, not listed.
- Write 3-5 paragraphs of continuous prose. No titles or section headers.
- Avoid greeting-card clichés. If a line could appear on any card for any person, rewrite it.
- The final paragraph should feel like a genuine, specific wish for their future in this chapter.
- Style: ${literaryStyle}, unhurried and humane.
- Write in second person (you / your) — unless the language selected has a more natural equivalent (e.g., use the appropriate honorific form in Hindi or Bengali).
- Do not include a salutation or sign-off — only the body of the message.`;
}

// Generate prose via Gemini
generateRouter.post("/prose", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = buildProsePrompt(req.body);
    const result = await model.generateContent(prompt);
    const prose = result.response.text().trim();

    res.json({ prose });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Generation failed", detail: err.message });
  }
});

async function generateThemeImage(body) {
  const { theme } = body || {};

  // Local assets take priority — no API call needed
  const localImage = await getRandomAsset(`images/${theme || "golden-warmth"}`);
  if (localImage) return localImage;

  // Fall back to NanoBanana
  const { recipient = {}, occasion = {}, narrative = {}, narrativeContext = {} } = body || {};
  const themeConfig = THEMES[theme] || THEMES["golden-warmth"];

  const relationship =
    (narrativeContext.relationshipPerspective && narrativeContext.relationshipPerspective.relationshipType) ||
    recipient.relationship ||
    "someone dear to the narrator";

  const tone =
    (narrativeContext.lifeContext && narrativeContext.lifeContext.chapterTone) || narrative.tone || "warm & heartfelt";

  const environment = (narrativeContext.settingMood && narrativeContext.settingMood.environmentMood) || "";
  const atmosphere = (narrativeContext.settingMood && narrativeContext.settingMood.emotionalAtmosphere) || "";
  const occasionLabel = occasion.label || "a special moment";

  const detailParts = [
    `for a ${tone.toLowerCase()} chronicle about ${relationship}`,
    `set around ${occasionLabel.toLowerCase()}`,
    environment && `environment: ${environment}`,
    atmosphere && `atmosphere: ${atmosphere}`,
    "no people, no faces, no text, wholesome, respectful, no explicit content, no violence",
  ]
    .filter(Boolean)
    .join(", ");

  const prompt = `${themeConfig.imagePrompt}, ${detailParts}`;
  return await nanoBananaGenerateImage(prompt, theme || "golden-warmth");
}

// NanoBanana is image-only — animation falls back to null gracefully
async function generateThemeAnimation(body) {
  const { theme } = body || {};
  const localAnim = await getRandomAsset(`images/${theme || "golden-warmth"}`);
  if (localAnim && (localAnim.endsWith(".mp4") || localAnim.endsWith(".webm"))) return localAnim;
  return null;
}

generateRouter.post("/image", async (req, res) => {
  try {
    const imageUrl = await generateThemeImage(req.body);
    res.json({ imageUrl });
  } catch (err) {
    console.error("Image generation error:", err);
    res.status(500).json({ error: "Image generation failed", detail: err.message });
  }
});

generateRouter.post("/animation", async (req, res) => {
  try {
    const animationUrl = await generateThemeAnimation(req.body);
    res.json({ animationUrl });
  } catch (err) {
    console.error("Animation generation error:", err);
    res.status(500).json({ error: "Animation generation failed", detail: err.message });
  }
});

generateRouter.post("/audio", async (req, res) => {
  try {
    const { language = "English" } = req.body;
    const langCode = language.toLowerCase() === "hindi" ? "hi" : language.toLowerCase() === "bengali" ? "bn" : "en";
    const localAudio = await getRandomAsset(`audio/${langCode}`);
    if (localAudio) return res.json({ audioUrl: localAudio });
    res.status(500).json({ error: "No audio assets found and no TTS API configured" });
  } catch (err) {
    console.error("Audio generation error:", err);
    res.status(500).json({ error: "Audio generation failed", detail: err.message });
  }
});

function buildMusicPrompt(narrative = {}, occasion = {}) {
  const tone = narrative.tone || "warm & heartfelt";
  const occasionLabel = (occasion.label || "").toLowerCase();

  const toneMap = {
    "warm & heartfelt": "soft acoustic piano, warm strings, gentle and intimate, no percussion",
    "playful & light": "light folk guitar, upbeat acoustic, cheerful and bright",
    "reflective & poetic": "ambient atmospheric piano, sparse and contemplative, minimal",
    "celebratory & joyful": "uplifting orchestral, bright brass, joyful and triumphant",
    "tender & intimate": "quiet solo piano, minimal, close and tender, soft cello",
  };

  let prompt = toneMap[tone] || toneMap["warm & heartfelt"];

  if (occasionLabel.includes("sympathy") || occasionLabel.includes("loss")) {
    prompt = "sparse minimalist piano, quiet, respectful, no percussion, gentle and present";
  } else if (occasionLabel.includes("graduation")) {
    prompt += ", hopeful, triumphant, builds gently";
  } else if (occasionLabel.includes("birthday")) {
    prompt += ", warm celebration, gentle energy";
  }

  return prompt;
}

generateRouter.post("/music", async (req, res) => {
  const { narrative = {}, occasion = {} } = req.body;
  const toneToFolder = {
    "warm & heartfelt": "warm",
    "playful & light": "playful",
    "reflective & poetic": "reflective",
    "celebratory & joyful": "playful",
    "tender & intimate": "warm",
  };
  const folder = toneToFolder[narrative.tone] || "ambient";
  const localAudio = (await getRandomAsset(`audio/${folder}`)) || (await getRandomAsset("audio/ambient"));
  res.json({ musicUrl: localAudio || null });
});

export { THEMES };
