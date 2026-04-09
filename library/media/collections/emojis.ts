import { createMediaRef } from '../providers.js';
import { defineMediaCollection } from '../utils.js';

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
    {
      id: 'emoji-wave-twemoji',
      label: 'Wave Twemoji',
      category: 'unicode',
      kind: 'emoji',
      ref: createMediaRef(
        'url',
        'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f44b.png',
      ),
      mimeType: 'image/png',
      tags: ['emoji', 'wave', 'hand', 'twemoji', 'unicode'],
    },
    {
      id: 'emoji-rocket-twemoji',
      label: 'Rocket Twemoji',
      category: 'unicode',
      kind: 'emoji',
      ref: createMediaRef(
        'url',
        'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f680.png',
      ),
      mimeType: 'image/png',
      tags: ['emoji', 'rocket', 'launch', 'twemoji', 'unicode'],
    },
  ],
});
