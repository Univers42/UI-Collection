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

const SMILEYS_AND_EMOTION_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('grinning-face', 'Grinning Face', '😀', 'Smileys & Emotion', ['smile', 'happy', 'face']),
  createEmojiPickerItem('beaming-face', 'Beaming Face', '😁', 'Smileys & Emotion', ['grin', 'cheerful', 'face']),
  createEmojiPickerItem('face-with-tears-of-joy', 'Face with Tears of Joy', '😂', 'Smileys & Emotion', ['laugh', 'funny', 'face']),
  createEmojiPickerItem('rolling-on-floor-laughing', 'Rolling on the Floor Laughing', '🤣', 'Smileys & Emotion', ['lol', 'funny', 'face']),
  createEmojiPickerItem('grinning-face-with-big-eyes', 'Grinning Face with Big Eyes', '😃', 'Smileys & Emotion', ['grin', 'joy', 'face']),
  createEmojiPickerItem('smiling-face', 'Smiling Face', '😄', 'Smileys & Emotion', ['smile', 'joy', 'face']),
  createEmojiPickerItem('grinning-face-with-sweat', 'Grinning Face with Sweat', '😅', 'Smileys & Emotion', ['relief', 'nervous', 'face']),
  createEmojiPickerItem('winking-face', 'Winking Face', '😉', 'Smileys & Emotion', ['wink', 'playful', 'face']),
  createEmojiPickerItem('blush-face', 'Blush Face', '😊', 'Smileys & Emotion', ['warm', 'kind', 'face']),
  createEmojiPickerItem('slightly-smiling-face', 'Slightly Smiling Face', '🙂', 'Smileys & Emotion', ['gentle', 'calm', 'face']),
  createEmojiPickerItem('heart-eyes', 'Heart Eyes', '😍', 'Smileys & Emotion', ['love', 'admire', 'face']),
  createEmojiPickerItem('face-blowing-kiss', 'Face Blowing a Kiss', '😘', 'Smileys & Emotion', ['kiss', 'love', 'face']),
  createEmojiPickerItem('smiling-face-with-sunglasses', 'Smiling Face with Sunglasses', '😎', 'Smileys & Emotion', ['cool', 'style', 'face']),
  createEmojiPickerItem('thinking-face', 'Thinking Face', '🤔', 'Smileys & Emotion', ['think', 'question', 'face']),
  createEmojiPickerItem('star-struck', 'Star-Struck', '🤩', 'Smileys & Emotion', ['excited', 'wow', 'face']),
  createEmojiPickerItem('party-face', 'Party Face', '🥳', 'Smileys & Emotion', ['celebrate', 'birthday', 'face']),
  createEmojiPickerItem('face-holding-back-tears', 'Face Holding Back Tears', '🥹', 'Smileys & Emotion', ['moved', 'emotional', 'face']),
  createEmojiPickerItem('crying-face', 'Crying Face', '😢', 'Smileys & Emotion', ['sad', 'tear', 'face']),
  createEmojiPickerItem('sleeping-face', 'Sleeping Face', '😴', 'Smileys & Emotion', ['sleep', 'tired', 'face']),
  createEmojiPickerItem('angry-face', 'Angry Face', '😠', 'Smileys & Emotion', ['mad', 'upset', 'face']),
];

