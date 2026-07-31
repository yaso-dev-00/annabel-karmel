'use client';

import {
  RECIPE_VIDEO_PROVIDERS,
  type RecipeVideo,
  type RecipeVideoProvider,
} from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

type RecipeVideoFieldProps = {
  video?: RecipeVideo;
  vimeoEmbed?: string;
  onVideoChange: (video: RecipeVideo | undefined) => void;
  onVimeoEmbedChange: (embed: string) => void;
};

export function RecipeVideoField({
  video,
  vimeoEmbed = '',
  onVideoChange,
  onVimeoEmbedChange,
}: RecipeVideoFieldProps) {
  const provider = video?.provider ?? 'youtube';
  const url = video?.url ?? '';
  const caption = video?.caption ?? '';

  const patch = (next: Partial<RecipeVideo>) => {
    const merged: RecipeVideo = {
      provider: next.provider ?? provider,
      url: next.url ?? url,
      caption: next.caption ?? caption,
      ...(video?.poster ? { poster: video.poster } : {}),
      ...(next.poster !== undefined ? { poster: next.poster } : {}),
    };
    if (
      !merged.url.trim() &&
      !merged.caption?.trim() &&
      !merged.poster?.trim()
    ) {
      onVideoChange(undefined);
      return;
    }
    onVideoChange({
      provider: merged.provider,
      url: merged.url,
      ...(merged.caption?.trim() ? { caption: merged.caption.trim() } : {}),
      ...(merged.poster?.trim() ? { poster: merged.poster.trim() } : {}),
    });
  };

  return (
    <div className="cardForm">
      <div className="field">
        <label className="fieldLabel" htmlFor="recipe-video-provider">
          Provider
        </label>
        <select
          id="recipe-video-provider"
          className="fieldSelect"
          value={provider}
          onChange={(e) =>
            patch({ provider: e.target.value as RecipeVideoProvider })
          }
        >
          {RECIPE_VIDEO_PROVIDERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="recipe-video-url">
          URL / ID
        </label>
        <input
          id="recipe-video-url"
          className="fieldInput"
          value={url}
          onChange={(e) => patch({ url: e.target.value })}
          placeholder="Enter URL"
          autoComplete="off"
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="recipe-video-caption">
          Caption
        </label>
        <input
          id="recipe-video-caption"
          className="fieldInput"
          value={caption}
          onChange={(e) => patch({ caption: e.target.value })}
          placeholder="Optional caption"
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="recipe-vimeo-embed">
          Vimeo Embedded
        </label>
        <p className={styles.fieldHint}>
          Paste a full Vimeo embed code when you need the raw iframe markup.
        </p>
        <textarea
          id="recipe-vimeo-embed"
          className="fieldTextarea"
          rows={5}
          value={vimeoEmbed}
          onChange={(e) => onVimeoEmbedChange(e.target.value)}
          placeholder="<iframe …></iframe>"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
