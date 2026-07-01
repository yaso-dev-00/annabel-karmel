"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

import styles from "@/components/FooterPagesScreen/ContactPage/contact-page.module.css";

type ContactSelectProps = {
  name: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  hasError?: boolean;
  onChange: (value: string) => void;
};

export function ContactSelect({
  name,
  value,
  placeholder,
  options,
  hasError = false,
  onChange,
}: ContactSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectOption(option: string) {
    onChange(option);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((current) => !current);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(0);
    }
  }

  function handleOptionKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, options.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[index]);
    }
  }

  return (
    <div
      ref={rootRef}
      className={`${styles.selectWrap} ${open ? styles.selectWrapOpen : ""} ${
        hasError ? styles.selectWrapError : ""
      }`}
    >
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        className={`${styles.selectTrigger} ${!value ? styles.selectPlaceholder : ""} ${
          hasError ? styles.selectError : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        {value || placeholder}
      </button>

      {open ? (
        <ul id={listboxId} className={styles.selectDropdown} role="listbox">
          {options.map((option, index) => (
            <li key={option} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                className={`${styles.selectOption} ${
                  activeIndex === index ? styles.selectOptionActive : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
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
