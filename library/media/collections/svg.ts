import { createMediaRef } from '../providers.js';
import { defineMediaCollection } from '../utils.js';

export const svgCollection = defineMediaCollection({
  name: 'svg',
  label: 'SVG',
  items: [
    {
      id: 'svg-arrow-left',
      label: 'Arrow Left',
      category: 'icons',
      kind: 'svg',
      ref: createMediaRef('local', '/media/svg/icons/arrow-left.svg'),
      tags: ['arrow', 'navigation', 'left'],
    },
    {
      id: 'svg-company-mark',
      label: 'Company Mark',
      category: 'logos',
      kind: 'svg',
      ref: createMediaRef('local', '/media/svg/logos/company-mark.svg'),
      tags: ['brand', 'logo'],
    },
    {
      id: 'svg-hero-scene',
      label: 'Hero Scene',
      category: 'illustrations',
      kind: 'svg',
      ref: createMediaRef('local', '/media/svg/illustrations/hero-scene.svg'),
      tags: ['hero', 'illustration', 'landing'],
    },
    {
      id: 'svg-heroicons-arrow-left',
      label: 'Heroicons Arrow Left',
      category: 'icons',
      kind: 'svg',
      ref: createMediaRef(
        'url',
        'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/src/24/outline/arrow-left.svg',
      ),
      mimeType: 'image/svg+xml',
      tags: ['svg', 'icon', 'heroicons', 'arrow', 'navigation', 'outline'],
    },
    {
      id: 'svg-heroicons-bolt',
      label: 'Heroicons Bolt',
      category: 'icons',
      kind: 'svg',
      ref: createMediaRef(
        'url',
        'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/src/24/outline/bolt.svg',
      ),
      mimeType: 'image/svg+xml',
      tags: ['svg', 'icon', 'heroicons', 'bolt', 'energy', 'outline'],
    },
  ],
});