const PEOPLE_AND_BODY_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('waving-hand', 'Waving Hand', '👋', 'People & Body', ['hello', 'greeting', 'hand']),
  createEmojiPickerItem('thumbs-up', 'Thumbs Up', '👍', 'People & Body', ['approve', 'like', 'hand']),
  createEmojiPickerItem('clapping-hands', 'Clapping Hands', '👏', 'People & Body', ['applause', 'celebrate', 'hands']),
  createEmojiPickerItem('raising-hands', 'Raising Hands', '🙌', 'People & Body', ['celebrate', 'praise', 'hands']),
  createEmojiPickerItem('ok-hand', 'OK Hand', '👌', 'People & Body', ['perfect', 'hand', 'gesture']),
  createEmojiPickerItem('victory-hand', 'Victory Hand', '✌️', 'People & Body', ['peace', 'win', 'hand']),
  createEmojiPickerItem('crossed-fingers', 'Crossed Fingers', '🤞', 'People & Body', ['luck', 'hope', 'hand']),
  createEmojiPickerItem('love-you-gesture', 'Love-You Gesture', '🤟', 'People & Body', ['love', 'gesture', 'hand']),
  createEmojiPickerItem('heart-hands', 'Heart Hands', '🫶', 'People & Body', ['love', 'heart', 'hands']),
  createEmojiPickerItem('hand-with-index-finger-and-thumb-crossed', 'Finger Heart', '🫰', 'People & Body', ['heart', 'cute', 'hand']),
  createEmojiPickerItem('flexed-biceps', 'Flexed Biceps', '💪', 'People & Body', ['strong', 'gym', 'arm']),
  createEmojiPickerItem('folded-hands', 'Folded Hands', '🙏', 'People & Body', ['thanks', 'pray', 'hands']),
  createEmojiPickerItem('index-pointing-up', 'Index Pointing Up', '☝️', 'People & Body', ['point', 'up', 'hand']),
  createEmojiPickerItem('handshake', 'Handshake', '🤝', 'People & Body', ['agreement', 'deal', 'hands']),
  createEmojiPickerItem('writing-hand', 'Writing Hand', '✍️', 'People & Body', ['write', 'note', 'hand']),
  createEmojiPickerItem('person-raising-hand', 'Person Raising Hand', '🙋', 'People & Body', ['question', 'volunteer', 'person']),
  createEmojiPickerItem('person-facepalming', 'Person Facepalming', '🤦', 'People & Body', ['mistake', 'frustration', 'person']),
  createEmojiPickerItem('person-tipping-hand', 'Person Tipping Hand', '💁', 'People & Body', ['help', 'info', 'person']),
  createEmojiPickerItem('person-running', 'Person Running', '🏃', 'People & Body', ['run', 'exercise', 'person']),
  createEmojiPickerItem('woman-dancing', 'Woman Dancing', '💃', 'People & Body', ['dance', 'party', 'person']),
];

const ANIMALS_AND_NATURE_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('dog-face', 'Dog Face', '🐶', 'Animals & Nature', ['pet', 'dog', 'animal']),
  createEmojiPickerItem('cat-face', 'Cat Face', '🐱', 'Animals & Nature', ['pet', 'cat', 'animal']),
  createEmojiPickerItem('mouse-face', 'Mouse Face', '🐭', 'Animals & Nature', ['mouse', 'animal', 'pet']),
  createEmojiPickerItem('hamster-face', 'Hamster Face', '🐹', 'Animals & Nature', ['hamster', 'animal', 'pet']),
  createEmojiPickerItem('rabbit-face', 'Rabbit Face', '🐰', 'Animals & Nature', ['rabbit', 'animal', 'pet']),
  createEmojiPickerItem('fox-face', 'Fox Face', '🦊', 'Animals & Nature', ['fox', 'wildlife', 'animal']),
  createEmojiPickerItem('bear', 'Bear', '🐻', 'Animals & Nature', ['bear', 'animal', 'wildlife']),
  createEmojiPickerItem('panda', 'Panda', '🐼', 'Animals & Nature', ['bear', 'animal', 'cute']),
  createEmojiPickerItem('koala', 'Koala', '🐨', 'Animals & Nature', ['koala', 'animal', 'wildlife']),
  createEmojiPickerItem('tiger-face', 'Tiger Face', '🐯', 'Animals & Nature', ['tiger', 'animal', 'wildlife']),
  createEmojiPickerItem('lion', 'Lion', '🦁', 'Animals & Nature', ['lion', 'animal', 'wildlife']),
  createEmojiPickerItem('frog', 'Frog', '🐸', 'Animals & Nature', ['frog', 'animal', 'nature']),
  createEmojiPickerItem('monkey-face', 'Monkey Face', '🐵', 'Animals & Nature', ['monkey', 'animal', 'wildlife']),
  createEmojiPickerItem('butterfly', 'Butterfly', '🦋', 'Animals & Nature', ['insect', 'nature', 'spring']),
  createEmojiPickerItem('turtle', 'Turtle', '🐢', 'Animals & Nature', ['turtle', 'animal', 'sea']),
  createEmojiPickerItem('dolphin', 'Dolphin', '🐬', 'Animals & Nature', ['dolphin', 'animal', 'sea']),
  createEmojiPickerItem('deciduous-tree', 'Tree', '🌳', 'Animals & Nature', ['tree', 'forest', 'nature']),
  createEmojiPickerItem('herb', 'Herb', '🌿', 'Animals & Nature', ['leaf', 'green', 'nature']),
  createEmojiPickerItem('cherry-blossom', 'Cherry Blossom', '🌸', 'Animals & Nature', ['flower', 'spring', 'nature']),
  createEmojiPickerItem('rainbow', 'Rainbow', '🌈', 'Animals & Nature', ['rainbow', 'sky', 'weather']),
];

