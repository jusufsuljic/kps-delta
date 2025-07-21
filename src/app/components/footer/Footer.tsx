'use client'

import Image from "next/image"
import styled from "styled-components"
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import bosniaImg from "@/../public/bosnia.svg"

const Footer = () => {
    return (
        <FooterContainer>
            <TopContainer>
                <span><a href="https://www.idpa.com/" target="_blank">IDPA</a></span>
                <span>PODRŽANI PIŠTOLJI</span>
                <span>PRAVILA O PRIVATNOSTI</span>
                <span>KONTAKT</span>
            </TopContainer>
            <MidContainer>
                <div>
                    <FaInstagram></FaInstagram>
                    <FaWhatsapp></FaWhatsapp>
                    <FaFacebook></FaFacebook>
                </div>
                <span>
                    Gdje brzina i preciznost postaju instinkt.
                </span>
                <MadeInBosniaContainer>
                    <Image src={bosniaImg} height={60} width={60} alt={""} color="red"></Image>
                    <span>MADE IN</span>
                    <span>B&H</span>
                </MadeInBosniaContainer>
            </MidContainer>

            <BottomContainer>
                <span>Email: kpsdelta@gmail.com <br></br></span>
                <span>+387 62 407 368<br></br></span>
                <span>KPS Delta © 2025<br></br></span>
                <span>71000 SARAJEVO<br></br></span>
            </BottomContainer>
        </FooterContainer >
    )
}

export default Footer


const FooterContainer = styled.div`
    padding: 2rem 12rem;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #000000;
    background-color: var(--headerfooter);
    @media screen and (min-width: 767px) {
        height: 20rem;
    }

    @media screen and (max-width: 767px) {
        padding: 1rem 1rem;
    }
`

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: #b1b1b1;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 3rem;

    span {
        cursor: pointer;
    }

    @media screen and (max-width: 767px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
`

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    span {
        color: #444444;
    }

    @media screen and (max-width: 767px) {
        flex-direction: column;
        gap: 1rem;
    }
    
`

const MidContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    color: #666666;
    font-weight: 600;
    span {
        font-size: 0.9rem;
    }

    svg {
        margin-right: 7px;
        height: 2em;
        width: 2em;
        color: #CEFF51;
        cursor: pointer;
    }

    @media screen and (max-width: 767px) {
        flex-direction: column;
        gap: 1rem;
    }
`

const MadeInBosniaContainer = styled.div`
    padding: 10px;
    border: 1px solid #CEFF51;
    justify-content: center;
    align-items: center;
    color: #CEFF51;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 767px) {
        margin-bottom: 1rem;
    }
`