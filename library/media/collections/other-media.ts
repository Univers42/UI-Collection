import { createMediaRef } from '../providers';
import { defineMediaCollection } from '../utils';

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
      tags: ['audio', 'notification', 'sound'],
    },
    {
      id: 'lottie-loader-spinner',
      label: 'Loader Spinner',
      category: 'lottie',
      kind: 'lottie',
      ref: createMediaRef('local', '/media/other-media/lottie/loader-spinner.json'),
      tags: ['lottie', 'loader', 'animation'],
    },
    {
      id: 'document-api-spec',
      label: 'API Spec',
      category: 'documents',
      kind: 'document',
      ref: createMediaRef('url', 'https://cdn.example.com/docs/api-spec.pdf'),
      tags: ['document', 'pdf', 'spec'],
    },
  ],
});
