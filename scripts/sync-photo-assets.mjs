import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { getMediaCollection, resolveMediaUrl } from '../dist/library/media/index.js';

const rootDir = process.cwd();
const outputDir = resolve(rootDir, 'media/photos/optimized');
const manifestPath = resolve(rootDir, 'library/media/generated/photoAssetManifest.ts');
const WIKIMEDIA_DELAY_MS = 1500;

const MIME_TYPE_EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
};

function getExtensionFromUrl(url) {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-z0-9]+)$/iu);

  return match?.[1]?.toLowerCase() ?? '';
}

function getExtensionFromContentType(contentType) {
  if (!contentType) {
    return '';
  }

  const normalized = contentType.split(';')[0].trim().toLowerCase();
  return MIME_TYPE_EXTENSIONS[normalized] ?? '';
}

function getOutputExtension(url, contentType) {
  return getExtensionFromContentType(contentType) || getExtensionFromUrl(url) || 'jpg';
}

function serializeManifest(entries) {
  const lines = [
    'export const PHOTO_ASSET_FILE_NAMES: Record<string, string> = {',
    ...Object.entries(entries)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([id, fileName]) => `  ${JSON.stringify(id)}: ${JSON.stringify(fileName)},`),
    '};',
    '',
  ];

  return lines.join('\n');
}

function wait(ms) {
  return new Promise((resolvePromise) => {
    setTimeout(resolvePromise, ms);
  });
}

function createManifestFromExistingFiles(directory) {
  const manifest = {};

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || entry.name === '.gitkeep') {
      continue;
    }

    const id = entry.name.replace(/\.[a-z0-9]+$/iu, '');
    manifest[id] = entry.name;
  }

  return manifest;
}

async function main() {
  mkdirSync(outputDir, { recursive: true });

  const photos = getMediaCollection('photos');
  const manifest = createManifestFromExistingFiles(outputDir);
  const failures = [];
  let downloaded = 0;

  for (const item of photos) {
    if (manifest[item.id]) {
      continue;
    }

    const sourceUrl = resolveMediaUrl(item.ref);
    const isWikimedia = sourceUrl.includes('commons.wikimedia.org');

    if (sourceUrl.startsWith('file:')) {
      continue;
    }

    try {
      if (isWikimedia) {
        await wait(WIKIMEDIA_DELAY_MS);
      }

      const response = await fetch(sourceUrl, {
        headers: {
          'accept': 'image/*,*/*;q=0.8',
          'user-agent': '@univers42/ui-collection photo sync',
        },
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const extension = getOutputExtension(sourceUrl, response.headers.get('content-type'));
      const fileName = `${item.id}.${extension}`;
      const filePath = resolve(outputDir, fileName);
      const bytes = new Uint8Array(await response.arrayBuffer());

      writeFileSync(filePath, bytes);
      manifest[item.id] = fileName;
      downloaded += 1;
    } catch (error) {
      failures.push({
        id: item.id,
        sourceUrl,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  writeFileSync(manifestPath, serializeManifest(manifest), 'utf8');

  console.log(
    JSON.stringify(
      {
        downloaded,
        packaged: Object.keys(manifest).length,
        failed: failures.length,
        failures: failures.slice(0, 20),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
