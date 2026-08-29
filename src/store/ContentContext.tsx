import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SiteContent } from "./types";
import { defaultContent } from "./defaultContent";

const STORAGE_KEY = "mastershot99_content_v1";

function loadInitial(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultContent, ...JSON.parse(raw) };
  } catch {
    // ignore malformed storage
  }
  return defaultContent;
}

interface ContentContextValue {
  content: SiteContent;
  setContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      setContent: (updater) => setContentState((prev) => updater(prev)),
      resetContent: () => setContentState(defaultContent),
    }),
    [content]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
