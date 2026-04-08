import { createMediaRef } from '../providers';
import { defineMediaCollection } from '../utils';

export const emojisCollection = defineMediaCollection({
  name: 'emojis',
  label: 'Emojis',
  items: [
    {
      id: 'emoji-party-parrot',
      label: 'Party Parrot',
      category: 'custom',
      kind: 'emoji',
      ref: createMediaRef('picker', 'asset://emojis/custom/party-parrot'),
      thumbnailRef: createMediaRef('local', '/media/emojis/custom/party-parrot.png'),
      tags: ['emoji', 'custom', 'animated'],
    },
    {
      id: 'emoji-wave',
      label: 'Wave',
      category: 'unicode',
      kind: 'emoji',
      ref: createMediaRef('local', '/media/emojis/unicode/wave.png'),
      tags: ['emoji', 'hello', 'hand'],
    },
  ],
});
