"use client";
import { useTopLoader } from "nextjs-toploader";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";

export type BlockEdit = {
  id: string;
  originalHtml: string;
  modifiedHtml: string;
  saved: boolean;
};

export type BlockContextType = {
  selectedBlockId: string | null;
  editsById: Record<string, BlockEdit>;
  openEdit: (id: string) => void;
  closeEdit: () => void;
  modifyBlock: (id: string, html: string, originalHtml: string) => void;
  getEffectiveHtml: (id: string, fallbackOriginal: string) => string;
  saveBlock: (id: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  saveAll: () => Promise<{ ok: boolean }>;
  resetBlock: (id: string) => void;
  resetAll: () => void;
  isDirty: (id: string) => boolean;
  unsavedBlocksCount: number;
};

export const BlockContext = createContext<BlockContextType | null>(null);

export const BlockProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [editsById, setEditsById] = useState<Record<string, BlockEdit>>({});
  const loader = useTopLoader();

  const unsavedBlocksCount = useMemo(
    () => Object.values(editsById).filter((e) => !e.saved).length,
    [editsById]
  );

  const openEdit = useCallback((id: string) => {
    setSelectedBlockId(id);
  }, []);

  const closeEdit = useCallback(() => {
    setSelectedBlockId(null);
  }, []);

  const modifyBlock = useCallback((id: string, html: string, originalHtml: string) => {
    setEditsById((prev) => {
      const edit = prev[id];

      // First change — create the edit record
      if (!edit) {
        if (html === originalHtml) return prev; // no actual change
        return {
          ...prev,
          [id]: { id, originalHtml, modifiedHtml: html, saved: false },
        };
      }

      // Editing an already-saved block — new originalHtml is the saved value
      if (edit.saved) {
        if (html === edit.modifiedHtml) return prev; // no actual change
        return {
          ...prev,
          [id]: { ...edit, originalHtml: edit.modifiedHtml, modifiedHtml: html, saved: false },
        };
      }

      // Reverted back to original — remove from edits
      if (html === edit.originalHtml) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [id]: { ...edit, modifiedHtml: html },
      };
    });
  }, []);

  const getEffectiveHtml = useCallback(
    (id: string, fallbackOriginal: string) => {
      return editsById[id]?.modifiedHtml ?? fallbackOriginal;
    },
    [editsById]
  );

  const saveBlock = useCallback(
    async (id: string): Promise<{ ok: true } | { ok: false; error: string }> => {
      const edit = editsById[id];
      if (!edit) {
        return { ok: false, error: "No changes to save" };
      }
      
      try {
        loader.start();
        const response = await fetch(`/api/block/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: edit.modifiedHtml }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return { ok: false, error: errorData.error || "Failed to save" };
        }

        // Mark as saved — block stays in editsById so getEffectiveHtml keeps
        // returning the new content, but isDirty / unsavedBlocksCount won't count it.
        setEditsById((prev) => {
          const existing = prev[id];
          if (!existing) return prev;
          return { ...prev, [id]: { ...existing, saved: true } };
        });
        setSelectedBlockId((cur) => (cur === id ? null : cur));

        return { ok: true };
      } catch (error) {
        return { ok: false, error: (error as Error).message || "Network error" };
      } finally {
        loader.done();
      }
    },
    [editsById, loader]
  );

  const saveAll = useCallback(async () => {
    const blocksToSave = Object.values(editsById).filter((e) => !e.saved);
    if (blocksToSave.length === 0) {
      return { ok: true };
    }

    try {
      loader.start();
      const response = await fetch(`/api/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blocks: blocksToSave.map(({ id, modifiedHtml }) => ({
            id,
            html: modifiedHtml,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { ok: false, error: errorData.error || "Failed to save all" };
      }

      // Mark all as saved
      setEditsById((prev) => {
        const next = { ...prev };
        for (const { id } of blocksToSave) {
          if (next[id]) next[id] = { ...next[id], saved: true };
        }
        return next;
      });
      setSelectedBlockId(null);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: (error as Error).message || "Network error" };
    } finally {
      loader.done();
    }
  }, [editsById, loader]);

  const resetBlock = useCallback((id: string) => {
    setEditsById((prev) => {
      const edit = prev[id];
      if (!edit) return prev;

      // If saved, removing from editsById reverts to server prop;
      // if unsaved, also just remove (discard the draft).
      if (edit.saved) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [id]: { ...edit, modifiedHtml: edit.originalHtml },
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    // Keep only saved overrides, discard unsaved edits
    setEditsById((prev) => {
      const next: Record<string, BlockEdit> = {};
      for (const [id, edit] of Object.entries(prev)) {
        if (edit.saved) next[id] = edit;
      }
      return next;
    });
  }, []);

  const isDirty = useCallback(
    (id: string) => {
      const edit = editsById[id];
      if (!edit) return false;
      return !edit.saved && edit.modifiedHtml !== edit.originalHtml;
    },
    [editsById]
  );

  const value = useMemo<BlockContextType>(
    () => ({
      selectedBlockId,
      editsById,
      openEdit,
      closeEdit,
      modifyBlock,
      getEffectiveHtml,
      saveBlock,
      saveAll,
      resetBlock,
      resetAll,
      isDirty,
      unsavedBlocksCount,
    }),
    [selectedBlockId, editsById, openEdit, closeEdit, modifyBlock, getEffectiveHtml, saveBlock, saveAll, resetBlock, resetAll, isDirty, unsavedBlocksCount]
  );

  return <BlockContext.Provider value={value}>{children}</BlockContext.Provider>;
};

export const useBlock = () => {
  const ctx = useContext(BlockContext);
  if (!ctx) {
    throw new Error("useBlockContext must be used within BlockProvider");
  }
  return ctx;
};