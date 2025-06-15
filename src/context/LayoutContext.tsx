'use client';
import { motion, AnimatePresence } from "motion/react";
import { FC, PropsWithChildren, useState, useEffect, useCallback, useMemo, createContext } from "react";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";

type ToastType = { message: string; type?: "success" | "error" };

type LayoutContextType = {
  Scroll: boolean;
  toggleScroll: () => void;
  showToast: (toast: ToastType) => void;
};

export const LayoutContext = createContext<LayoutContextType>({
  Scroll: true,
  toggleScroll: () => {},
  showToast: () => {},
});

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [Scroll, setScroll] = useState(true);
  const [toast, setToast] = useState<ToastType | null>(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !Scroll);
  }, [Scroll]);

  const toggleScroll = useCallback(() => {
    setScroll((prev) => !prev);
  }, []);

  const showToast = useCallback((toast: ToastType) => {
    setToast(toast);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const contextValue = useMemo(() => ({
    Scroll,
    toggleScroll,
    showToast,
  }), [Scroll, toggleScroll, showToast]);

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
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            onClick={() => setToast(null)}
            transition={{ ease: "easeInOut", duration: .5, delay: .5 }}
            className={`fixed bottom-12 left-1/2 p-4 rounded-3xl backdrop-blur-lg shadow-md z-50 text-wh flex items-center cursor-pointer bg-modal`}
          >
            <Image src={`/images/icons/${toast.type === 'success' ? 'check' : 'error'}.svg`} alt="" width={28} height={28} className="mr-2" />
            <div className={`${ toast.type == 'success' ? "bg-pxlgn-gradient" : "bg-err-gradient"}  text-transparent bg-clip-text text-xl font-quicksand uppercase select-none break-all`}>
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutContext.Provider>
  );
};