export interface FormElement {
  type: string;
  label: string;
  description: string;
  icon: any; // LucideIcon type
  defaultOptions?: Array<{
    label: string;
    value: string;
  }>;
}

export interface FormElementCategory {
  category: string;
  items: FormElement[];
}