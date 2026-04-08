export type ExtensibleCatalogString<T extends string> = T | (string & {});

export type SlashMenuBlockType = ExtensibleCatalogString<
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'heading_4'
  | 'heading_5'
  | 'heading_6'
  | 'bulleted_list'
  | 'numbered_list'
  | 'to_do'
  | 'toggle'
  | 'page'
  | 'callout'
  | 'quote'
  | 'table_block'
  | 'divider'
  | 'link_to_page'
  | 'image'
  | 'video'
  | 'audio'
  | 'code'
  | 'file'
  | 'bookmark'
  | 'embed'
  | 'column'
  | 'spacer'
  | 'table_of_contents'
  | 'equation'
  | 'breadcrumb'
  | 'database_inline'
  | 'database_full_page'
>;

export type SlashMenuSection = ExtensibleCatalogString<
  'basic' | 'media' | 'layout' | 'advanced' | 'database'
>;
