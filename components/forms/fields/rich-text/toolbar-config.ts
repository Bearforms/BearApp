'use client';

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
} from 'lucide-react';

export const TOOLBAR_ITEMS = [
  {
    group: 'headings',
    items: [
      { command: 'h1', icon: Heading1, label: 'Heading 1', shortcut: '⌘+⌥+1' },
      { command: 'h2', icon: Heading2, label: 'Heading 2', shortcut: '⌘+⌥+2' },
      { command: 'h3', icon: Heading3, label: 'Heading 3', shortcut: '⌘+⌥+3' },
      { command: 'p', icon: AlignLeft, label: 'Paragraph', shortcut: '⌘+⌥+0' },
    ],
  },
  {
    group: 'formatting',
    items: [
      { command: 'bold', icon: Bold, label: 'Bold', shortcut: '⌘+B' },
      { command: 'italic', icon: Italic, label: 'Italic', shortcut: '⌘+I' },
      { command: 'underline', icon: Underline, label: 'Underline', shortcut: '⌘+U' },
      { command: 'strikethrough', icon: Strikethrough, label: 'Strikethrough', shortcut: '⌘+⇧+X' },
    ],
  },
  {
    group: 'lists',
    items: [
      { command: 'insertUnorderedList', icon: List, label: 'Bullet List', shortcut: '⌘+⇧+8' },
      { command: 'insertOrderedList', icon: ListOrdered, label: 'Numbered List', shortcut: '⌘+⇧+7' },
    ],
  },
];