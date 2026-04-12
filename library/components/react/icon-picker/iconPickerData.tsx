import {
  cloneElement,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  IconAudio,
  IconBoard,
  IconBookmark,
  IconBreadcrumb,
  IconCalendar,
  IconCalendarCheck,
  IconChat,
  IconCheckCircle,
  IconClock,
  IconBullet,
  IconCallout,
  IconCode,
  IconColumns,
  IconDivider,
  IconEmbed,
  IconEquation,
  IconFile,
  IconFolder,
  IconGlobe,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconImage,
  IconLinkToPage,
  IconList,
  IconLock,
  IconMail,
  IconNumbered,
  IconPage,
  IconQuote,
  IconRocket,
  IconSearch,
  IconSettings,
  IconSpacer,
  IconSparkles,
  IconTOC,
  IconTable,
  IconText,
  IconTodo,
  IconToggle,
  IconUsers,
  IconVideo,
  IconGallery,
} from '../../../icons/react/slash-menu/index.js';

export interface IconPickerItem {
  id: string;
  label: string;
  icon: ComponentType;
  keywords?: string[];
  group?: string;
}

function createGlyphIcon(glyph: string, fontSize = 11): ComponentType {
  return function GlyphIcon() {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ display: 'block' }}>
        <text
          x="10"
          y="13"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {glyph}
        </text>
      </svg>
    );
  };
}

function createNodeIcon(node: ReactNode): ComponentType {
  return function NodeIcon() {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" style={{ display: 'block' }}>
        {node}
      </svg>
    );
  };
}

