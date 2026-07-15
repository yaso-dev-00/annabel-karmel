import type { CSSProperties } from "react";
import type { CustomFormSchema, FormField, FormGlobalStyle } from "@/lib/content-blocks/form-schema";
import { fieldStyleToCss, isInteractiveChoiceField } from "@/lib/content-blocks/form-schema";
import styles from "./cms-custom-form.module.css";

type CmsCustomFormProps = {
  schema: CustomFormSchema;
  previewMode?: boolean;
  /** Block toolbar chrome (padding, border, background) applied directly on the form. */
  chromeStyle?: CSSProperties;
};

function globalStyleToCss(global?: FormGlobalStyle): CSSProperties {
  if (!global) return {};
  return {
    backgroundColor: global.backgroundColor,
    padding: global.padding,
    gap: global.gap,
    borderRadius: global.borderRadius,
    border: global.borderColor ? `1px solid ${global.borderColor}` : undefined,
    ["--form-label-color" as string]: global.labelColor,
    ["--form-border-color" as string]: global.borderColor,
  };
}

function fieldRequired(field: FormField): boolean {
  return Boolean(field.validation?.some((rule) => rule.type === "required"));
}

function renderControl(field: FormField, previewMode?: boolean) {
  const style = fieldStyleToCss(field.style);
  const name = field.name ?? field.id;
  const disabled = previewMode && !isInteractiveChoiceField(field.type);

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          className={styles.control}
          style={style}
          name={name}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          required={fieldRequired(field)}
          disabled={disabled}
          rows={4}
        />
      );
    case "select":
      return (
        <select
          className={styles.control}
          style={style}
          name={name}
          defaultValue={field.defaultValue}
          required={fieldRequired(field)}
          disabled={disabled}
        >
          <option value="">{field.placeholder ?? "Select…"}</option>
          {field.options?.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "checkbox": {
      const options = field.options ?? [];
      if (options.length === 0) {
        return (
          <label className={styles.choiceLabel}>
            <input
              type="checkbox"
              name={name}
              value="yes"
              defaultChecked={Boolean(field.defaultValue)}
              required={fieldRequired(field)}
              disabled={disabled}
            />
            <span>{field.label ?? "Checkbox"}</span>
          </label>
        );
      }
      return (
        <div className={styles.choiceGroup}>
          {options.map((option) => (
            <label key={option.id} className={styles.choiceLabel}>
              <input
                type="checkbox"
                name={options.length > 1 ? `${name}[]` : name}
                value={option.value}
                defaultChecked={field.defaultValue === option.value}
                required={fieldRequired(field)}
                disabled={disabled}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      );
    }
    case "radio":
      return (
        <div className={styles.choiceGroup}>
          {field.options?.map((option) => (
            <label key={option.id} className={styles.choiceLabel}>
              <input
                type="radio"
                name={name}
                value={option.value}
                defaultChecked={field.defaultValue === option.value}
                required={fieldRequired(field)}
                disabled={disabled}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      );
    case "button": {
      const variant =
        field.buttonVariant === "secondary" ? styles.buttonSecondary : styles.buttonPrimary;
      return (
        <button
          type={field.buttonAction ?? "submit"}
          className={`${styles.button} ${variant}`}
          style={style}
          disabled={disabled && field.buttonAction === "submit"}
        >
          {field.label ?? "Submit"}
        </button>
      );
    }
    default:
      return (
        <input
          className={styles.control}
          style={style}
          type={field.type}
          name={name}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          required={fieldRequired(field)}
          disabled={disabled}
        />
      );
  }
}

export function CmsCustomForm({ schema, previewMode, chromeStyle }: CmsCustomFormProps) {
  const formStyle = {
    ...globalStyleToCss(schema.globalStyle),
    ...chromeStyle,
  };

  return (
    <form
      className={styles.form}
      style={formStyle}
      action={schema.action}
      method={schema.method ?? "post"}
      onSubmit={previewMode ? (e) => e.preventDefault() : undefined}
      noValidate={previewMode}
    >
      {schema.title ? <h3 className={styles.formTitle}>{schema.title}</h3> : null}
      {schema.description ? <p className={styles.formDescription}>{schema.description}</p> : null}

      {schema.sections.map((section) => (
        <section key={section.id} className={styles.section}>
          {section.title ? <h4 className={styles.sectionTitle}>{section.title}</h4> : null}
          {section.description ? (
            <p className={styles.sectionDescription}>{section.description}</p>
          ) : null}

          {section.rows.map((row) => (
            <div
              key={row.id}
              className={styles.row}
              style={{ ["--form-row-cols" as string]: row.columns }}
            >
              {row.fields.map((field) => {
                const span = field.columnSpan ?? 1;
                const isButton = field.type === "button";
                return (
                  <div
                    key={field.id}
                    className={`${styles.field} ${isButton ? styles.fieldButton : ""}`}
                    style={{ gridColumn: `span ${Math.min(span, row.columns)}` }}
                  >
                    {field.label && !isButton && field.type !== "checkbox" ? (
                      <label className={styles.label} htmlFor={field.id}>
                        {field.label}
                        {fieldRequired(field) ? <span className={styles.required}> *</span> : null}
                      </label>
                    ) : null}
                    {renderControl(field, previewMode)}
                    {field.helpText ? <p className={styles.helpText}>{field.helpText}</p> : null}
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      ))}
    </form>
  );
}