const FOOD_AND_DRINK_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('red-apple', 'Red Apple', '🍎', 'Food & Drink', ['fruit', 'apple', 'food']),
  createEmojiPickerItem('banana', 'Banana', '🍌', 'Food & Drink', ['fruit', 'banana', 'food']),
  createEmojiPickerItem('grapes', 'Grapes', '🍇', 'Food & Drink', ['fruit', 'grapes', 'food']),
  createEmojiPickerItem('watermelon', 'Watermelon', '🍉', 'Food & Drink', ['fruit', 'watermelon', 'food']),
  createEmojiPickerItem('strawberry', 'Strawberry', '🍓', 'Food & Drink', ['fruit', 'strawberry', 'food']),
  createEmojiPickerItem('cherries', 'Cherries', '🍒', 'Food & Drink', ['fruit', 'cherries', 'food']),
  createEmojiPickerItem('avocado', 'Avocado', '🥑', 'Food & Drink', ['fruit', 'avocado', 'food']),
  createEmojiPickerItem('croissant', 'Croissant', '🥐', 'Food & Drink', ['bakery', 'bread', 'food']),
  createEmojiPickerItem('bread', 'Bread', '🍞', 'Food & Drink', ['bakery', 'bread', 'food']),
  createEmojiPickerItem('cheese-wedge', 'Cheese Wedge', '🧀', 'Food & Drink', ['cheese', 'dairy', 'food']),
  createEmojiPickerItem('pizza', 'Pizza', '🍕', 'Food & Drink', ['slice', 'cheese', 'food']),
  createEmojiPickerItem('hamburger', 'Hamburger', '🍔', 'Food & Drink', ['burger', 'fast food', 'meal']),
  createEmojiPickerItem('hot-dog', 'Hot Dog', '🌭', 'Food & Drink', ['fast food', 'sausage', 'meal']),
  createEmojiPickerItem('taco', 'Taco', '🌮', 'Food & Drink', ['mexican', 'food', 'meal']),
  createEmojiPickerItem('green-salad', 'Green Salad', '🥗', 'Food & Drink', ['healthy', 'vegetable', 'food']),
  createEmojiPickerItem('sushi', 'Sushi', '🍣', 'Food & Drink', ['japanese', 'rice', 'food']),
  createEmojiPickerItem('steaming-bowl', 'Steaming Bowl', '🍜', 'Food & Drink', ['noodles', 'soup', 'food']),
  createEmojiPickerItem('hot-beverage', 'Hot Beverage', '☕', 'Food & Drink', ['coffee', 'drink', 'cup']),
  createEmojiPickerItem('teacup', 'Teacup', '🍵', 'Food & Drink', ['tea', 'drink', 'cup']),
  createEmojiPickerItem('shortcake', 'Shortcake', '🍰', 'Food & Drink', ['dessert', 'cake', 'sweet']),
];

