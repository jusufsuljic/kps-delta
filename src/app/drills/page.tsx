'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { FiDownload, FiArrowUpRight } from 'react-icons/fi';
import { PageContainer, PageHeading, buttonStyles } from '../components/ui/Editorial';
import { leaderboardUrl } from '../lib/trainings';

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
    shootingStandard: "On signal draw and engage one circle with 1 RD under 1.50 S.",
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
  {
    id: 4,
    title: "Double5",
    shootingStandard: "On signal draw and engage circle with 5 RDS under 5 S.",
    startPosition: "Loaded pistol in holster. Hands not touching weapon.",
    distance: "PISTOL - 10 METERS, RIFLE - 20 METERS",
    image: "/Double5Drill.png",
    pdf: "/Double5Drill.pdf",
  },
]


export default function DrillsPage() {
  return (
    <PageContainer>
      <PageHeading>
        <h1>DELTA DRILLS</h1>
        <p>Jasan cilj za svaki trening. Pregledaj vježbe i preuzmi mete u PDF formatu. Rezultate prati na <a href={leaderboardUrl}>leaderboardu <FiArrowUpRight aria-hidden="true" /></a></p>
      </PageHeading>
      <ResourceGrid>
        {drills.map((res) => (
          <ResourceCard key={res.id}>
            <ImageWrapper><Image src={res.image} alt={`Delta ${res.title} — prikaz mete`} width={2800} height={2100} sizes="(max-width: 767px) 100vw, 50vw" /></ImageWrapper>
            <ResourceContent>
              <h2>{res.title}</h2>
              <dl>
                <div><dt>Shooting standard</dt><dd>{res.shootingStandard}</dd></div>
                <div><dt>Start position</dt><dd>{res.startPosition}</dd></div>
                <div><dt>Distance</dt><dd>{res.distance}</dd></div>
              </dl>
              <DownloadButton href={res.pdf} download aria-label={`Preuzmi ${res.title} PDF`}>PREUZMI PDF <FiDownload aria-hidden="true" /></DownloadButton>
            </ResourceContent>
          </ResourceCard>
        ))}
      </ResourceGrid>
    </PageContainer>
  );
}

const ResourceGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px;
  @media (max-width: 767px) { grid-template-columns: 1fr; gap: 24px; }
`;
const ResourceCard = styled.article`
  background: var(--surface); display: flex; flex-direction: column; min-width: 0;
`;
const ImageWrapper = styled.div`
  background: #f3f3ef; aspect-ratio: 4/3; overflow: hidden;
  img { display: block; width: 100%; height: auto; }
`;
const ResourceContent = styled.div`
  padding: 28px; display: flex; flex-direction: column; flex: 1;
  h2 { font-size: 2.8rem; line-height: 1; }
  dl { margin-block: 20px 28px; }
  dl > div { display: grid; grid-template-columns: 160px 1fr; gap: 16px; padding-block: 12px; border-top: 1px solid var(--border); }
  dt { color: var(--muted); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; padding-top: 3px; }
  dd { font-size: 1.1rem; line-height: 1.5; color: #d8dbd2; }
  @media (max-width: 1000px) { dl > div { grid-template-columns: 1fr; gap: 4px; } }
  @media (max-width: 767px) { padding: 22px; }
`;
const DownloadButton = styled.a`
  ${buttonStyles}
  margin-top: auto; background: transparent; color: var(--accent); justify-content: space-between;
  &:hover { color: #101110; }
`;
