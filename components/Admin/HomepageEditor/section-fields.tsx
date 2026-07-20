"use client";

import {
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState, type ReactNode } from "react";
import { StableDndContext } from "@/components/Admin/BlockEditor/stable-dnd-context";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import type {
  CollabsSectionData,
  CookbooksSectionData,
  ExpertRangesSectionData,
  HeroSectionData,
  HomepageSection,
  InstagramSectionData,
  LatestRecipesSectionData,
  PartnersSectionData,
  RecipeAppSectionData,
} from "@/lib/homepage/types";
import styles from "./homepage-editor.module.css";

function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function RemoveItemButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className={blockStyles.iconBtn}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      ✕
    </button>
  );
}

function MoveButtons({
  index,
  total,
  onMove,
  label,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  label: string;
}) {
  return (
    <>
      <button
        type="button"
        className={blockStyles.iconBtn}
        aria-label={`Move ${label} up`}
        title="Move up"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
      >
        ↑
      </button>
      <button
        type="button"
        className={blockStyles.iconBtn}
        aria-label={`Move ${label} down`}
        title="Move down"
        disabled={index >= total - 1}
        onClick={() => onMove(index, index + 1)}
      >
        ↓
      </button>
    </>
  );
}

function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = items.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function SortableItemCard({
  id,
  index,
  title,
  meta,
  thumbSrc,
  expanded,
  onToggle,
  onRemove,
  children,
}: {
  id: string;
  index: number;
  title: string;
  meta?: string;
  thumbSrc?: string;
  expanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.itemCard}${expanded ? ` ${styles.itemCardOpen}` : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.itemCardHeader}>
        <span
          className={blockStyles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${title}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            listeners?.onPointerDown?.(e);
            e.stopPropagation();
          }}
        >
          ⠿
        </span>
        <button
          type="button"
          className={styles.itemCardToggle}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          <span className={styles.itemCardIndex} aria-hidden>
            {index + 1}
          </span>
          <span className={styles.itemCardThumb} aria-hidden>
            {thumbSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbSrc} alt="" className={styles.itemCardThumbImg} />
            ) : (
              <span className={styles.itemCardThumbEmpty} />
            )}
          </span>
          <span className={styles.itemCardCopy}>
            <span className={styles.itemCardTitle}>{title}</span>
            {meta ? <span className={styles.itemCardMeta}>{meta}</span> : null}
          </span>
        </button>
        <div className={styles.itemCardActions}>
          <RemoveItemButton label={`Remove ${title}`} onClick={onRemove} />
        </div>
      </div>
      {expanded ? <div className={styles.itemCardBody}>{children}</div> : null}
    </div>
  );
}

