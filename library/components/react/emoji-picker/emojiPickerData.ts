export const EMOJI_PICKER_GROUPS = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Travel & Places',
  'Activities',
  'Objects',
  'Symbols',
  'Flags',
] as const;

export type EmojiPickerGroup = (typeof EMOJI_PICKER_GROUPS)[number];
export type EmojiPickerGroupValue = EmojiPickerGroup | (string & {});

export interface EmojiPickerItem {
  id: string;
  label: string;
  value: string;
  aliases?: string[];
  keywords?: string[];
  group?: EmojiPickerGroupValue;
  localizedLabels?: Record<string, string>;
  src?: string;
}

function createEmojiPickerItem(
  id: string,
  label: string,
  value: string,
  group: EmojiPickerGroup,
  keywords: string[] = [],
): EmojiPickerItem {
  return {
    id,
    label,
    value,
    group,
    keywords,
  };
}

export const DEFAULT_EMOJI_PICKER_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('grinning-face', 'Grinning Face', '😀', 'Smileys & Emotion', ['smile', 'happy', 'face']),
  createEmojiPickerItem('beaming-face', 'Beaming Face', '😁', 'Smileys & Emotion', ['grin', 'cheerful', 'face']),
  createEmojiPickerItem('face-with-tears-of-joy', 'Face with Tears of Joy', '😂', 'Smileys & Emotion', ['laugh', 'funny', 'face']),
  createEmojiPickerItem('smiling-face', 'Smiling Face', '😄', 'Smileys & Emotion', ['smile', 'joy', 'face']),
  createEmojiPickerItem('blush-face', 'Blush Face', '😊', 'Smileys & Emotion', ['warm', 'kind', 'face']),
  createEmojiPickerItem('heart-eyes', 'Heart Eyes', '😍', 'Smileys & Emotion', ['love', 'admire', 'face']),
  createEmojiPickerItem('thinking-face', 'Thinking Face', '🤔', 'Smileys & Emotion', ['think', 'question', 'face']),
  createEmojiPickerItem('party-face', 'Party Face', '🥳', 'Smileys & Emotion', ['celebrate', 'birthday', 'face']),
  createEmojiPickerItem('crying-face', 'Crying Face', '😢', 'Smileys & Emotion', ['sad', 'tear', 'face']),
  createEmojiPickerItem('angry-face', 'Angry Face', '😠', 'Smileys & Emotion', ['mad', 'upset', 'face']),

  createEmojiPickerItem('waving-hand', 'Waving Hand', '👋', 'People & Body', ['hello', 'greeting', 'hand']),
  createEmojiPickerItem('thumbs-up', 'Thumbs Up', '👍', 'People & Body', ['approve', 'like', 'hand']),
  createEmojiPickerItem('clapping-hands', 'Clapping Hands', '👏', 'People & Body', ['applause', 'celebrate', 'hands']),
  createEmojiPickerItem('raising-hands', 'Raising Hands', '🙌', 'People & Body', ['celebrate', 'praise', 'hands']),
  createEmojiPickerItem('ok-hand', 'OK Hand', '👌', 'People & Body', ['perfect', 'hand', 'gesture']),
  createEmojiPickerItem('flexed-biceps', 'Flexed Biceps', '💪', 'People & Body', ['strong', 'gym', 'arm']),
  createEmojiPickerItem('folded-hands', 'Folded Hands', '🙏', 'People & Body', ['thanks', 'pray', 'hands']),
  createEmojiPickerItem('index-pointing-up', 'Index Pointing Up', '☝️', 'People & Body', ['point', 'up', 'hand']),
  createEmojiPickerItem('handshake', 'Handshake', '🤝', 'People & Body', ['agreement', 'deal', 'hands']),
  createEmojiPickerItem('writing-hand', 'Writing Hand', '✍️', 'People & Body', ['write', 'note', 'hand']),

  createEmojiPickerItem('dog-face', 'Dog Face', '🐶', 'Animals & Nature', ['pet', 'dog', 'animal']),
  createEmojiPickerItem('cat-face', 'Cat Face', '🐱', 'Animals & Nature', ['pet', 'cat', 'animal']),
  createEmojiPickerItem('fox-face', 'Fox Face', '🦊', 'Animals & Nature', ['fox', 'wildlife', 'animal']),
  createEmojiPickerItem('panda', 'Panda', '🐼', 'Animals & Nature', ['bear', 'animal', 'cute']),
  createEmojiPickerItem('bird', 'Bird', '🐦', 'Animals & Nature', ['bird', 'nature', 'animal']),
  createEmojiPickerItem('butterfly', 'Butterfly', '🦋', 'Animals & Nature', ['insect', 'nature', 'spring']),
  createEmojiPickerItem('deciduous-tree', 'Tree', '🌳', 'Animals & Nature', ['tree', 'forest', 'nature']),
  createEmojiPickerItem('herb', 'Herb', '🌿', 'Animals & Nature', ['leaf', 'green', 'nature']),
  createEmojiPickerItem('sun', 'Sun', '☀️', 'Animals & Nature', ['day', 'light', 'weather']),
  createEmojiPickerItem('moon', 'Moon', '🌙', 'Animals & Nature', ['night', 'sky', 'weather']),

  createEmojiPickerItem('red-apple', 'Red Apple', '🍎', 'Food & Drink', ['fruit', 'apple', 'food']),
  createEmojiPickerItem('banana', 'Banana', '🍌', 'Food & Drink', ['fruit', 'banana', 'food']),
  createEmojiPickerItem('grapes', 'Grapes', '🍇', 'Food & Drink', ['fruit', 'grapes', 'food']),
  createEmojiPickerItem('pizza', 'Pizza', '🍕', 'Food & Drink', ['slice', 'cheese', 'food']),
  createEmojiPickerItem('hamburger', 'Hamburger', '🍔', 'Food & Drink', ['burger', 'fast food', 'meal']),
  createEmojiPickerItem('taco', 'Taco', '🌮', 'Food & Drink', ['mexican', 'food', 'meal']),
  createEmojiPickerItem('green-salad', 'Green Salad', '🥗', 'Food & Drink', ['healthy', 'vegetable', 'food']),
  createEmojiPickerItem('hot-beverage', 'Hot Beverage', '☕', 'Food & Drink', ['coffee', 'drink', 'cup']),
  createEmojiPickerItem('teacup', 'Teacup', '🍵', 'Food & Drink', ['tea', 'drink', 'cup']),
  createEmojiPickerItem('shortcake', 'Shortcake', '🍰', 'Food & Drink', ['dessert', 'cake', 'sweet']),

  createEmojiPickerItem('rocket', 'Rocket', '🚀', 'Travel & Places', ['launch', 'space', 'travel']),
  createEmojiPickerItem('automobile', 'Automobile', '🚗', 'Travel & Places', ['car', 'drive', 'travel']),
  createEmojiPickerItem('taxi', 'Taxi', '🚕', 'Travel & Places', ['cab', 'city', 'travel']),
  createEmojiPickerItem('bus', 'Bus', '🚌', 'Travel & Places', ['transport', 'road', 'travel']),
  createEmojiPickerItem('train', 'Train', '🚆', 'Travel & Places', ['rail', 'transport', 'travel']),
  createEmojiPickerItem('airplane', 'Airplane', '✈️', 'Travel & Places', ['flight', 'plane', 'travel']),
  createEmojiPickerItem('sailboat', 'Sailboat', '⛵', 'Travel & Places', ['boat', 'sea', 'travel']),
  createEmojiPickerItem('bicycle', 'Bicycle', '🚲', 'Travel & Places', ['bike', 'ride', 'travel']),
  createEmojiPickerItem('mountain', 'Mountain', '⛰️', 'Travel & Places', ['hike', 'nature', 'place']),
  createEmojiPickerItem('cityscape', 'Cityscape', '🌆', 'Travel & Places', ['city', 'buildings', 'place']),

  createEmojiPickerItem('soccer-ball', 'Soccer Ball', '⚽', 'Activities', ['football', 'sport', 'ball']),
  createEmojiPickerItem('basketball', 'Basketball', '🏀', 'Activities', ['sport', 'ball', 'game']),
  createEmojiPickerItem('american-football', 'American Football', '🏈', 'Activities', ['sport', 'ball', 'game']),
  createEmojiPickerItem('tennis', 'Tennis', '🎾', 'Activities', ['sport', 'racket', 'game']),
  createEmojiPickerItem('sports-medal', 'Sports Medal', '🏅', 'Activities', ['award', 'win', 'sport']),
  createEmojiPickerItem('trophy', 'Trophy', '🏆', 'Activities', ['award', 'winner', 'sport']),
  createEmojiPickerItem('video-game', 'Video Game', '🎮', 'Activities', ['gaming', 'controller', 'play']),
  createEmojiPickerItem('joystick', 'Joystick', '🕹️', 'Activities', ['arcade', 'gaming', 'play']),
  createEmojiPickerItem('puzzle-piece', 'Puzzle Piece', '🧩', 'Activities', ['game', 'piece', 'logic']),
  createEmojiPickerItem('artist-palette', 'Artist Palette', '🎨', 'Activities', ['art', 'paint', 'creative']),

  createEmojiPickerItem('light-bulb', 'Light Bulb', '💡', 'Objects', ['idea', 'light', 'object']),
  createEmojiPickerItem('package', 'Package', '📦', 'Objects', ['box', 'delivery', 'object']),
  createEmojiPickerItem('paperclip', 'Paperclip', '📎', 'Objects', ['attachment', 'office', 'object']),
  createEmojiPickerItem('pushpin', 'Pushpin', '📌', 'Objects', ['pin', 'note', 'object']),
  createEmojiPickerItem('laptop', 'Laptop', '💻', 'Objects', ['computer', 'device', 'object']),
  createEmojiPickerItem('mobile-phone', 'Mobile Phone', '📱', 'Objects', ['phone', 'device', 'object']),
  createEmojiPickerItem('camera', 'Camera', '📷', 'Objects', ['photo', 'device', 'object']),
  createEmojiPickerItem('key', 'Key', '🔑', 'Objects', ['unlock', 'access', 'object']),
  createEmojiPickerItem('lock', 'Lock', '🔒', 'Objects', ['secure', 'privacy', 'object']),
  createEmojiPickerItem('toolbox', 'Toolbox', '🧰', 'Objects', ['tools', 'repair', 'object']),

  createEmojiPickerItem('check-mark-button', 'Check Mark Button', '✅', 'Symbols', ['done', 'success', 'symbol']),
  createEmojiPickerItem('cross-mark', 'Cross Mark', '❌', 'Symbols', ['error', 'remove', 'symbol']),
  createEmojiPickerItem('warning', 'Warning', '⚠️', 'Symbols', ['alert', 'risk', 'symbol']),
  createEmojiPickerItem('question-mark', 'Question Mark', '❓', 'Symbols', ['ask', 'doubt', 'symbol']),
  createEmojiPickerItem('exclamation-mark', 'Exclamation Mark', '❗', 'Symbols', ['attention', 'alert', 'symbol']),
  createEmojiPickerItem('red-heart', 'Red Heart', '❤️', 'Symbols', ['love', 'favorite', 'symbol']),
  createEmojiPickerItem('star', 'Star', '⭐', 'Symbols', ['favorite', 'rating', 'symbol']),
  createEmojiPickerItem('fire', 'Fire', '🔥', 'Symbols', ['hot', 'trend', 'symbol']),
  createEmojiPickerItem('sparkles', 'Sparkles', '✨', 'Symbols', ['magic', 'shine', 'symbol']),
  createEmojiPickerItem('hundred-points', 'Hundred Points', '💯', 'Symbols', ['perfect', 'score', 'symbol']),

  createEmojiPickerItem('flag-spain', 'Flag: Spain', '🇪🇸', 'Flags', ['spain', 'country', 'flag']),
  createEmojiPickerItem('flag-united-states', 'Flag: United States', '🇺🇸', 'Flags', ['usa', 'america', 'flag']),
  createEmojiPickerItem('flag-france', 'Flag: France', '🇫🇷', 'Flags', ['france', 'country', 'flag']),
  createEmojiPickerItem('flag-germany', 'Flag: Germany', '🇩🇪', 'Flags', ['germany', 'country', 'flag']),
  createEmojiPickerItem('flag-italy', 'Flag: Italy', '🇮🇹', 'Flags', ['italy', 'country', 'flag']),
  createEmojiPickerItem('flag-united-kingdom', 'Flag: United Kingdom', '🇬🇧', 'Flags', ['uk', 'britain', 'flag']),
  createEmojiPickerItem('flag-japan', 'Flag: Japan', '🇯🇵', 'Flags', ['japan', 'country', 'flag']),
  createEmojiPickerItem('flag-brazil', 'Flag: Brazil', '🇧🇷', 'Flags', ['brazil', 'country', 'flag']),
  createEmojiPickerItem('flag-mexico', 'Flag: Mexico', '🇲🇽', 'Flags', ['mexico', 'country', 'flag']),
  createEmojiPickerItem('flag-portugal', 'Flag: Portugal', '🇵🇹', 'Flags', ['portugal', 'country', 'flag']),
];
