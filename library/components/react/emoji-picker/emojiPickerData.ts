export interface EmojiPickerItem {
  id: string;
  label: string;
  value: string;
  keywords?: string[];
  group?: string;
  src?: string;
}

export const DEFAULT_EMOJI_PICKER_ITEMS: EmojiPickerItem[] = [
  { id: 'wave', label: 'Wave', value: '👋', keywords: ['hello', 'hand'], group: 'gestures' },
  { id: 'thumbs-up', label: 'Thumbs Up', value: '👍', keywords: ['like', 'approve'], group: 'gestures' },
  { id: 'fire', label: 'Fire', value: '🔥', keywords: ['hot', 'trend'], group: 'status' },
  { id: 'sparkles', label: 'Sparkles', value: '✨', keywords: ['shine', 'magic'], group: 'status' },
  { id: 'rocket', label: 'Rocket', value: '🚀', keywords: ['launch', 'speed'], group: 'status' },
  { id: 'party', label: 'Party', value: '🎉', keywords: ['celebrate', 'confetti'], group: 'status' },
  { id: 'check', label: 'Check', value: '✅', keywords: ['done', 'success'], group: 'symbols' },
  { id: 'warning', label: 'Warning', value: '⚠️', keywords: ['alert', 'risk'], group: 'symbols' },
  { id: 'idea', label: 'Idea', value: '💡', keywords: ['tip', 'brainstorm'], group: 'objects' },
  { id: 'brain', label: 'Brain', value: '🧠', keywords: ['thinking', 'smart'], group: 'objects' },
  { id: 'palette', label: 'Palette', value: '🎨', keywords: ['design', 'art'], group: 'objects' },
  { id: 'package', label: 'Package', value: '📦', keywords: ['box', 'delivery'], group: 'objects' },
  { id: 'pin', label: 'Pin', value: '📌', keywords: ['attach', 'note'], group: 'objects' },
  { id: 'paperclip', label: 'Paperclip', value: '📎', keywords: ['attachment', 'file'], group: 'objects' },
  { id: 'puzzle', label: 'Puzzle', value: '🧩', keywords: ['piece', 'integration'], group: 'objects' },
  { id: 'tools', label: 'Tools', value: '🛠️', keywords: ['build', 'fix'], group: 'objects' },
  { id: 'megaphone', label: 'Megaphone', value: '📣', keywords: ['announce', 'broadcast'], group: 'objects' },
  { id: 'heart', label: 'Heart', value: '❤️', keywords: ['love', 'favorite'], group: 'status' },
  { id: 'star', label: 'Star', value: '⭐', keywords: ['favorite', 'quality'], group: 'status' },
  { id: 'moon', label: 'Moon', value: '🌙', keywords: ['night', 'dark'], group: 'nature' },
  { id: 'sun', label: 'Sun', value: '☀️', keywords: ['day', 'light'], group: 'nature' },
  { id: 'leaf', label: 'Leaf', value: '🌿', keywords: ['green', 'fresh'], group: 'nature' },
  { id: 'robot', label: 'Robot', value: '🤖', keywords: ['bot', 'ai'], group: 'faces' },
  { id: 'cool', label: 'Cool', value: '😎', keywords: ['confidence', 'style'], group: 'faces' },
];
