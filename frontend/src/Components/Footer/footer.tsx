import Link from "next/link";
import Logo from "@/Components/Logo";

export const Footer = () => {
    const date = new Date();

    return (
        <footer className="bg-bg text-wh p-4 ">
            <div className="max-w-7xl flex justify-between mx-auto items-center flex-wrap gap-2">
                <div>
                    <Link href="/">
                        <Logo full width={137} height={21}/>
                    </Link>
                    <p className="m-0 font-light text-xs mt-2">&copy;&nbsp;{date.getFullYear()}&nbsp;| Matěj Matějka | IČO: 21164720</p>
                </div>
                
                <menu className="flex justify-center items-center list-none gap-2 m-0 bg-bg font-light text-xs">
                    <Link href="/cookies" className="text-wh transition-color hover:text-prim">
                            Nastavení cookies
                    </Link>
                    <Link href="/gdpr" className="text-wh transition-color hover:text-prim">
                        Ochrana osobních údajů
                    </Link>
                </menu>    
            </div>
        </footer>
    );
}

export default Footer;