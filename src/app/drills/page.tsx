'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

function capitalizeFirstLetter(str: string) {
  if (typeof str !== 'string' || str.length === 0) {
    return ''; // Handle empty or non-string inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Example JSON data (you can move this to a separate file if needed)
const drills = [
  {
    id: 1,
    title: "3x3x3",
    shootingStandard: "ON SIGNAL DRAW AND ENGAGE EACH RECTANGLE AND CIRCLE WITH 3 RDS.",
    startPosition: "LOADED PISTOL IN HOLSTER. HANDS NOT TOUCHING WEAPON.",
    distance: "PISTOL - 7 METERS, RIFLE - 10 METERS.",
    image: "/3x3_drill.png",
    pdf: "/Delta_3x3.pdf",
  },
  {
    id: 2,
    title: "4C",
    shootingStandard: "ON SIGNAL DRAW AND ENGAGE ONE CIRCLE WITH 1 RD UNDER 1.50S.",
    startPosition: "LOADED PISTOL IN HOLSTER. HANDS NOT TOUCHING WEAPON.",
    distance: "PISTOL - 5 METERS, RIFLE - 10 METERS",
    image: "/c4_drill.png",
    pdf: "/Delta_C4.pdf",
  },
]

export default function IDPAPage() {
  return (
    <DrillsPageContainer>
      <PageHeader>
        <h1>DELTA DRILLS</h1>
      </PageHeader>

      <ResourceGrid>
        {drills.map((res) => (
          <ResourceCard key={res.id}>
            <ImageWrapper>
              <Image
                src={res.image}
                alt={res.title}
                width={400}
                height={400}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            </ImageWrapper>

            <ResourceContent>
              <h2>{res.title}</h2>
              <p>SHOOTING STANDARD: {capitalizeFirstLetter(res.shootingStandard)}</p>
              <p>START POSITION: {capitalizeFirstLetter(res.startPosition)}</p>
              <p>DISTANCE: {capitalizeFirstLetter(res.distance)}</p>
              <DownloadButton href={res.pdf} download>
                PREUZMI PDF
              </DownloadButton>
            </ResourceContent>
          </ResourceCard>
        ))}
      </ResourceGrid>
    </DrillsPageContainer>
  )
}

// --- Styled Components ---
const DrillsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 20rem;
  font-size: 1rem;
  gap: 2rem;
  @media screen and (max-width: 1200px) {
    padding: 2rem 8rem;
  }
  @media screen and (max-width: 767px) {
    padding: 2rem;
  }
`

const PageHeader = styled.div`
  h1 {
    font-family: var(--font-mohave);
    color: #ffffff;
  }
`

const ResourceGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

const ResourceCard = styled.div`
  display: flex;
  gap: 2rem;
  background-color: #1a1a1a;
  border-radius: 16px;
  padding: 1.5rem;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    gap: 1.25rem;
  }
`

const ImageWrapper = styled.div`
  flex: 1;
  min-width: 350px;
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`

const ResourceContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-family: var(--font-mohave);
    color: #ceff51;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: #ddd;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }
`

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #ceff51;
  color: #000;
  font-family: var(--font-mohave);
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dfff71;
  }

  @media screen and (max-width: 767px) {
    align-self: center;
  }
`