const TRAVEL_AND_PLACES_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('rocket', 'Rocket', '🚀', 'Travel & Places', ['launch', 'space', 'travel']),
  createEmojiPickerItem('automobile', 'Automobile', '🚗', 'Travel & Places', ['car', 'drive', 'travel']),
  createEmojiPickerItem('taxi', 'Taxi', '🚕', 'Travel & Places', ['cab', 'city', 'travel']),
  createEmojiPickerItem('bus', 'Bus', '🚌', 'Travel & Places', ['transport', 'road', 'travel']),
  createEmojiPickerItem('train', 'Train', '🚆', 'Travel & Places', ['rail', 'transport', 'travel']),
  createEmojiPickerItem('airplane', 'Airplane', '✈️', 'Travel & Places', ['flight', 'plane', 'travel']),
  createEmojiPickerItem('sailboat', 'Sailboat', '⛵', 'Travel & Places', ['boat', 'sea', 'travel']),
  createEmojiPickerItem('bicycle', 'Bicycle', '🚲', 'Travel & Places', ['bike', 'ride', 'travel']),
  createEmojiPickerItem('motorcycle', 'Motorcycle', '🏍️', 'Travel & Places', ['motorbike', 'ride', 'travel']),
  createEmojiPickerItem('kick-scooter', 'Kick Scooter', '🛴', 'Travel & Places', ['scooter', 'ride', 'travel']),
  createEmojiPickerItem('metro', 'Metro', '🚇', 'Travel & Places', ['subway', 'city', 'travel']),
  createEmojiPickerItem('delivery-truck', 'Delivery Truck', '🚚', 'Travel & Places', ['truck', 'shipping', 'travel']),
  createEmojiPickerItem('tractor', 'Tractor', '🚜', 'Travel & Places', ['farm', 'vehicle', 'travel']),
  createEmojiPickerItem('flying-saucer', 'Flying Saucer', '🛸', 'Travel & Places', ['ufo', 'space', 'travel']),
  createEmojiPickerItem('mountain', 'Mountain', '⛰️', 'Travel & Places', ['hike', 'nature', 'place']),
  createEmojiPickerItem('camping', 'Camping', '🏕️', 'Travel & Places', ['outdoors', 'tent', 'place']),
  createEmojiPickerItem('beach-with-umbrella', 'Beach with Umbrella', '🏖️', 'Travel & Places', ['beach', 'vacation', 'place']),
  createEmojiPickerItem('cityscape', 'Cityscape', '🌆', 'Travel & Places', ['city', 'buildings', 'place']),
  createEmojiPickerItem('statue-of-liberty', 'Statue of Liberty', '🗽', 'Travel & Places', ['landmark', 'new york', 'place']),
  createEmojiPickerItem('stadium', 'Stadium', '🏟️', 'Travel & Places', ['sports', 'venue', 'place']),
];

