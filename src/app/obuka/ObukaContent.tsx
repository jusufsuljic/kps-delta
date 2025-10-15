'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // Keep this here
import { useRouter, useSearchParams } from 'next/navigation';

// --- Data can live here or be imported ---
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
        <p>Datum: 25.10.2025. (Subota)</p>
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
        <p>Trajanje: 70 Minuta</p>
        {/* <p>Cijena kotizacije 80 KM</p> */}
      </>
    ),
    url: "",
  },
];



const ObukaContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab');
    return tab && trainings.some(t => t.id === tab) ? tab : trainings[0].id;
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && trainings.some(t => t.id === tab)) {
      setActiveTab(tab);
    } else {
      // Fallback to the first tab if the URL parameter is invalid
      setActiveTab(trainings[0].id);
    }
  }, [searchParams]);

  const registerForTraining = async () => {
    if (activeTab === "pistol") {
      // navigate to prijava/pistol1
      router.push("/prijava/pistol1")
    } else {
      return
    }
  }

  return (
    // Use the container component here
    <ObukaPageContainer>
      <Tabs>
        {trainings.map(({ id, label }) => (
          <TabButton
            key={id}
            active={activeTab === id}
            onClick={() => setActiveTab(id)}
            aria-selected={activeTab === id}
            role="tab"
            tabIndex={activeTab === id ? 0 : -1}
          >
            {label}
          </TabButton>
        ))}
      </Tabs>

      <TabContent role="tabpanel">
        {trainings.find((t) => t.id === activeTab)?.content}
        <CustomButton onClick={() => registerForTraining()} disabled={activeTab == "lowlight"}>{activeTab == "lowlight" ? "COMING SOON" : "PRIJAVI SE"}</CustomButton>
      </TabContent>

    </ObukaPageContainer>
  );
};

export default ObukaContent;

// --- ALL STYLED COMPONENTS MOVED HERE ---
const ObukaPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 20rem;

  @media screen and (max-width: 767px) {
    padding: 2rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #333;
`;

const TabButton = styled.button<{ active: boolean }>`
  font-family: var(--font-mohave);
  background: transparent;
  border: none;
  color: ${({ active }) => (active ? '#CEFF51' : '#777')};
  font-weight: ${({ active }) => (active ? '900' : '600')};
  font-size: 1.5rem;
  @media screen and (max-width: 767px) {
    font-size: 1rem;
  }
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #aadd22;
  }

  &:focus {
    outline-offset: 3px;
    outline: 2px solid #ceff51;
  }
`;

const TabContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  width: 100%; /* ensures uniform width */

  p {
    margin: 0 0 1.5rem 0; /* reset top margin, keep bottom spacing */
  }

  ul {
    margin: 0 0 1.5rem 0; /* reset top margin */
    padding-left: 1.2rem; /* uniform left indent */
    list-style-position: inside; /* keeps bullets aligned with text */
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    display: block; /* makes "Šta je potrebno?" behave like a heading */
    margin-bottom: 0.5rem;
  }
`;


const CustomButton = styled.button`
  background-color: #ceff51;
  border: none;
  color: #000000;
  font-family: var(--font-mohave);
  font-size: 1.5rem;
  font-weight: bold;
  height: 4rem;
  width: 100%;
  cursor: pointer;
  display: flex; /* Added for centering spinner */
  justify-content: center; /* Added for centering spinner */
  align-items: center; /* Added for centering spinner */
  transition: opacity 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;