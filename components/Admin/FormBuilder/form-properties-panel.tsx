'use client';

import { ColorField } from '@/components/Admin/Ui/ColorField';
import { CssLengthInput } from '@/components/Admin/Ui/CssLengthInput';
import { createBlockId } from '@/lib/content-blocks/defaults';
import type {
  CustomFormSchema,
  FormField,
  FormValidationRule,
} from '@/lib/content-blocks/form-schema';
import { patchFormFieldOptions } from '@/lib/content-blocks/form-schema';
import {
  DS_BACKGROUND_PRESETS,
  DS_BORDER_PRESETS,
  DS_TEXT_PRESETS,
} from '@/lib/design-system/color-presets';
import { DS_COLORS } from '@/lib/design-system/tokens';
import styles from './form-builder.module.css';

type FormPropertiesPanelProps = {
  field: FormField | null;
  schema: CustomFormSchema;
  onSchemaChange: (schema: CustomFormSchema) => void;
  onFieldChange: (patch: Partial<FormField>) => void;
};

const WIDTH_PRESETS = [
  { value: '100%', label: 'Full width' },
  { value: '75%', label: '75%' },
  { value: '50%', label: 'Half' },
  { value: '33%', label: 'Third' },
  { value: '25%', label: 'Quarter' },
  { value: 'auto', label: 'Auto' },
];