const ACTIVITIES_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('soccer-ball', 'Soccer Ball', '⚽', 'Activities', ['football', 'sport', 'ball']),
  createEmojiPickerItem('basketball', 'Basketball', '🏀', 'Activities', ['sport', 'ball', 'game']),
  createEmojiPickerItem('american-football', 'American Football', '🏈', 'Activities', ['sport', 'ball', 'game']),
  createEmojiPickerItem('baseball', 'Baseball', '⚾', 'Activities', ['sport', 'ball', 'game']),
  createEmojiPickerItem('tennis', 'Tennis', '🎾', 'Activities', ['sport', 'racket', 'game']),
  createEmojiPickerItem('volleyball', 'Volleyball', '🏐', 'Activities', ['sport', 'ball', 'game']),
  createEmojiPickerItem('ping-pong', 'Ping Pong', '🏓', 'Activities', ['sport', 'table tennis', 'game']),
  createEmojiPickerItem('badminton', 'Badminton', '🏸', 'Activities', ['sport', 'racket', 'game']),
  createEmojiPickerItem('boxing-glove', 'Boxing Glove', '🥊', 'Activities', ['sport', 'fight', 'game']),
  createEmojiPickerItem('martial-arts-uniform', 'Martial Arts Uniform', '🥋', 'Activities', ['sport', 'dojo', 'game']),
  createEmojiPickerItem('sports-medal', 'Sports Medal', '🏅', 'Activities', ['award', 'win', 'sport']),
  createEmojiPickerItem('trophy', 'Trophy', '🏆', 'Activities', ['award', 'winner', 'sport']),
  createEmojiPickerItem('direct-hit', 'Direct Hit', '🎯', 'Activities', ['target', 'game', 'score']),
  createEmojiPickerItem('video-game', 'Video Game', '🎮', 'Activities', ['gaming', 'controller', 'play']),
  createEmojiPickerItem('joystick', 'Joystick', '🕹️', 'Activities', ['arcade', 'gaming', 'play']),
  createEmojiPickerItem('game-die', 'Game Die', '🎲', 'Activities', ['dice', 'board game', 'play']),
  createEmojiPickerItem('puzzle-piece', 'Puzzle Piece', '🧩', 'Activities', ['game', 'piece', 'logic']),
  createEmojiPickerItem('artist-palette', 'Artist Palette', '🎨', 'Activities', ['art', 'paint', 'creative']),
  createEmojiPickerItem('clapper-board', 'Clapper Board', '🎬', 'Activities', ['movie', 'film', 'creative']),
  createEmojiPickerItem('performing-arts', 'Performing Arts', '🎭', 'Activities', ['theater', 'drama', 'creative']),
];

const OBJECTS_ITEMS: EmojiPickerItem[] = [
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
  createEmojiPickerItem('compass', 'Compass', '🧭', 'Objects', ['direction', 'travel', 'object']),
  createEmojiPickerItem('watch', 'Watch', '⌚', 'Objects', ['time', 'wearable', 'object']),
  createEmojiPickerItem('alarm-clock', 'Alarm Clock', '⏰', 'Objects', ['time', 'reminder', 'object']),
  createEmojiPickerItem('candle', 'Candle', '🕯️', 'Objects', ['light', 'warm', 'object']),
  createEmojiPickerItem('test-tube', 'Test Tube', '🧪', 'Objects', ['science', 'lab', 'object']),
  createEmojiPickerItem('microscope', 'Microscope', '🔬', 'Objects', ['science', 'lab', 'object']),
  createEmojiPickerItem('dna', 'DNA', '🧬', 'Objects', ['science', 'biology', 'object']),
  createEmojiPickerItem('gem-stone', 'Gem Stone', '💎', 'Objects', ['gem', 'luxury', 'object']),
  createEmojiPickerItem('credit-card', 'Credit Card', '💳', 'Objects', ['money', 'payment', 'object']),
  createEmojiPickerItem('books', 'Books', '📚', 'Objects', ['books', 'study', 'object']),
];

