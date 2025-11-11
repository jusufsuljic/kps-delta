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
    shootingStandard: "On signal draw and engage each rectangle and circle with 3 RDS.",
    startPosition: "Loaded pistol in holster. Hands not touching weapon.",
    distance: "PISTOL - 7 METERS, RIFLE - 10 METERS.",
    image: "/3x3_drill.png",
    pdf: "/Delta_3x3.pdf",
  },
  {
    id: 2,
    title: "C4",
    shootingStandard: "On signal draw and engage one circle with 1 RD under 1.50S.",
    startPosition: "Loaded pistol in holster. Hands not touching weapon.",
    distance: "PISTOL - 5 METERS, RIFLE - 10 METERS",
    image: "/c4_drill.png",
    pdf: "/Delta_C4.pdf",
  },
  {
    id: 3,
    title: "3R3",
    shootingStandard: "On signal draw and engage either circle with 3 RDS. Reload and immediately engage the other circle with 3 RDS.",
    startPosition: "Loaded pistol in holster. Hands not touching weapon.",
    distance: "PISTOL - 5 METERS, RIFLE - 10 METERS",
    image: "/3R3_drill.png",
    pdf: "/Delta_3R3.pdf",
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
              <p>SHOOTING STANDARD: {res.shootingStandard}</p>
              <p>START POSITION: {res.startPosition}</p>
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
  padding: 1rem 20rem;
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
  flex-direction: column; // stack image + content vertically
  background-color: #1a1a1a;
  border-radius: 16px;
  padding: 0; // remove padding from card itself
  overflow: hidden; // ensures rounded corners clip the image

  @media screen and (min-width: 768px) {
    flex-direction: row; // desktop: image left, content right
    padding: 1.5rem;     // card padding only applies to desktop row layout
    gap: 2rem;
    align-items: center;
  }
`

const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    min-width: 350px;
    border-radius: 10px; // optional on desktop
  }
`

const ResourceContent = styled.div`
  padding: 1.5rem; // content padding inside card
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

  @media screen and (min-width: 768px) {
    flex: 2;
    padding: 0; // on desktop, card padding handles spacing
  }
`

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #CEFF51;
  color: #000;
  font-family: var(--font-mohave);
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;

  @media screen and (max-width: 767px) {
    align-self: center;
  }
`
