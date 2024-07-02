'use client';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from "@/Components/Logo";
import {NavItem} from "@/Components/Navbar/navitem";
import {usePathname} from "next/navigation";


const StyledNav = styled.nav`
    display: flex;
    gap: .625rem;
    justify-content: center;
    align-items: center;
    padding: .625rem;
    background: var(--navbar);
    backdrop-filter: blur(20px);
    position: fixed;
    width: calc(100% - 1.25rem);
    z-index: 100;
    top: 0;
    left: 0;
`

const StyledMenu = styled.menu`
    display: flex;
    gap: .625rem;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
`

const pages = [
    { name: "Domů", href: "/" },
    { name: "O nás", href: "/about" },
    { name: "Projekty", href: "/projects" },
    { name: "Grafika", href: "/graphics" },
];


export const Navbar = () => {
    const pathName = usePathname();

    return (
        <StyledNav>
            <Link href="/">
                <Logo />
            </Link>
            <StyledMenu>
                {pages.map((page, index) => (
                    <NavItem key={index} href={page.href} text={page.name} active={+(page.href == pathName)}/>
                ))}
            </StyledMenu>
        </StyledNav>
    );
}