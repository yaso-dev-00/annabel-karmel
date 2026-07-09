import { createBlockId } from "@/lib/content-blocks/defaults";
import type {
  CustomFormSchema,
  FormField,
  FormFieldType,
  FormRow,
  FormSection,
} from "./types";

export const FORM_FIELD_TYPE_LABELS: Record<FormFieldType, string> = {
  text: "Text input",
  email: "Email",
  number: "Number",
  tel: "Phone",
  url: "URL",
  textarea: "Textarea",
  select: "Select",
  checkbox: "Checkbox",
  radio: "Radio group",
  button: "Button",
};

export function createFormField(type: FormFieldType): FormField {
  const id = createBlockId();
  const base: FormField = {
    id,
    type,
    name: `field_${id.slice(0, 8)}`,
    columnSpan: 1,
    style: { width: "100%" },
  };

  switch (type) {
    case "text":
      return { ...base, label: "Text field", placeholder: "Enter text" };
    case "email":
      return { ...base, label: "Email address", placeholder: "you@example.com", validation: [{ type: "email" }] };
    case "number":
      return { ...base, label: "Number", placeholder: "0" };
    case "tel":
      return { ...base, label: "Phone number", placeholder: "+44" };
    case "url":
      return { ...base, label: "Website URL", placeholder: "https://" };
    case "textarea":
      return {
        ...base,
        label: "Message",
        placeholder: "Your message…",
        style: { width: "100%", minHeight: "120px" },
      };
    case "select":
      return {
        ...base,
        label: "Select option",
        options: [
          { id: createBlockId(), label: "Option 1", value: "option_1" },
          { id: createBlockId(), label: "Option 2", value: "option_2" },
        ],
      };
    case "checkbox":
      return {
        ...base,
        label: "I agree to the terms",
        defaultValue: "yes",
        options: [{ id: createBlockId(), label: "I agree to the terms", value: "yes" }],
      };
    case "radio":
      return {
        ...base,
        label: "Choose one",
        options: [
          { id: createBlockId(), label: "Option A", value: "a" },
          { id: createBlockId(), label: "Option B", value: "b" },
        ],
      };
    case "button":
      return {
        ...base,
        label: "Submit",
        buttonVariant: "primary",
        buttonAction: "submit",
        style: { width: "auto", padding: "12px 28px" },
      };
    default:
      return base;
  }
}

export function createFormRow(columns: FormRow["columns"] = 1): FormRow {
  return {
    id: createBlockId(),
    columns,
    fields: [],
  };
}

export function createFormSection(title?: string): FormSection {
  return {
    id: createBlockId(),
    title,
    rows: [createFormRow(1)],
  };
}

export function createDefaultFormSchema(): CustomFormSchema {
  const emailField = createFormField("email");
  const nameField = createFormField("text");
  nameField.label = "Full name";
  nameField.placeholder = "Your name";
  nameField.validation = [{ type: "required", message: "Name is required" }];

  const messageField = createFormField("textarea");
  messageField.label = "How can we help?";

  const submitButton = createFormField("button");
  submitButton.label = "Send message";

  return {
    version: 1,
    title: "Contact us",
    description: "Fill in the form below and we will get back to you.",
    submitLabel: "Send message",
    method: "post",
    sections: [
      {
        id: createBlockId(),
        title: "Your details",
        rows: [
          { id: createBlockId(), columns: 2, fields: [nameField, emailField] },
          { id: createBlockId(), columns: 1, fields: [messageField] },
          { id: createBlockId(), columns: 1, fields: [submitButton] },
        ],
      },
    ],
    globalStyle: {
      gap: "16px",
      padding: "24px",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      borderColor: "#efd8d8",
    },
  };
}