export function FormPropertiesPanel({
  field,
  schema,
  onSchemaChange,
  onFieldChange,
}: FormPropertiesPanelProps) {
  if (!field) {
    return (
      <div className={styles.propertiesEmpty}>
        <p className={styles.propertiesTitle}>Form settings</p>
        <div className={styles.formSettingsGrid}>
          <label className={styles.propLabel}>
            Submit URL
            <input
              className="fieldInput"
              value={schema.action ?? ''}
              onChange={(e) =>
                onSchemaChange({ ...schema, action: e.target.value })
              }
              placeholder="https://…"
            />
          </label>
          <label className={styles.propLabel}>
            Method
            <select
              className="fieldSelect"
              value={schema.method ?? 'post'}
              onChange={(e) =>
                onSchemaChange({
                  ...schema,
                  method: e.target.value as CustomFormSchema['method'],
                })
              }
            >
              <option value="post">POST</option>
              <option value="get">GET</option>
            </select>
          </label>
        </div>
        <ColorField
          label="Form background"
          value={schema.globalStyle?.backgroundColor}
          defaultColor={DS_COLORS.white}
          presets={DS_BACKGROUND_PRESETS}
          onChange={(backgroundColor) =>
            onSchemaChange({
              ...schema,
              globalStyle: { ...schema.globalStyle, backgroundColor },
            })
          }
          compact
        />
        <ColorField
          label="Border colour"
          value={schema.globalStyle?.borderColor}
          defaultColor={DS_COLORS.raspberry[200]}
          presets={DS_BORDER_PRESETS}
          onChange={(borderColor) =>
            onSchemaChange({
              ...schema,
              globalStyle: { ...schema.globalStyle, borderColor },
            })
          }
          compact
        />
        <p className={styles.propertiesHint}>
          Select a field above to edit its properties.
        </p>
      </div>
    );
  }

  const style = field.style ?? {};
  const patchStyle = (patch: Partial<NonNullable<FormField['style']>>) => {
    onFieldChange({ style: { ...style, ...patch } });
  };

  const validation = field.validation ?? [];
  const setValidation = (rules: FormValidationRule[]) =>
    onFieldChange({ validation: rules });

  const hasRequired = validation.some((rule) => rule.type === 'required');
  const isChoiceField =
    field.type === 'select' ||
    field.type === 'radio' ||
    field.type === 'checkbox';
  const options = field.options ?? [];

  const optionsEditor = isChoiceField ? (
    <div className={styles.optionsEditor}>
      <p className={styles.propGroupTitle}>
        {field.type === 'radio'
          ? 'Radio options'
          : field.type === 'checkbox'
            ? 'Checkbox options'
            : 'Select options'}
      </p>
      {field.type === 'radio' ? (
        <label className={styles.propLabel}>
          Group label
          <input
            className="fieldInput"
            value={field.label ?? ''}
            onChange={(e) => onFieldChange({ label: e.target.value })}
          />
        </label>
      ) : null}
      {options.map((option, index) => (
        <div key={option.id} className={styles.optionRow}>
          <input
            className="fieldInput"
            value={option.label}
            onChange={(e) => {
              const nextOptions = [...options];
              nextOptions[index] = { ...option, label: e.target.value };
              onFieldChange(patchFormFieldOptions(field, nextOptions));
            }}
          />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() =>
              onFieldChange(
                patchFormFieldOptions(
                  field,
                  options.filter((item) => item.id !== option.id),
                ),
              )
            }
            aria-label="Remove option"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btnGhost"
        onClick={() =>
          onFieldChange(
            patchFormFieldOptions(field, [
              ...options,
              {
                id: createBlockId(),
                label: 'New option',
                value: `option_${Date.now()}`,
              },
            ]),
          )
        }
      >
        + Option
      </button>
    </div>
  ) : null;

  return (
    <div className={styles.propertiesBody}>
      <p className={styles.propertiesTitle}>Field properties</p>

      <label className={styles.propLabel}>
        Field name
        <input
          className="fieldInput"
          value={field.name ?? ''}
          onChange={(e) => onFieldChange({ name: e.target.value })}
        />
      </label>

      <label className={styles.propLabel}>
        Help text
        <input
          className="fieldInput"
          value={field.helpText ?? ''}
          onChange={(e) => onFieldChange({ helpText: e.target.value })}
        />
      </label>

      {optionsEditor}

      <label className={styles.propLabel}>
        Column span
        <select
          className="fieldSelect"
          value={field.columnSpan ?? 1}
          onChange={(e) =>
            onFieldChange({
              columnSpan: Number(e.target.value) as FormField['columnSpan'],
            })
          }
        >
          <option value={1}>1 column</option>
          <option value={2}>2 columns</option>
          <option value={3}>3 columns</option>
          <option value={4}>4 columns</option>
        </select>
      </label>

      <label className={styles.propLabel}>
        Width
        <select
          className="fieldSelect"
          value={style.width ?? '100%'}
          onChange={(e) => patchStyle({ width: e.target.value })}
        >
          {WIDTH_PRESETS.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
      </label>

      {field.type === 'textarea' ? (
        <label className={styles.propLabel}>
          Min height
          <CssLengthInput
            value={style.minHeight}
            onChange={(minHeight) => patchStyle({ minHeight })}
            placeholder="120"
          />
        </label>
      ) : null}

      <label className={styles.propLabel}>
        Padding
        <CssLengthInput
          value={style.padding}
          onChange={(padding) => patchStyle({ padding })}
          placeholder="10"
        />
      </label>

      <ColorField
        label="Background"
        value={style.backgroundColor}
        defaultColor={DS_COLORS.white}
        presets={DS_BACKGROUND_PRESETS}
        onChange={(backgroundColor) => patchStyle({ backgroundColor })}
        compact
      />

      <ColorField
        label="Text colour"
        value={style.textColor}
        defaultColor={DS_COLORS.grey[800]}
        presets={DS_TEXT_PRESETS}
        onChange={(textColor) => patchStyle({ textColor })}
        compact
      />

      <label className={styles.propLabel}>
        Border radius
        <CssLengthInput
          value={style.borderRadius}
          onChange={(borderRadius) => patchStyle({ borderRadius })}
          placeholder="8"
        />
      </label>

      <label className={styles.propLabel}>
        Font size
        <CssLengthInput
          value={style.fontSize}
          onChange={(fontSize) => patchStyle({ fontSize })}
          placeholder="15"
        />
      </label>

      {field.type === 'button' ? (
        <>
          <label className={styles.propLabel}>
            Button style
            <select
              className="fieldSelect"
              value={field.buttonVariant ?? 'primary'}
              onChange={(e) =>
                onFieldChange({
                  buttonVariant: e.target.value as FormField['buttonVariant'],
                })
              }
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </label>
          <label className={styles.propLabel}>
            Action
            <select
              className="fieldSelect"
              value={field.buttonAction ?? 'submit'}
              onChange={(e) =>
                onFieldChange({
                  buttonAction: e.target.value as FormField['buttonAction'],
                })
              }
            >
              <option value="submit">Submit</option>
              <option value="reset">Reset</option>
              <option value="button">Button</option>
            </select>
          </label>
        </>
      ) : null}

      {field.type !== 'button' ? (
        <div className={styles.validationEditor}>
          <p className={styles.propGroupTitle}>Validation</p>
          <label className="fieldCheckbox">
            <input
              type="checkbox"
              checked={hasRequired}
              onChange={(e) => {
                if (e.target.checked) {
                  setValidation([
                    ...validation.filter((r) => r.type !== 'required'),
                    { type: 'required' },
                  ]);
                } else {
                  setValidation(
                    validation.filter((r) => r.type !== 'required'),
                  );
                }
              }}
            />
            <span>Required</span>
          </label>
          <label className={styles.propLabel}>
            Min length
            <input
              className="fieldInput"
              value={
                validation.find((r) => r.type === 'minLength')?.value ?? ''
              }
              onChange={(e) => {
                const rest = validation.filter((r) => r.type !== 'minLength');
                setValidation(
                  e.target.value
                    ? [...rest, { type: 'minLength', value: e.target.value }]
                    : rest,
                );
              }}
            />
          </label>
          <label className={styles.propLabel}>
            Max length
            <input
              className="fieldInput"
              value={
                validation.find((r) => r.type === 'maxLength')?.value ?? ''
              }
              onChange={(e) => {
                const rest = validation.filter((r) => r.type !== 'maxLength');
                setValidation(
                  e.target.value
                    ? [...rest, { type: 'maxLength', value: e.target.value }]
                    : rest,
                );
              }}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
