import type { CSSProperties } from 'react';
import { createBlockId } from '@/lib/content-blocks/defaults';
import { createFormRow, createFormSection } from './defaults';
import type {
  CustomFormSchema,
  FormField,
  FormFieldOption,
  FormRow,
  FormSection,
} from './types';

export function isInteractiveChoiceField(type: FormField['type']): boolean {
  return type === 'checkbox' || type === 'radio' || type === 'select';
}

export function patchCheckboxDisplayLabel(
  field: FormField,
  label: string,
): Partial<FormField> {
  const options = field.options?.length
    ? field.options.map((opt, index) => (index === 0 ? { ...opt, label } : opt))
    : [{ id: createBlockId(), label, value: 'yes' }];
  return { label, options };
}

export function patchFormFieldOptions(
  field: FormField,
  options: FormFieldOption[],
): Partial<FormField> {
  const patch: Partial<FormField> = { options };
  if (field.type === 'checkbox' && options.length === 1) {
    patch.label = options[0].label;
  }
  return patch;
}

export function getAllFormFields(schema: CustomFormSchema): FormField[] {
  return schema.sections.flatMap((section) =>
    section.rows.flatMap((row) => row.fields),
  );
}

export function findFormField(
  schema: CustomFormSchema,
  fieldId: string,
): { field: FormField; sectionId: string; rowId: string } | null {
  for (const section of schema.sections) {
    for (const row of section.rows) {
      const field = row.fields.find((item) => item.id === fieldId);
      if (field) return { field, sectionId: section.id, rowId: row.id };
    }
  }
  return null;
}

export function updateFormField(
  schema: CustomFormSchema,
  fieldId: string,
  patch: Partial<FormField>,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) => ({
      ...section,
      rows: section.rows.map((row) => ({
        ...row,
        fields: row.fields.map((field) =>
          field.id === fieldId ? { ...field, ...patch } : field,
        ),
      })),
    })),
  };
}

export function removeFormField(
  schema: CustomFormSchema,
  fieldId: string,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) => ({
      ...section,
      rows: section.rows.map((row) => ({
        ...row,
        fields: row.fields.filter((field) => field.id !== fieldId),
      })),
    })),
  };
}

export function addFieldToRow(
  schema: CustomFormSchema,
  sectionId: string,
  rowId: string,
  field: FormField,
  index?: number,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        rows: section.rows.map((row) => {
          if (row.id !== rowId) return row;
          const fields = [...row.fields];
          if (index === undefined) fields.push(field);
          else fields.splice(index, 0, field);
          return { ...row, fields };
        }),
      };
    }),
  };
}

export function reorderFieldsInRow(
  schema: CustomFormSchema,
  sectionId: string,
  rowId: string,
  activeId: string,
  overId: string,
): CustomFormSchema {
  const section = schema.sections.find((item) => item.id === sectionId);
  const row = section?.rows.find((item) => item.id === rowId);
  if (!row) return schema;

  const oldIndex = row.fields.findIndex((field) => field.id === activeId);
  const newIndex = row.fields.findIndex((field) => field.id === overId);
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return schema;

  const fields = [...row.fields];
  const [moved] = fields.splice(oldIndex, 1);
  fields.splice(newIndex, 0, moved);

  return {
    ...schema,
    sections: schema.sections.map((item) =>
      item.id !== sectionId
        ? item
        : {
            ...item,
            rows: item.rows.map((r) => (r.id === rowId ? { ...r, fields } : r)),
          },
    ),
  };
}

export function reorderRowsInSection(
  schema: CustomFormSchema,
  sectionId: string,
  activeId: string,
  overId: string,
): CustomFormSchema {
  const section = schema.sections.find((item) => item.id === sectionId);
  if (!section) return schema;

  const oldIndex = section.rows.findIndex((row) => row.id === activeId);
  const newIndex = section.rows.findIndex((row) => row.id === overId);
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return schema;

  const rows = [...section.rows];
  const [moved] = rows.splice(oldIndex, 1);
  rows.splice(newIndex, 0, moved);

  return {
    ...schema,
    sections: schema.sections.map((item) =>
      item.id !== sectionId ? item : { ...item, rows },
    ),
  };
}

export function reorderSections(
  schema: CustomFormSchema,
  activeId: string,
  overId: string,
): CustomFormSchema {
  const oldIndex = schema.sections.findIndex(
    (section) => section.id === activeId,
  );
  const newIndex = schema.sections.findIndex(
    (section) => section.id === overId,
  );
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return schema;

  const sections = [...schema.sections];
  const [moved] = sections.splice(oldIndex, 1);
  sections.splice(newIndex, 0, moved);

  return { ...schema, sections };
}

export function updateSection(
  schema: CustomFormSchema,
  sectionId: string,
  patch: Partial<FormSection>,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) =>
      section.id === sectionId ? { ...section, ...patch } : section,
    ),
  };
}

export function updateRow(
  schema: CustomFormSchema,
  sectionId: string,
  rowId: string,
  patch: Partial<FormRow>,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) =>
      section.id !== sectionId
        ? section
        : {
            ...section,
            rows: section.rows.map((row) =>
              row.id === rowId ? { ...row, ...patch } : row,
            ),
          },
    ),
  };
}

export function addSection(
  schema: CustomFormSchema,
  section: FormSection,
): CustomFormSchema {
  return { ...schema, sections: [...schema.sections, section] };
}

export function removeSection(
  schema: CustomFormSchema,
  sectionId: string,
): CustomFormSchema {
  const sections = schema.sections.filter(
    (section) => section.id !== sectionId,
  );
  return {
    ...schema,
    sections: sections.length > 0 ? sections : [createFormSection()],
  };
}

export function addRow(
  schema: CustomFormSchema,
  sectionId: string,
  row: FormRow,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) =>
      section.id === sectionId
        ? { ...section, rows: [...section.rows, row] }
        : section,
    ),
  };
}

export function removeRow(
  schema: CustomFormSchema,
  sectionId: string,
  rowId: string,
): CustomFormSchema {
  return {
    ...schema,
    sections: schema.sections.map((section) => {
      if (section.id !== sectionId) return section;
      const rows = section.rows.filter((row) => row.id !== rowId);
      return { ...section, rows: rows.length > 0 ? rows : [createFormRow(1)] };
    }),
  };
}

export function fieldStyleToCss(style?: FormField['style']): CSSProperties {
  if (!style) return {};
  const css: CSSProperties = {};
  if (style.width) css.width = style.width;
  if (style.minHeight) css.minHeight = style.minHeight;
  if (style.padding) css.padding = style.padding;
  if (style.paddingTop) css.paddingTop = style.paddingTop;
  if (style.paddingRight) css.paddingRight = style.paddingRight;
  if (style.paddingBottom) css.paddingBottom = style.paddingBottom;
  if (style.paddingLeft) css.paddingLeft = style.paddingLeft;
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor;
  if (style.textColor) css.color = style.textColor;
  if (style.borderColor) css.borderColor = style.borderColor;
  if (style.borderRadius) css.borderRadius = style.borderRadius;
  if (style.fontSize) css.fontSize = style.fontSize;
  return css;
}
