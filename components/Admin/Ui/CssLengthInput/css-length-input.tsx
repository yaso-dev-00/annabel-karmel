'use client';

import {
  CSS_LENGTH_UNITS,
  composeCssLength,
  parseEditableCssLength,
  type CssLengthUnit,
} from '@/lib/content-blocks/css-length';
import styles from './css-length-input.module.css';

type CssLengthInputProps = {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  inputClassName?: string;
  compact?: boolean;
  allowAuto?: boolean;
  ariaLabel?: string;
};

export function CssLengthInput({
  value,
  onChange,
  placeholder = '0',
  inputClassName,
  compact = false,
  allowAuto = false,
  ariaLabel,
}: CssLengthInputProps) {
  const parsed = parseEditableCssLength(value);
  const amount = parsed?.amount ?? '';
  const unit = parsed?.unit ?? 'px';
  const isKeyword = allowAuto && /^(auto|inherit|initial|unset)$/i.test(amount);

  const inputClasses = [
    styles.lengthInput,
    compact ? styles.lengthInputCompact : '',
    inputClassName ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const selectClasses = [
    styles.unitSelect,
    compact ? styles.unitSelectCompact : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleAmountChange = (nextAmount: string) => {
    onChange(composeCssLength(nextAmount, unit, allowAuto));
  };

  const handleUnitChange = (nextUnit: CssLengthUnit) => {
    onChange(composeCssLength(amount, nextUnit, allowAuto));
  };

  const rowClasses = [styles.lengthRow, compact ? styles.lengthRowCompact : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClasses}>
      <input
        type="text"
        className={inputClasses}
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      {isKeyword ? null : (
        <select
          className={selectClasses}
          value={unit}
          onChange={(e) => handleUnitChange(e.target.value as CssLengthUnit)}
          aria-label={ariaLabel ? `${ariaLabel} unit` : 'Unit'}
        >
          {CSS_LENGTH_UNITS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
