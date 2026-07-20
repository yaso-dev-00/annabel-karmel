"use client";

import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
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
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ContentBlockRenderer } from "@/components/ContentBlocks/content-block-renderer";
import { getBlockLabel, getBlockSummary } from "@/lib/content-blocks/registry";
import type { BlockSettings, BlockType, ContentBlock, MaxWidthPreset } from "@/lib/content-blocks/types";
import { BlockVisibilityIcon } from "@/components/Admin/Ui/BlockVisibilityIcon";
import { MaxWidthField } from "@/components/Admin/Ui/MaxWidthField";
import { BlockFormFields } from "./block-form-fields";
import { BlockPicker } from "./block-picker";
import { StableDndContext } from "./stable-dnd-context";
import { PreviewViewport } from "./preview-viewport";
import { PreviewStyleToolbar } from "./preview-style-toolbar";
import { formatBlockMaxWidthLabel } from "@/lib/content-blocks/max-width";
import {
  editorContextToRenderContext,
  isBlockAllowedInEditor,
  type ContentEditorContext,
} from "@/lib/content-blocks/block-context";
import { useBlockEditor } from "./use-block-editor";
import styles from "./block-editor.module.css";

type TwoColumnStyleTarget = "block" | "left" | "right";

type BlockEditorContextValue = {
  blocks: ContentBlock[];
  contentMaxWidth: MaxWidthPreset;
  contentMaxWidthCustom?: string;
  excludeArticleSlug?: string;
  editorContext: ContentEditorContext;
  editor: ReturnType<typeof useBlockEditor>;
  selectedId: string | null;
  twoColumnStyleTarget: TwoColumnStyleTarget;
  setTwoColumnStyleTarget: (target: TwoColumnStyleTarget) => void;
  expandedIds: Set<string>;
  pickerOpen: boolean;
  setPickerOpen: (open: boolean) => void;
  selectedBlock: ContentBlock | null;
  selectBlock: (id: string) => void;
  openBlockForEditing: (id: string) => void;
  setExpandedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  collapseAllBlocks: () => void;
  expandAllBlocks: () => void;
  sensors: ReturnType<typeof useSensors>;
  handleDragEnd: (event: DragEndEvent) => void;
  handleAddBlock: (type: BlockType, position?: "start" | "end") => void;
};

const BlockEditorContext = createContext<BlockEditorContextValue | null>(null);

function useBlockEditorContext() {
  const context = useContext(BlockEditorContext);
  if (!context) {
    throw new Error("Block editor components must be used within BlockEditorRoot.");
  }
  return context;
}

type BlockEditorRootProps = {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  contentMaxWidth?: MaxWidthPreset;
  contentMaxWidthCustom?: string;
  excludeArticleSlug?: string;
  editorContext: ContentEditorContext;
  children: ReactNode;
};

function BlockMaxWidthSetting({
  value,
  customValue,
  onChange,
}: {
  value?: MaxWidthPreset;
  customValue?: string;
  onChange: (settings: { max_width?: MaxWidthPreset; max_width_custom?: string }) => void;
}) {
  return (
    <div className={styles.blockSettings}>
      <p className={styles.blockSettingsTitle}>Block settings</p>
      <label className="fieldLabel" htmlFor="block-max-width">
        Max width
      </label>
      <MaxWidthField
        id="block-max-width"
        preset={value ?? ""}
        customValue={customValue}
        inheritLabel="Inherit article default"
        selectClassName={styles.settingsSelect}
        inputClassName={styles.settingsSelect}
        onPresetChange={(preset) => {
          if (!preset) {
            onChange({ max_width: undefined, max_width_custom: undefined });
            return;
          }
          onChange({
            max_width: preset,
            max_width_custom: preset === "custom" ? customValue : undefined,
          });
        }}
        onCustomChange={(custom) => onChange({ max_width: "custom", max_width_custom: custom })}
      />
    </div>
  );
}

type BlockCardProps = {
  block: ContentBlock;
  selected: boolean;
  expanded: boolean;
  hidden: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onToggleHidden: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onUpdate: (data: ContentBlock["data"]) => void;
  onSettingsChange: (settings: Partial<BlockSettings>) => void;
};

