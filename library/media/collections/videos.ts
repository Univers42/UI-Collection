import { createMediaRef } from '../providers.js';
import { defineMediaCollection } from '../utils.js';

export const videosCollection = defineMediaCollection({
  name: 'videos',
  label: 'Videos',
  items: [
    {
      id: 'video-intro-loop',
      label: 'Intro Loop',
      category: 'optimized',
      kind: 'video',
      ref: createMediaRef('local', '/media/videos/optimized/intro-loop.mp4'),
      thumbnailRef: createMediaRef('local', '/media/videos/posters/intro-loop-cover.webp'),
      tags: ['video', 'loop', 'intro'],
    },
    {
      id: 'video-api-demo',
      label: 'API Demo Clip',
      category: 'optimized',
      kind: 'video',
      ref: createMediaRef('api', 'https://api.example.com/v1/media/demo-video'),
      tags: ['video', 'api', 'stream'],
    },
    {
      id: 'video-mdn-flower',
      label: 'MDN Flower',
      category: 'samples',
      kind: 'video',
      ref: createMediaRef(
        'url',
        'https://developer.mozilla.org/shared-assets/videos/flower.mp4',
      ),
      mimeType: 'video/mp4',
      tags: ['video', 'mdn', 'sample', 'flower', 'cc0'],
    },
  ],
});
