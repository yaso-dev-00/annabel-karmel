"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { RecipeFinderOption } from "@/data/recipe-finder-options";
import styles from "@/components/RecipeScreen/RecipeFinder/recipe-finder.module.css";

type RecipeFinderSelectProps = {
  id: string;
  value: string;
  placeholder: string;
  options: RecipeFinderOption[];
  ariaLabel: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
};

const MOBILE_QUERY = "(max-width: 720px)";

export function RecipeFinderSelect({
  id,
  value,
  placeholder,
  options,
  ariaLabel,
  isOpen,
  onOpen,
  onClose,
  onChange,
}: RecipeFinderSelectProps) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMobile, isOpen, onClose]);

  const selectedLabel =
    options.find((option) => option.slug === value)?.label ?? placeholder;

  if (!isMobile) {
    return (
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.finderSelect}
        aria-label={ariaLabel}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div ref={wrapRef} className={styles.customSelectWrap}>
      <button
        id={id}
        type="button"
        className={`${styles.finderSelect} ${styles.customSelectButton}`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        <span className={styles.customSelectValue}>{selectedLabel}</span>
      </button>
      {isOpen ? (
        <ul id={listId} className={styles.customSelectList} role="listbox" aria-label={ariaLabel}>
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              className={`${styles.customSelectOption} ${value === "" ? styles.customSelectOptionSelected : ""}`}
              onClick={() => {
                onChange("");
                onClose();
              }}
            >
              {placeholder}
            </button>
          </li>
          {options.map((option) => (
            <li key={option.slug} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === option.slug}
                className={`${styles.customSelectOption} ${value === option.slug ? styles.customSelectOptionSelected : ""}`}
                onClick={() => {
                  onChange(option.slug);
                  onClose();
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
