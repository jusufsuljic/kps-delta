// components/IconTextButton.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

interface NavbarItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
}

// the styled button: flex layout, no border, transparent background
const NavbarItemButton = styled.button`
  font-family: var(--font-mohave), sans-serif;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  gap: 0.5rem;           /* space between icon & text */
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;  /* adjust as needed */
  cursor: pointer;
  color: white;
  
  /* optional hover/focus styles */
  &:hover,
  &:focus {
    opacity: 0.8;
    outline: none;
  }
  
  /* ensure SVG icons size correctly */
  svg {
    width: 2em;
    height: 2em;
    flex-shrink: 0;
    color: #ffffff;
  }

  @media screen and (max-width: 767px) {
    svg {
      flex-shrink: 0;
    }

    /* div {
      display: none;
    } */
  }

`;

const NavbarItem: React.FC<NavbarItemButtonProps> = ({
  icon,
  children,
  ...rest
}) => (
  <NavbarItemButton {...rest}>
    {icon}
    <div>{children}</div>
  </NavbarItemButton>
);

export default NavbarItem;

