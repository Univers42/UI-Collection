import { createMediaRef } from '../providers';
import { defineMediaCollection } from '../utils';

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
  ],
});
