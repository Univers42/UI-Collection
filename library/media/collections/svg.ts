import { createMediaRef } from '../providers';
import { defineMediaCollection } from '../utils';

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
  ],
});
