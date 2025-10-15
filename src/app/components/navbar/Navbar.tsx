'use client';

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [treningOpen, setTreningOpen] = useState(false);

  const toggleTrening = () => setTreningOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setTreningOpen(false);
  };

  if (isHome) {
    return (
      <NavbarContainer>
        <LogoWrapperCenter href="/">
          <Logo src="/delta_logo.svg" width={150} height={150} alt="Delta Logo - Home" />
        </LogoWrapperCenter>
      </NavbarContainer>
    );
  }

  return (
    <NavbarContainer>
      <LogoWrapper href="/">
        <Logo
          src="/delta_logo.svg"
          width={150}
          height={150}
          alt="Delta Logo - Home"
          mobile={menuOpen}
        />
      </LogoWrapper>

      <MenuWrapper>
        <MenuItem>
          <StyledLink href="/prijava" onClick={closeMenu}>
            PRIJAVA
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <DropdownToggle onClick={toggleTrening} aria-expanded={treningOpen}>
            OBUKA
            <ArrowDown open={treningOpen} />
          </DropdownToggle>
          <DropdownMenu open={treningOpen}>
            <DropdownLink href="/obuka?tab=pistol" onClick={closeMenu}>
              Delta - Pistol Level 1
            </DropdownLink>
            <DropdownLink href="/obuka?tab=lowlight" onClick={closeMenu}>
              Delta - Low light pistol Level 1
            </DropdownLink>
          </DropdownMenu>
        </MenuItem>

        <MenuItem>
          <StyledLink href="/drills" onClick={closeMenu}>
            DRILLS
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/o-nama" onClick={closeMenu}>
            O NAMA
          </StyledLink>
        </MenuItem>
      </MenuWrapper>

      <HamburgerButton
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <HamburgerIcon>
          <div />
          <div />
          <div />
        </HamburgerIcon>
      </HamburgerButton>

      {/* Mobile sliding menu */}
      <MobileMenu open={menuOpen}>
        <MobileMenuItem>
          <StyledLink href="/prijava" onClick={closeMenu}>
            PRIJAVA
          </StyledLink>
        </MobileMenuItem>
        <MobileMenuItem>
          <DropdownToggle onClick={toggleTrening} aria-expanded={treningOpen}>
            OBUKA
            <ArrowDown open={treningOpen} />
          </DropdownToggle>
          <DropdownMenu open={treningOpen}>
            <DropdownLink href="/obuka?tab=pistol" onClick={closeMenu}>
              Delta - Pistol Level 1
            </DropdownLink>
            <DropdownLink href="/obuka?tab=lowlight" onClick={closeMenu}>
              Delta - Low light pistol Level 1
            </DropdownLink>
          </DropdownMenu>
        </MobileMenuItem>
        <MobileMenuItem>
          <StyledLink href="/drills" onClick={closeMenu}>
            DRILLS
          </StyledLink>
        </MobileMenuItem>
        <MobileMenuItem>
          <StyledLink href="/o-nama" onClick={closeMenu}>
            O NAMA
          </StyledLink>
        </MobileMenuItem>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;

const linkMobilePadding = "1rem"; // reuse for consistency

// Container holds logo and menu spaced with justify-content: space-between
const NavbarContainer = styled.nav`
  padding: 1rem 12rem;
  /* max-width: 1440px; */
  margin: 0 auto;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  gap: 5rem;

  @media screen and (max-width: 767px) {
    padding: 1rem 2rem;
    justify-content: space-between;

  }
`;

// Logo container on the left
const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
`;

// For homepage logo centered
const LogoWrapperCenter = styled(LogoWrapper)`
  width: 100%;
  justify-content: center;
`;

// Logo image styling
const Logo = styled(Image)<{ mobile?: boolean }>`
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 767px) {
    width: 4.5rem !important;
    height: 4.5rem !important;
  }
`;

// Menu container on the right for desktop
const MenuWrapper = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10rem;
  list-style-type: none;

  @media screen and (max-width: 767px) {
    display: none; /* hide desktop menu on mobile */
  }
`;

const MenuItem = styled.li`
  position: relative;
  cursor: pointer;
`;

// Hamburger button visible only on mobile
const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;

  @media screen and (max-width: 767px) {
    display: block;
  }
`;

// Hamburger icon bars
const HamburgerIcon = styled.div`
  width: 25px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    width: 100%;
    height: 3px;
    background-color: #ceff51;
    border-radius: 2px;
  }
`;

// Mobile sliding menu container
const MobileMenu = styled.ul<{ open: boolean }>`
  list-style: none;
  position: fixed;
  top: 72px;
  right: 0;
  background: #000;
  width: 70%;
  max-width: 300px;
  height: calc(100vh - 72px);
  flex-direction: column;
  padding-top: 2rem;
  transition: transform 0.3s ease;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.7);
  z-index: 1000;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuItem = styled.li`
  width: 100%;
  padding-left: ${linkMobilePadding};
  margin-bottom: 1rem;
`;

// Dropdown toggle styling (used both desktop and mobile)
const DropdownToggle = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #ceff51;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #aadd22;
  }

  @media screen and (max-width: 767px) {
    padding-left: ${linkMobilePadding};
  }
`;

// Dropdown arrow icon (rotates on open)
const ArrowDown = styled.span<{ open: boolean }>`
  border: solid #ceff51;
  margin-left: 5px;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${({ open }) => (open ? "rotate(-135deg)" : "rotate(45deg)")};
  transition: transform 0.3s ease;

  @media screen and (max-width: 767px) {
    margin-right: 20px;
  }
`;

// Dropdown menu styling (desktop absolute, mobile static)
const DropdownMenu = styled.ul<{ open: boolean }>`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #000;
  border: 1px solid #ceff51;
  border-radius: 4px;
  min-width: 180px;
  padding: 0.5rem 0;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 10;

  @media screen and (max-width: 767px) {
    position: static;
    border: none;
    background: transparent;
    padding-left: calc(${linkMobilePadding} + 0.5rem);
  }
`;

// Dropdown links styling
const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: #ceff51;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #aadd22;
    color: #000;
  }

  @media screen and (max-width: 767px) {
    padding: 0.3rem 0;
  }
`;

// Normal menu links styling
const StyledLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  color: #ceff51;
  text-decoration: none;
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  @media screen and (max-width: 767px) {
    padding-left: ${linkMobilePadding};
  }

     cursor: pointer;

    /* This creates the underline effect */
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #CEFF51;
        transform: scaleX(0); /* Initially hidden */
        transform-origin: bottom right;
        transition: transform 0.3s ease-out;
    }

    /* On hover, the underline scales into view */
    &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
`;
