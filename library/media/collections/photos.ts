import { createMediaRef, createPackageMediaRef, parseMediaRef } from '../providers.js';
import { PHOTO_ASSET_FILE_NAMES } from '../generated/photoAssetManifest.js';
import type { MediaRef } from '../types.js';
import { defineMediaCollection } from '../utils.js';

const WIKIMEDIA_WALLPAPER_WIDTH = 4096;
const NASA_WALLPAPER_SIZE = 4096;

function remotePhotoRef(url: string): MediaRef {
  return createMediaRef('url', url);
}

function wikimediaPhotoRef(
  filename: string,
  width = WIKIMEDIA_WALLPAPER_WIDTH,
): MediaRef {
  const encoded = encodeURIComponent(filename);
  return remotePhotoRef(
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=${width}`,
  );
}

function nasaPhotoRef(url: string, size = NASA_WALLPAPER_SIZE): MediaRef {
  const parsed = new URL(url);
  parsed.searchParams.set('w', String(size));
  parsed.searchParams.set('h', String(size));
  return remotePhotoRef(parsed.toString());
}

function thumbnailFromPhotoRef(ref: MediaRef): MediaRef {
  const { provider, value } = parseMediaRef(ref);

  try {
    const url = new URL(value);

    if (url.hostname === 'commons.wikimedia.org') {
      url.searchParams.set('width', '720');
      return createMediaRef(provider, url.toString());
    }

    if (url.hostname === 'assets.science.nasa.gov' || url.hostname === 'www.nasa.gov') {
      url.searchParams.set('w', '960');
      url.searchParams.set('h', '960');
      return createMediaRef(provider, url.toString());
    }

    return createMediaRef(provider, url.toString());
  } catch {
    return ref;
  }
}

function getPackagedPhotoRef(id: string): MediaRef | undefined {
  const fileName = PHOTO_ASSET_FILE_NAMES[id];

  if (!fileName) {
    return undefined;
  }

  return createPackageMediaRef(`media/photos/optimized/${fileName}`);
}

function getPhotoSources(
  id: string,
  fallback: MediaRef,
  sourceRef: MediaRef = fallback,
): {
  ref: MediaRef;
  sourceRef: MediaRef;
  thumbnailRef?: MediaRef;
} {
  const packagedRef = getPackagedPhotoRef(id);
  const previewRef = thumbnailFromPhotoRef(sourceRef);

  if (!packagedRef) {
    return {
      ref: fallback,
      sourceRef,
      thumbnailRef: previewRef,
    };
  }

  return {
    ref: packagedRef,
    sourceRef,
    thumbnailRef: previewRef,
  };
}

const PHOTO_CATEGORIES = {
  nature: 'nature',
  artDeco: 'art-deco',
  japanesePrint: 'japanese-print',
  nasaSpace: 'nasa-space',
} as const;

type PhotoCategory = (typeof PHOTO_CATEGORIES)[keyof typeof PHOTO_CATEGORIES];

type WikimediaPhotoSeed = readonly [
  id: string,
  label: string,
  filename: string,
  alt: string,
  tags: string[],
];

type NasaPhotoSeed = readonly [
  id: string,
  label: string,
  url: string,
  alt: string,
  tags: string[],
];

type PhotoSeed = Readonly<{
  id: string;
  label: string;
  category: PhotoCategory;
  sourceRef: MediaRef;
  alt: string;
  tags: string[];
}>;

const CATEGORY_TAGS: Record<PhotoCategory, string[]> = {
  [PHOTO_CATEGORIES.nature]: ['nature'],
  [PHOTO_CATEGORIES.artDeco]: ['art deco'],
  [PHOTO_CATEGORIES.japanesePrint]: ['japanese print', 'ukiyo-e'],
  [PHOTO_CATEGORIES.nasaSpace]: ['space', 'nasa'],
};

function uniqueTags(...groups: string[][]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const group of groups) {
    for (const tag of group) {
      if (seen.has(tag)) {
        continue;
      }

      seen.add(tag);
      result.push(tag);
    }
  }

  return result;
}

function buildTags(category: PhotoCategory, tags: string[]): string[] {
  return uniqueTags(['photo', ...CATEGORY_TAGS[category]], tags);
}

function createWikimediaSeeds(
  category: PhotoCategory,
  seeds: readonly WikimediaPhotoSeed[],
): PhotoSeed[] {
  return seeds.map(([id, label, filename, alt, tags]) => ({
    id,
    label,
    category,
    sourceRef: wikimediaPhotoRef(filename),
    alt,
    tags: buildTags(category, tags),
  }));
}

function createNasaSeeds(
  category: PhotoCategory,
  seeds: readonly NasaPhotoSeed[],
): PhotoSeed[] {
  return seeds.map(([id, label, url, alt, tags]) => ({
    id,
    label,
    category,
    sourceRef: nasaPhotoRef(url),
    alt,
    tags: buildTags(category, tags),
  }));
}

function createPhotoItem(seed: PhotoSeed) {
  return {
    id: seed.id,
    label: seed.label,
    category: seed.category,
    kind: 'photo' as const,
    ...getPhotoSources(seed.id, seed.sourceRef),
    alt: seed.alt,
    tags: seed.tags,
  };
}

const NATURE_PHOTO_SEEDS = createWikimediaSeeds(PHOTO_CATEGORIES.nature, [
  [
    'photo-nature-yosemite-valley',
    'Yosemite Valley',
    'Yosemite_Valley_from_Wawona_Tunnel_view.jpg',
    'Wide view of Yosemite Valley and granite cliffs.',
    ['yosemite', 'valley', 'granite', 'national park', 'landscape'],
  ],
  [
    'photo-nature-grand-canyon',
    'Grand Canyon Vista',
    'Grand_Canyon_view_from_Pima_Point_2010.jpg',
    'Panoramic view across the Grand Canyon.',
    ['grand canyon', 'vista', 'desert', 'national park', 'canyon'],
  ],
  [
    'photo-nature-bryce-canyon',
    'Bryce Canyon Hoodoos',
    'Bryce_Canyon_National_Park_Utah_2011.jpg',
    'Hoodoo formations in Bryce Canyon National Park.',
    ['bryce canyon', 'hoodoos', 'utah', 'national park', 'rocks'],
  ],
  [
    'photo-nature-yellowstone-falls',
    'Lower Yellowstone Falls',
    'Lower_Yellowstone_Falls.jpg',
    'Waterfall dropping into the Yellowstone canyon.',
    ['yellowstone', 'waterfall', 'river', 'national park'],
  ],
] as const);

const ART_DECO_PHOTO_SEEDS = createWikimediaSeeds(PHOTO_CATEGORIES.artDeco, [
  [
    'photo-art-deco-tokyo-subway-poster',
    'Tokyo Subway Poster',
    'Sugiura_Hisui_Tokyo_Subway_1927_poster.jpg',
    'Art Deco era poster advertising the Tokyo subway.',
    ['poster', 'tokyo', 'transport', 'vintage'],
  ],
  [
    'photo-art-deco-isetan-opening',
    'Isetan Opening Poster',
    'Isetan Shinjuku Opening Poster (1933).jpg',
    'Art Deco department store opening poster.',
    ['poster', 'retail', 'shinjuku', 'vintage'],
  ],
  [
    'photo-art-deco-takashimaya-osaka',
    'Takashimaya Osaka Poster',
    'Takashimaya Osaka Opening Poster (1930).jpg',
    'Art Deco style poster for Takashimaya Osaka.',
    ['poster', 'osaka', 'retail', 'vintage'],
  ],
  [
    'photo-art-deco-mitsukoshi-ginza',
    'Mitsukoshi Ginza Poster',
    'Mitsukoshi Department Store Ginza Branch Opens in 1930.jpg',
    'Art Deco poster for the Mitsukoshi Ginza branch.',
    ['poster', 'ginza', 'retail', 'vintage'],
  ],
] as const);

const JAPANESE_PRINT_PHOTO_SEEDS = createWikimediaSeeds(
  PHOTO_CATEGORIES.japanesePrint,
  [
    [
      'photo-japanese-print-kanagawa-wave',
      'Kanagawa Wave',
      'The_Great_Wave_off_Kanagawa.jpg',
      'Ukiyo-e print of a towering wave and boats.',
      ['hokusai', 'wave', 'sea', 'boats'],
    ],
    [
      'photo-japanese-print-red-fuji',
      'Red Fuji',
      'Red_Fuji_southern_wind_clear_morning.jpg',
      'Ukiyo-e print of Mount Fuji in red tones.',
      ['hokusai', 'mount fuji', 'sky', 'landscape'],
    ],
    [
      'photo-japanese-print-sudden-shower',
      'Sudden Shower',
      'Sudden_Shower_over_Shin-Ohashi_bridge_and_Atake.jpg',
      'Ukiyo-e print of a bridge in a sudden rain shower.',
      ['hiroshige', 'rain', 'bridge', 'river'],
    ],
    [
      'photo-japanese-print-plum-garden',
      'Plum Garden',
      'Plum_Garden_Kameido.jpg',
      'Ukiyo-e print of a plum garden scene.',
      ['hiroshige', 'plum', 'garden', 'blossom'],
    ],
  ] as const,
);

const NASA_SPACE_PHOTO_SEEDS = createNasaSeeds(PHOTO_CATEGORIES.nasaSpace, [
  [
    'photo-nasa-space-webb-front',
    'James Webb Front View',
    'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/outreach/migrated/2015/STScI-01H8MP9X8G2ERPRXXK5325JSSZ.png?crop=faces%2Cfocalpoint&fit=clip&h=4096&w=4096',
    'Front-facing view of the James Webb Space Telescope.',
    ['james webb', 'jwst', 'telescope'],
  ],
  [
    'photo-nasa-space-webb-side',
    'James Webb Side View',
    'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/outreach/migrated/2015/STScI-01H8MN15AJW44J0SVJTBNAXBBR.png?crop=faces%2Cfocalpoint&fit=clip&h=4096&w=4096',
    'Side view illustration of the James Webb Space Telescope.',
    ['james webb', 'jwst', 'telescope'],
  ],
  [
    'photo-nasa-space-webb-concept',
    'James Webb Concept Art',
    'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2017/06/STScI-01EVVB9GCHKXGV2QJQZNKN10TP.png?crop=faces%2Cfocalpoint&fit=clip&h=4096&w=4096',
    'Concept art of the James Webb Space Telescope in space.',
    ['james webb', 'jwst', 'concept'],
  ],
  [
    'photo-nasa-space-webb-blue',
    'James Webb Blue Illustration',
    'https://assets.science.nasa.gov/dynamicimage/assets/science/astro/universe/2023/09/Webb-1.png?crop=faces%2Cfocalpoint&fit=clip&h=4096&w=4096',
    'Blue illustration of the James Webb Space Telescope.',
    ['james webb', 'jwst', 'illustration', 'blue'],
  ],
] as const);

const PHOTO_SEEDS = [
  ...NATURE_PHOTO_SEEDS,
  ...ART_DECO_PHOTO_SEEDS,
  ...JAPANESE_PRINT_PHOTO_SEEDS,
  ...NASA_SPACE_PHOTO_SEEDS,
];

const PHOTO_ITEMS = PHOTO_SEEDS.map((seed) => createPhotoItem(seed));

export const photosCollection = defineMediaCollection({
  name: 'photos',
  label: 'Photos',
  items: PHOTO_ITEMS,
});
