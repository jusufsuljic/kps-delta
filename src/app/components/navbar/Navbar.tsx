'use client';

import styled from "styled-components";
import Image from 'next/image';
import Link from 'next/link'; // Import the Next.js Link component
// import NavbarItem from "./NavbarItem"; // Not used
// import { FaUser } from "react-icons/fa"; // Not used
// import { IoSearchSharp } from "react-icons/io5"; // Not used

const Navbar = () => {
    return (
        <NavbarContainer>
            {/* --- CHANGE: Logo is now wrapped in a Link to redirect to homepage --- */}
            <Link href="/">
                <Logo src="/delta_logo.svg" width={150} height={150} alt="Delta Logo - Home"></Logo>
            </Link>

            <SearchAndLinksSegment>
                {/* <CustomSearchInputContainer>
                    <CustomSearchInput placeholder="Pretraga"></CustomSearchInput>
                    <IoSearchSharp></IoSearchSharp>
                </CustomSearchInputContainer>
                <br /> */}
                <CustomLinksContainer>
                    {/* --- CHANGE: Using StyledLink for optimized navigation and hover effects --- */}
                    <StyledLink href="/trening">TRENING</StyledLink>
                    <StyledLink href="/galerija">GALERIJA</StyledLink>
                    <StyledLink href="/prijava">PRIJAVA</StyledLink>
                    <StyledLink href="/o-nama">O NAMA</StyledLink>
                </CustomLinksContainer>

            </SearchAndLinksSegment>
            {/* <RightPortion>
                <NavbarItem icon={<FaUser />}>Moj račun</NavbarItem>
            </RightPortion> */}
        </NavbarContainer>
    )
}

export default Navbar;


// --- Styled Components ---

const NavbarContainer = styled.nav` // Changed from div to nav for semantic HTML
    padding: 1rem 11rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background: #000000;
    @media screen and (max-width: 767px) {
        flex-direction: column;
        padding: 1rem 1rem;
    }

    img {
        cursor: pointer;
    }
`;

const SearchAndLinksSegment = styled.div`
    flex: 1;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 767px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const CustomLinksContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

// --- NEW: A styled Link component for navigation items ---
// This encapsulates all the styling, including font size and hover animations.
const StyledLink = styled(Link)`
    font-size: 1.2rem; /* Increased font size */
    font-weight: 700; /* Made font a bit bolder */
    color: #CEFF51;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;

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

const Logo = styled(Image)`
    transition: transform 0.3s ease;
    @media screen and (max-width: 767px) {
        height: 7rem;
        width: 7rem;
        margin-bottom: 1rem;
    }
    
    /* Slight zoom effect on hover for the logo */
    &:hover {
      transform: scale(1.05);
    }
`;

// The rest of your styled components (if needed in the future)
const RightPortion = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 150px;
  @media screen and (max-width: 767px) {
    justify-content: center;
    }
`;

const CustomSearchInput = styled.input`
    width: 100%;
    padding-left: 1rem;
    height: 3rem;
    border-radius: 6px;
    border: 2px solid gray;
    :focus {
        border: 3px solid #CEFF51
    }
`;

const CustomSearchInputContainer = styled.div`
    width: 90%;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    svg {
        width: 1.5em;
        height: 1.5em;
        flex-shrink: 0;
        color: #ffffff;
        cursor: pointer;
    }
`;