function BlockCard({
  block,
  selected,
  expanded,
  hidden,
  onSelect,
  onToggle,
  onToggleHidden,
  onDuplicate,
  onRemove,
  onUpdate,
  onSettingsChange,
  relatedArticlesCatalog = "advice",
  editorContext = "competition",
  nodeRef,
  style,
  dragHandleProps,
}: BlockCardProps & {
  relatedArticlesCatalog?: "advice" | "article";
  editorContext?: ContentEditorContext;
  nodeRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
  dragHandleProps?: React.HTMLAttributes<HTMLSpanElement>;
}) {
  return (
    <div
      ref={nodeRef}
      style={style}
      id={`block-card-${block.id}`}
      className={`${styles.blockCard} ${selected ? styles.blockCardSelected : ""} ${hidden ? styles.blockCardHidden : ""}`}
    >
      <div className={styles.blockCardHeader} onClick={onSelect}>
        <span className={styles.dragHandle} {...dragHandleProps} aria-label="Drag to reorder">
          ⠿
        </span>
        <span className={styles.blockTypeLabel}>{getBlockLabel(block.type)}</span>
        {hidden ? <span className={styles.blockHiddenLabel}>Hidden</span> : null}
        <span className={styles.blockSummary}>{getBlockSummary(block)}</span>
        <div className={styles.blockActions}>
          <button
            type="button"
            className={`${styles.iconBtn} ${hidden ? styles.iconBtnActive : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleHidden();
            }}
            aria-label={hidden ? "Show block on published page" : "Hide block from published page"}
            title={hidden ? "Show on published page" : "Hide on published page"}
          >
            <BlockVisibilityIcon visible={!hidden} className={styles.visibilityIcon} />
          </button>
          <button type="button" className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); onToggle(); }} aria-label="Expand">
            {expanded ? "▲" : "▼"}
          </button>
          <button type="button" className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); onDuplicate(); }} aria-label="Duplicate">
            ⧉
          </button>
          <button type="button" className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); onRemove(); }} aria-label="Delete">
            ✕
          </button>
        </div>
      </div>
      {expanded ? (
        <div className={styles.blockForm} data-cms-block-form>
          <BlockFormFields
            block={block}
            onChange={onUpdate}
            onSettingsChange={onSettingsChange}
            relatedArticlesCatalog={relatedArticlesCatalog}
            editorContext={editorContext}
          />
          <BlockMaxWidthSetting
            value={block.settings?.max_width}
            customValue={block.settings?.max_width_custom}
            onChange={onSettingsChange}
          />
          <label className={styles.blockVisibilityField}>
            <input
              type="checkbox"
              checked={hidden}
              onChange={() => onToggleHidden()}
            />
            <span>Hide from published article</span>
          </label>
        </div>
      ) : null}
    </div>
  );
}

function SortableBlockCard(
  props: BlockCardProps & {
    relatedArticlesCatalog?: "advice" | "article";
    editorContext?: ContentEditorContext;
  },
) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.block.id,
  });

  const dragHandleProps = {
    ...attributes,
    ...listeners,
    onPointerDown: (event: React.PointerEvent<HTMLSpanElement>) => {
      listeners?.onPointerDown?.(event);
      event.stopPropagation();
    },
  };

  return (
    <BlockCard
      {...props}
      nodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
      dragHandleProps={dragHandleProps}
    />
  );
}

export function BlockEditorRoot({
  blocks,
  onChange,
  contentMaxWidth = "default",
  contentMaxWidthCustom,
  excludeArticleSlug,
  editorContext,
  children,
}: BlockEditorRootProps) {
  const editor = useBlockEditor(blocks, onChange);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(blocks[0]?.id ?? null);
  const [twoColumnStyleTarget, setTwoColumnStyleTarget] = useState<TwoColumnStyleTarget>("block");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(blocks.map((b) => b.id)));

  useEffect(() => {
    setTwoColumnStyleTarget("block");
  }, [selectedId]);

  const scrollPreviewToBlock = useCallback((id: string) => {
    window.setTimeout(() => {
      const blockEl = document.querySelector(`[data-block-id="${id}"]`);
      const scrollContainer = blockEl?.closest(`.${styles.previewScroll}`);
      if (!blockEl || !scrollContainer) return;

      const blockRect = blockEl.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const offset = blockRect.top - containerRect.top + scrollContainer.scrollTop;
      const targetScroll =
        offset - scrollContainer.clientHeight / 2 + blockEl.clientHeight / 2;

      scrollContainer.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
    }, 80);
  }, []);

  const selectBlock = useCallback(
    (id: string) => {
      setSelectedId(id);
      setExpandedIds((prev) => new Set([...prev, id]));
      scrollPreviewToBlock(id);
    },
    [scrollPreviewToBlock],
  );

  const openBlockForEditing = useCallback(
    (id: string) => {
      selectBlock(id);

      window.setTimeout(() => {
        const card = document.getElementById(`block-card-${id}`);
        if (!card) return;

        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add(styles.blockCardFlash);
        window.setTimeout(() => card.classList.remove(styles.blockCardFlash), 1200);

        const focusable = card.querySelector<HTMLElement>(
          "[data-cms-block-form] input:not([type='color']):not([type='checkbox']), [data-cms-block-form] textarea, [data-cms-block-form] select, [data-cms-block-form] [contenteditable='true']",
        );
        focusable?.focus({ preventScroll: true });
      }, 80);
    },
    [selectBlock],
  );

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      editor.reorderBlocks(String(active.id), String(over.id));
    }
  };

  const handleAddBlock = (type: BlockType, position: "start" | "end" = "end") => {
    if (!isBlockAllowedInEditor(type, editorContext)) return;
    const newId = editor.addBlock(type, position);
    if (newId) {
      if (type === "related_articles" && editorContext === "article") {
        editor.updateBlock(newId, {
          heading: "Related Articles",
          subtitle: "Some more articles you might enjoy...",
          category_slug: "baby-nutrition",
          article_slugs: [],
        });
      }
      setExpandedIds((prev) => new Set([...prev, newId]));
      setSelectedId(newId);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const card = document.getElementById(`block-card-${newId}`);
          if (!card) return;
          card.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
          const focusable = card.querySelector<HTMLElement>(
            "[data-cms-block-form] input:not([type='color']):not([type='checkbox']), [data-cms-block-form] textarea, [data-cms-block-form] select, [data-cms-block-form] [contenteditable='true']",
          );
          focusable?.focus({ preventScroll: true });
        });
      });
    }
  };

  const collapseAllBlocks = useCallback(() => setExpandedIds(new Set()), []);
  const expandAllBlocks = useCallback(
    () => setExpandedIds(new Set(blocks.map((block) => block.id))),
    [blocks],
  );

  return (
    <BlockEditorContext.Provider
      value={{
        blocks,
        contentMaxWidth,
        contentMaxWidthCustom,
        excludeArticleSlug,
        editorContext,
        editor,
        selectedId,
        twoColumnStyleTarget,
        setTwoColumnStyleTarget,
        expandedIds,
        pickerOpen,
        setPickerOpen,
        selectedBlock,
        selectBlock,
        openBlockForEditing,
        setExpandedIds,
        collapseAllBlocks,
        expandAllBlocks,
        sensors,
        handleDragEnd,
        handleAddBlock,
      }}
    >
      {children}
    </BlockEditorContext.Provider>
  );
}

function renderBlockCardProps(
  block: ContentBlock,
  ctx: ReturnType<typeof useBlockEditorContext>,
): BlockCardProps {
  const { editor, selectedId, expandedIds, selectBlock, setExpandedIds } = ctx;
  return {
    block,
    selected: selectedId === block.id,
    expanded: expandedIds.has(block.id),
    hidden: Boolean(block.settings?.hidden),
    onSelect: () => selectBlock(block.id),
    onToggle: () =>
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(block.id)) next.delete(block.id);
        else next.add(block.id);
        return next;
      }),
    onToggleHidden: () =>
      editor.updateBlockSettings(block.id, { hidden: block.settings?.hidden ? undefined : true }),
    onDuplicate: () => editor.duplicateBlock(block.id),
    onRemove: () => {
      if (confirm("Delete this block?")) editor.removeBlock(block.id);
    },
    onUpdate: (data) => editor.updateBlock(block.id, data),
    onSettingsChange: (settings) => editor.updateBlockSettings(block.id, settings),
  };
}

type AddBlockPlacement = "start" | "end";

function AddBlockButton({
  placement,
  onOpenPicker,
  compact = false,
}: {
  placement: AddBlockPlacement;
  onOpenPicker: (placement: AddBlockPlacement) => void;
  compact?: boolean;
}) {
  const fullLabel = placement === "start" ? "Add block at top" : "Add block at bottom";
  const label = compact
    ? placement === "start"
      ? "+ Add top"
      : "+ Add bottom"
    : `+ ${fullLabel}`;

  return (
    <button
      type="button"
      className={compact ? styles.addBlockBtnCompact : styles.addBlockBtn}
      onClick={() => onOpenPicker(placement)}
      title={fullLabel}
      aria-label={fullLabel}
    >
      {label}
    </button>
  );
}

function AddBlockToolbar({
  onOpenPicker,
  onCollapseAll,
  onExpandAll,
  blockCount,
}: {
  onOpenPicker: (placement: AddBlockPlacement) => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
  blockCount: number;
}) {
  return (
    <div className={styles.canvasToolbar}>
      <AddBlockButton placement="start" onOpenPicker={onOpenPicker} compact />
      <AddBlockButton placement="end" onOpenPicker={onOpenPicker} compact />
      {blockCount > 0 ? (
        <>
          <button
            type="button"
            className={styles.canvasUtilityBtn}
            onClick={onCollapseAll}
            title="Collapse all blocks"
          >
            Collapse all
          </button>
          <button
            type="button"
            className={styles.canvasUtilityBtn}
            onClick={onExpandAll}
            title="Expand all blocks"
          >
            Expand all
          </button>
        </>
      ) : null}
    </div>
  );
}

export function BlockEditorCanvas() {
  const ctx = useBlockEditorContext();
  const {
    blocks,
    pickerOpen,
    setPickerOpen,
    sensors,
    handleDragEnd,
    handleAddBlock,
    collapseAllBlocks,
    expandAllBlocks,
    editorContext,
  } = ctx;
  const [dndReady, setDndReady] = useState(false);
  const pickerPlacementRef = useRef<AddBlockPlacement>("end");

  useEffect(() => {
    setDndReady(true);
  }, []);

  const openPicker = (placement: AddBlockPlacement) => {
    pickerPlacementRef.current = placement;
    setPickerOpen(true);
  };

  const blockCards = blocks
    .filter((block) => isBlockAllowedInEditor(block.type, editorContext))
    .map((block) => {
    const cardProps = renderBlockCardProps(block, ctx);
    const relatedArticlesCatalog = editorContext === "article" ? "article" : "advice";
    return dndReady ? (
      <SortableBlockCard
        key={block.id}
        {...cardProps}
        relatedArticlesCatalog={relatedArticlesCatalog}
        editorContext={editorContext}
      />
    ) : (
      <BlockCard
        key={block.id}
        {...cardProps}
        relatedArticlesCatalog={relatedArticlesCatalog}
        editorContext={editorContext}
        dragHandleProps={{ "aria-hidden": true, tabIndex: -1 }}
      />
    );
  });

  return (
    <div className={styles.canvasWrap}>
      <div className={styles.addBlockSticky}>
        <AddBlockToolbar
          onOpenPicker={openPicker}
          onCollapseAll={collapseAllBlocks}
          onExpandAll={expandAllBlocks}
          blockCount={blocks.filter((block) => isBlockAllowedInEditor(block.type, editorContext)).length}
        />
      </div>
      {dndReady ? (
        <StableDndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className={styles.canvas}>{blockCards}</div>
          </SortableContext>
        </StableDndContext>
      ) : (
        <div className={styles.canvas}>{blockCards}</div>
      )}
      <AddBlockButton placement="end" onOpenPicker={openPicker} />
      {pickerOpen ? (
        <BlockPicker
          editorContext={editorContext}
          onSelect={(type) => handleAddBlock(type, pickerPlacementRef.current)}
          onClose={() => setPickerOpen(false)}
        />
      ) : null}
    </div>
  );
}

export function BlockEditorLivePreview({ fullscreenActions }: { fullscreenActions?: ReactNode }) {
  const {
    blocks,
    contentMaxWidth,
    contentMaxWidthCustom,
    excludeArticleSlug,
    editorContext,
    editor,
    selectedId,
    selectedBlock,
    twoColumnStyleTarget,
    setTwoColumnStyleTarget,
    openBlockForEditing,
  } = useBlockEditorContext();

  const renderContext = editorContextToRenderContext(editorContext);

  const handleStyleSettingsChange = (patch: Partial<BlockSettings>) => {
    if (!selectedBlock) return;
    if (selectedBlock.type === "two_column" && twoColumnStyleTarget !== "block") {
      editor.updateTwoColumnColumnSettings(
        selectedBlock.id,
        twoColumnStyleTarget,
        patch,
      );
      return;
    }
    editor.updateBlockSettings(selectedBlock.id, patch);
  };

  return (
    <PreviewViewport
      className={styles.previewPanelDocked}
      fullscreenActions={fullscreenActions}
      blockMaxWidthLabel={selectedBlock ? formatBlockMaxWidthLabel(selectedBlock.settings) : null}
      selectedBlockId={selectedId}
      styleToolbar={({ isFullscreen }) =>
        selectedBlock ? (
          <PreviewStyleToolbar
            block={selectedBlock}
            isFullscreen={isFullscreen}
            twoColumnTarget={
              selectedBlock.type === "two_column" ? twoColumnStyleTarget : undefined
            }
            onTwoColumnTargetChange={
              selectedBlock.type === "two_column" ? setTwoColumnStyleTarget : undefined
            }
            onSettingsChange={handleStyleSettingsChange}
          />
        ) : (
          <div className={styles.previewHint}>
            Click a block · drag pink handles (max-width) · blue handles (images)
          </div>
        )
      }
    >
      <ContentBlockRenderer
        blocks={blocks}
        contentMaxWidth={contentMaxWidth}
        contentMaxWidthCustom={contentMaxWidthCustom}
        previewMode
        selectedBlockId={selectedId}
        selectedTwoColumnTarget={twoColumnStyleTarget}
        onBlockSelect={(id) => openBlockForEditing(id)}
        onTwoColumnTargetSelect={(id, target) => {
          openBlockForEditing(id);
          setTwoColumnStyleTarget(target);
        }}
        onBlockSettingsChange={(id, patch) => editor.updateBlockSettings(id, patch)}
        onBlockDataChange={(id, data) => editor.updateBlock(id, data)}
        excludeArticleSlug={excludeArticleSlug}
        renderContext={renderContext}
      />
    </PreviewViewport>
  );
}

type BlockEditorProps = {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  contentMaxWidth?: MaxWidthPreset;
  contentMaxWidthCustom?: string;
  previewFullscreenActions?: ReactNode;
  editorContext?: ContentEditorContext;
};

/** Side-by-side canvas and preview (used when preview is not lifted to page layout). */
export function BlockEditor({
  blocks,
  onChange,
  contentMaxWidth = "default",
  contentMaxWidthCustom,
  previewFullscreenActions,
  editorContext = "competition",
}: BlockEditorProps) {
  return (
    <BlockEditorRoot
      blocks={blocks}
      onChange={onChange}
      contentMaxWidth={contentMaxWidth}
      contentMaxWidthCustom={contentMaxWidthCustom}
      editorContext={editorContext}
    >
      <div className={styles.editorLayout}>
        <BlockEditorCanvas />
        <BlockEditorLivePreview fullscreenActions={previewFullscreenActions} />
      </div>
    </BlockEditorRoot>
  );
}
