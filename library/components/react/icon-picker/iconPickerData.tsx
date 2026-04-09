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
  IconBullet,
  IconCallout,
  IconCode,
  IconColumns,
  IconDivider,
  IconEmbed,
  IconEquation,
  IconFile,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconImage,
  IconLinkToPage,
  IconNumbered,
  IconPage,
  IconQuote,
  IconSpacer,
  IconTOC,
  IconTable,
  IconText,
  IconTodo,
  IconToggle,
  IconVideo,
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
