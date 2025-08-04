'use client';
import { AnimatePresence } from "framer-motion";
import { FC, PropsWithChildren, useState, useEffect, useCallback, useMemo, createContext } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toast } from "@/components/layout/Toast";


export const LayoutContext = createContext<LayoutContextType>({
  Scroll: true,
  setScroll: (scroll: boolean) => {},
  showToast: () => {},
});

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [Scroll, setScroll] = useState(true);
  const [toast, setToast] = useState<ToastType | null>(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !Scroll);
  }, [Scroll]);

  const handleSetScroll = useCallback((scroll: boolean) => {
    setScroll(scroll);
  }, []);

  const showToast = useCallback((toast: ToastType) => {
    setToast(toast);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const contextValue = useMemo(() => ({
    Scroll,
    setScroll: handleSetScroll,
    showToast,
  }), [Scroll, handleSetScroll, showToast]);

  return (
    <LayoutContext.Provider value={contextValue}>
      <NextTopLoader
          color="linear-gradient(90deg, #00CCFF 0%, #1CD2E6 57%, #58DEB1 80%, #91E97E 100%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
          shadow={false}
      />
      {children}
      <AnimatePresence>
        {toast && (
          <Toast
            setToast={setToast}
            toast={toast}
          />
        )}
      </AnimatePresence>
    </LayoutContext.Provider>
  );
};