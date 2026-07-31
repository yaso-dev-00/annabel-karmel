'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExpandCollapseAllButtons } from '@/components/Admin/BlockEditor/expand-collapse-all-buttons';
import { StableDndContext } from '@/components/Admin/BlockEditor/stable-dnd-context';
import { ImageField } from '@/components/Admin/Ui/ImageField';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import type { ExpertTopic } from '@/lib/experts/types';
import styles from './expert-editor.module.css';

function ensureTopicId(topic: ExpertTopic): ExpertTopic & { id: string } {
  return {
    ...topic,
    id: topic.id || crypto.randomUUID(),
  };
}

function topicSummary(topic: ExpertTopic, index: number): string {
  const title = topic.title.trim();
  if (title) return title;
  return `Untitled topic ${index + 1}`;
}

type SortableTopicCardProps = {
  topic: ExpertTopic & { id: string };
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<ExpertTopic>) => void;
  onRemove: () => void;
};

function SortableTopicCard({
  topic,
  index,
  expanded,
  onToggle,
  onChange,
  onRemove,
}: SortableTopicCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: topic.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.topicCard}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.topicHeader} onClick={onToggle}>
        <span
          className={blockStyles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${topicSummary(topic, index)}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            listeners?.onPointerDown?.(e);
            e.stopPropagation();
          }}
        >
          ⠿
        </span>
        <span className={styles.topicIndex}>Topic {index + 1}</span>
        <span className={styles.topicSummary}>
          {topicSummary(topic, index)}
        </span>
        <div className={styles.topicHeaderActions}>
          <button
            type="button"
            className={blockStyles.iconBtn}
            aria-label={expanded ? 'Collapse topic' : 'Expand topic'}
            title={expanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {expanded ? '▲' : '▼'}
          </button>
          <button
            type="button"
            className={blockStyles.iconBtn}
            aria-label="Remove topic"
            title="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {expanded ? (
        <div className={styles.topicBody}>
          <div className="field">
            <label className="fieldLabel">Title</label>
            <input
              className="fieldInput"
              value={topic.title}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Link href</label>
            <input
              className="fieldInput"
              value={topic.href ?? ''}
              onChange={(e) =>
                onChange({
                  href: e.target.value || undefined,
                })
              }
              placeholder="/advice/... or https://..."
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Topic image</label>
            <ImageField
              value={topic.image ?? ''}
              alt={topic.title}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  image: src || undefined,
                })
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

type ExpertTopicsEditorProps = {
  topics: ExpertTopic[];
  onChange: (topics: ExpertTopic[]) => void;
};

export function ExpertTopicsEditor({
  topics,
  onChange,
}: ExpertTopicsEditorProps) {
  const normalized = useMemo(() => topics.map(ensureTopicId), [topics]);
  const idsKey = normalized.map((topic) => topic.id).join('|');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const knownIdsRef = useRef(new Set<string>());

  useEffect(() => {
    const ids = normalized.map((topic) => topic.id);
    setExpandedIds((prev) => {
      const next = new Set<string>();
      const known = knownIdsRef.current;
      const isFirst = known.size === 0;
      for (const id of ids) {
        if (isFirst || !known.has(id) || prev.has(id)) next.add(id);
      }
      knownIdsRef.current = new Set(ids);
      return next;
    });
  }, [idsKey, normalized]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const patchTopics = useCallback(
    (next: ExpertTopic[]) => {
      onChange(next.map(ensureTopicId));
    },
    [onChange],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = normalized.findIndex((topic) => topic.id === active.id);
    const newIndex = normalized.findIndex((topic) => topic.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    patchTopics(arrayMove(normalized, oldIndex, newIndex));
  };

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addTopic = () => {
    const created = ensureTopicId({ title: '' });
    setExpandedIds((prev) => new Set(prev).add(created.id));
    patchTopics([...normalized, created]);
  };

  return (
    <div className="card">
      <div className={styles.topicsHeader}>
        <h2 className="cardSectionTitle" style={{ margin: 0 }}>
          Article topics
        </h2>
        {normalized.length > 0 ? (
          <ExpandCollapseAllButtons
            label="Article topics"
            onExpandAll={() =>
              setExpandedIds(new Set(normalized.map((topic) => topic.id)))
            }
            onCollapseAll={() => setExpandedIds(new Set())}
          />
        ) : null}
      </div>
      <p className={styles.topicsHint}>
        Drag to reorder. Collapse topics to keep the form tidy.
      </p>

      <div className="nestedList">
        <StableDndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={() => setExpandedIds(new Set())}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={normalized.map((topic) => topic.id)}
            strategy={verticalListSortingStrategy}
          >
            {normalized.map((topic, index) => (
              <SortableTopicCard
                key={topic.id}
                topic={topic}
                index={index}
                expanded={expandedIds.has(topic.id)}
                onToggle={() => toggle(topic.id)}
                onChange={(patch) =>
                  patchTopics(
                    normalized.map((item) =>
                      item.id === topic.id ? { ...item, ...patch } : item,
                    ),
                  )
                }
                onRemove={() =>
                  patchTopics(normalized.filter((item) => item.id !== topic.id))
                }
              />
            ))}
          </SortableContext>
        </StableDndContext>

        <button
          type="button"
          className="btn btnSecondary nestedAddBtn"
          onClick={addTopic}
        >
          + Add article topic
        </button>
      </div>
    </div>
  );
}