function SortableItemList<T extends { id: string }>({
  items,
  label,
  onReorder,
  onRemoveItem,
  getTitle,
  getMeta,
  getThumb,
  renderFields,
}: {
  items: T[];
  label: string;
  onReorder: (next: T[]) => void;
  onRemoveItem: (item: T) => void;
  getTitle: (item: T, index: number) => string;
  getMeta?: (item: T, index: number) => string;
  getThumb?: (item: T, index: number) => string | undefined;
  renderFields: (item: T, index: number) => ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const ids = items.map((item) => item.id);
  // One item open at a time — clearer than section-style expand-all.
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setOpenId((prev) => (prev && ids.includes(prev) ? prev : null));
  }, [ids.join("|")]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleDragStart = (_event: DragStartEvent) => {
    setOpenId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  const countLabel = `${items.length} ${label}`;

  return (
    <div className={styles.sortableItemList}>
      <div className={styles.itemListToolbar}>
        <p className={styles.sectionHint}>
          Drag to reorder · Open one item at a time to edit
        </p>
        <div className={styles.itemListToolbarEnd}>
          <span className={styles.itemListCount}>{countLabel}</span>
          {openId ? (
            <button
              type="button"
              className={styles.itemListCloseBtn}
              onClick={() => setOpenId(null)}
            >
              Close editor
            </button>
          ) : null}
        </div>
      </div>
      <StableDndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className={styles.itemList}>
            {items.map((item, index) => (
              <SortableItemCard
                key={item.id}
                id={item.id}
                index={index}
                title={getTitle(item, index)}
                meta={getMeta?.(item, index)}
                thumbSrc={getThumb?.(item, index)}
                expanded={openId === item.id}
                onToggle={() => toggle(item.id)}
                onRemove={() => onRemoveItem(item)}
              >
                {renderFields(item, index)}
              </SortableItemCard>
            ))}
          </div>
        </SortableContext>
      </StableDndContext>
    </div>
  );
}

type SectionFieldsProps = {
  section: HomepageSection;
  onChange: (section: HomepageSection) => void;
};

export function HomepageSectionFields({ section, onChange }: SectionFieldsProps) {
  if (section.type === "recipe_finder") {
    return (
      <p className={styles.lockedBody}>
        Default search recipes — not editable. Finder options stay linked to the site recipe taxonomy.
      </p>
    );
  }

  if (section.type === "hero") {
    const data = section.data;
    const updateData = (next: HeroSectionData) => onChange({ ...section, data: next });
    return (
      <div className={styles.itemList}>
        {data.slides.map((slide, index) => (
          <div key={slide.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <span className={styles.itemCardTitle}>Slide {index + 1}</span>
              <div className={styles.itemCardActions}>
                <MoveButtons
                  index={index}
                  total={data.slides.length}
                  label="slide"
                  onMove={(from, to) =>
                    updateData({ slides: moveItem(data.slides, from, to) })
                  }
                />
                <RemoveItemButton
                  label={`Remove slide ${index + 1}`}
                  onClick={() =>
                    updateData({ slides: data.slides.filter((item) => item.id !== slide.id) })
                  }
                />
              </div>
            </div>
            <div className={styles.fieldGrid}>
              <div className={`field ${styles.fieldFull}`}>
                <label className="fieldLabel">Title</label>
                <input
                  className="fieldInput"
                  value={slide.title}
                  onChange={(e) =>
                    updateData({
                      slides: data.slides.map((item) =>
                        item.id === slide.id ? { ...item, title: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className={`field ${styles.fieldFull}`}>
                <label className="fieldLabel">Subtitle</label>
                <input
                  className="fieldInput"
                  value={slide.subtitle}
                  onChange={(e) =>
                    updateData({
                      slides: data.slides.map((item) =>
                        item.id === slide.id ? { ...item, subtitle: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className="field">
                <label className="fieldLabel">CTA label</label>
                <input
                  className="fieldInput"
                  value={slide.cta}
                  onChange={(e) =>
                    updateData({
                      slides: data.slides.map((item) =>
                        item.id === slide.id ? { ...item, cta: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className="field">
                <label className="fieldLabel">Link URL</label>
                <input
                  className="fieldInput"
                  value={slide.href}
                  onChange={(e) =>
                    updateData({
                      slides: data.slides.map((item) =>
                        item.id === slide.id ? { ...item, href: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className={`field ${styles.fieldFull}`}>
                <label className="fieldLabel">Image</label>
                <ImageField
                  value={slide.image}
                  showAlt={false}
                  onChange={(src) =>
                    updateData({
                      slides: data.slides.map((item) =>
                        item.id === slide.id ? { ...item, image: src } : item,
                      ),
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <div className={styles.addRow}>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() =>
              updateData({
                slides: [
                  ...data.slides,
                  {
                    id: newId("hero-slide"),
                    title: "New slide",
                    subtitle: "",
                    cta: "Discover",
                    href: "/",
                    image: "",
                  },
                ],
              })
            }
          >
            + Add slide
          </button>
        </div>
      </div>
    );
  }

  if (section.type === "latest_recipes") {
    const data = section.data;
    const updateData = (next: LatestRecipesSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className={styles.fieldGrid}>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={data.heading}
              onChange={(e) => updateData({ ...data, heading: e.target.value })}
            />
          </div>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Subtitle</label>
            <input
              className="fieldInput"
              value={data.subtitle}
              onChange={(e) => updateData({ ...data, subtitle: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA label</label>
            <input
              className="fieldInput"
              value={data.ctaLabel}
              onChange={(e) => updateData({ ...data, ctaLabel: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA URL</label>
            <input
              className="fieldInput"
              value={data.ctaHref}
              onChange={(e) => updateData({ ...data, ctaHref: e.target.value })}
            />
          </div>
        </div>
        <SortableItemList
          items={data.recipes}
          label="recipes"
          onReorder={(recipes) => updateData({ ...data, recipes })}
          onRemoveItem={(recipe) =>
            updateData({
              ...data,
              recipes: data.recipes.filter((item) => item.id !== recipe.id),
            })
          }
          getTitle={(recipe) => recipe.title.trim() || "Untitled recipe"}
          getMeta={(recipe) => recipe.duration.trim() || "No duration"}
          getThumb={(recipe) => recipe.image.trim() || undefined}
          renderFields={(recipe) => (
              <div className={styles.fieldGrid}>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Title</label>
                  <input
                    className="fieldInput"
                    value={recipe.title}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        recipes: data.recipes.map((item) =>
                          item.id === recipe.id ? { ...item, title: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Duration</label>
                  <input
                    className="fieldInput"
                    value={recipe.duration}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        recipes: data.recipes.map((item) =>
                          item.id === recipe.id ? { ...item, duration: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Link URL</label>
                  <input
                    className="fieldInput"
                    value={recipe.href}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        recipes: data.recipes.map((item) =>
                          item.id === recipe.id ? { ...item, href: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Image</label>
                  <ImageField
                    value={recipe.image}
                    showAlt={false}
                    onChange={(src) =>
                      updateData({
                        ...data,
                        recipes: data.recipes.map((item) =>
                          item.id === recipe.id ? { ...item, image: src } : item,
                        ),
                      })
                    }
                  />
                </div>
              </div>
          )}
        />
        <div className={styles.addRow}>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() =>
              updateData({
                ...data,
                recipes: [
                  ...data.recipes,
                  {
                    id: newId("latest-recipe"),
                    title: "New recipe",
                    duration: "20 mins",
                    href: "/recipes",
                    image: "",
                  },
                ],
              })
            }
          >
            + Add recipe
          </button>
        </div>
      </>
    );
  }

  if (section.type === "recipe_app") {
    const data = section.data;
    const updateData = (next: RecipeAppSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className={styles.fieldGrid}>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={data.heading}
              onChange={(e) => updateData({ ...data, heading: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA label</label>
            <input
              className="fieldInput"
              value={data.ctaLabel}
              onChange={(e) => updateData({ ...data, ctaLabel: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA URL</label>
            <input
              className="fieldInput"
              value={data.ctaHref}
              onChange={(e) => updateData({ ...data, ctaHref: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">App Store URL</label>
            <input
              className="fieldInput"
              value={data.appStoreHref}
              onChange={(e) => updateData({ ...data, appStoreHref: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Play Store URL</label>
            <input
              className="fieldInput"
              value={data.playStoreHref}
              onChange={(e) => updateData({ ...data, playStoreHref: e.target.value })}
            />
          </div>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Phones image</label>
            <ImageField
              value={data.phonesImage}
              showAlt={false}
              onChange={(src) => updateData({ ...data, phonesImage: src })}
            />
          </div>
        </div>
        <div className={styles.itemList}>
          <p className={styles.sectionHint}>Bullets</p>
          {data.bullets.map((bullet, index) => (
            <div key={bullet.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <span className={styles.itemCardTitle}>Bullet {index + 1}</span>
                <div className={styles.itemCardActions}>
                  <RemoveItemButton
                    label={`Remove bullet ${index + 1}`}
                    onClick={() =>
                      updateData({
                        ...data,
                        bullets: data.bullets.filter((item) => item.id !== bullet.id),
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.fieldGrid}>
                <div className="field">
                  <label className="fieldLabel">Lead</label>
                  <input
                    className="fieldInput"
                    value={bullet.lead}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        bullets: data.bullets.map((item) =>
                          item.id === bullet.id ? { ...item, lead: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Text</label>
                  <input
                    className="fieldInput"
                    value={bullet.text}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        bullets: data.bullets.map((item) =>
                          item.id === bullet.id ? { ...item, text: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className={styles.addRow}>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={() =>
                updateData({
                  ...data,
                  bullets: [...data.bullets, { id: newId("app-bullet"), lead: "", text: "" }],
                })
              }
            >
              + Add bullet
            </button>
          </div>
        </div>
        <div className={styles.itemList}>
          <p className={styles.sectionHint}>Award badges</p>
          {data.awards.map((award, index) => (
            <div key={award.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <span className={styles.itemCardTitle}>Award {index + 1}</span>
                <RemoveItemButton
                  label={`Remove award ${index + 1}`}
                  onClick={() =>
                    updateData({
                      ...data,
                      awards: data.awards.filter((item) => item.id !== award.id),
                    })
                  }
                />
              </div>
              <ImageField
                value={award.src}
                alt={award.alt}
                onChange={(src, alt) =>
                  updateData({
                    ...data,
                    awards: data.awards.map((item) =>
                      item.id === award.id ? { ...item, src, alt: alt ?? item.alt } : item,
                    ),
                  })
                }
                onAltChange={(alt) =>
                  updateData({
                    ...data,
                    awards: data.awards.map((item) =>
                      item.id === award.id ? { ...item, alt } : item,
                    ),
                  })
                }
              />
            </div>
          ))}
          <div className={styles.addRow}>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={() =>
                updateData({
                  ...data,
                  awards: [...data.awards, { id: newId("app-award"), src: "", alt: "" }],
                })
              }
            >
              + Add award
            </button>
          </div>
        </div>
      </>
    );
  }

  if (section.type === "expert_ranges") {
    const data = section.data;
    const updateData = (next: ExpertRangesSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className={styles.fieldGrid}>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={data.heading}
              onChange={(e) => updateData({ ...data, heading: e.target.value })}
            />
          </div>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Body</label>
            <textarea
              className="fieldInput"
              rows={3}
              value={data.body}
              onChange={(e) => updateData({ ...data, body: e.target.value })}
            />
          </div>
        </div>
        <SortableItemList
          items={data.awardLogos}
          label="award logos"
          onReorder={(awardLogos) => updateData({ ...data, awardLogos })}
          onRemoveItem={(logo) =>
            updateData({
              ...data,
              awardLogos: data.awardLogos.filter((item) => item.id !== logo.id),
            })
          }
          getTitle={(_logo, index) => `Logo ${index + 1}`}
          getMeta={(logo) => (logo.src.trim() ? "Image set" : "No image")}
          getThumb={(logo) => logo.src.trim() || undefined}
          renderFields={(logo) => (
            <ImageField
              value={logo.src}
              showAlt={false}
              onChange={(src) =>
                updateData({
                  ...data,
                  awardLogos: data.awardLogos.map((item) =>
                    item.id === logo.id ? { ...item, src } : item,
                  ),
                })
              }
            />
          )}
        />
        <div className={styles.addRow}>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() =>
              updateData({
                ...data,
                awardLogos: [...data.awardLogos, { id: newId("award-logo"), src: "", alt: "" }],
              })
            }
          >
            + Add logo
          </button>
        </div>
        <div className={styles.itemList}>
          <p className={styles.sectionHint}>Product cards</p>
          {data.cards.map((card, index) => (
            <div key={card.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <span className={styles.itemCardTitle}>Card {index + 1}</span>
                <RemoveItemButton
                  label={`Remove card ${index + 1}`}
                  onClick={() =>
                    updateData({
                      ...data,
                      cards: data.cards.filter((item) => item.id !== card.id),
                    })
                  }
                />
              </div>
              <div className={styles.fieldGrid}>
                <div className="field">
                  <label className="fieldLabel">Title</label>
                  <input
                    className="fieldInput"
                    value={card.title}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, title: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Link URL</label>
                  <input
                    className="fieldInput"
                    value={card.href}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, href: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Image</label>
                  <ImageField
                    value={card.image}
                    showAlt={false}
                    onChange={(src) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, image: src } : item,
                        ),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className={styles.addRow}>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={() =>
                updateData({
                  ...data,
                  cards: [
                    ...data.cards,
                    { id: newId("expert-card"), title: "New range", image: "", href: "/" },
                  ],
                })
              }
            >
              + Add card
            </button>
          </div>
        </div>
      </>
    );
  }

  if (section.type === "cookbooks") {
    const data = section.data;
    const updateData = (next: CookbooksSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className={styles.fieldGrid}>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={data.heading}
              onChange={(e) => updateData({ ...data, heading: e.target.value })}
            />
          </div>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Body</label>
            <textarea
              className="fieldInput"
              rows={3}
              value={data.body}
              onChange={(e) => updateData({ ...data, body: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA label</label>
            <input
              className="fieldInput"
              value={data.ctaLabel}
              onChange={(e) => updateData({ ...data, ctaLabel: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA URL</label>
            <input
              className="fieldInput"
              value={data.ctaHref}
              onChange={(e) => updateData({ ...data, ctaHref: e.target.value })}
            />
          </div>
        </div>
        <SortableItemList
          items={data.books}
          label="cookbooks"
          onReorder={(books) => updateData({ ...data, books })}
          onRemoveItem={(book) =>
            updateData({
              ...data,
              books: data.books.filter((item) => item.id !== book.id),
            })
          }
          getTitle={(book) => book.title.trim() || "Untitled cookbook"}
          getMeta={(book) => (book.href.trim() ? book.href : "No link")}
          getThumb={(book) => book.image.trim() || undefined}
          renderFields={(book) => (
              <div className={styles.fieldGrid}>
                <div className="field">
                  <label className="fieldLabel">Title</label>
                  <input
                    className="fieldInput"
                    value={book.title}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        books: data.books.map((item) =>
                          item.id === book.id ? { ...item, title: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Link URL</label>
                  <input
                    className="fieldInput"
                    value={book.href}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        books: data.books.map((item) =>
                          item.id === book.id ? { ...item, href: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Image</label>
                  <ImageField
                    value={book.image}
                    showAlt={false}
                    onChange={(src) =>
                      updateData({
                        ...data,
                        books: data.books.map((item) =>
                          item.id === book.id ? { ...item, image: src } : item,
                        ),
                      })
                    }
                  />
                </div>
              </div>
          )}
        />
        <div className={styles.addRow}>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() =>
              updateData({
                ...data,
                books: [
                  ...data.books,
                  { id: newId("cookbook"), title: "New cookbook", image: "", href: "/" },
                ],
              })
            }
          >
            + Add book
          </button>
        </div>
      </>
    );
  }

  if (section.type === "collabs") {
    const data = section.data;
    const updateData = (next: CollabsSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className="field">
          <label className="fieldLabel">Heading</label>
          <input
            className="fieldInput"
            value={data.heading}
            onChange={(e) => updateData({ ...data, heading: e.target.value })}
          />
        </div>
        <div className={styles.itemList}>
          {data.cards.map((card, index) => (
            <div key={card.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <span className={styles.itemCardTitle}>Collab {index + 1}</span>
                <RemoveItemButton
                  label={`Remove collab ${index + 1}`}
                  onClick={() =>
                    updateData({
                      ...data,
                      cards: data.cards.filter((item) => item.id !== card.id),
                    })
                  }
                />
              </div>
              <div className={styles.fieldGrid}>
                <div className="field">
                  <label className="fieldLabel">Title</label>
                  <input
                    className="fieldInput"
                    value={card.title}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, title: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Link URL</label>
                  <input
                    className="fieldInput"
                    value={card.href}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, href: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Subtitle</label>
                  <input
                    className="fieldInput"
                    value={card.subtitle}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, subtitle: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Logo image</label>
                  <ImageField
                    value={card.logoImage}
                    showAlt={false}
                    onChange={(src) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, logoImage: src } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Card image</label>
                  <ImageField
                    value={card.cardImage}
                    showAlt={false}
                    onChange={(src) =>
                      updateData({
                        ...data,
                        cards: data.cards.map((item) =>
                          item.id === card.id ? { ...item, cardImage: src } : item,
                        ),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className={styles.addRow}>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={() =>
                updateData({
                  ...data,
                  cards: [
                    ...data.cards,
                    {
                      id: newId("collab"),
                      title: "New collab",
                      subtitle: "",
                      href: "/",
                      logoImage: "",
                      cardImage: "",
                    },
                  ],
                })
              }
            >
              + Add collab
            </button>
          </div>
        </div>
      </>
    );
  }

  if (section.type === "partners") {
    const data = section.data;
    const updateData = (next: PartnersSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className={styles.fieldGrid}>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={data.heading}
              onChange={(e) => updateData({ ...data, heading: e.target.value })}
            />
          </div>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Body</label>
            <textarea
              className="fieldInput"
              rows={3}
              value={data.body}
              onChange={(e) => updateData({ ...data, body: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA label</label>
            <input
              className="fieldInput"
              value={data.ctaLabel}
              onChange={(e) => updateData({ ...data, ctaLabel: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">CTA URL</label>
            <input
              className="fieldInput"
              value={data.ctaHref}
              onChange={(e) => updateData({ ...data, ctaHref: e.target.value })}
            />
          </div>
        </div>
        <SortableItemList
          items={data.logos}
          label="partners"
          onReorder={(logos) => updateData({ ...data, logos })}
          onRemoveItem={(logo) =>
            updateData({
              ...data,
              logos: data.logos.filter((item) => item.id !== logo.id),
            })
          }
          getTitle={(logo) => logo.name.trim() || "Untitled partner"}
          getMeta={(logo) => (logo.href.trim() ? logo.href : "No link")}
          getThumb={(logo) => logo.image.trim() || undefined}
          renderFields={(logo) => (
            <div className={styles.fieldGrid}>
              <div className="field">
                <label className="fieldLabel">Name</label>
                <input
                  className="fieldInput"
                  value={logo.name}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      logos: data.logos.map((item) =>
                        item.id === logo.id ? { ...item, name: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className="field">
                <label className="fieldLabel">Link URL</label>
                <input
                  className="fieldInput"
                  value={logo.href}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      logos: data.logos.map((item) =>
                        item.id === logo.id ? { ...item, href: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <div className={`field ${styles.fieldFull}`}>
                <label className="fieldLabel">Logo image</label>
                <ImageField
                  value={logo.image}
                  showAlt={false}
                  onChange={(src) =>
                    updateData({
                      ...data,
                      logos: data.logos.map((item) =>
                        item.id === logo.id ? { ...item, image: src } : item,
                      ),
                    })
                  }
                />
              </div>
            </div>
          )}
        />
        <div className={styles.addRow}>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() =>
              updateData({
                ...data,
                logos: [
                  ...data.logos,
                  { id: newId("partner"), name: "New partner", image: "", href: "/" },
                ],
              })
            }
          >
            + Add partner
          </button>
        </div>
      </>
    );
  }

  if (section.type === "instagram") {
    const data = section.data;
    const updateData = (next: InstagramSectionData) => onChange({ ...section, data: next });
    return (
      <>
        <div className={styles.fieldGrid}>
          <div className="field">
            <label className="fieldLabel">Title</label>
            <input
              className="fieldInput"
              value={data.title}
              onChange={(e) => updateData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Accent</label>
            <input
              className="fieldInput"
              value={data.titleAccent}
              onChange={(e) => updateData({ ...data, titleAccent: e.target.value })}
            />
          </div>
          <div className={`field ${styles.fieldFull}`}>
            <label className="fieldLabel">Description</label>
            <textarea
              className="fieldInput"
              rows={2}
              value={data.description}
              onChange={(e) => updateData({ ...data, description: e.target.value })}
            />
          </div>
        </div>
        <div className={styles.itemList}>
          {data.posts.map((post, index) => (
            <div key={post.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <span className={styles.itemCardTitle}>Post {index + 1}</span>
                <RemoveItemButton
                  label={`Remove post ${index + 1}`}
                  onClick={() =>
                    updateData({
                      ...data,
                      posts: data.posts.filter((item) => item.id !== post.id),
                    })
                  }
                />
              </div>
              <div className={styles.fieldGrid}>
                <div className="field">
                  <label className="fieldLabel">Link URL</label>
                  <input
                    className="fieldInput"
                    value={post.href}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        posts: data.posts.map((item) =>
                          item.id === post.id ? { ...item, href: e.target.value } : item,
                        ),
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Kind</label>
                  <select
                    className="fieldInput"
                    value={post.kind}
                    onChange={(e) =>
                      updateData({
                        ...data,
                        posts: data.posts.map((item) =>
                          item.id === post.id
                            ? {
                                ...item,
                                kind: e.target.value as "image" | "video" | "carousel",
                              }
                            : item,
                        ),
                      })
                    }
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </div>
                <div className={`field ${styles.fieldFull}`}>
                  <label className="fieldLabel">Image</label>
                  <ImageField
                    value={post.image}
                    showAlt={false}
                    onChange={(src) =>
                      updateData({
                        ...data,
                        posts: data.posts.map((item) =>
                          item.id === post.id ? { ...item, image: src } : item,
                        ),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className={styles.addRow}>
            <button
              type="button"
              className="btn btnSecondary"
              onClick={() =>
                updateData({
                  ...data,
                  posts: [
                    ...data.posts,
                    { id: newId("instagram"), href: "/", image: "", kind: "image" },
                  ],
                })
              }
            >
              + Add post
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
}
