'use client'

import Image from "next/image"
import styled from "styled-components"
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import bosniaImg from "@/../public/bosnia.svg"

const Footer = () => {
    return (
        <FooterContainer>
            <TopContainer>
                <a target="_blank" href="https://www.freeprivacypolicy.com/live/41743ff7-e72b-4a49-a56d-2b4d9e7bc7f8"><span>PRAVILA O PRIVATNOSTI</span></a>
                <a href="/kontakt"><span>KONTAKT</span></a>
            </TopContainer>
            <MidContainer>
                <Socials>
                    <a target="_blank" href="https://www.instagram.com/kps.delta?igsh=MTNtZHNyNTM5emN3cQ=="><FaInstagram></FaInstagram></a>
                    <a target="_blank" href="https://wa.me/38761032285"><FaWhatsapp></FaWhatsapp></a>
                    <a target="_blank" href="https://www.facebook.com/share/1CG9kJuaCs/?mibextid=wwXIfr"><FaFacebook></FaFacebook></a>
                    <a target="_blank" href="https://youtube.com/@teamdeltahq?si=wn4dEFY6wSrowfZQ"><FaYoutubeSquare></FaYoutubeSquare> </a>
                </Socials>
                <Slogan>
                    <span></span>
                    <p>AIM AND HIT.</p>
                    <p>SIMPLE AS THAT.</p>
                </Slogan>
                <MadeInBosniaContainer>
                    <Image src={bosniaImg} height={60} width={60} alt={""} color="red"></Image>
                    <span>MADE IN</span>
                    <span>B&H</span>
                </MadeInBosniaContainer>
            </MidContainer>
            <BottomContainer>
                <ContactDetails>
                    <span><a href="mailto:kpsdelta@hotmail.com">kpsdelta@hotmail.com <br></br></a></span>
                    <span><a href="tel:+38761032285">+387 61 032 285<br></br></a></span>
                    <span>KPS Delta © 2025<br></br></span>
                    <span>71000 SARAJEVO<br></br></span>
                </ContactDetails>
            </BottomContainer>
        </FooterContainer >
    )
}

export default Footer

const Socials = styled.div`
    display: flex;
    gap: 4px;
    width: 100px;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`

const ContactDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    @media screen and (max-width: 767px) {
        padding: 1rem 1rem;
        margin: 0;
    }
`


const Slogan = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 2rem;
    color: white; /* text color */
    font-size: 1.2rem;

    /* Corner lines */
    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 20px; /* horizontal length of corners */
        height: 20px; /* vertical length of corners */
        border-color: limegreen; /* green accent */
    }

    /* Top-left + bottom-right */
    &::before {
        top: 0;
        left: 0;
        border-top: 3px solid limegreen;
        border-left: 3px solid limegreen;
    }

    /* Top-right + bottom-left */
    &::after {
        bottom: 0;
        right: 0;
        border-bottom: 3px solid limegreen;
        border-right: 3px solid limegreen;
    }

    /* Another pair of corners using extra elements */
    & span::before,
    & span::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        border-color: limegreen;
    }

    /* Top-right corner */
    & span::before {
        top: 0;
        right: 0;
        border-top: 3px solid limegreen;
        border-right: 3px solid limegreen;
    }

    /* Bottom-left corner */
    & span::after {
        bottom: 0;
        left: 0;
        border-bottom: 3px solid limegreen;
        border-left: 3px solid limegreen;
    }
`


const FooterContainer = styled.div`
    background-color: black;
    padding: 2rem 12rem;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #000000;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;

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