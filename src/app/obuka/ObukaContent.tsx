'use client';

import { useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import { PageContainer, PageHeading, buttonStyles } from '../components/ui/Editorial';
import trainingImg from '@/../public/obukaimg.jpg';
import { trainings } from '../lib/trainings';

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
        <TrainingVisual><Image src={trainingImg} alt="Praktični trening na strelištu" fill priority sizes="(max-width: 900px) 100vw, 40vw" /></TrainingVisual>
        <TrainingDetails>
          <Tabs role="tablist" aria-label="Program obuke">
            {trainings.map(({ id, tabLabel }, index) => <TabButton key={id} ref={el => { tabRefs.current[index] = el; }} id={`tab-${id}`} $active={activeTab === id} role="tab" aria-selected={activeTab === id} aria-controls={`panel-${id}`} tabIndex={activeTab === id ? 0 : -1} onClick={() => selectTab(id)} onKeyDown={event => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % trainings.length;
              else if (event.key === 'ArrowLeft') next = (index - 1 + trainings.length) % trainings.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = trainings.length - 1;
              else return;
              event.preventDefault(); selectTab(trainings[next].id); tabRefs.current[next]?.focus();
            }}>{tabLabel}</TabButton>)}
          </Tabs>
          <TabContent id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
            <h2>{training.label}</h2>
            <Specs>
              {training.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
            </Specs>
            {training.description.map((para, i) => <p key={i}>{para}</p>)}
            <h3>Šta je potrebno?</h3>
            <ul>{training.requirements.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <CustomButton onClick={() => router.push(training.signupHref)} disabled={!training.open}>{!training.open ? 'COMING SOON' : <>PRIJAVI SE <FiArrowRight aria-hidden="true" /></>}</CustomButton>
          </TabContent>
        </TrainingDetails>
      </TrainingLayout>
    </PageContainer>
  );
}

const TrainingLayout = styled.div`
  display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: 64px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 32px; }
`;
const TrainingVisual = styled.div`
  position: sticky; top: calc(var(--header-h) + 24px); aspect-ratio: 4 / 5; background: var(--surface);
  img { object-fit: cover; }
  @media (max-width: 900px) { position: relative; top: 0; aspect-ratio: 16 / 10; img { object-position: 50% 42%; } }
`;
const TrainingDetails = styled.div`min-width: 0;`;
const Tabs = styled.div`
  display: flex; gap: 32px; border-bottom: 1px solid var(--border); margin-bottom: 36px;
`;
const TabButton = styled.button<{ $active: boolean }>`
  padding: 14px 0; min-height: 54px; margin-bottom: -1px; background: transparent; border: 0; cursor: pointer;
  border-bottom: 3px solid ${({ $active }) => $active ? 'var(--accent)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--foreground)' : 'var(--muted)'};
  font-size: 1.2rem; font-weight: 600; letter-spacing: 0.05em;
  &:hover { color: var(--foreground); }
`;
const TabContent = styled.div`
  font-size: 1.15rem; line-height: 1.65; color: #c4c8be;
  h2 { font-size: clamp(2.2rem, 3.6vw, 3rem); line-height: 1; color: var(--foreground); margin-bottom: 28px; text-transform: uppercase; }
  h3 { font-size: 1.5rem; color: var(--foreground); margin: 32px 0 12px; }
  > p { margin-bottom: 16px; }
  ul { list-style: none; margin-bottom: 36px; }
  li { position: relative; padding: 8px 0 8px 24px; border-bottom: 1px solid var(--border); }
  li::before { content: ''; position: absolute; left: 0; top: 1.15em; width: 10px; height: 2px; background: var(--accent); }
`;
const Specs = styled.dl`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin-bottom: 32px;
  background: var(--border); border: 1px solid var(--border);
  > div { padding: 16px 18px; background: var(--background); }
  dt { font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  dd { font-size: 1.35rem; font-weight: 600; color: var(--foreground); line-height: 1.25; margin-top: 2px; }
`;
const CustomButton = styled.button`${buttonStyles} width: 100%; justify-content: space-between; min-height: 56px; font-size: 1.1rem;`;
