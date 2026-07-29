"use client";

import { ImageField } from "@/components/Admin/Ui/ImageField";
import type { RecipeSponsor } from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeSponsorFieldsProps = {
  sponsor?: RecipeSponsor;
  onChange: (sponsor: RecipeSponsor) => void;
};

export function RecipeSponsorFields({ sponsor = {}, onChange }: RecipeSponsorFieldsProps) {
  const patch = <K extends keyof RecipeSponsor>(key: K, value: RecipeSponsor[K]) => {
    onChange({ ...sponsor, [key]: value });
  };

  return (
    <div className="cardForm">
      <div className="field">
        <label className="fieldLabel" htmlFor="sponsor-name">
          Sponsored by / Published by
        </label>
        <input
          id="sponsor-name"
          className="fieldInput"
          value={sponsor.name ?? ""}
          onChange={(e) => patch("name", e.target.value)}
        />
      </div>
      <div className="field">
        <span className="fieldLabel">Sponsor Logo</span>
        <ImageField
          value={sponsor.logo ?? ""}
          alt={sponsor.logo_alt}
          showAlt={Boolean(sponsor.logo)}
          altLabel="Sponsor logo alt"
          onChange={(src, altVal) => {
            onChange({
              ...sponsor,
              logo: src,
              logo_alt: altVal ?? sponsor.logo_alt,
            });
          }}
          onAltChange={(altVal) => patch("logo_alt", altVal)}
        />
        {sponsor.logo ? (
          <button
            type="button"
            className={`btn btnGhost ${styles.removeImageBtn}`}
            onClick={() => onChange({ ...sponsor, logo: "", logo_alt: "" })}
          >
            Remove logo
          </button>
        ) : null}
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="sponsor-url">
          Sponsor URL
        </label>
        <input
          id="sponsor-url"
          className="fieldInput"
          type="url"
          value={sponsor.url ?? ""}
          onChange={(e) => patch("url", e.target.value)}
          placeholder="https://"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
