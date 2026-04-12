import { createMediaRef, createPackageMediaRef } from '../providers.js';
import { PHOTO_ASSET_FILE_NAMES } from '../generated/photoAssetManifest.js';
import type { MediaRef } from '../types.js';
import { defineMediaCollection } from '../utils.js';

function unsplashPhotoRef(photoId: string): MediaRef {
  return createMediaRef(
    'unsplash',
    `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`,
  );
}

function wikimediaPhotoRef(filename: string): MediaRef {
  return createMediaRef(
    'url',
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=1400`,
  );
}

function remotePhotoRef(url: string): MediaRef {
  return createMediaRef('url', url);
}

function getPackagedPhotoRef(id: string): MediaRef | undefined {
  const fileName = PHOTO_ASSET_FILE_NAMES[id];

  if (!fileName) {
    return undefined;
  }

  return createPackageMediaRef(`media/photos/optimized/${fileName}`);
}

function getPhotoRef(id: string, fallback: MediaRef): MediaRef {
  return getPackagedPhotoRef(id) ?? fallback;
}

type WikimediaPhotoSeed = readonly [
  id: string,
  label: string,
  category: string,
  filename: string,
  alt: string,
  tags: string[],
];

const JAMES_WEBB_PHOTO_ITEMS = [
  {
    id: 'photo-james-webb-front-view',
    label: 'James Webb Front View',
    category: 'james-webb',
    kind: 'photo' as const,
    ref: getPhotoRef(
      'photo-james-webb-front-view',
      remotePhotoRef(
        'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/outreach/migrated/2015/STScI-01H8MP9X8G2ERPRXXK5325JSSZ.png?crop=faces%2Cfocalpoint&fit=clip&h=2880&w=2880',
      ),
    ),
    alt: 'Front-facing illustration of the James Webb Space Telescope.',
    tags: ['photo', 'james webb', 'jwst', 'telescope', 'space', 'nasa'],
  },
  {
    id: 'photo-james-webb-side-view',
    label: 'James Webb Side View',
    category: 'james-webb',
    kind: 'photo' as const,
    ref: getPhotoRef(
      'photo-james-webb-side-view',
      remotePhotoRef(
        'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/outreach/migrated/2015/STScI-01H8MN15AJW44J0SVJTBNAXBBR.png?crop=faces%2Cfocalpoint&fit=clip&h=2880&w=2880',
      ),
    ),
    alt: 'Side view illustration of the James Webb Space Telescope.',
    tags: ['photo', 'james webb', 'jwst', 'telescope', 'side view', 'nasa'],
  },
  {
    id: 'photo-james-webb-concept-art',
    label: 'James Webb Concept Art',
    category: 'james-webb',
    kind: 'photo' as const,
    ref: getPhotoRef(
      'photo-james-webb-concept-art',
      remotePhotoRef(
        'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2017/06/STScI-01EVVB9GCHKXGV2QJQZNKN10TP.png?crop=faces%2Cfocalpoint&fit=clip&h=2880&w=2880',
      ),
    ),
    alt: 'Concept illustration of the James Webb Space Telescope in space.',
    tags: ['photo', 'james webb', 'jwst', 'concept', 'space', 'nasa'],
  },
  {
    id: 'photo-james-webb-blueprint',
    label: 'James Webb Blueprint',
    category: 'james-webb',
    kind: 'photo' as const,
    ref: getPhotoRef(
      'photo-james-webb-blueprint',
      remotePhotoRef('https://www.nasa.gov/wp-content/uploads/2023/03/47690335362_a9b23dc6c8_o.jpeg?w=1041'),
    ),
    alt: 'Blueprint-style technical poster of the James Webb Space Telescope.',
    tags: ['photo', 'james webb', 'jwst', 'blueprint', 'engineering', 'nasa'],
  },
  {
    id: 'photo-james-webb-identifier',
    label: 'James Webb Identifier',
    category: 'james-webb',
    kind: 'photo' as const,
    ref: getPhotoRef(
      'photo-james-webb-identifier',
      remotePhotoRef(
        'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/outreach/migrated/2021/STScI-01FDW8B9DQCV7G9AHFFB5Q5PEW.png?crop=faces%2Cfocalpoint&fit=clip&h=677&w=677',
      ),
    ),
    alt: 'Official Webb identifier graphic with telescope mirror and sunshield.',
    tags: ['photo', 'james webb', 'jwst', 'identifier', 'branding', 'nasa'],
  },
  {
    id: 'photo-james-webb-blue-illustration',
    label: 'James Webb Blue Illustration',
    category: 'james-webb',
    kind: 'photo' as const,
    ref: getPhotoRef(
      'photo-james-webb-blue-illustration',
      remotePhotoRef(
        'https://assets.science.nasa.gov/dynamicimage/assets/science/astro/universe/2023/09/Webb-1.png?crop=faces%2Cfocalpoint&fit=clip&h=2858&w=3763',
      ),
    ),
    alt: 'Blue illustration of the James Webb Space Telescope.',
    tags: ['photo', 'james webb', 'jwst', 'illustration', 'blue', 'nasa'],
  },
];

const JAPANESE_PRINT_PHOTO_ITEMS = ([
  [
    'photo-japanese-print-okiku',
    'Hokusai Okiku',
    'japanese-print',
    'Ukiyo-e woodblock print by Katsushika Hokusai, digitally enhanced by rawpixel-com 6.jpg',
    'Traditional ukiyo-e print attributed to Hokusai featuring Okiku.',
    ['photo', 'japanese print', 'ukiyo-e', 'hokusai', 'art'],
  ],
  [
    'photo-japanese-print-koheiji',
    'Hokusai Koheiji',
    'japanese-print',
    'Ukiyo-e woodblock print by Katsushika Hokusai, digitally enhanced by rawpixel-com 5.jpg',
    'Traditional ukiyo-e print attributed to Hokusai featuring Koheiji.',
    ['photo', 'japanese print', 'ukiyo-e', 'hokusai', 'ghost'],
  ],
  [
    'photo-japanese-print-river-fuji',
    'Boat and Fuji',
    'japanese-print',
    'Ukiyo-e woodblock print by Katsushika Hokusai, digitally enhanced by rawpixel-com 9.jpg',
    'Boat on a river with Mount Fuji in the background.',
    ['photo', 'japanese print', 'ukiyo-e', 'mount fuji', 'river'],
  ],
  [
    'photo-japanese-print-mishima-pass',
    'Mishima Pass',
    'japanese-print',
    'Ukiyo-e woodblock print by Katsushika Hokusai, digitally enhanced by rawpixel-com 18.jpg',
    'Landscape print of Mishima Pass in Kai Province.',
    ['photo', 'japanese print', 'ukiyo-e', 'landscape', 'fuji'],
  ],
  [
    'photo-japanese-print-great-wave',
    'Great Wave Variant',
    'japanese-print',
    'Ukiyo-e woodblock print by Katsushika Hokusai, digitally enhanced by rawpixel-com 7.jpg',
    'Traditional wave scene in ukiyo-e style.',
    ['photo', 'japanese print', 'ukiyo-e', 'wave', 'hokusai'],
  ],
  [
    'photo-japanese-print-shower-below-summit',
    'Shower Below a Summit',
    'japanese-print',
    'Ukiyo-e woodblock print by Katsushika Hokusai, digitally enhanced by rawpixel-com 19.jpg',
    'Mount Fuji depicted in ukiyo-e style beneath rain clouds.',
    ['photo', 'japanese print', 'ukiyo-e', 'mount fuji', 'rain'],
  ],
  [
    'photo-japanese-print-imagawa',
    'Imagawa Yoshimoto',
    'japanese-print',
    'Imagawa-Yoshimoto-Ukiyo-e.jpg',
    'Historical ukiyo-e portrait of Imagawa Yoshimoto.',
    ['photo', 'japanese print', 'ukiyo-e', 'portrait', 'history'],
  ],
  [
    'photo-japanese-print-tokyo-subway',
    'Tokyo Subway Poster',
    'japanese-print',
    'Sugiura_Hisui_Tokyo_Subway_1927_poster.jpg',
    'Japanese poster for the Tokyo subway opening.',
    ['photo', 'japanese print', 'poster', 'tokyo', 'vintage'],
  ],
  [
    'photo-japanese-print-isetan-opening',
    'Isetan Opening Poster',
    'japanese-print',
    'Isetan Shinjuku Opening Poster (1933).jpg',
    'Artistic poster for the Isetan Shinjuku opening in 1933.',
    ['photo', 'japanese print', 'poster', 'department store', 'vintage'],
  ],
  [
    'photo-japanese-print-takashimaya',
    'Takashimaya Poster',
    'japanese-print',
    'Takashimaya Osaka Opening Poster (1930).jpg',
    'Japanese commercial poster for Takashimaya Osaka.',
    ['photo', 'japanese print', 'poster', 'osaka', 'vintage'],
  ],
  [
    'photo-japanese-print-mitsukoshi',
    'Mitsukoshi Poster',
    'japanese-print',
    'Mitsukoshi Department Store Ginza Branch Opens in 1930.jpg',
    'Japanese department store poster from 1930.',
    ['photo', 'japanese print', 'poster', 'ginza', 'vintage'],
  ],
  [
    'photo-japanese-print-tokyo-underground',
    'Tokyo Underground Poster',
    'japanese-print',
    'Tokyo Underground Railway Poster.png',
    'Poster for the Tokyo Underground Railway.',
    ['photo', 'japanese print', 'poster', 'railway', 'tokyo'],
  ],
] as const satisfies readonly WikimediaPhotoSeed[]).map(
  ([id, label, category, filename, alt, tags]) => ({
    id,
    label,
    category,
    kind: 'photo' as const,
    ref: getPhotoRef(id, wikimediaPhotoRef(filename)),
    alt,
    tags: [...tags],
  }),
);

const ART_DECO_PHOTO_ITEMS = ([
  [
    'photo-art-deco-club-chair',
    'Art Deco Club Chair',
    'art-deco',
    'ART DECO.jpg',
    'Classic Art Deco club chair photograph.',
    ['photo', 'art deco', 'chair', 'design', 'furniture'],
  ],
  [
    'photo-art-deco-poster-japan-01',
    'Japan Travel Poster 01',
    'art-deco',
    '1930s Japan Travel Poster - 01.jpg',
    'Art Deco style Japanese travel poster from the 1930s.',
    ['photo', 'art deco', 'poster', 'japan', 'travel'],
  ],
  [
    'photo-art-deco-poster-japan-02',
    'Japan Travel Poster 02',
    'art-deco',
    '1930s Japan Travel Poster - 02.jpg',
    'Art Deco style Japanese travel poster.',
    ['photo', 'art deco', 'poster', 'japan', 'travel'],
  ],
  [
    'photo-art-deco-poster-japan-03',
    'Japan Travel Poster 03',
    'art-deco',
    '1930s Japan Travel Poster - 03.jpg',
    'Vintage travel poster rendered in Art Deco style.',
    ['photo', 'art deco', 'poster', 'travel', 'vintage'],
  ],
  [
    'photo-art-deco-poster-japan-05',
    'Japan Travel Poster 05',
    'art-deco',
    '1930s Japan Travel Poster - 05.jpg',
    'Art Deco Japanese poster with travel motif.',
    ['photo', 'art deco', 'poster', 'japan', 'vintage'],
  ],
  [
    'photo-art-deco-poster-japan-08',
    'Japan Travel Poster 08',
    'art-deco',
    '1930s Japan Travel Poster - 08.jpg',
    'Art Deco Japanese poster with bold composition.',
    ['photo', 'art deco', 'poster', 'japan', 'composition'],
  ],
  [
    'photo-art-deco-ontake',
    'Ontake Valley Poster',
    'art-deco',
    '1930s Japan Travel Poster - Ontake Shosenkyo Valley.jpg',
    'Vintage poster of Ontake Shosenkyo Valley.',
    ['photo', 'art deco', 'poster', 'landscape', 'travel'],
  ],
  [
    'photo-art-deco-subway',
    'Tokyo Subway Deco Poster',
    'art-deco',
    'Sugiura_Hisui_Tokyo_Subway_1927_poster.jpg',
    'Art Deco transportation poster for Tokyo subway.',
    ['photo', 'art deco', 'subway', 'poster', 'tokyo'],
  ],
  [
    'photo-art-deco-isetan',
    'Isetan Deco Poster',
    'art-deco',
    'Isetan Shinjuku Opening Poster (1933).jpg',
    'Department store poster with Art Deco composition.',
    ['photo', 'art deco', 'poster', 'retail', 'japan'],
  ],
  [
    'photo-art-deco-takashimaya',
    'Takashimaya Deco Poster',
    'art-deco',
    'Takashimaya Osaka Opening Poster (1930).jpg',
    'Commercial poster in Japanese Art Deco style.',
    ['photo', 'art deco', 'poster', 'retail', 'osaka'],
  ],
  [
    'photo-art-deco-mitsukoshi',
    'Mitsukoshi Deco Poster',
    'art-deco',
    'Mitsukoshi Department Store Ginza Branch Opens in 1930.jpg',
    'Ginza poster using Art Deco design language.',
    ['photo', 'art deco', 'poster', 'ginza', 'vintage'],
  ],
  [
    'photo-art-deco-underground',
    'Underground Railway Poster',
    'art-deco',
    'Tokyo Underground Railway Poster.png',
    'Art Deco inspired underground railway poster.',
    ['photo', 'art deco', 'poster', 'railway', 'graphic design'],
  ],
] as const satisfies readonly WikimediaPhotoSeed[]).map(
  ([id, label, category, filename, alt, tags]) => ({
    id,
    label,
    category,
    kind: 'photo' as const,
    ref: getPhotoRef(id, wikimediaPhotoRef(filename)),
    alt,
    tags: [...tags],
  }),
);

export const photosCollection = defineMediaCollection({
  name: 'photos',
  label: 'Photos',
  items: [
    {
      id: 'photo-homepage-banner',
      label: 'Homepage Banner',
      category: 'banners',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-homepage-banner',
        unsplashPhotoRef('photo-1518770660439-4636190af475'),
      ),
      alt: 'Futuristic close-up of electronics in blue light',
      width: 1600,
      height: 1067,
      tags: ['photo', 'banner', 'hero', 'technology', 'blue', 'unsplash'],
    },
    {
      id: 'photo-portrait-creative-founder',
      label: 'Creative Founder Portrait',
      category: 'portraits',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-portrait-creative-founder',
        unsplashPhotoRef('photo-1494790108377-be9c29b29330'),
      ),
      alt: 'Portrait of a smiling woman outdoors',
      width: 1600,
      height: 1067,
      tags: ['photo', 'portrait', 'people', 'startup', 'founder', 'warm'],
    },
    {
      id: 'photo-portrait-studio-light',
      label: 'Studio Portrait',
      category: 'portraits',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-portrait-studio-light',
        unsplashPhotoRef('photo-1500648767791-00dcc994a43e'),
      ),
      alt: 'Portrait of a man in studio light',
      width: 1600,
      height: 1067,
      tags: ['photo', 'portrait', 'people', 'studio', 'profile'],
    },
    {
      id: 'photo-portrait-lifestyle-street',
      label: 'Street Lifestyle Portrait',
      category: 'portraits',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-portrait-lifestyle-street',
        unsplashPhotoRef('photo-1517841905240-472988babdf9'),
      ),
      alt: 'Portrait of a woman in an urban street setting',
      width: 1600,
      height: 1067,
      tags: ['photo', 'portrait', 'people', 'street', 'urban', 'lifestyle'],
    },
    {
      id: 'photo-workspace-laptop-desk',
      label: 'Laptop Workspace',
      category: 'workspace',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-workspace-laptop-desk',
        unsplashPhotoRef('photo-1498050108023-c5249f4df085'),
      ),
      alt: 'Laptop and notebook on a desk',
      width: 1600,
      height: 1067,
      tags: ['photo', 'workspace', 'desk', 'laptop', 'productivity', 'coding'],
    },
    {
      id: 'photo-workspace-team-meeting',
      label: 'Team Meeting Table',
      category: 'workspace',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-workspace-team-meeting',
        unsplashPhotoRef('photo-1522202176988-66273c2fd55f'),
      ),
      alt: 'People collaborating around a table',
      width: 1600,
      height: 1067,
      tags: ['photo', 'workspace', 'team', 'meeting', 'collaboration'],
    },
    {
      id: 'photo-workspace-minimal-desk',
      label: 'Minimal Desk Setup',
      category: 'workspace',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-workspace-minimal-desk',
        unsplashPhotoRef('photo-1516321318423-f06f85e504b3'),
      ),
      alt: 'Minimal workspace with keyboard and notebook',
      width: 1600,
      height: 1067,
      tags: ['photo', 'workspace', 'minimal', 'desk', 'setup'],
    },
    {
      id: 'photo-city-skyline-night',
      label: 'City Skyline at Night',
      category: 'travel',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-city-skyline-night',
        unsplashPhotoRef('photo-1477959858617-67f85cf4f1df'),
      ),
      alt: 'Night city skyline with lights',
      width: 1600,
      height: 1067,
      tags: ['photo', 'city', 'skyline', 'night', 'travel', 'urban'],
    },
    {
      id: 'photo-city-street-neon',
      label: 'Neon Street',
      category: 'travel',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-city-street-neon',
        unsplashPhotoRef('photo-1520034475321-cbe63696469a'),
      ),
      alt: 'Street lit with neon lights at night',
      width: 1600,
      height: 1067,
      tags: ['photo', 'city', 'street', 'neon', 'night', 'urban'],
    },
    {
      id: 'photo-architecture-modern-facade',
      label: 'Modern Facade',
      category: 'architecture',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-architecture-modern-facade',
        unsplashPhotoRef('photo-1511818966892-d7d671e672a2'),
      ),
      alt: 'Modern building facade with geometric lines',
      width: 1600,
      height: 1067,
      tags: ['photo', 'architecture', 'modern', 'building', 'geometric'],
    },
    {
      id: 'photo-architecture-staircase',
      label: 'Sculptural Staircase',
      category: 'architecture',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-architecture-staircase',
        unsplashPhotoRef('photo-1518005020951-eccb494ad742'),
      ),
      alt: 'Minimal architectural staircase in soft light',
      width: 1600,
      height: 1067,
      tags: ['photo', 'architecture', 'interior', 'stairs', 'minimal'],
    },
    {
      id: 'photo-nature-forest-path',
      label: 'Forest Path',
      category: 'nature',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-nature-forest-path',
        unsplashPhotoRef('photo-1441974231531-c6227db76b6e'),
      ),
      alt: 'Sunlit path through a forest',
      width: 1600,
      height: 1067,
      tags: ['photo', 'nature', 'forest', 'path', 'green', 'outdoors'],
    },
    {
      id: 'photo-nature-mountain-lake',
      label: 'Mountain Lake',
      category: 'nature',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-nature-mountain-lake',
        unsplashPhotoRef('photo-1500530855697-b586d89ba3ee'),
      ),
      alt: 'Mountain lake landscape',
      width: 1600,
      height: 1067,
      tags: ['photo', 'nature', 'mountain', 'lake', 'travel', 'landscape'],
    },
    {
      id: 'photo-nature-desert-road',
      label: 'Desert Road',
      category: 'nature',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-nature-desert-road',
        unsplashPhotoRef('photo-1500534314209-a25ddb2bd429'),
      ),
      alt: 'Road crossing a dry desert landscape',
      width: 1600,
      height: 1067,
      tags: ['photo', 'nature', 'desert', 'road', 'warm', 'landscape'],
    },
    {
      id: 'photo-ocean-coastline',
      label: 'Ocean Coastline',
      category: 'nature',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-ocean-coastline',
        unsplashPhotoRef('photo-1507525428034-b723cf961d3e'),
      ),
      alt: 'Ocean waves on a bright coastline',
      width: 1600,
      height: 1067,
      tags: ['photo', 'nature', 'ocean', 'beach', 'water', 'travel'],
    },
    {
      id: 'photo-food-brunch-table',
      label: 'Brunch Table',
      category: 'food',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-food-brunch-table',
        unsplashPhotoRef('photo-1504674900247-0877df9cc836'),
      ),
      alt: 'Brunch table with multiple dishes',
      width: 1600,
      height: 1067,
      tags: ['photo', 'food', 'brunch', 'lifestyle', 'table'],
    },
    {
      id: 'photo-food-coffee-pastry',
      label: 'Coffee and Pastry',
      category: 'food',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-food-coffee-pastry',
        unsplashPhotoRef('photo-1495474472287-4d71bcdd2085'),
      ),
      alt: 'Coffee cup beside a pastry',
      width: 1600,
      height: 1067,
      tags: ['photo', 'food', 'coffee', 'pastry', 'cafe', 'cozy'],
    },
    {
      id: 'photo-product-headphones',
      label: 'Headphones Product Shot',
      category: 'products',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-product-headphones',
        unsplashPhotoRef('photo-1505740420928-5e560c06d30e'),
      ),
      alt: 'Headphones on a clean background',
      width: 1600,
      height: 1067,
      tags: ['photo', 'product', 'headphones', 'audio', 'minimal'],
    },
    {
      id: 'photo-product-camera',
      label: 'Camera Product Shot',
      category: 'products',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-product-camera',
        unsplashPhotoRef('photo-1516035069371-29a1b244cc32'),
      ),
      alt: 'Camera resting on a wooden surface',
      width: 1600,
      height: 1067,
      tags: ['photo', 'product', 'camera', 'creative', 'gear'],
    },
    {
      id: 'photo-abstract-color-smoke',
      label: 'Color Smoke',
      category: 'abstract',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-abstract-color-smoke',
        unsplashPhotoRef('photo-1470071459604-3b5ec3a7fe05'),
      ),
      alt: 'Abstract colorful smoke and gradients',
      width: 1600,
      height: 1067,
      tags: ['photo', 'abstract', 'color', 'gradient', 'texture'],
    },
    {
      id: 'photo-abstract-shadow-composition',
      label: 'Shadow Composition',
      category: 'abstract',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-abstract-shadow-composition',
        unsplashPhotoRef('photo-1493246507139-91e8fad9978e'),
      ),
      alt: 'Abstract shapes and shadows on a surface',
      width: 1600,
      height: 1067,
      tags: ['photo', 'abstract', 'shadow', 'minimal', 'composition'],
    },
    {
      id: 'photo-lifestyle-fashion-walk',
      label: 'Fashion Walk',
      category: 'lifestyle',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-lifestyle-fashion-walk',
        unsplashPhotoRef('photo-1483985988355-763728e1935b'),
      ),
      alt: 'Person walking with shopping bags',
      width: 1600,
      height: 1067,
      tags: ['photo', 'lifestyle', 'fashion', 'shopping', 'urban'],
    },
    {
      id: 'photo-lifestyle-wellness-yoga',
      label: 'Wellness Yoga',
      category: 'lifestyle',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-lifestyle-wellness-yoga',
        unsplashPhotoRef('photo-1506126613408-eca07ce68773'),
      ),
      alt: 'Person practicing yoga outdoors',
      width: 1600,
      height: 1067,
      tags: ['photo', 'lifestyle', 'wellness', 'yoga', 'mindfulness'],
    },
    {
      id: 'photo-pets-dog-portrait',
      label: 'Dog Portrait',
      category: 'pets',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-pets-dog-portrait',
        unsplashPhotoRef('photo-1517849845537-4d257902454a'),
      ),
      alt: 'Portrait of a dog looking at camera',
      width: 1600,
      height: 1067,
      tags: ['photo', 'pets', 'dog', 'animal', 'cute'],
    },
    {
      id: 'photo-pets-cat-window',
      label: 'Cat by Window',
      category: 'pets',
      kind: 'photo',
      ref: getPhotoRef(
        'photo-pets-cat-window',
        unsplashPhotoRef('photo-1511044568932-338cba0ad803'),
      ),
      alt: 'Cat sitting by a window',
      width: 1600,
      height: 1067,
      tags: ['photo', 'pets', 'cat', 'animal', 'cozy'],
    },
    ...JAMES_WEBB_PHOTO_ITEMS,
    ...JAPANESE_PRINT_PHOTO_ITEMS,
    ...ART_DECO_PHOTO_ITEMS,
  ],
});
