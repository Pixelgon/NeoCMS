export interface PageType {
    name: string;
    href: string;
    meta?: {
        title: string;
        description: string;
    };
}


export interface LayoutContextType {
    pages: PageType[];
    Scroll: boolean;
    toggleScroll: () => void;
}
