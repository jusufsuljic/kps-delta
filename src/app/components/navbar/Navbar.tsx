'use client';

import styled from "styled-components"
import Image from 'next/image'
import NavbarItem from "./NavbarItem";
import { FaUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
    return (
        <NavbarContainer>
            <Logo  src="/delta_logo.svg" width={150} height={150} alt={""}></Logo>
            <SearchAndLinksSegment>
                <CustomSearchInputContainer>
                    <CustomSearchInput placeholder="Pretraga"></CustomSearchInput>
                    <IoSearchSharp></IoSearchSharp>
                </CustomSearchInputContainer>
                <br />
                <CustomLinksContainer>
                    <a>Trening</a>
                    <a>Galerija</a>
                    <a href="prijava">Prijava</a>
                    <a>O nama</a>
                </CustomLinksContainer>

            </SearchAndLinksSegment>
            <RightPortion>
                <NavbarItem icon={<FaUser />}>Moj račun</NavbarItem>
            </RightPortion>
        </NavbarContainer>
    )
}

export default Navbar



const NavbarContainer = styled.div`
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
`

const RightPortion = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 150px; /* or any size that prevents wrapping */
  @media screen and (max-width: 767px) {
    justify-content: center;
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
`

const CustomSearchInput = styled.input`
    width: 100%;
    padding-left: 1rem;
    height: 3rem;
    border-radius: 6px;
    border: 2px solid gray;
    :focus {
        border: 3px solid #CEFF51
    }
`

const CustomLinksContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    a {
        font-size: 1rem;
        font-weight: 600;
        color: #CEFF51;
        cursor: pointer;
    }
`

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
`

const Logo = styled(Image)`
    @media screen and (max-width: 767px) {
        height: 7rem;
        width: 7rem;
    }
    
`