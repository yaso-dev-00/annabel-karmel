'use client';

import type { MaxWidthPreset } from '@/lib/content-blocks/types';
import { MAX_WIDTH_LABELS } from '@/lib/content-blocks/types';
import { CssLengthInput } from '@/components/Admin/Ui/CssLengthInput';
import styles from './max-width-field.module.css';

type MaxWidthFieldProps = {
  preset: MaxWidthPreset | '';
  customValue?: string;
  onPresetChange: (preset: MaxWidthPreset | '') => void;
  onCustomChange?: (value: string) => void;
  inheritLabel?: string;
  selectClassName?: string;
  inputClassName?: string;
  id?: string;
};

export function MaxWidthField({
  preset,
  customValue = '',
  onPresetChange,
  onCustomChange,
  inheritLabel,
  selectClassName,
  inputClassName,
  id = 'max-width',
}: MaxWidthFieldProps) {
  const showCustom = preset === 'custom';

  return (
    <div className={styles.root}>
      <select
        id={id}
        className={selectClassName}
        value={preset}
        onChange={(e) => {
          const value = e.target.value;
          if (!value) {
            onPresetChange('');
            return;
          }
          onPresetChange(value as MaxWidthPreset);
        }}
      >
        {inheritLabel ? <option value="">{inheritLabel}</option> : null}
        {(Object.keys(MAX_WIDTH_LABELS) as MaxWidthPreset[]).map((key) => (
          <option key={key} value={key}>
            {MAX_WIDTH_LABELS[key]}
          </option>
        ))}
      </select>
      {showCustom ? (
        <>
          <CssLengthInput
            value={customValue}
            onChange={(value) => onCustomChange?.(value ?? '')}
            placeholder="800"
            inputClassName={inputClassName}
            ariaLabel="Custom max width"
          />
          <p className={styles.customHint}>
            Choose a unit from the dropdown (default px).
          </p>
        </>
      ) : null}
    </div>
  );
}