const EXTRA_ICON_PICKER_ITEMS: IconPickerItem[] = [
  { id: 'search-plus', label: 'Search Plus', icon: createGlyphIcon('⌕'), keywords: ['search', 'find', 'zoom'], group: 'utility' },
  { id: 'command', label: 'Command', icon: createGlyphIcon('⌘'), keywords: ['command', 'shortcut', 'keyboard'], group: 'utility' },
  { id: 'option', label: 'Option', icon: createGlyphIcon('⌥'), keywords: ['option', 'alt', 'keyboard'], group: 'utility' },
  { id: 'return', label: 'Return', icon: createGlyphIcon('↵'), keywords: ['return', 'enter', 'keyboard'], group: 'utility' },
  { id: 'escape', label: 'Escape', icon: createGlyphIcon('⎋'), keywords: ['escape', 'keyboard', 'close'], group: 'utility' },
  { id: 'infinity', label: 'Infinity', icon: createGlyphIcon('∞'), keywords: ['infinite', 'loop', 'math'], group: 'utility' },
  { id: 'percent', label: 'Percent', icon: createGlyphIcon('%'), keywords: ['percent', 'discount', 'math'], group: 'commerce' },
  { id: 'euro', label: 'Euro', icon: createGlyphIcon('€'), keywords: ['finance', 'currency', 'money'], group: 'commerce' },
  { id: 'dollar', label: 'Dollar', icon: createGlyphIcon('$'), keywords: ['finance', 'currency', 'money'], group: 'commerce' },
  { id: 'yen', label: 'Yen', icon: createGlyphIcon('¥'), keywords: ['finance', 'currency', 'money'], group: 'commerce' },
  { id: 'chart-up', label: 'Chart Up', icon: createGlyphIcon('↗'), keywords: ['analytics', 'growth', 'chart'], group: 'commerce' },
  { id: 'chart-down', label: 'Chart Down', icon: createGlyphIcon('↘'), keywords: ['analytics', 'decline', 'chart'], group: 'commerce' },
  { id: 'sale', label: 'Sale', icon: createGlyphIcon('%'), keywords: ['sale', 'offer', 'discount'], group: 'commerce' },
  { id: 'gift', label: 'Gift', icon: createGlyphIcon('✦'), keywords: ['gift', 'present', 'celebrate'], group: 'commerce' },
  { id: 'mail-alt', label: 'Mail Alt', icon: createGlyphIcon('✉'), keywords: ['email', 'message', 'mail'], group: 'communication' },
  { id: 'at', label: 'At Sign', icon: createGlyphIcon('@'), keywords: ['mention', 'email', 'contact'], group: 'communication' },
  { id: 'phone-alt', label: 'Phone Alt', icon: createGlyphIcon('☎'), keywords: ['phone', 'call', 'contact'], group: 'communication' },
  { id: 'broadcast', label: 'Broadcast', icon: createGlyphIcon('◉'), keywords: ['broadcast', 'radio', 'signal'], group: 'communication' },
  { id: 'send', label: 'Send', icon: createGlyphIcon('➤'), keywords: ['send', 'paper plane', 'message'], group: 'communication' },
  { id: 'hashtag', label: 'Hashtag', icon: createGlyphIcon('#'), keywords: ['hashtag', 'tag', 'social'], group: 'communication' },
  { id: 'sun', label: 'Sun', icon: createGlyphIcon('☀'), keywords: ['weather', 'sunny', 'day'], group: 'weather' },
  { id: 'cloud', label: 'Cloud', icon: createGlyphIcon('☁'), keywords: ['weather', 'cloud', 'sky'], group: 'weather' },
  { id: 'umbrella', label: 'Umbrella', icon: createGlyphIcon('☂'), keywords: ['rain', 'umbrella', 'weather'], group: 'weather' },
  { id: 'snow', label: 'Snowflake', icon: createGlyphIcon('❄'), keywords: ['snow', 'winter', 'cold'], group: 'weather' },
  { id: 'moon', label: 'Moon', icon: createGlyphIcon('☾'), keywords: ['night', 'moon', 'sleep'], group: 'weather' },
  { id: 'leaf', label: 'Leaf', icon: createGlyphIcon('❋'), keywords: ['nature', 'leaf', 'eco'], group: 'nature' },
  { id: 'flower', label: 'Flower', icon: createGlyphIcon('✿'), keywords: ['flower', 'spring', 'nature'], group: 'nature' },
  { id: 'sparkle-alt', label: 'Sparkle Alt', icon: createGlyphIcon('✧'), keywords: ['sparkle', 'shine', 'magic'], group: 'nature' },
  { id: 'planet', label: 'Planet', icon: createGlyphIcon('◌'), keywords: ['space', 'planet', 'orbit'], group: 'travel' },
  { id: 'flag-alt', label: 'Flag Alt', icon: createGlyphIcon('⚑'), keywords: ['flag', 'marker', 'travel'], group: 'travel' },
  { id: 'location-pin', label: 'Location Pin', icon: createGlyphIcon('⌖'), keywords: ['location', 'pin', 'map'], group: 'travel' },
  { id: 'compass-alt', label: 'Compass Alt', icon: createGlyphIcon('⌾'), keywords: ['compass', 'navigation', 'travel'], group: 'travel' },
  { id: 'train-alt', label: 'Train Alt', icon: createGlyphIcon('≋'), keywords: ['train', 'transport', 'travel'], group: 'travel' },
  { id: 'plane-alt', label: 'Plane Alt', icon: createGlyphIcon('✈'), keywords: ['plane', 'flight', 'travel'], group: 'travel' },
  { id: 'ship-alt', label: 'Ship Alt', icon: createGlyphIcon('⚓'), keywords: ['ship', 'anchor', 'travel'], group: 'travel' },
  { id: 'coffee-alt', label: 'Coffee Alt', icon: createGlyphIcon('☕'), keywords: ['coffee', 'drink', 'break'], group: 'lifestyle' },
  { id: 'music-alt', label: 'Music Alt', icon: createGlyphIcon('♫'), keywords: ['music', 'audio', 'song'], group: 'media' },
  { id: 'podcast', label: 'Podcast', icon: createGlyphIcon('◍'), keywords: ['podcast', 'audio', 'broadcast'], group: 'media' },
  { id: 'clapper', label: 'Clapper', icon: createGlyphIcon('▣'), keywords: ['movie', 'film', 'video'], group: 'media' },
  { id: 'microphone-alt', label: 'Microphone Alt', icon: createGlyphIcon('◖'), keywords: ['microphone', 'record', 'audio'], group: 'media' },
  { id: 'palette-alt', label: 'Palette Alt', icon: createGlyphIcon('✎'), keywords: ['design', 'draw', 'creative'], group: 'creative' },
  { id: 'pen-tool', label: 'Pen Tool', icon: createGlyphIcon('✐'), keywords: ['design', 'edit', 'vector'], group: 'creative' },
  { id: 'crop', label: 'Crop', icon: createNodeIcon(<path d="M6 3.5a.75.75 0 0 1 1.5 0V5h5.75a.75.75 0 0 1 0 1.5H7.5v7.75a.75.75 0 0 1-1.5 0V6.5H4.5a.75.75 0 0 1 0-1.5H6zm3.75 3a.75.75 0 0 1 .75-.75H15a1.5 1.5 0 0 1 1.5 1.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1-.75-.75" />), keywords: ['crop', 'image', 'edit'], group: 'creative' },
  { id: 'layers', label: 'Layers', icon: createNodeIcon(<path d="m10 3.5 6 3.25-6 3.25-6-3.25zm0 4.95 5.1 2.76L10 14l-5.1-2.79zm0 4.05 4.2 2.28a.75.75 0 1 1-.72 1.32L10 14.19l-3.48 1.89a.75.75 0 1 1-.72-1.32z" />), keywords: ['layers', 'stack', 'layout'], group: 'creative' },
  { id: 'grid-alt', label: 'Grid Alt', icon: createNodeIcon(<path d="M3.5 3.5h5v5h-5zm1.5 1.5V7h2V5zm5 0h5v5h-5zm1.5 0V7h2V5zm-8 5h5v5h-5zm1.5 1.5v2h2v-2zm5-1.5h5v5h-5zm1.5 1.5v2h2v-2z" />), keywords: ['grid', 'layout', 'dashboard'], group: 'layout' },
  { id: 'window', label: 'Window', icon: createNodeIcon(<path d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v1.5h11V5a.5.5 0 0 0-.5-.5zm-.5 3.5v7a.5.5 0 0 0 .5.5h4.25V8zm5.75 0v7.5H15a.5.5 0 0 0 .5-.5V8z" />), keywords: ['window', 'app', 'layout'], group: 'layout' },
  { id: 'terminal', label: 'Terminal', icon: createNodeIcon(<path d="M3.5 4.25A1.75 1.75 0 0 1 5.25 2.5h9.5a1.75 1.75 0 0 1 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75h-9.5A1.75 1.75 0 0 1 3.5 15.75zm2.31 2.22a.75.75 0 0 0-1.12 1l1.56 1.75-1.56 1.75a.75.75 0 0 0 1.12 1l2-2.25a.75.75 0 0 0 0-1zm3.44 4.78a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z" />), keywords: ['terminal', 'cli', 'developer'], group: 'developer' },
  { id: 'database-alt', label: 'Database Alt', icon: createNodeIcon(<path d="M10 3c-3.59 0-6 .94-6 2.33v9.34C4 16.06 6.41 17 10 17s6-.94 6-2.33V5.33C16 3.94 13.59 3 10 3m0 1.5c2.92 0 4.5.69 4.5.83S12.92 6.17 10 6.17s-4.5-.69-4.5-.84S7.08 4.5 10 4.5m0 4.17c1.78 0 3.32-.22 4.5-.6v1.43c0 .14-1.58.83-4.5.83s-4.5-.69-4.5-.83V8.07c1.18.38 2.72.6 4.5.6m0 4.17c1.78 0 3.32-.22 4.5-.6v1.43c0 .14-1.58.83-4.5.83s-4.5-.69-4.5-.83v-1.43c1.18.38 2.72.6 4.5.6" />), keywords: ['database', 'storage', 'backend'], group: 'developer' },
  { id: 'bug-alt', label: 'Bug Alt', icon: createNodeIcon(<path d="M10 4.25a2 2 0 0 1 2 2V7h1.25a.75.75 0 0 1 0 1.5H12v1h1.25a.75.75 0 0 1 0 1.5H12v1h1.25a.75.75 0 0 1 0 1.5H12v.25a2 2 0 0 1-4 0V13.5H6.75a.75.75 0 0 1 0-1.5H8v-1H6.75a.75.75 0 0 1 0-1.5H8v-1H6.75a.75.75 0 0 1 0-1.5H8v-.75a2 2 0 0 1 2-2m0 1.5a.5.5 0 0 0-.5.5v7.5a.5.5 0 0 0 1 0v-7.5a.5.5 0 0 0-.5-.5M7.37 4.1a.75.75 0 0 1 1.06 0L9.5 5.16a.75.75 0 1 1-1.06 1.06L7.37 5.16a.75.75 0 0 1 0-1.06m5.26 0a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0" />), keywords: ['bug', 'issue', 'developer'], group: 'developer' },
  { id: 'shield-check', label: 'Shield Check', icon: createNodeIcon(<path d="M10 2.75 15.5 4.5v4.37c0 3.11-1.82 5.94-4.65 7.25L10 16.5l-.85-.38C6.32 14.8 4.5 11.98 4.5 8.87V4.5zm0 1.57L6 5.62v3.25c0 2.44 1.4 4.66 3.58 5.7l.42.19.42-.19A6.33 6.33 0 0 0 14 8.87V5.62zm2.28 2.84a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0L7.47 9.47a.75.75 0 1 1 1.06-1.06l.72.72 1.97-1.97a.75.75 0 0 1 1.06 0" />), keywords: ['shield', 'check', 'security'], group: 'utility' },
];

export const DEFAULT_ICON_PICKER_ITEMS: IconPickerItem[] = [
  { id: 'text', label: 'Text', icon: IconText, keywords: ['paragraph', 'plain'], group: 'basic' },
  { id: 'heading-1', label: 'Heading 1', icon: IconH1, keywords: ['title', 'h1'], group: 'basic' },
  { id: 'heading-2', label: 'Heading 2', icon: IconH2, keywords: ['subtitle', 'h2'], group: 'basic' },
  { id: 'heading-3', label: 'Heading 3', icon: IconH3, keywords: ['headline', 'h3'], group: 'basic' },
  { id: 'heading-4', label: 'Heading 4', icon: IconH4, keywords: ['headline', 'h4'], group: 'basic' },
  { id: 'heading-5', label: 'Heading 5', icon: IconH5, keywords: ['headline', 'h5'], group: 'basic' },
  { id: 'heading-6', label: 'Heading 6', icon: IconH6, keywords: ['headline', 'h6'], group: 'basic' },
  { id: 'bullet', label: 'Bulleted List', icon: IconBullet, keywords: ['unordered', 'list'], group: 'lists' },
  { id: 'numbered', label: 'Numbered List', icon: IconNumbered, keywords: ['ordered', 'list'], group: 'lists' },
  { id: 'todo', label: 'To-do', icon: IconTodo, keywords: ['checkbox', 'task'], group: 'lists' },
  { id: 'toggle', label: 'Toggle', icon: IconToggle, keywords: ['collapse', 'disclosure'], group: 'lists' },
  { id: 'page', label: 'Page', icon: IconPage, keywords: ['document', 'sheet'], group: 'basic' },
  { id: 'callout', label: 'Callout', icon: IconCallout, keywords: ['tip', 'hint'], group: 'blocks' },
  { id: 'quote', label: 'Quote', icon: IconQuote, keywords: ['blockquote', 'citation'], group: 'blocks' },
  { id: 'table', label: 'Table', icon: IconTable, keywords: ['grid', 'database'], group: 'blocks' },
  { id: 'divider', label: 'Divider', icon: IconDivider, keywords: ['separator', 'rule'], group: 'blocks' },
  { id: 'link', label: 'Link to Page', icon: IconLinkToPage, keywords: ['navigation', 'reference'], group: 'blocks' },
  { id: 'image', label: 'Image', icon: IconImage, keywords: ['media', 'photo'], group: 'media' },
  { id: 'video', label: 'Video', icon: IconVideo, keywords: ['media', 'clip'], group: 'media' },
  { id: 'audio', label: 'Audio', icon: IconAudio, keywords: ['sound', 'voice'], group: 'media' },
  { id: 'code', label: 'Code', icon: IconCode, keywords: ['developer', 'snippet'], group: 'advanced' },
  { id: 'file', label: 'File', icon: IconFile, keywords: ['document', 'attachment'], group: 'advanced' },
  { id: 'bookmark', label: 'Bookmark', icon: IconBookmark, keywords: ['save', 'favorite'], group: 'advanced' },
  { id: 'board', label: 'Board', icon: IconBoard, keywords: ['kanban', 'cards'], group: 'layout' },
  { id: 'columns', label: 'Columns', icon: IconColumns, keywords: ['layout', 'grid'], group: 'layout' },
  { id: 'toc', label: 'Table of Contents', icon: IconTOC, keywords: ['outline', 'index'], group: 'advanced' },
  { id: 'equation', label: 'Equation', icon: IconEquation, keywords: ['math', 'formula'], group: 'advanced' },
  { id: 'spacer', label: 'Spacer', icon: IconSpacer, keywords: ['gap', 'space'], group: 'layout' },
  { id: 'embed', label: 'Embed', icon: IconEmbed, keywords: ['external', 'iframe'], group: 'advanced' },
  { id: 'breadcrumb', label: 'Breadcrumb', icon: IconBreadcrumb, keywords: ['path', 'navigation'], group: 'layout' },
  { id: 'gallery', label: 'Gallery', icon: IconGallery, keywords: ['media', 'grid', 'images'], group: 'media' },
  { id: 'list', label: 'List', icon: IconList, keywords: ['items', 'outline', 'rows'], group: 'lists' },
  { id: 'calendar', label: 'Calendar', icon: IconCalendar, keywords: ['date', 'schedule', 'event'], group: 'planning' },
  { id: 'calendar-check', label: 'Calendar Check', icon: IconCalendarCheck, keywords: ['date', 'done', 'event'], group: 'planning' },
  { id: 'search', label: 'Search', icon: IconSearch, keywords: ['find', 'magnify', 'lookup'], group: 'utility' },
  { id: 'settings', label: 'Settings', icon: IconSettings, keywords: ['cog', 'gear', 'preferences'], group: 'utility' },
  { id: 'folder', label: 'Folder', icon: IconFolder, keywords: ['directory', 'files', 'organize'], group: 'advanced' },
  { id: 'clock', label: 'Clock', icon: IconClock, keywords: ['time', 'history', 'schedule'], group: 'planning' },
  { id: 'rocket', label: 'Rocket', icon: IconRocket, keywords: ['launch', 'ship', 'space'], group: 'advanced' },
  { id: 'sparkles', label: 'Sparkles', icon: IconSparkles, keywords: ['magic', 'highlight', 'shine'], group: 'utility' },
  { id: 'mail', label: 'Mail', icon: IconMail, keywords: ['email', 'message', 'inbox'], group: 'communication' },
  { id: 'chat', label: 'Chat', icon: IconChat, keywords: ['message', 'conversation', 'comment'], group: 'communication' },
  { id: 'users', label: 'Users', icon: IconUsers, keywords: ['team', 'people', 'group'], group: 'communication' },
  { id: 'lock', label: 'Lock', icon: IconLock, keywords: ['secure', 'private', 'password'], group: 'utility' },
  { id: 'globe', label: 'Globe', icon: IconGlobe, keywords: ['world', 'internet', 'global'], group: 'utility' },
  { id: 'check-circle', label: 'Check Circle', icon: IconCheckCircle, keywords: ['success', 'confirm', 'done'], group: 'utility' },
  ...EXTRA_ICON_PICKER_ITEMS,
];

export function renderSizedIcon(Icon: ComponentType, size: number): ReactElement {
  const element = <Icon />;

  if (!isValidElement(element)) {
    return <span />;
  }

  return cloneElement(
    element as ReactElement<Record<string, unknown>>,
    {
      className: undefined,
      width: size,
      height: size,
      style: {
        width: size,
        height: size,
        display: 'block',
      },
    },
  );
}
