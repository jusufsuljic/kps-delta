'use client';

import { useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import { PageContainer, PageHeading, buttonStyles } from '../components/ui/Editorial';
import trainingImg from '@/../public/obukaimg.jpg';

const trainings = [
  {
    id: "pistol",
    label: "Delta - Pistol Level 1",
    content: (
      <>
        <p>
          Trening je namijenjen osobama koje nemaju prethodno iskustvo s
          vatrenim oružjem ili su do sada imali minimalan kontakt s njim.
        </p>
        <p>
          Obuka uključuje praktične vježbe rukovanja pištoljem, pravilnog stava,
          osnovne tehnike gađanja, te sigurne manipulacije oružjem u
          kontrolisanim uslovima.
        </p>
        <p>
          Broj učesnika je ograničen na maksimalno 5, kako bismo svakom
          polazniku mogli posvetiti dovoljno pažnje i osigurati kvalitetan i
          siguran trening.
        </p>

        <p><strong>Šta je potrebno?</strong></p>
        <ul>
          <li>
            Odjeća prilagođena vremenskim uslovima (trening se održava bez
            obzira na vremenske prilike)
          </li>
          <li>Sva potrebna oprema će Vam biti obezbijeđena</li>
        </ul>

        <p>Lokacija: Sportsko strelište Žuč</p>
        <p>Datum: 24.10.2026. (Subota)</p>
        <p>Trajanje: 60 Minuta</p>
      </>
    ),
    url: "",
  },
  {
    id: "lowlight",
    label: "Delta - Low light pistol Level 1",
    content: (
      <>
        <p>
          Trening uključuje praktične vježbe korištenja svjetla, kretanja i
          gađanja u noćnim uslovima.
        </p>
        <p>
          Broj učesnika je ograničen na maksimalno 10, kako bismo osigurali
          kvalitetnu i sigurnu obuku za svakog polaznika.
        </p>
        <p><strong>Šta je potrebno?</strong></p>
        <ul>
          <li>
            Pištolj i odgovarajuća futrola (nije dozvoljena upotreba kožnih ili
            najlonskih futrola)
          </li>
          <li>Zaštita za oči i uši (poželjna elektronska zaštita sluha)</li>
          <li>Najmanje 2 okvira (magazina), futrola za okvire</li>
          <li>110 metaka (moguće kupiti i kod nas)</li>
          <li>Ručna lampa (baterijska) sa svježim baterijama</li>
          <li>
            Ako koristite pištolj sa montiranom lampom, onda nosite samo to.
          </li>
          <li>Čeona lampa obavezna (sigurnosna pravila)</li>
          <li>
            Odjeća prilagođena vremenskim uslovima (trening se održava bez
            obzira na vremenske prilike)
          </li>
        </ul>

        <p>Lokacija: Sportsko strelište Žuč</p>
        <p>Trajanje: 17:00 - 20:00</p>
        <p>Cijena kotizacije 80 KM</p>
      </>
    ),
    url: "",
  },
];



export default function ObukaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const activeTab = trainings.some(t => t.id === requestedTab) ? requestedTab! : 'pistol';
  const training = trainings.find(t => t.id === activeTab)!;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectTab = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', id);
    router.replace(`/obuka?${params.toString()}`, { scroll: false });
  };

  return (
    <PageContainer>
      <PageHeading><h1>OBUKA SA CILJEM.</h1><p>Odaberi program i pronađi sve informacije o obuci, opremi i prijavi.</p></PageHeading>
      <TrainingLayout>
        <TrainingVisual><Image src={trainingImg} alt="Praktični trening na strelištu" fill priority sizes="(max-width: 900px) 100vw, 40vw" /><VisualCaption><strong>ZNANJE SE GRADI.<br />TRENING PO TRENING.</strong></VisualCaption></TrainingVisual>
        <TrainingDetails>
          <Tabs role="tablist" aria-label="Program obuke">
            {trainings.map(({ id }, index) => <TabButton key={id} ref={el => { tabRefs.current[index] = el; }} id={`tab-${id}`} $active={activeTab === id} role="tab" aria-selected={activeTab === id} aria-controls={`panel-${id}`} tabIndex={activeTab === id ? 0 : -1} onClick={() => selectTab(id)} onKeyDown={event => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % trainings.length;
              else if (event.key === 'ArrowLeft') next = (index - 1 + trainings.length) % trainings.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = trainings.length - 1;
              else return;
              event.preventDefault(); selectTab(trainings[next].id); tabRefs.current[next]?.focus();
            }}>{id === 'pistol' ? 'PISTOL LEVEL 1' : 'LOW LIGHT PISTOL'}</TabButton>)}
          </Tabs>
          <TabContent id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
            <h2>{training.label}</h2>
            {training.content}
            <CustomButton onClick={() => router.push(activeTab === 'pistol' ? '/prijava/pistol1' : '/prijava/lowlight')} disabled={activeTab === 'lowlight'}>{activeTab === 'lowlight' ? 'COMING SOON' : <>PRIJAVI SE <FiArrowRight aria-hidden="true" /></>}</CustomButton>
          </TabContent>
        </TrainingDetails>
      </TrainingLayout>
    </PageContainer>
  );
}

const TrainingLayout = styled.div`
  display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 56px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 32px; }
`;
const TrainingVisual = styled.div`
  position: relative; min-height: 640px; background: var(--surface);
  img { object-fit: cover; }
  &::after { content: ''; position: absolute; inset: 50% 0 0; background: linear-gradient(transparent, #000b); }
  @media (max-width: 900px) { min-height: 320px; img { object-position: 50% 42%; } }
`;
const VisualCaption = styled.div`
  position: absolute; bottom: 32px; left: 32px; z-index: 1;
  strong { font-size: 2.2rem; line-height: 1.1; }
`;
const TrainingDetails = styled.div`min-width: 0;`;
const Tabs = styled.div`
  display: flex; border-bottom: 1px solid var(--border); margin-bottom: 32px;
`;
const TabButton = styled.button<{ $active: boolean }>`
  flex: 1; padding: 16px 10px; min-height: 54px; background: transparent; border: 0;
  border-bottom: 2px solid ${({ $active }) => $active ? 'var(--accent)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--accent)' : 'var(--muted)'};
  font-size: 0.9rem; font-weight: 600; letter-spacing: 0.06em; cursor: pointer;
  &:hover { color: var(--accent); }
`;
const TabContent = styled.div`
  font-size: 1.05rem; line-height: 1.65; color: #c4c8be;
  h2 { font-size: 2.1rem; line-height: 1.15; color: var(--foreground); margin-bottom: 24px; }
  p { margin-bottom: 18px; }
  ul { padding-left: 20px; margin-bottom: 24px; }
  li { margin-bottom: 8px; }
  strong { color: var(--foreground); }
`;
const CustomButton = styled.button`${buttonStyles} width: 100%; justify-content: space-between; margin-top: 8px;`;
