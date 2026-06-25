"use client";

import { useEffect, useId, useRef, useState } from "react";

import styles from "./empower-your-employees-page.module.css";

type EmpowerFormSelectProps = {
  name: string;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
  ariaLabel: string;
};

export function EmpowerFormSelect({
  name,
  options,
  placeholder,
  required = false,
  ariaLabel,
}: EmpowerFormSelectProps) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  const selectedLabel = value || placeholder;

  return (
    <div ref={wrapRef} className={styles.formSelectWrap}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        className={`${styles.formSelect} ${styles.formSelectButton}`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className={`${styles.formSelectValue} ${value ? styles.formSelectValueFilled : ""}`}
        >
          {selectedLabel}
        </span>
      </button>
      {isOpen ? (
        <ul id={listId} className={styles.formSelectList} role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <li key={option} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                className={`${styles.formSelectOption} ${value === option ? styles.formSelectOptionSelected : ""}`}
                onClick={() => {
                  setValue(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
