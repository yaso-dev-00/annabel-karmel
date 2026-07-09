export const FORM_FIELD_TYPES = [
  "text",
  "email",
  "number",
  "tel",
  "url",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "button",
] as const;

export type FormFieldType = (typeof FORM_FIELD_TYPES)[number];

export type FormValidationType = "required" | "minLength" | "maxLength" | "pattern" | "email";

export type FormValidationRule = {
  type: FormValidationType;
  value?: string;
  message?: string;
};

export type FormFieldStyle = {
  width?: string;
  minHeight?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
};

export type FormFieldOption = {
  id: string;
  label: string;
  value: string;
};

export type FormField = {
  id: string;
  type: FormFieldType;
  label?: string;
  placeholder?: string;
  helpText?: string;
  name?: string;
  defaultValue?: string;
  options?: FormFieldOption[];
  buttonVariant?: "primary" | "secondary";
  buttonAction?: "submit" | "reset" | "button";
  validation?: FormValidationRule[];
  style?: FormFieldStyle;
  columnSpan?: 1 | 2 | 3 | 4;
};

export type FormRow = {
  id: string;
  columns: 1 | 2 | 3 | 4;
  fields: FormField[];
};

export type FormSection = {
  id: string;
  title?: string;
  description?: string;
  rows: FormRow[];
};

export type FormGlobalStyle = {
  backgroundColor?: string;
  padding?: string;
  gap?: string;
  labelColor?: string;
  borderColor?: string;
  borderRadius?: string;
};

export type CustomFormSchema = {
  version: 1;
  title?: string;
  description?: string;
  submitLabel?: string;
  action?: string;
  method?: "get" | "post";
  sections: FormSection[];
  globalStyle?: FormGlobalStyle;
};
