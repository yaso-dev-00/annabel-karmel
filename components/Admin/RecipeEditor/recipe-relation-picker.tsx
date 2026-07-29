"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import styles from "./recipe-editor.module.css";

export type RelationCatalogItem = {
  id: string;
  title: string;
  slug?: string;
};

type RecipeRelationPickerProps = {
  label: string;
  hint?: string;
  selectedIds: string[];
  catalog: RelationCatalogItem[];
  onChange: (ids: string[]) => void;
  excludeId?: string;
  emptyLabel?: string;
};

export function RecipeRelationPicker({
  label,
  hint,
  selectedIds,
  catalog,
  onChange,
  excludeId,
  emptyLabel = "No items selected",
}: RecipeRelationPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const byId = useMemo(() => {
    const map = new Map<string, RelationCatalogItem>();
    for (const item of catalog) map.set(item.id, item);
    return map;
  }, [catalog]);

  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => byId.get(id) ?? { id, title: id })
        .filter((item) => item.id !== excludeId),
    [selectedIds, byId, excludeId],
  );

  const available = useMemo(() => {
    const selectedSet = new Set(selectedIds);
    const q = query.trim().toLowerCase();
    return catalog.filter((item) => {
      if (item.id === excludeId) return false;
      if (selectedSet.has(item.id)) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.slug?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [catalog, selectedIds, excludeId, query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open || !rootRef.current) return;

    const updatePosition = () => {
      const trigger = rootRef.current?.querySelector("button");
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const menuWidth = Math.min(300, window.innerWidth - 24);
      const gap = 6;
      const spaceBelow = window.innerHeight - rect.bottom - 12;
      const spaceAbove = rect.top - 12;
      const openBelow = spaceBelow >= 180 || spaceBelow >= spaceAbove;
      const maxHeight = Math.max(140, Math.min(280, openBelow ? spaceBelow : spaceAbove));
      const left = Math.min(
        Math.max(12, rect.right - menuWidth),
        window.innerWidth - menuWidth - 12,
      );

      setMenuStyle({
        position: "fixed",
        top: openBelow ? rect.bottom + gap : undefined,
        bottom: openBelow ? undefined : window.innerHeight - rect.top + gap,
        left,
        width: menuWidth,
        maxHeight,
        zIndex: 320,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, available.length, query]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
      setQuery("");
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const add = (id: string) => {
    if (selectedIds.includes(id)) return;
    onChange([...selectedIds, id]);
    setOpen(false);
    setQuery("");
  };

  const remove = (id: string) => {
    onChange(selectedIds.filter((item) => item !== id));
  };

  const move = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= selectedIds.length) return;
    const next = [...selectedIds];
    const [item] = next.splice(index, 1);
    next.splice(nextIndex, 0, item);
    onChange(next);
  };

  const menu =
    open && mounted
      ? createPortal(
          <div
            ref={menuRef}
            className={styles.addPickerMenu}
            style={menuStyle}
            role="presentation"
          >
            <div className={styles.addPickerSearchWrap}>
              <input
                ref={searchRef}
                type="search"
                className={styles.addPickerSearch}
                value={query}
                placeholder={`Search ${label.toLowerCase()}…`}
                onChange={(event) => setQuery(event.target.value)}
                aria-label={`Search ${label}`}
              />
            </div>
            <ul id={listId} className={styles.addPickerList} role="listbox" aria-label={label}>
              {available.length === 0 ? (
                <li className={styles.addPickerEmpty}>
                  {query.trim() ? "No matches" : "Nothing left to add"}
                </li>
              ) : (
                available.map((item) => (
                  <li key={item.id} role="option" aria-selected={false}>
                    <button
                      type="button"
                      className={styles.addPickerOption}
                      onClick={() => add(item.id)}
                    >
                      <span className={styles.relationOptionTitle}>{item.title}</span>
                      {item.slug ? (
                        <span className={styles.relationOptionSlug}>{item.slug}</span>
                      ) : null}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="field">
      <div className={styles.sectionHeader}>
        <label className="fieldLabel">{label}</label>
        <div className={styles.addPicker} ref={rootRef}>
          <button
            type="button"
            className={styles.addPickerTrigger}
            aria-expanded={open}
            aria-controls={listId}
            aria-haspopup="listbox"
            aria-label={`Add ${label}`}
            disabled={available.length === 0 && !open}
            onClick={() => {
              setOpen((prev) => !prev);
              setQuery("");
            }}
          >
            <span>+ Add</span>
            <span className={styles.addPickerChevron} aria-hidden>
              ▾
            </span>
          </button>
          {menu}
        </div>
      </div>
      {hint ? <p className={styles.fieldHint}>{hint}</p> : null}
      {selected.length === 0 ? (
        <p className={styles.emptyHint}>{emptyLabel}</p>
      ) : (
        <ul className={styles.relationList}>
          {selected.map((item, index) => (
            <li key={item.id} className={styles.relationItem}>
              <div className={styles.relationItemCopy}>
                <span className={styles.relationItemTitle}>{item.title}</span>
                {item.slug ? (
                  <span className={styles.relationItemSlug}>{item.slug}</span>
                ) : null}
              </div>
              <div className={styles.rowMoveActions}>
                <button
                  type="button"
                  className={styles.rowMoveBtn}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move ${item.title} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.rowMoveBtn}
                  disabled={index === selected.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move ${item.title} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.iconRemove}
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.title}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
