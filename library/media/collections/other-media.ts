import { createMediaRef } from '../providers.js';
import type { MediaRef } from '../types.js';
import { defineMediaCollection } from '../utils.js';

function soundHelixRef(trackNumber: number): MediaRef {
  return createMediaRef('url', `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${trackNumber}.mp3`);
}

function khronosModelRef(modelName: string): MediaRef {
  return createMediaRef(
    'url',
    `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/${modelName}/glTF-Binary/${modelName}.glb`,
  );
}

function sampleDocumentRef(filename: string): MediaRef {
  return createMediaRef('url', `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/${filename}`);
}

type OtherMediaSeed = readonly [
  id: string,
  label: string,
  category: 'audio' | 'documents' | 'lottie' | '3d',
  kind: 'audio' | 'document' | 'lottie' | 'model-3d',
  pathOrName: string,
  tags: string[],
  mimeType?: string,
];

function createOtherMediaRef(
  category: OtherMediaSeed[2],
  kind: OtherMediaSeed[3],
  pathOrName: string,
): MediaRef {
  if (category === 'audio') {
    return createMediaRef('local', `/media/other-media/audio/${pathOrName}`);
  }

  if (category === 'documents') {
    return createMediaRef('local', `/media/other-media/documents/${pathOrName}`);
  }

  if (category === 'lottie') {
    return createMediaRef('local', `/media/other-media/lottie/${pathOrName}`);
  }

  if (kind === 'model-3d') {
    return createMediaRef('local', `/media/other-media/3d/${pathOrName}`);
  }

  return createMediaRef('local', `/media/other-media/${pathOrName}`);
}

