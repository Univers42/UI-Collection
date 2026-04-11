import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const rootDir = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), 'ui-collection-smoke-'));
let tarballPath = '';

function run(command, args, cwd = rootDir) {
  execFileSync(command, args, {
    cwd,
    stdio: 'pipe',
    encoding: 'utf8',
  });
}

try {
  const tarballName = execFileSync('npm', ['pack'], {
    cwd: rootDir,
    stdio: 'pipe',
    encoding: 'utf8',
  }).trim().split('\n').pop();

  if (!tarballName) {
    throw new Error('npm pack did not return a tarball name.');
  }

  tarballPath = resolve(rootDir, tarballName);

  run('npm', ['init', '-y'], tempDir);
  run('npm', ['pkg', 'set', 'type=module'], tempDir);
  run('npm', ['install', tarballPath, 'react'], tempDir);

  writeFileSync(
    join(tempDir, 'smoke.mjs'),
    `
import {
  AssetPickerBoard,
  AssetRenderer,
  assetValueToBoardValue,
  createDefaultAssetPickerTabs,
  parseAssetValue,
  resolveAssetValue,
  serializeAssetSelection,
} from '@univers42/ui-collection';
import { createEmojiPickerTab } from '@univers42/ui-collection/library/components/react/asset-picker';
import { getMediaCollection } from '@univers42/ui-collection/library/media';

const tabs = createDefaultAssetPickerTabs();
const parsed = parseAssetValue('icon:text');
const boardValue = assetValueToBoardValue('icon:text', tabs);
const resolved = resolveAssetValue('icon:text', tabs);
const media = getMediaCollection('svg');

if (typeof AssetPickerBoard !== 'function') {
  throw new Error('Root export AssetPickerBoard is missing.');
}

if (typeof AssetRenderer !== 'function') {
  throw new Error('Root export AssetRenderer is missing.');
}

if (parsed.kind !== 'icon' || parsed.iconId !== 'text') {
  throw new Error('parseAssetValue did not recognize canonical icon values.');
}

if (!boardValue || boardValue.tabId !== 'icons') {
  throw new Error('assetValueToBoardValue did not resolve the icon tab.');
}

if (!resolved || resolved.label !== 'Text') {
  throw new Error('resolveAssetValue did not resolve the icon metadata.');
}

if (serializeAssetSelection('icon:text') !== 'icon:text') {
  throw new Error('serializeAssetSelection did not preserve canonical values.');
}

if (!Array.isArray(media) || media.length === 0) {
  throw new Error('Media subpath import failed.');
}

const emojiTab = createEmojiPickerTab();

if (!emojiTab.showGroups || emojiTab.groupOrder?.length === 0) {
  throw new Error('Emoji tab factory did not expose grouped categories.');
}
`,
    'utf8',
  );

  run('node', ['smoke.mjs'], tempDir);
} finally {
  if (tarballPath) {
    rmSync(tarballPath, { force: true });
  }

  rmSync(tempDir, { recursive: true, force: true });
}
