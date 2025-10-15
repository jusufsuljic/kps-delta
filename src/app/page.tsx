'use client'

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import drillsimg from '@/../public/drills_img.jpeg'
import onamaimg from '@/../public/onamaimg.jpg'
import obukaImg from '@/../public/obukaimg.jpg'
import registerImg from '@/../public/registerimg.png'
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <HomePageContainer>
      <MenuSelector>
        <MenuSelectorItem onClick={() => router.push("/prijava")}>
          <ImageWrapper>
            <FloatingContainer delay="0s">
              <StyledImage src={registerImg} fill alt="UČLANI SE" />
            </FloatingContainer>
            <Overlay />
          </ImageWrapper>
          <StyledText>UČLANI SE</StyledText>
        </MenuSelectorItem>


        <MenuSelectorItem onClick={() => router.push("/obuka")}>
          <ImageWrapper>
            <FloatingContainer delay="0.2s">
              <StyledImage src={obukaImg} fill alt="OBUKA" />
            </FloatingContainer>
            <Overlay />
          </ImageWrapper>
          <StyledText>OBUKA</StyledText>
        </MenuSelectorItem>

        <MenuSelectorItem onClick={() => router.push("/drills")}>
          <ImageWrapper>
            <FloatingContainer delay="0.3s">
              <StyledImage src={drillsimg} fill alt="DRILLS" />
            </FloatingContainer>
            <Overlay />
          </ImageWrapper>
          <StyledText>DRILLS</StyledText>
        </MenuSelectorItem>
        <MenuSelectorItem onClick={() => router.push("/o-nama")}>
          <ImageWrapper>
            <FloatingContainer delay="0.4s">
              <StyledImage src={onamaimg} fill alt="O NAMA" />
            </FloatingContainer>
            <Overlay />
          </ImageWrapper>
          <StyledText>O NAMA</StyledText>
        </MenuSelectorItem>

      </MenuSelector>
    </HomePageContainer>
  );
}


const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 20rem;
  @media screen and (max-width: 767px) {
    padding: 0;
  }

  @media screen and (min-width: 1440px) {
    padding: 0;
  }
`;

const MenuSelector = styled.div`
  height: 66rem;
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }

  @media screen and (min-width: 1300px) {
    height: 32rem;
    width: 70rem;
  }

  @media screen and (min-height: 1200px) {
    height: 66rem;
    width: 80rem;
  }
`;

const floatAnim = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const StyledText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  color: white;
  z-index: 2;
  transition: all 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(53, 65, 22, 0.3); /* subtle tint */
  transition: opacity 0.3s ease;
`;

const MenuSelectorItem = styled.div`
  position: relative;
  width: 20rem;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  &:hover ${Overlay} {
    opacity: 0;
  }

  &:hover ${StyledText} {
    color: #CEFF51;
    background-color: black;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
  }

  @media screen and (max-width: 767px) {
    width: auto;
  }

  /* Laptops (typical MacBook, ~1024–1366 CSS px) */
  @media (min-width: 1024px) and (max-width: 1366px) {
    width: 15rem;
  }

  /* Large desktops / monitors */
  @media (min-width: 1370px) {
    width: 20rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; /* clips floating inner container */
`;


const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


const FloatingContainer = styled.div<{ delay?: string }>`
  width: 110%;         /* slightly zoomed */
  height: 110%;
  position: absolute;
  top: -5%;
  left: -5%;
  animation: ${floatAnim} 4s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
`;