const EXTRA_OTHER_MEDIA_ITEMS = ([
  ['audio-ui-soft-click', 'Soft Click', 'audio', 'audio', 'ui-soft-click.mp3', ['audio', 'ui', 'click', 'interface'], 'audio/mpeg'],
  ['audio-ui-glass-chime', 'Glass Chime', 'audio', 'audio', 'ui-glass-chime.mp3', ['audio', 'ui', 'chime', 'notification'], 'audio/mpeg'],
  ['audio-ui-slide-swoosh', 'Slide Swoosh', 'audio', 'audio', 'ui-slide-swoosh.mp3', ['audio', 'ui', 'swoosh', 'transition'], 'audio/mpeg'],
  ['audio-ui-confirm-tone', 'Confirm Tone', 'audio', 'audio', 'ui-confirm-tone.mp3', ['audio', 'ui', 'confirm', 'success'], 'audio/mpeg'],
  ['audio-ui-error-buzz', 'Error Buzz', 'audio', 'audio', 'ui-error-buzz.mp3', ['audio', 'ui', 'error', 'feedback'], 'audio/mpeg'],
  ['audio-ambient-rain-pad', 'Rain Pad', 'audio', 'audio', 'ambient-rain-pad.mp3', ['audio', 'ambient', 'rain', 'calm'], 'audio/mpeg'],
  ['audio-ambient-night-loop', 'Night Loop', 'audio', 'audio', 'ambient-night-loop.mp3', ['audio', 'ambient', 'night', 'loop'], 'audio/mpeg'],
  ['audio-ambient-focus-drift', 'Focus Drift', 'audio', 'audio', 'ambient-focus-drift.mp3', ['audio', 'ambient', 'focus', 'work'], 'audio/mpeg'],
  ['audio-beat-lofi-study', 'Lo-Fi Study', 'audio', 'audio', 'beat-lofi-study.mp3', ['audio', 'music', 'lofi', 'study'], 'audio/mpeg'],
  ['audio-beat-sunset-groove', 'Sunset Groove', 'audio', 'audio', 'beat-sunset-groove.mp3', ['audio', 'music', 'groove', 'chill'], 'audio/mpeg'],
  ['audio-cinematic-rise', 'Cinematic Rise', 'audio', 'audio', 'cinematic-rise.mp3', ['audio', 'cinematic', 'trailer', 'build'], 'audio/mpeg'],
  ['audio-cinematic-pulse', 'Cinematic Pulse', 'audio', 'audio', 'cinematic-pulse.mp3', ['audio', 'cinematic', 'pulse', 'dramatic'], 'audio/mpeg'],
  ['document-brand-guidelines', 'Brand Guidelines', 'documents', 'document', 'brand-guidelines.pdf', ['document', 'brand', 'guidelines', 'design'], 'application/pdf'],
  ['document-launch-brief', 'Launch Brief', 'documents', 'document', 'launch-brief.pdf', ['document', 'brief', 'marketing', 'launch'], 'application/pdf'],
  ['document-product-roadmap', 'Product Roadmap', 'documents', 'document', 'product-roadmap.pdf', ['document', 'roadmap', 'product', 'planning'], 'application/pdf'],
  ['document-onboarding-kit', 'Onboarding Kit', 'documents', 'document', 'onboarding-kit.pdf', ['document', 'onboarding', 'team', 'people'], 'application/pdf'],
  ['document-editorial-calendar', 'Editorial Calendar', 'documents', 'document', 'editorial-calendar.pdf', ['document', 'calendar', 'content', 'planning'], 'application/pdf'],
  ['document-motion-spec', 'Motion Spec', 'documents', 'document', 'motion-spec.pdf', ['document', 'motion', 'spec', 'design'], 'application/pdf'],
  ['document-design-tokens', 'Design Tokens', 'documents', 'document', 'design-tokens.json', ['document', 'json', 'tokens', 'design system'], 'application/json'],
  ['document-theme-manifest', 'Theme Manifest', 'documents', 'document', 'theme-manifest.json', ['document', 'json', 'theme', 'manifest'], 'application/json'],
  ['document-content-model', 'Content Model', 'documents', 'document', 'content-model.json', ['document', 'json', 'content', 'schema'], 'application/json'],
  ['document-copy-deck', 'Copy Deck', 'documents', 'document', 'copy-deck.md', ['document', 'markdown', 'copy', 'content'], 'text/markdown'],
  ['document-release-notes-template', 'Release Notes Template', 'documents', 'document', 'release-notes-template.md', ['document', 'markdown', 'release', 'template'], 'text/markdown'],
  ['document-a11y-checklist', 'Accessibility Checklist', 'documents', 'document', 'a11y-checklist.txt', ['document', 'text', 'a11y', 'checklist'], 'text/plain'],
  ['lottie-loader-rings', 'Loader Rings', 'lottie', 'lottie', 'loader-rings.json', ['lottie', 'loader', 'rings', 'ui'], 'application/json'],
  ['lottie-loader-dots', 'Loader Dots', 'lottie', 'lottie', 'loader-dots.json', ['lottie', 'loader', 'dots', 'ui'], 'application/json'],
  ['lottie-loader-bars', 'Loader Bars', 'lottie', 'lottie', 'loader-bars.json', ['lottie', 'loader', 'bars', 'ui'], 'application/json'],
  ['lottie-check-confetti', 'Check Confetti', 'lottie', 'lottie', 'check-confetti.json', ['lottie', 'success', 'confetti', 'celebration'], 'application/json'],
  ['lottie-heart-burst', 'Heart Burst', 'lottie', 'lottie', 'heart-burst.json', ['lottie', 'heart', 'reaction', 'social'], 'application/json'],
  ['lottie-mail-send', 'Mail Send', 'lottie', 'lottie', 'mail-send.json', ['lottie', 'mail', 'send', 'ui'], 'application/json'],
  ['lottie-map-pulse', 'Map Pulse', 'lottie', 'lottie', 'map-pulse.json', ['lottie', 'map', 'travel', 'pulse'], 'application/json'],
  ['lottie-weather-sun', 'Weather Sun', 'lottie', 'lottie', 'weather-sun.json', ['lottie', 'weather', 'sun', 'loop'], 'application/json'],
  ['lottie-weather-rain', 'Weather Rain', 'lottie', 'lottie', 'weather-rain.json', ['lottie', 'weather', 'rain', 'loop'], 'application/json'],
  ['lottie-shopping-bag', 'Shopping Bag', 'lottie', 'lottie', 'shopping-bag.json', ['lottie', 'commerce', 'bag', 'checkout'], 'application/json'],
  ['lottie-music-wave', 'Music Wave', 'lottie', 'lottie', 'music-wave.json', ['lottie', 'music', 'wave', 'audio'], 'application/json'],
  ['lottie-orbit-cluster', 'Orbit Cluster', 'lottie', 'lottie', 'orbit-cluster.json', ['lottie', 'abstract', 'orbit', 'tech'], 'application/json'],
  ['model-desk-chair', 'Desk Chair', '3d', 'model-3d', 'desk-chair.glb', ['3d', 'chair', 'interior', 'workspace'], 'model/gltf-binary'],
  ['model-floor-lamp', 'Floor Lamp', '3d', 'model-3d', 'floor-lamp.glb', ['3d', 'lamp', 'interior', 'lighting'], 'model/gltf-binary'],
  ['model-sofa-modern', 'Modern Sofa', '3d', 'model-3d', 'sofa-modern.glb', ['3d', 'sofa', 'interior', 'furniture'], 'model/gltf-binary'],
  ['model-coffee-table', 'Coffee Table', '3d', 'model-3d', 'coffee-table.glb', ['3d', 'table', 'interior', 'furniture'], 'model/gltf-binary'],
  ['model-monitor-ultrawide', 'Ultrawide Monitor', '3d', 'model-3d', 'monitor-ultrawide.glb', ['3d', 'monitor', 'tech', 'workspace'], 'model/gltf-binary'],
  ['model-keyboard-mechanical', 'Mechanical Keyboard', '3d', 'model-3d', 'keyboard-mechanical.glb', ['3d', 'keyboard', 'tech', 'workspace'], 'model/gltf-binary'],
  ['model-sneaker-runner', 'Runner Sneaker', '3d', 'model-3d', 'sneaker-runner.glb', ['3d', 'fashion', 'shoe', 'product'], 'model/gltf-binary'],
  ['model-headphones-wireless', 'Wireless Headphones', '3d', 'model-3d', 'headphones-wireless.glb', ['3d', 'audio', 'headphones', 'product'], 'model/gltf-binary'],
  ['model-coffee-cup', 'Coffee Cup', '3d', 'model-3d', 'coffee-cup.glb', ['3d', 'coffee', 'lifestyle', 'product'], 'model/gltf-binary'],
  ['model-camera-vintage', 'Vintage Camera', '3d', 'model-3d', 'camera-vintage.glb', ['3d', 'camera', 'photo', 'product'], 'model/gltf-binary'],
  ['model-plant-pot', 'Plant Pot', '3d', 'model-3d', 'plant-pot.glb', ['3d', 'plant', 'interior', 'decor'], 'model/gltf-binary'],
  ['model-glass-bottle', 'Glass Bottle', '3d', 'model-3d', 'glass-bottle.glb', ['3d', 'bottle', 'product', 'packaging'], 'model/gltf-binary'],
] as const satisfies readonly OtherMediaSeed[]).map(([id, label, category, kind, pathOrName, tags, mimeType]) => ({
  id,
  label,
  category,
  kind,
  ref: createOtherMediaRef(category, kind, pathOrName),
  tags,
  ...(mimeType ? { mimeType } : {}),
}));

