"use client";

import {
  PreviewViewport,
  type PreviewViewportHandle,
} from "@/components/Admin/BlockEditor/preview-viewport";
import { CookbookDetailPageContent } from "@/components/MarketingScreen/CookbookDetailPage";
import { cookbookToPageData } from "@/lib/cookbooks/cookbook-to-page-data";
import type { Cookbook } from "@/lib/cookbooks/types";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import { forwardRef, memo, useDeferredValue, type ReactNode } from "react";

import "./cookbook-preview-layout.css";

type CookbookLivePreviewProps = {
  cookbook: Cookbook;
  fullscreenActions?: ReactNode;
  className?: string;
  defaultFullscreen?: boolean;
};

const CookbookPagePreview = memo(function CookbookPagePreview({
  cookbook,
}: {
  cookbook: Cookbook;
}) {
  const pageData = cookbookToPageData(cookbook);
  // Admin live preview is the detail page — also apply listing bold phrases when
  // that wording appears in the detail copy, so the right-hand preview matches
  // the Bold phrases editor the user is editing.
  const previewData = {
    ...pageData,
    detailBodyHighlights: [
      ...pageData.detailBodyHighlights,
      ...pageData.bodyHighlights,
    ],
  };
  return <CookbookDetailPageContent cookbook={previewData} />;
});

export const CookbookLivePreview = forwardRef<PreviewViewportHandle, CookbookLivePreviewProps>(
  function CookbookLivePreview(
    { cookbook, fullscreenActions, className, defaultFullscreen },
    ref,
  ) {
    const deferredCookbook = useDeferredValue(cookbook);

    return (
      <PreviewViewport
        ref={ref}
        className={className ?? blockStyles.previewPanelDocked}
        bodyClassName={blockStyles.previewBodyFlush}
        fullscreenActions={fullscreenActions}
        defaultFullscreen={defaultFullscreen}
        dockedViewport="mobile"
        dockedWidth={400}
        viewportWidthOverrides={{ mobile: 400 }}
        title="Live preview"
      >
        <CookbookPagePreview cookbook={deferredCookbook} />
      </PreviewViewport>
    );
  },
);
