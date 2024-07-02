'use client';
import styled from "styled-components";
import Link from "next/link";
import Logo from "@/Components/Logo";

const StyledFooter = styled.footer`
    display: flex;
    background-color: var(--bg);
    color: var(--wh);
    text-transform: uppercase;
    padding: 1rem .625rem;
    justify-content: center;
    align-items: center;
    gap: .625rem;
`;

const StyledMenu = styled.menu`
    display: flex;
    gap: .625rem;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    background-color: var(--bg);
    text-transform: uppercase;
    padding: 0 .5rem 0 0;

    & a {
        color: var(--wh);
        text-decoration: none;
        transition: var(--trans);

        &:hover {
            color: var(--prim);
        }
    }
`;

const StyledP = styled.p`
    margin: 0;
`;

export const Footer = () => {
    const date = new Date();

    return (
        <StyledFooter>
            <StyledP>{date.getFullYear()} &copy; | </StyledP>
            <Logo full={1} />
            <StyledMenu>
                <Link href={"/cookies"}>
                    Cookies
                </Link>
                <Link href={"/privacy"}>
                    Gdpr
                </Link>
            </StyledMenu>
        </StyledFooter>
    );
}