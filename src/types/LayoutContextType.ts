export interface LayoutContextType {
    Scroll: boolean;
    toggleScroll: () => void;

    showToast?: (message: string, type?: 'success' | 'error') => void;
}
