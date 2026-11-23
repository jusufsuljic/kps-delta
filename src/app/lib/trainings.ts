// Single source of truth for training programs.
// Used by the navbar announcement bar and the /obuka page.

export type TrainingId = 'pistol' | 'lowlight';

export type Training = {
  id: TrainingId;
  label: string;         // full program name
  tabLabel: string;      // short name used in tabs / schedule
  description: string[];
  requirements: string[];
  specs: { label: string; value: string }[];
  date?: string;         // shown in the announcement bar
  signupHref: string;
  open: boolean;         // false → "COMING SOON", signup disabled
};

export const trainings: Training[] = [
  {
    id: 'pistol',
    label: 'Delta - Pistol Level 1',
    tabLabel: 'PISTOL LEVEL 1',
    description: [
      'Trening je namijenjen osobama koje nemaju prethodno iskustvo s vatrenim oružjem ili su do sada imali minimalan kontakt s njim.',
      'Obuka uključuje praktične vježbe rukovanja pištoljem, pravilnog stava, osnovne tehnike gađanja, te sigurne manipulacije oružjem u kontrolisanim uslovima.',
      'Broj učesnika je ograničen na maksimalno 5, kako bismo svakom polazniku mogli posvetiti dovoljno pažnje i osigurati kvalitetan i siguran trening.',
    ],
    requirements: [
      'Odjeća prilagođena vremenskim uslovima (trening se održava bez obzira na vremenske prilike)',
      'Sva potrebna oprema će Vam biti obezbijeđena',
    ],
    specs: [
      { label: 'Lokacija', value: 'Sportsko strelište Žuč' },
      { label: 'Datum', value: '24.10.2026. (Subota)' },
      { label: 'Trajanje', value: '60 Minuta' },
      { label: 'Polaznika', value: 'Maks. 5' },
    ],
    date: '24.10.2026.',
    signupHref: '/prijava/pistol1',
    open: true,
  },
  {
    id: 'lowlight',
    label: 'Delta - Low light pistol Level 1',
    tabLabel: 'LOW LIGHT PISTOL',
    description: [
      'Trening uključuje praktične vježbe korištenja svjetla, kretanja i gađanja u noćnim uslovima.',
      'Broj učesnika je ograničen na maksimalno 10, kako bismo osigurali kvalitetnu i sigurnu obuku za svakog polaznika.',
    ],
    requirements: [
      'Pištolj i odgovarajuća futrola (nije dozvoljena upotreba kožnih ili najlonskih futrola)',
      'Zaštita za oči i uši (poželjna elektronska zaštita sluha)',
      'Najmanje 2 okvira (magazina), futrola za okvire',
      '110 metaka (moguće kupiti i kod nas)',
      'Ručna lampa (baterijska) sa svježim baterijama',
      'Ako koristite pištolj sa montiranom lampom, onda nosite samo to.',
      'Čeona lampa obavezna (sigurnosna pravila)',
      'Odjeća prilagođena vremenskim uslovima (trening se održava bez obzira na vremenske prilike)',
    ],
    specs: [
      { label: 'Lokacija', value: 'Sportsko strelište Žuč' },
      { label: 'Trajanje', value: '17:00 - 20:00' },
      { label: 'Kotizacija', value: '80 KM' },
      { label: 'Polaznika', value: 'Maks. 10' },
    ],
    signupHref: '/prijava/lowlight',
    open: false,
  },
];

export const leaderboardUrl =
  process.env.NODE_ENV === 'production' ? 'https://app.kpsdelta.ba' : 'https://kpsdeltaapp.netlify.app';
