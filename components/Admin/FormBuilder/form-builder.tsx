"use client";

import {
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { StableDndContext } from "@/components/Admin/BlockEditor/stable-dnd-context";
import {
  FORM_FIELD_TYPE_LABELS,
  FORM_FIELD_TYPES,
  addFieldToRow,
  addRow,
  createFormField,
  createFormRow,
  createFormSection,
  patchCheckboxDisplayLabel,
  removeFormField,
  removeRow,
  removeSection,
  reorderFieldsInRow,
  reorderRowsInSection,
  reorderSections,
  updateFormField,
  updateRow,
  updateSection,
  type CustomFormSchema,
  type FormField,
  type FormFieldType,
  type FormRow,
  type FormSection,
} from "@/lib/content-blocks/form-schema";
import { createBlockId } from "@/lib/content-blocks/defaults";
import { CmsCustomForm } from "@/components/ContentBlocks/blocks/cms-custom-form";
import { FormPropertiesPanel } from "./form-properties-panel";
import styles from "./form-builder.module.css";

type FormBuilderProps = {
  schema: CustomFormSchema;
  onChange: (schema: CustomFormSchema) => void;
};

function collectSectionIds(schema: CustomFormSchema): string[] {
  return schema.sections.map((section) => section.id);
}

function collectRowIds(schema: CustomFormSchema): string[] {
  return schema.sections.flatMap((section) => section.rows.map((row) => row.id));
}

const staticDragHandleProps: HTMLAttributes<HTMLButtonElement> = {
  "aria-hidden": true,
  tabIndex: -1,
};

function DragHandle({
  label,
  dragHandleProps,
}: {
  label: string;
  dragHandleProps?: HTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      className={styles.dragHandle}
      {...dragHandleProps}
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
    >
      ⠿
    </button>
  );
}

type FieldCardProps = {
  field: FormField;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onInlineChange: (patch: Partial<FormField>) => void;
};

function FieldCard({
  field,
  selected,
  onSelect,
  onRemove,
  onInlineChange,
  nodeRef,
  style,
  dragHandleProps = staticDragHandleProps,
}: FieldCardProps & {
  nodeRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
  dragHandleProps?: HTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <div
      ref={nodeRef}
      style={style}
      data-form-field-id={field.id}
      className={`${styles.fieldCard} ${selected ? styles.fieldCardSelected : ""}`}
      onClick={onSelect}
    >
      <DragHandle label="Drag field" dragHandleProps={dragHandleProps} />
      <div className={styles.fieldCardBody}>
        <span className={styles.fieldTypeBadge}>{FORM_FIELD_TYPE_LABELS[field.type]}</span>
        {field.type === "button" ? (
          <input
            className={styles.inlineInput}
            value={field.label ?? ""}
            onChange={(e) => onInlineChange({ label: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            placeholder="Button label"
          />
        ) : field.type === "checkbox" ? (
          <input
            className={styles.inlineInput}
            value={field.options?.[0]?.label ?? field.label ?? ""}
            onChange={(e) => onInlineChange(patchCheckboxDisplayLabel(field, e.target.value))}
            onClick={(e) => e.stopPropagation()}
            placeholder="Checkbox label"
          />
        ) : field.type === "radio" ? (
          <>
            <input
              className={styles.inlineInput}
              value={field.label ?? ""}
              onChange={(e) => onInlineChange({ label: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Group label"
            />
            {(field.options ?? []).map((option, index) => (
              <input
                key={option.id}
                className={styles.inlineInputMuted}
                value={option.label}
                onChange={(e) => {
                  const options = [...(field.options ?? [])];
                  options[index] = { ...option, label: e.target.value };
                  onInlineChange({ options });
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <button
              type="button"
              className={styles.addOptionBtn}
              onClick={(e) => {
                e.stopPropagation();
                onInlineChange({
                  options: [
                    ...(field.options ?? []),
                    {
                      id: createBlockId(),
                      label: `Option ${(field.options?.length ?? 0) + 1}`,
                      value: `option_${Date.now()}`,
                    },
                  ],
                });
              }}
            >
              + Option
            </button>
          </>
        ) : (
          <>
            <input
              className={styles.inlineInput}
              value={field.label ?? ""}
              onChange={(e) => onInlineChange({ label: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Label"
            />
            <input
              className={styles.inlineInputMuted}
              value={field.placeholder ?? ""}
              onChange={(e) => onInlineChange({ placeholder: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Placeholder"
            />
          </>
        )}
      </div>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label="Remove field"
      >
        ✕
      </button>
    </div>
  );
}

function SortableFieldCard(props: FieldCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.field.id,
  });

  const dragHandleProps: HTMLAttributes<HTMLButtonElement> = {
    ...attributes,
    ...listeners,
    onPointerDown: (event) => {
      listeners?.onPointerDown?.(event);
      event.stopPropagation();
    },
  };

  return (
    <FieldCard
      {...props}
      nodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
      dragHandleProps={dragHandleProps}
    />
  );
}

type RowCardProps = {
  row: FormRow;
  sectionId: string;
  schema: CustomFormSchema;
  expanded: boolean;
  selectedFieldId: string | null;
  sensors: ReturnType<typeof useSensors>;
  onChange: (schema: CustomFormSchema) => void;
  onToggleExpanded: () => void;
  onSelectField: (fieldId: string) => void;
  onClearSelectedField: () => void;
  onFieldDragEnd: (event: DragEndEvent, sectionId: string, rowId: string) => void;
  onPatchField: (fieldId: string, patch: Partial<FormField>) => void;
  onAddField: (sectionId: string, rowId: string, type: FormFieldType, index?: number) => void;
  dndReady: boolean;
};

function RowCard({
  row,
  sectionId,
  schema,
  expanded,
  selectedFieldId,
  sensors,
  onChange,
  onToggleExpanded,
  onSelectField,
  onClearSelectedField,
  onFieldDragEnd,
  onPatchField,
  onAddField,
  dndReady,
  nodeRef,
  style,
  dragHandleProps = staticDragHandleProps,
}: RowCardProps & {
  nodeRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
  dragHandleProps?: HTMLAttributes<HTMLButtonElement>;
}) {
  const fieldCards = row.fields.map((field) => {
    const fieldProps = {
      field,
      selected: selectedFieldId === field.id,
      onSelect: () => onSelectField(field.id),
      onRemove: () => {
        onChange(removeFormField(schema, field.id));
        if (selectedFieldId === field.id) onClearSelectedField();
      },
      onInlineChange: (patch: Partial<FormField>) => onPatchField(field.id, patch),
    };

    return dndReady ? (
      <SortableFieldCard key={field.id} {...fieldProps} />
    ) : (
      <FieldCard key={field.id} {...fieldProps} />
    );
  });

  return (
    <div ref={nodeRef} style={style} className={styles.rowCard}>
      <div className={styles.rowToolbar}>
        <div className={styles.rowToolbarLeft}>
          <DragHandle label="Drag row" dragHandleProps={dragHandleProps} />
          <label className={styles.rowLabel}>
            Columns
            <select
              className="fieldSelect"
              value={row.columns}
              onChange={(e) =>
                onChange(
                  updateRow(schema, sectionId, row.id, {
                    columns: Number(e.target.value) as 1 | 2 | 3 | 4,
                  }),
                )
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
          <span className={styles.rowColumnsBadge}>
            {row.columns} column{row.columns === 1 ? "" : "s"} in preview
          </span>
          {!expanded ? (
            <span className={styles.rowSummaryBadge}>
              {row.fields.length} field{row.fields.length === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>
        <div className={styles.rowToolbarActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpanded();
            }}
            aria-label={expanded ? "Collapse row" : "Expand row"}
            title={expanded ? "Collapse row" : "Expand row"}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onChange(removeRow(schema, sectionId, row.id))}
            aria-label="Remove row"
            title="Remove row"
          >
            ✕
          </button>
        </div>
      </div>

      {expanded ? (
        <>
      {dndReady ? (
        <StableDndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => onFieldDragEnd(event, sectionId, row.id)}
        >
          <SortableContext
            items={row.fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className={styles.rowGrid}>{fieldCards}</div>
          </SortableContext>
        </StableDndContext>
      ) : (
        <div className={styles.rowGrid}>{fieldCards}</div>
      )}

      <div className={styles.rowActions}>
        <select
          className="fieldSelect"
          defaultValue=""
          onChange={(e) => {
            const type = e.target.value as FormFieldType;
            if (!type) return;
            onAddField(sectionId, row.id, type);
            e.target.value = "";
          }}
        >
          <option value="">+ Add field to row…</option>
          {FORM_FIELD_TYPES.map((type) => (
            <option key={type} value={type}>
              {FORM_FIELD_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>
        </>
      ) : null}
    </div>
  );
}

function SortableRowCard(props: RowCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.row.id,
  });

  const dragHandleProps: HTMLAttributes<HTMLButtonElement> = {
    ...attributes,
    ...listeners,
    onPointerDown: (event) => {
      listeners?.onPointerDown?.(event);
      event.stopPropagation();
    },
  };

  return (
    <RowCard
      {...props}
      dndReady
      nodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
      dragHandleProps={dragHandleProps}
    />
  );
}

type SectionCardProps = {
  section: FormSection;
  schema: CustomFormSchema;
  expanded: boolean;
  expandedRowIds: Set<string>;
  selectedFieldId: string | null;
  sensors: ReturnType<typeof useSensors>;
  onChange: (schema: CustomFormSchema) => void;
  onToggleExpanded: () => void;
  onToggleRowExpanded: (rowId: string) => void;
  onExpandRow: (rowId: string) => void;
  onSelectField: (fieldId: string) => void;
  onClearSelectedField: () => void;
  onRowDragEnd: (event: DragEndEvent, sectionId: string) => void;
  onFieldDragEnd: (event: DragEndEvent, sectionId: string, rowId: string) => void;
  onPatchField: (fieldId: string, patch: Partial<FormField>) => void;
  onAddField: (sectionId: string, rowId: string, type: FormFieldType, index?: number) => void;
  dndReady: boolean;
};

function SectionCard({
  section,
  schema,
  expanded,
  expandedRowIds,
  selectedFieldId,
  sensors,
  onChange,
  onToggleExpanded,
  onToggleRowExpanded,
  onExpandRow,
  onSelectField,
  onClearSelectedField,
  onRowDragEnd,
  onFieldDragEnd,
  onPatchField,
  onAddField,
  dndReady,
  nodeRef,
  style,
  dragHandleProps = staticDragHandleProps,
}: SectionCardProps & {
  nodeRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
  dragHandleProps?: HTMLAttributes<HTMLButtonElement>;
}) {
  const rowCards = section.rows.map((row) => {
    const rowProps = {
      row,
      sectionId: section.id,
      schema,
      expanded: expandedRowIds.has(row.id),
      selectedFieldId,
      sensors,
      onChange,
      onToggleExpanded: () => onToggleRowExpanded(row.id),
      onSelectField,
      onClearSelectedField,
      onFieldDragEnd,
      onPatchField,
      onAddField,
      dndReady,
    };

    return dndReady ? (
      <SortableRowCard key={row.id} {...rowProps} />
    ) : (
      <RowCard key={row.id} {...rowProps} />
    );
  });

  return (
    <div ref={nodeRef} style={style} className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <DragHandle label="Drag section" dragHandleProps={dragHandleProps} />
        <input
          className={styles.sectionTitleInput}
          value={section.title ?? ""}
          onChange={(e) => onChange(updateSection(schema, section.id, { title: e.target.value }))}
          placeholder="Section title"
        />
        {!expanded ? (
          <span className={styles.sectionSummaryBadge}>
            {section.rows.length} row{section.rows.length === 1 ? "" : "s"}
          </span>
        ) : null}
        <div className={styles.sectionHeaderActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpanded();
            }}
            aria-label={expanded ? "Collapse section" : "Expand section"}
            title={expanded ? "Collapse section" : "Expand section"}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onChange(removeSection(schema, section.id))}
            aria-label="Remove section"
            title="Remove section"
          >
            ✕
          </button>
        </div>
      </div>
      {expanded ? (
        <>
      <textarea
        className="fieldTextarea"
        value={section.description ?? ""}
        onChange={(e) =>
          onChange(updateSection(schema, section.id, { description: e.target.value }))
        }
        placeholder="Section description"
        rows={2}
      />

      {dndReady ? (
        <StableDndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => onRowDragEnd(event, section.id)}
        >
          <SortableContext
            items={section.rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className={styles.sectionRows}>{rowCards}</div>
          </SortableContext>
        </StableDndContext>
      ) : (
        <div className={styles.sectionRows}>{rowCards}</div>
      )}

      <button
        type="button"
        className="btn btnGhost"
        onClick={() => {
          const row = createFormRow(2);
          onChange(addRow(schema, section.id, row));
          onExpandRow(row.id);
        }}
      >
        + Row
      </button>
        </>
      ) : null}
    </div>
  );
}

function SortableSectionCard(props: SectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.section.id,
  });

  const dragHandleProps: HTMLAttributes<HTMLButtonElement> = {
    ...attributes,
    ...listeners,
    onPointerDown: (event) => {
      listeners?.onPointerDown?.(event);
      event.stopPropagation();
    },
  };

  return (
    <SectionCard
      {...props}
      dndReady
      nodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
      dragHandleProps={dragHandleProps}
    />
  );
}

export function FormBuilder({ schema, onChange }: FormBuilderProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"builder" | "preview" | "json">("builder");
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [expandedSectionIds, setExpandedSectionIds] = useState<Set<string>>(
    () => new Set(collectSectionIds(schema)),
  );
  const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(
    () => new Set(collectRowIds(schema)),
  );
  const [dndReady, setDndReady] = useState(false);
  const pendingScrollFieldIdRef = useRef<string | null>(null);

  useEffect(() => {
    setDndReady(true);
  }, []);

  useEffect(() => {
    const fieldId = pendingScrollFieldIdRef.current;
    if (!fieldId || fieldId !== selectedFieldId) return;

    const exists = schema.sections.some((section) =>
      section.rows.some((row) => row.fields.some((field) => field.id === fieldId)),
    );
    if (!exists) return;

    pendingScrollFieldIdRef.current = null;
    const frame = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-form-field-id="${fieldId}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [schema, selectedFieldId, expandedSectionIds, expandedRowIds]);

  const expandAll = useCallback(() => {
    setExpandedSectionIds(new Set(collectSectionIds(schema)));
    setExpandedRowIds(new Set(collectRowIds(schema)));
  }, [schema]);

  const collapseAll = useCallback(() => {
    setExpandedSectionIds(new Set());
    setExpandedRowIds(new Set());
  }, []);

  const toggleSectionExpanded = useCallback((sectionId: string) => {
    setExpandedSectionIds((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const toggleRowExpanded = useCallback((rowId: string) => {
    setExpandedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  }, []);

  const expandRow = useCallback((rowId: string) => {
    setExpandedRowIds((prev) => new Set([...prev, rowId]));
  }, []);

  const expandSection = useCallback((sectionId: string) => {
    setExpandedSectionIds((prev) => new Set([...prev, sectionId]));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const selectedField = useMemo(() => {
    if (!selectedFieldId) return null;
    for (const section of schema.sections) {
      for (const row of section.rows) {
        const field = row.fields.find((item) => item.id === selectedFieldId);
        if (field) return field;
      }
    }
    return null;
  }, [schema, selectedFieldId]);

  const handleFieldDragEnd = (event: DragEndEvent, sectionId: string, rowId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onChange(reorderFieldsInRow(schema, sectionId, rowId, String(active.id), String(over.id)));
  };

  const handleRowDragEnd = (event: DragEndEvent, sectionId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onChange(reorderRowsInSection(schema, sectionId, String(active.id), String(over.id)));
  };

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onChange(reorderSections(schema, String(active.id), String(over.id)));
  };

  const patchField = (fieldId: string, patch: Partial<FormField>) => {
    onChange(updateFormField(schema, fieldId, patch));
  };

  const findFieldLocation = useCallback(
    (fieldId: string): { sectionId: string; rowId: string; index: number } | null => {
      for (const section of schema.sections) {
        for (const row of section.rows) {
          const index = row.fields.findIndex((field) => field.id === fieldId);
          if (index >= 0) {
            return { sectionId: section.id, rowId: row.id, index };
          }
        }
      }
      return null;
    },
    [schema],
  );

  const scrollFieldIntoView = useCallback((fieldId: string) => {
    const scroll = () => {
      const el = document.querySelector<HTMLElement>(`[data-form-field-id="${fieldId}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    };
    // Wait for expand + React commit so the field card exists in the DOM.
    requestAnimationFrame(() => {
      requestAnimationFrame(scroll);
    });
  }, []);

  const addField = (sectionId: string, rowId: string, type: FormFieldType, index?: number) => {
    const field = createFormField(type);
    onChange(addFieldToRow(schema, sectionId, rowId, field, index));
    expandSection(sectionId);
    expandRow(rowId);
    pendingScrollFieldIdRef.current = field.id;
    setSelectedFieldId(field.id);
  };

  const addFieldFromPalette = (type: FormFieldType) => {
    if (selectedFieldId) {
      const location = findFieldLocation(selectedFieldId);
      if (location) {
        addField(location.sectionId, location.rowId, type, location.index + 1);
        return;
      }
    }

    const section = schema.sections[schema.sections.length - 1];
    const row = section?.rows[section.rows.length - 1];
    if (section && row) {
      addField(section.id, row.id, type);
    }
  };

  const exportJson = () => {
    setJsonDraft(JSON.stringify(schema, null, 2));
    setJsonError(null);
    setActiveTab("json");
  };

  const importJson = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as CustomFormSchema;
      if (!parsed.version || !Array.isArray(parsed.sections)) {
        throw new Error("Invalid form schema");
      }
      onChange(parsed);
      setJsonError(null);
      setExpandedSectionIds(new Set(collectSectionIds(parsed)));
      setExpandedRowIds(new Set(collectRowIds(parsed)));
      setActiveTab("builder");
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Invalid JSON");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === "builder" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("builder")}
          >
            Builder
          </button>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === "preview" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === "json" ? styles.tabActive : ""}`}
            onClick={exportJson}
          >
            JSON
          </button>
        </div>
        <button
          type="button"
          className="btn btnGhost"
          onClick={() => {
            const section = createFormSection("New section");
            onChange({ ...schema, sections: [...schema.sections, section] });
            expandSection(section.id);
          }}
        >
          + Section
        </button>
      </div>

      {activeTab === "builder" ? (
        <div className={styles.workspace}>
          <div className={styles.paletteBar}>
            <p className={styles.paletteTitle}>Add field</p>
            <div className={styles.paletteChips}>
              {FORM_FIELD_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={styles.paletteChip}
                  onClick={() => addFieldFromPalette(type)}
                >
                  {FORM_FIELD_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.builderBody}>
          <main className={styles.canvas}>
            <div className={styles.formMeta}>
              <input
                className="fieldInput"
                value={schema.title ?? ""}
                onChange={(e) => onChange({ ...schema, title: e.target.value })}
                placeholder="Form title"
              />
              <textarea
                className="fieldTextarea"
                value={schema.description ?? ""}
                onChange={(e) => onChange({ ...schema, description: e.target.value })}
                placeholder="Form description"
                rows={2}
              />
            </div>

            <div className={styles.canvasUtilityRow}>
              <button type="button" className={styles.canvasUtilityBtn} onClick={collapseAll}>
                Collapse all
              </button>
              <button type="button" className={styles.canvasUtilityBtn} onClick={expandAll}>
                Expand all
              </button>
            </div>

            {dndReady ? (
              <StableDndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleSectionDragEnd}
              >
                <SortableContext
                  items={schema.sections.map((section) => section.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {schema.sections.map((section) => (
                    <SortableSectionCard
                      key={section.id}
                      section={section}
                      schema={schema}
                      expanded={expandedSectionIds.has(section.id)}
                      expandedRowIds={expandedRowIds}
                      selectedFieldId={selectedFieldId}
                      sensors={sensors}
                      onChange={onChange}
                      onToggleExpanded={() => toggleSectionExpanded(section.id)}
                      onToggleRowExpanded={toggleRowExpanded}
                      onExpandRow={expandRow}
                      onSelectField={setSelectedFieldId}
                      onClearSelectedField={() => setSelectedFieldId(null)}
                      onRowDragEnd={handleRowDragEnd}
                      onFieldDragEnd={handleFieldDragEnd}
                      onPatchField={patchField}
                      onAddField={addField}
                      dndReady
                    />
                  ))}
                </SortableContext>
              </StableDndContext>
            ) : (
              schema.sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  schema={schema}
                  expanded={expandedSectionIds.has(section.id)}
                  expandedRowIds={expandedRowIds}
                  selectedFieldId={selectedFieldId}
                  sensors={sensors}
                  onChange={onChange}
                  onToggleExpanded={() => toggleSectionExpanded(section.id)}
                  onToggleRowExpanded={toggleRowExpanded}
                  onExpandRow={expandRow}
                  onSelectField={setSelectedFieldId}
                  onClearSelectedField={() => setSelectedFieldId(null)}
                  onRowDragEnd={handleRowDragEnd}
                  onFieldDragEnd={handleFieldDragEnd}
                  onPatchField={patchField}
                  onAddField={addField}
                  dndReady={false}
                />
              ))
            )}
          </main>

          <aside className={styles.properties}>
            <FormPropertiesPanel
              field={selectedField}
              schema={schema}
              onSchemaChange={onChange}
              onFieldChange={(patch) => {
                if (selectedFieldId) patchField(selectedFieldId, patch);
              }}
            />
          </aside>
          </div>
        </div>
      ) : null}

      {activeTab === "preview" ? (
        <div className={styles.previewPane}>
          <CmsCustomForm schema={schema} previewMode />
        </div>
      ) : null}

      {activeTab === "json" ? (
        <div className={styles.jsonPane}>
          <textarea
            className="fieldTextarea"
            value={jsonDraft}
            onChange={(e) => setJsonDraft(e.target.value)}
            rows={18}
            style={{ fontFamily: "monospace", fontSize: 12 }}
          />
          {jsonError ? <p className={styles.jsonError}>{jsonError}</p> : null}
          <div className={styles.jsonActions}>
            <button type="button" className="btn btnPrimary" onClick={importJson}>
              Load schema
            </button>
            <button type="button" className="btn btnGhost" onClick={() => setActiveTab("builder")}>
              Back to builder
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