const SYMBOLS_ITEMS: EmojiPickerItem[] = [
  createEmojiPickerItem('check-mark-button', 'Check Mark Button', '✅', 'Symbols', ['done', 'success', 'symbol']),
  createEmojiPickerItem('check-box-with-check', 'Check Box with Check', '☑️', 'Symbols', ['done', 'checkbox', 'symbol']),
  createEmojiPickerItem('heavy-check-mark', 'Heavy Check Mark', '✔️', 'Symbols', ['confirm', 'success', 'symbol']),
  createEmojiPickerItem('cross-mark', 'Cross Mark', '❌', 'Symbols', ['error', 'remove', 'symbol']),
  createEmojiPickerItem('question-mark', 'Question Mark', '❓', 'Symbols', ['ask', 'doubt', 'symbol']),
  createEmojiPickerItem('exclamation-mark', 'Exclamation Mark', '❗', 'Symbols', ['attention', 'alert', 'symbol']),
  createEmojiPickerItem('warning', 'Warning', '⚠️', 'Symbols', ['alert', 'risk', 'symbol']),
  createEmojiPickerItem('plus', 'Plus', '➕', 'Symbols', ['add', 'math', 'symbol']),
  createEmojiPickerItem('minus', 'Minus', '➖', 'Symbols', ['remove', 'math', 'symbol']),
  createEmojiPickerItem('division', 'Division', '➗', 'Symbols', ['math', 'operator', 'symbol']),
  createEmojiPickerItem('right-arrow', 'Right Arrow', '➡️', 'Symbols', ['direction', 'arrow', 'symbol']),
  createEmojiPickerItem('left-arrow', 'Left Arrow', '⬅️', 'Symbols', ['direction', 'arrow', 'symbol']),
  createEmojiPickerItem('up-arrow', 'Up Arrow', '⬆️', 'Symbols', ['direction', 'arrow', 'symbol']),
  createEmojiPickerItem('down-arrow', 'Down Arrow', '⬇️', 'Symbols', ['direction', 'arrow', 'symbol']),
  createEmojiPickerItem('red-heart', 'Red Heart', '❤️', 'Symbols', ['love', 'favorite', 'symbol']),
  createEmojiPickerItem('star', 'Star', '⭐', 'Symbols', ['favorite', 'rating', 'symbol']),
  createEmojiPickerItem('fire', 'Fire', '🔥', 'Symbols', ['hot', 'trend', 'symbol']),
  createEmojiPickerItem('sparkles', 'Sparkles', '✨', 'Symbols', ['magic', 'shine', 'symbol']),
  createEmojiPickerItem('recycle-symbol', 'Recycle Symbol', '♻️', 'Symbols', ['recycle', 'green', 'symbol']),
  createEmojiPickerItem('hundred-points', 'Hundred Points', '💯', 'Symbols', ['perfect', 'score', 'symbol']),
];

const FLAGS_ITEMS: EmojiPickerItem[] = [
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
  createEmojiPickerItem('flag-canada', 'Flag: Canada', '🇨🇦', 'Flags', ['canada', 'country', 'flag']),
  createEmojiPickerItem('flag-australia', 'Flag: Australia', '🇦🇺', 'Flags', ['australia', 'country', 'flag']),
  createEmojiPickerItem('flag-netherlands', 'Flag: Netherlands', '🇳🇱', 'Flags', ['netherlands', 'country', 'flag']),
  createEmojiPickerItem('flag-switzerland', 'Flag: Switzerland', '🇨🇭', 'Flags', ['switzerland', 'country', 'flag']),
  createEmojiPickerItem('flag-sweden', 'Flag: Sweden', '🇸🇪', 'Flags', ['sweden', 'country', 'flag']),
  createEmojiPickerItem('flag-norway', 'Flag: Norway', '🇳🇴', 'Flags', ['norway', 'country', 'flag']),
  createEmojiPickerItem('flag-denmark', 'Flag: Denmark', '🇩🇰', 'Flags', ['denmark', 'country', 'flag']),
  createEmojiPickerItem('flag-argentina', 'Flag: Argentina', '🇦🇷', 'Flags', ['argentina', 'country', 'flag']),
  createEmojiPickerItem('flag-chile', 'Flag: Chile', '🇨🇱', 'Flags', ['chile', 'country', 'flag']),
  createEmojiPickerItem('flag-south-korea', 'Flag: South Korea', '🇰🇷', 'Flags', ['korea', 'country', 'flag']),
];

export const DEFAULT_EMOJI_PICKER_ITEMS: EmojiPickerItem[] = [
  ...SMILEYS_AND_EMOTION_ITEMS,
  ...PEOPLE_AND_BODY_ITEMS,
  ...ANIMALS_AND_NATURE_ITEMS,
  ...FOOD_AND_DRINK_ITEMS,
  ...TRAVEL_AND_PLACES_ITEMS,
  ...ACTIVITIES_ITEMS,
  ...OBJECTS_ITEMS,
  ...SYMBOLS_ITEMS,
  ...FLAGS_ITEMS,
];
