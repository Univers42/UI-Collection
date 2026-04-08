import { createMediaRef } from '../providers';
import { defineMediaCollection } from '../utils';

export const photosCollection = defineMediaCollection({
  name: 'photos',
  label: 'Photos',
  items: [
    {
      id: 'photo-homepage-banner',
      label: 'Homepage Banner',
      category: 'banners',
      kind: 'photo',
      ref: createMediaRef(
        'unsplash',
        'https://images.unsplash.com/photo-1518770660439-4636190af475',
      ),
      tags: ['photo', 'banner', 'hero', 'unsplash'],
    },
    {
      id: 'photo-team-avatar-01',
      label: 'Team Avatar 01',
      category: 'optimized',
      kind: 'photo',
      ref: createMediaRef('local', '/media/photos/optimized/team-avatar-01.webp'),
      tags: ['photo', 'avatar', 'team'],
    },
  ],
});
