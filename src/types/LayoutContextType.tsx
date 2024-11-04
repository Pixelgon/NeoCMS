export interface PageType {
    name: string;
    href: string;
}


export interface LayoutContextType {
    pages: PageType[];
    Scroll: boolean;
    setScroll: (value: boolean) => void;
}
