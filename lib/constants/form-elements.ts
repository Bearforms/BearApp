'use client';

import { 
  Type,
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  Star, 
  Hash, 
  List, 
  ListChecks, 
  Heading, 
  AlignLeft, 
  ChevronDown, 
  Link, 
  SplitSquareHorizontal, 
  CheckSquare 
} from 'lucide-react';

export const formElements = [
  {
    category: "Content",
    items: [
      {
        type: "heading",
        label: "Heading",
        description: "Section title or subtitle",
        icon: Heading
      },
      {
        type: "paragraph",
        label: "Paragraph",
        description: "Text block with formatting",
        icon: AlignLeft
      },
      {
        type: "rich-text",
        label: "Rich Text",
        description: "Text with formatting options",
        icon: Type,
        hideSettings: true
      },
      {
        type: "page-break",
        label: "Page break",
        description: "Split form into multiple steps",
        icon: SplitSquareHorizontal
      }
    ]
  },
  {
    category: "Basic Fields",
    items: [
      {
        type: "text",
        label: "Text field",
        description: "Single line text input",
        icon: Type
      },
      {
        type: "email",
        label: "Email field",
        description: "Email address input",
        icon: Mail
      },
      {
        type: "phone",
        label: "Phone field",
        description: "Phone number input",
        icon: Phone
      },
      {
        type: "url",
        label: "URL field",
        description: "Web address input",
        icon: Link
      },
      {
        type: "checkbox",
        label: "Checkbox",
        description: "Single checkbox input",
        icon: CheckSquare
      }
    ]
  },
  {
    category: "Date & Time",
    items: [
      {
        type: "date",
        label: "Date field",
        description: "Date picker input",
        icon: Calendar
      },
      {
        type: "time",
        label: "Time field",
        description: "Time picker input",
        icon: Clock
      }
    ]
  },
  {
    category: "Advanced Fields",
    items: [
      {
        type: "textarea",
        label: "Text area",
        description: "Multi-line text input",
        icon: FileText
      },
      {
        type: "file",
        label: "File upload",
        description: "File attachment field",
        icon: Upload
      },
      {
        type: "star-rating",
        label: "Star rating",
        description: "5-star rating field",
        icon: Star
      },
      {
        type: "number-rating",
        label: "Number rating",
        description: "1-10 rating scale",
        icon: Hash
      }
    ]
  },
  {
    category: "Choice Fields",
    items: [
      {
        type: "select",
        label: "Single select",
        description: "Choose one option from a list",
        icon: List,
        defaultOptions: [
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" }
        ]
      },
      {
        type: "multi-select",
        label: "Multi select",
        description: "Choose multiple options from a list",
        icon: ListChecks,
        defaultOptions: [
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" }
        ]
      },
      {
        type: "dropdown",
        label: "Dropdown",
        description: "Single selection dropdown menu",
        icon: ChevronDown,
        defaultOptions: [
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" }
        ]
      }
    ]
  }
];

export type FormElementType = typeof formElements[number]['items'][number]['type'];