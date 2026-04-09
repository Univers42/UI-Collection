import { createMediaRef } from '../providers.js';
import { defineMediaCollection } from '../utils.js';

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
      id: 'audio-mdn-trex-roar',
      label: 'MDN T-Rex Roar',
      category: 'audio',
      kind: 'audio',
      ref: createMediaRef(
        'url',
        'https://developer.mozilla.org/shared-assets/audio/t-rex-roar.mp3',
      ),
      mimeType: 'audio/mp3',
      tags: ['audio', 'mdn', 'sample', 'roar', 'cc0'],
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
    {
      id: 'document-w3c-dummy-pdf',
      label: 'W3C Dummy PDF',
      category: 'documents',
      kind: 'document',
      ref: createMediaRef(
        'url',
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      ),
      mimeType: 'application/pdf',
      tags: ['document', 'pdf', 'w3c', 'sample'],
    },
    {
      id: 'model-khronos-duck',
      label: 'Khronos Duck',
      category: '3d',
      kind: 'model-3d',
      ref: createMediaRef(
        'url',
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb',
      ),
      mimeType: 'model/gltf-binary',
      tags: ['3d', 'glb', 'gltf', 'khronos', 'duck', 'sample'],
    },
  ],
});
