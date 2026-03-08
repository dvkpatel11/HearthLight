import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { THEMES } from "../routes/generate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");
const publicRoot = path.join(repoRoot, "client", "public");

const apiKey = process.env.NANOBANANA_API_KEY;
const BASE_URL = "https://api.nanobananaapi.ai/api/v1/nanobanana";

if (!apiKey) {
  console.error("NANOBANANA_API_KEY is not set in server/.env; cannot generate assets.");
  process.exit(1);
}

const backgroundTasks = Object.entries(THEMES).map(([id, cfg]) => ({
  id,
  kind: "background",
  prompt: cfg.imagePrompt,
  outPath: path.join(publicRoot, "assets", "backgrounds", `${id}.webp`),
}));

const textureTasks = [
  {
    id: "parchment",
    kind: "texture",
    prompt:
      "subtle parchment paper texture, warm ivory, fine grain, no text, no watermark, seamless, soft lighting, high resolution",
    outPath: path.join(publicRoot, "assets", "textures", "parchment.webp"),
  },
  {
    id: "mist",
    kind: "texture",
    prompt:
      "soft atmospheric mist overlay, transparent edges, gentle light bloom, no people, no text, seamless, cinematic lighting",
    outPath: path.join(publicRoot, "assets", "textures", "mist.webp"),
  },
  {
    id: "light-rays",
    kind: "texture",
    prompt:
      "subtle light rays overlay, diagonal beams, very soft, transparent background, no people, no text, cinematic, high resolution",
    outPath: path.join(publicRoot, "assets", "textures", "light-rays.webp"),
  },
];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDirFor(filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Submit a generation task to NanoBanana and return the taskId.
 */
async function submitTask(prompt) {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      type: "TEXTTOIAMGE", // NanoBanana's spelling (not our typo)
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

/**
 * Poll until the task is done, then return the resultImageUrl.
 * Throws if it fails or times out.
 */
async function pollForResult(taskId, { maxAttempts = 30, intervalMs = 3000 } = {}) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, intervalMs));

    const res = await fetch(`${BASE_URL}/record-info?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`NanoBanana poll failed: ${res.statusText}`);

    const info = data?.data?.info;
    const status = data?.data?.status;

    if (info?.resultImageUrl) {
      return info.resultImageUrl;
    }

    // Surface any hard failure early
    if (status === "FAILED" || status === "failed") {
      throw new Error(`NanoBanana task ${taskId} failed`);
    }

    console.log(`  attempt ${attempt}/${maxAttempts} — status: ${status || "pending"}`);
  }

  throw new Error(`NanoBanana task ${taskId} timed out after ${maxAttempts} attempts`);
}

async function generateAndSaveImage(prompt, outPath) {
  console.log(`→ Generating: ${path.basename(outPath)}`);
  await ensureDirFor(outPath);

  const taskId = await submitTask(prompt);
  console.log(`  taskId: ${taskId}`);

  const imageUrl = await pollForResult(taskId);
  console.log(`  image ready: ${imageUrl}`);

  const dlRes = await fetch(imageUrl);
  if (!dlRes.ok) throw new Error(`Download failed: ${dlRes.status} ${dlRes.statusText}`);

  const buffer = Buffer.from(await dlRes.arrayBuffer());
  await fs.writeFile(outPath, buffer);

  console.log(`✓ Wrote ${outPath}`);
}

async function main() {
  const tasks = [...backgroundTasks, ...textureTasks];

  for (const task of tasks) {
    if (await fileExists(task.outPath)) {
      console.log(`⏭  Skipping ${task.kind} "${task.id}" (already exists).`);
      continue;
    }

    try {
      await generateAndSaveImage(task.prompt, task.outPath);
    } catch (err) {
      console.error(`✗ Failed ${task.kind} "${task.id}":`, err.message);
    }
  }

  console.log("\nDone seeding visual assets.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
