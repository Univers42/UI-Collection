import {
  cloneElement,
  isValidElement,
  type ComponentType,
  type ReactElement,
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
