import styled from "styled-components";
import {FC} from "react";
import {string} from "prop-types";
import Link from "next/link";


interface NavlinkProps {
    href: string;
    text: string;
    active: number
}

const StyledLink = styled(Link)<StyledLinkProps>`
    text-transform: uppercase;
    color: ${props => props.active ? "var(--prim)" : "var(--wh)"};
    text-decoration: none;
    transition: var(--trans);
    
    &:hover {
        color: var(--prim);
    }
`;

interface StyledLinkProps { active: number; }


export const NavItem: FC<NavlinkProps> = ({href, text, active}) => {
    return (
        <>
            <li>
                <StyledLink href={href} active={active}>
                    {text}
                </StyledLink>
            </li>
        </>
    );
}