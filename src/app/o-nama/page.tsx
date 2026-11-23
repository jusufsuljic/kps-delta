'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import { PageContainer, PageHeading, ButtonLink } from '../components/ui/Editorial';
import teamImg from '@/../public/squad.jpg';

export default function AboutUsPage() {
  return (
    <PageContainer>
      <PageHeading><h1>ISTI TIM. ZAJEDNIČKI CILJ.</h1><p>Sport, odgovornost i zajednica. Upoznaj KPS Delta.</p></PageHeading>
      <Introduction>
        <TeamImage><Image src={teamImg} alt="Tim KPS Delta" fill priority sizes="(max-width: 767px) 100vw, 50vw" /></TeamImage>
        <Story><h2>MJESTO ZA TVOJ<br />SLJEDEĆI KORAK.</h2><p>Klub praktičnog streljaštva Delta je osnovan s ciljem promocije sportskog streljaštva i podizanja svijesti o važnosti odgovornog rukovanja oružjem.</p><p>Naš klub okuplja strijelce svih uzrasta i nivoa iskustva, od početnika do vrhunskih takmičara. Uz podršku iskusnih instruktora i trenera, članovi imaju priliku da se usmjere na poboljšanje svojih vještina i takmiče u različitim disciplinama streljaštva.</p><ButtonLink href="/prijava">POSTANI DIO DELTE <FiArrowRight aria-hidden="true" /></ButtonLink></Story>
      </Introduction>
      <Values>
        <article><h2>TRENING I RAZVOJ</h2><p>Bilo da ste početnik ili iskusan strijelac, naš tim instruktora pruža detaljne treninge prilagođene svakom nivou. Naučite osnovne tehnike ili usavršite svoje postojeće vještine uz sigurnost i stručnost.</p></article>
        <article><h2>TAKMIČENJA I DOGAĐAJI</h2><p>Organizujemo redovne klupske i regionalne događaje, kao i međunarodna takmičenja u praktičnom streljaštvu. Ovo je prilika da testirate svoje sposobnosti i upoznate druge strijelce.</p></article>
        <article><h2>OPREMA I PODRŠKA</h2><p>Članovima pružamo pristup vrhunskoj opremi i oružju, kao i stručnu podršku u vezi s odabirom i održavanjem opreme. Postajete dio zajednice koja dijeli iskustva, savjete i podršku.</p></article>
      </Values>
    </PageContainer>
  );
}

const Introduction = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  @media (max-width: 900px) { gap: 32px; }
  @media (max-width: 767px) { grid-template-columns: 1fr; }
`;
const TeamImage = styled.div`
  position: relative; height: 600px; background: var(--surface);
  img { object-fit: cover; object-position: 50% 60%; }
  @media (max-width: 767px) { height: 440px; }
`;
const Story = styled.div`
  h2 { font-size: 3rem; line-height: 1.08; margin-bottom: 24px; }
  > p { font-size: 1.1rem; line-height: 1.75; color: var(--muted); margin-bottom: 24px; }
  a { margin-top: 8px; }
  @media (max-width: 900px) { h2 { font-size: 2.5rem; } }
`;
const Values = styled.section`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; margin-top: 64px;
  article { padding-top: 24px; border-top: 1px solid var(--border); }
  h2 { font-size: 1.6rem; margin-bottom: 14px; }
  p { color: var(--muted); font-size: 1.05rem; line-height: 1.7; }
  @media (max-width: 767px) { grid-template-columns: 1fr; margin-top: 40px; gap: 28px; }
`;