export const otherMediaCollection = defineMediaCollection({
  name: 'other-media',
  label: 'Other Media',
  items: [
    {
      id: 'audio-notification-pop',
      label: 'Notification Pop',
      category: 'audio',
      kind: 'audio',
      ref: createMediaRef('local', '/media/other-media/audio/notification-pop.mp3'),
      tags: ['audio', 'notification', 'sound', 'ui'],
    },
    {
      id: 'audio-mdn-trex-roar',
      label: 'MDN T-Rex Roar',
      category: 'audio',
      kind: 'audio',
      ref: createMediaRef('url', 'https://developer.mozilla.org/shared-assets/audio/t-rex-roar.mp3'),
      mimeType: 'audio/mp3',
      tags: ['audio', 'mdn', 'sample', 'roar', 'cc0'],
    },
    {
      id: 'audio-soundhelix-ambient',
      label: 'SoundHelix Ambient',
      category: 'audio',
      kind: 'audio',
      ref: soundHelixRef(1),
      mimeType: 'audio/mp3',
      tags: ['audio', 'music', 'ambient', 'background', 'soundhelix'],
    },
    {
      id: 'audio-soundhelix-cinematic',
      label: 'SoundHelix Cinematic',
      category: 'audio',
      kind: 'audio',
      ref: soundHelixRef(2),
      mimeType: 'audio/mp3',
      tags: ['audio', 'music', 'cinematic', 'dramatic', 'soundhelix'],
    },
    {
      id: 'audio-soundhelix-upbeat',
      label: 'SoundHelix Upbeat',
      category: 'audio',
      kind: 'audio',
      ref: soundHelixRef(3),
      mimeType: 'audio/mp3',
      tags: ['audio', 'music', 'upbeat', 'energetic', 'soundhelix'],
    },
    {
      id: 'audio-soundhelix-focus',
      label: 'SoundHelix Focus',
      category: 'audio',
      kind: 'audio',
      ref: soundHelixRef(4),
      mimeType: 'audio/mp3',
      tags: ['audio', 'music', 'focus', 'work', 'soundhelix'],
    },
    {
      id: 'lottie-loader-spinner',
      label: 'Loader Spinner',
      category: 'lottie',
      kind: 'lottie',
      ref: createMediaRef('local', '/media/other-media/lottie/loader-spinner.json'),
      tags: ['lottie', 'loader', 'animation', 'ui'],
    },
    {
      id: 'lottie-success-burst',
      label: 'Success Burst',
      category: 'lottie',
      kind: 'lottie',
      ref: createMediaRef('local', '/media/other-media/lottie/success-burst.json'),
      tags: ['lottie', 'success', 'celebration', 'ui'],
    },
    {
      id: 'lottie-orbit-pulse',
      label: 'Orbit Pulse',
      category: 'lottie',
      kind: 'lottie',
      ref: createMediaRef('local', '/media/other-media/lottie/orbit-pulse.json'),
      tags: ['lottie', 'abstract', 'motion', 'loop'],
    },
    {
      id: 'lottie-chat-pop',
      label: 'Chat Pop',
      category: 'lottie',
      kind: 'lottie',
      ref: createMediaRef('local', '/media/other-media/lottie/chat-pop.json'),
      tags: ['lottie', 'chat', 'message', 'ui'],
    },
    {
      id: 'document-api-spec',
      label: 'API Spec',
      category: 'documents',
      kind: 'document',
      ref: createMediaRef('url', 'https://cdn.example.com/docs/api-spec.pdf'),
      tags: ['document', 'pdf', 'spec', 'developer'],
    },
    {
      id: 'document-w3c-dummy-pdf',
      label: 'W3C Dummy PDF',
      category: 'documents',
      kind: 'document',
      ref: sampleDocumentRef('dummy.pdf'),
      mimeType: 'application/pdf',
      tags: ['document', 'pdf', 'w3c', 'sample'],
    },
    {
      id: 'document-plain-text-specimen',
      label: 'Plain Text Specimen',
      category: 'documents',
      kind: 'document',
      ref: createMediaRef('url', 'https://www.w3.org/TR/PNG/iso_8859-1.txt'),
      mimeType: 'text/plain',
      tags: ['document', 'text', 'sample', 'w3c'],
    },
    {
      id: 'document-json-schema-sample',
      label: 'JSON Schema Sample',
      category: 'documents',
      kind: 'document',
      ref: createMediaRef('url', 'https://raw.githubusercontent.com/json-schema-org/json-schema-spec/main/schema.json'),
      mimeType: 'application/json',
      tags: ['document', 'json', 'schema', 'developer'],
    },
    {
      id: 'document-markdown-guide',
      label: 'Markdown Guide',
      category: 'documents',
      kind: 'document',
      ref: createMediaRef('url', 'https://raw.githubusercontent.com/github/markup/master/README.md'),
      mimeType: 'text/markdown',
      tags: ['document', 'markdown', 'guide', 'developer'],
    },
    {
      id: 'model-khronos-duck',
      label: 'Khronos Duck',
      category: '3d',
      kind: 'model-3d',
      ref: khronosModelRef('Duck'),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'duck', 'sample'],
    },
    {
      id: 'model-khronos-avocado',
      label: 'Khronos Avocado',
      category: '3d',
      kind: 'model-3d',
      ref: khronosModelRef('Avocado'),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'food', 'sample'],
    },
    {
      id: 'model-khronos-boombox',
      label: 'Khronos Boombox',
      category: '3d',
      kind: 'model-3d',
      ref: khronosModelRef('BoomBox'),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'music', 'sample'],
    },
    {
      id: 'model-khronos-damaged-helmet',
      label: 'Khronos Damaged Helmet',
      category: '3d',
      kind: 'model-3d',
      ref: khronosModelRef('DamagedHelmet'),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'helmet', 'sample'],
    },
    {
      id: 'model-khronos-lantern',
      label: 'Khronos Lantern',
      category: '3d',
      kind: 'model-3d',
      ref: khronosModelRef('Lantern'),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'lantern', 'sample'],
    },
    {
      id: 'model-khronos-water-bottle',
      label: 'Khronos Water Bottle',
      category: '3d',
      kind: 'model-3d',
      ref: khronosModelRef('WaterBottle'),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'bottle', 'sample'],
    },
    ...EXTRA_OTHER_MEDIA_ITEMS,
  ],
});
