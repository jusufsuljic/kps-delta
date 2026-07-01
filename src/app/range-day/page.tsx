'use client'

import Image from 'next/image'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

const eventDetails = [
  { label: 'Datum', value: 'Septembar 2026' },
  { label: 'Vrijeme', value: '09:00 - 18:00' },
  { label: 'Lokacija', value: 'Sportsko strelište Žuč' },
  { label: 'Kapacitet', value: 'Limitiran broj mjesta' },
]

const included = [
  'Cjelodnevni pristup strelištu uz kontrolisane sigurnosne protokole',
  'Vođene stanice za pištolj, karabin, tranzicije i preciznost',
  'Demo oprema, praktični izazovi i druženje sa instruktorima',
  'Ručak, osvježenje i prostor za odmor između trening blokova',
  'Foto/video materijal događaja i Delta Range Day obilježje',
]

const instructors = [
  { name: 'Instruktor 01', role: 'Praktično streljaštvo' },
  { name: 'Instruktor 02', role: 'Sigurnost i manipulacija' },
  { name: 'Instruktor 03', role: 'Low light / scenario' },
  { name: 'Instruktor 04', role: 'Stage coaching' },
]

const schedule = [
  { time: '09:00', title: 'Check-in i safety brief' },
  { time: '10:00', title: 'Rotacija kroz live-fire stanice' },
  { time: '13:00', title: 'Ručak i oprema zona' },
  { time: '15:00', title: 'Mini takmičenja i izazovi' },
  { time: '18:00', title: 'Zatvaranje i druženje' },
]

const quotes = [
  {
    quote: 'Najbolji dan na strelištu koji sam imao. Sve je bilo jasno, sigurno i jako intenzivno.',
    name: 'Amir, član kluba',
  },
  {
    quote: 'Konačno događaj gdje možeš probati više disciplina bez pritiska takmičenja.',
    name: 'Emina, rekreativni strijelac',
  },
  {
    quote: 'Instruktori su bili direktni, konkretni i svaka stanica je imala smisla.',
    name: 'Kenan, praktični strijelac',
  },
]

const faqs = [
  {
    question: 'Da li moram biti član kluba?',
    answer: 'Ne. Range Day je zamišljen kao otvoren događaj za odgovorne učesnike koji žele upoznati Delta sistem rada.',
  },
  {
    question: 'Da li je događaj za početnike?',
    answer: 'Da, ali svaki učesnik mora poštovati sigurnosna pravila. Grupe i stanice će biti prilagođene nivou iskustva.',
  },
  {
    question: 'Šta trebam ponijeti?',
    answer: 'Udobnu odjeću, zaštitu za oči i uši ako je imaš, vodu i opremu koju želiš koristiti. Detaljan spisak ide nakon prijave.',
  },
  {
    question: 'Da li je broj mjesta ograničen?',
    answer: 'Da. Radi sigurnosti i kvaliteta rada, događaj će imati ograničen broj učesnika.',
  },
]

export default function RangeDayPage() {
  return (
    <Page>
      <Hero>
        <HeroImage>
          <Image src="/shooting_range.jpg" alt="Delta Range Day" fill priority sizes="100vw" />
        </HeroImage>
        <HeroShade />
        <HeroContent>
          <Kicker>KPS DELTA EVENT</Kicker>
          <HeroTitle>DELTA RANGE DAY</HeroTitle>
          <HeroText>
            Jedan dan na strelištu za ljude koji žele probati, naučiti i osjetiti energiju
            praktičnog streljaštva u sigurnom Delta okruženju.
          </HeroText>
          <HeroActions>
            <PrimaryCta href="/prijava">PRIJAVI SE</PrimaryCta>
            <SecondaryCta href="#detalji">DETALJI DOGAĐAJA</SecondaryCta>
          </HeroActions>
        </HeroContent>
      </Hero>

      <DetailsBand id="detalji">
        <DetailsGrid>
          {eventDetails.map((detail) => (
            <DetailItem key={detail.label}>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </DetailItem>
          ))}
        </DetailsGrid>
      </DetailsBand>

      <Section>
        <Split>
          <SectionIntro>
            <SectionNumber>01</SectionNumber>
            <h2>ŠTA JE RANGE DAY?</h2>
          </SectionIntro>
          <LargeCopy>
            Delta Range Day je kombinacija treninga, demonstracija, druženja i mini izazova.
            Nije klasična obuka i nije klasično takmičenje. Ideja je da svaki učesnik ode kući
            sa jasnijim osjećajem šta znači raditi ozbiljno, sigurno i fokusirano.
          </LargeCopy>
        </Split>
      </Section>

      <FeatureImageSection>
        <FeatureImage>
          <Image src="/squad.jpg" alt="Delta ekipa na strelištu" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </FeatureImage>
        <FeaturePanel>
          <SectionNumber>02</SectionNumber>
          <h2>ULAZNICA UKLJUČUJE</h2>
          <IncludedList>
            {included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </IncludedList>
        </FeaturePanel>
      </FeatureImageSection>

      <Section>
        <Split>
          <SectionIntro>
            <SectionNumber>03</SectionNumber>
            <h2>DNEVNI RITAM</h2>
          </SectionIntro>
          <Timeline>
            {schedule.map((item) => (
              <TimelineItem key={item.time}>
                <time>{item.time}</time>
                <span>{item.title}</span>
              </TimelineItem>
            ))}
          </Timeline>
        </Split>
      </Section>

      <Section>
        <SectionHeader>
          <SectionNumber>04</SectionNumber>
          <h2>INSTRUKTORI I CREW</h2>
          <p>Placeholder profili za instruktore, RO tim i ljude koji vode stanice.</p>
        </SectionHeader>
        <InstructorGrid>
          {instructors.map((instructor, index) => (
            <Instructor key={instructor.name}>
              <InstructorPhoto>
                <Image
                  src={index % 2 === 0 ? '/gun.jpg' : '/IMG_4218.JPEG'}
                  alt={instructor.name}
                  fill
                  sizes="(max-width: 767px) 50vw, 25vw"
                />
              </InstructorPhoto>
              <strong>{instructor.name}</strong>
              <span>{instructor.role}</span>
            </Instructor>
          ))}
        </InstructorGrid>
      </Section>

      <SponsorSection>
        <SectionHeader>
          <SectionNumber>05</SectionNumber>
          <h2>PARTNERI DOGAĐAJA</h2>
          <p>Mjesto za klubove, brendove i partnere koji podržavaju Range Day.</p>
        </SectionHeader>
        <SponsorGrid>
          {Array.from({ length: 8 }, (_, index) => (
            <SponsorLogo key={index}>PARTNER {String(index + 1).padStart(2, '0')}</SponsorLogo>
          ))}
        </SponsorGrid>
      </SponsorSection>

      <QuoteSection>
        <SectionHeader>
          <SectionNumber>06</SectionNumber>
          <h2>ŠTA LJUDI KAŽU</h2>
        </SectionHeader>
        <QuoteGrid>
          {quotes.map((quote) => (
            <QuoteBlock key={quote.name}>
              <p>“{quote.quote}”</p>
              <span>{quote.name}</span>
            </QuoteBlock>
          ))}
        </QuoteGrid>
      </QuoteSection>

      <Section>
        <Split>
          <SectionIntro>
            <SectionNumber>07</SectionNumber>
            <h2>FAQ</h2>
          </SectionIntro>
          <FaqList>
            {faqs.map((faq) => (
              <FaqItem key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </FaqItem>
            ))}
          </FaqList>
        </Split>
      </Section>

      <FinalCta>
        <span>KPS DELTA RANGE DAY</span>
        <h2>SPREMAN ZA DAN NA STRELIŠTU?</h2>
        <p>Prijave će biti pregledane, a potvrđeni učesnici dobijaju finalne instrukcije prije događaja.</p>
        <PrimaryCta href="/prijava">POŠALJI PRIJAVU</PrimaryCta>
      </FinalCta>
    </Page>
  )
}

const heroIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Page = styled.div`
  --accent: #ceff51;
  --muted: rgba(255, 255, 255, 0.66);
  --line: rgba(255, 255, 255, 0.14);
  background: #000;
  color: #fff;
  overflow: hidden;
`

const Hero = styled.section`
  position: relative;
  min-height: calc(100svh - 10rem);
  display: flex;
  align-items: flex-end;
  padding: 8rem 12rem;

  @media screen and (max-width: 767px) {
    min-height: 78svh;
    padding: 5rem 2rem;
  }
`

const HeroImage = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    filter: grayscale(0.15) contrast(1.08);
  }
`

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.68) 36%, rgba(0, 0, 0, 0.1) 100%),
    linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 44%);
`

const HeroContent = styled.div`
  position: relative;
  max-width: 52rem;
  animation: ${heroIn} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
`

const Kicker = styled.span`
  display: block;
  color: var(--accent);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  margin-bottom: 0.85rem;
`

const HeroTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: clamp(4rem, 12vw, 10rem);
  line-height: 0.82;
  letter-spacing: -0.05em;
`

const HeroText = styled.p`
  max-width: 42rem;
  margin: 1.4rem 0 2rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(1.15rem, 2vw, 1.55rem);
  line-height: 1.34;
`

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.8rem;
  padding: 0 1.6rem;
  background: var(--accent);
  color: #000;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #aadd22;
    transform: translateY(-2px);
  }
`

const SecondaryCta = styled(PrimaryCta)`
  background: transparent;
  color: #fff;
  border: 1px solid var(--line);

  &:hover {
    color: #000;
    background: var(--accent);
    border-color: var(--accent);
  }
`

const DetailsBand = styled.section`
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #060606;
  padding: 0 12rem;

  @media screen and (max-width: 767px) {
    padding: 0 2rem;
  }
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const DetailItem = styled.div`
  padding: 2rem 1.2rem;
  border-left: 1px solid var(--line);

  &:last-child {
    border-right: 1px solid var(--line);
  }

  span {
    display: block;
    color: var(--muted);
    font-size: 0.95rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-size: clamp(1.4rem, 2.2vw, 2.15rem);
    line-height: 1;
  }

  @media screen and (max-width: 767px) {
    padding: 1.25rem 0.75rem;
  }
`

const Section = styled.section`
  padding: 7rem 12rem;

  @media screen and (max-width: 767px) {
    padding: 4rem 2rem;
  }
`

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1.3fr);
  gap: 5rem;
  align-items: start;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const SectionIntro = styled.div`
  position: sticky;
  top: 2rem;

  h2 {
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 5rem);
    line-height: 0.9;
  }

  @media screen and (max-width: 900px) {
    position: static;
  }
`

const SectionNumber = styled.span`
  display: block;
  margin-bottom: 0.9rem;
  color: var(--accent);
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.22em;
`

const LargeCopy = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(1.55rem, 3vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
`

const FeatureImageSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(22rem, 0.85fr);
  min-height: 620px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const FeatureImage = styled.div`
  position: relative;
  min-height: 520px;

  img {
    object-fit: cover;
    filter: grayscale(0.2) contrast(1.06);
  }
`

const FeaturePanel = styled.div`
  padding: 5rem 4rem;
  background: #080808;

  h2 {
    margin: 0 0 2rem;
    font-size: clamp(2.5rem, 5vw, 5rem);
    line-height: 0.9;
  }

  @media screen and (max-width: 767px) {
    padding: 3rem 2rem;
  }
`

const IncludedList = styled.ul`
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 1rem 0;
    border-top: 1px solid var(--line);
    color: rgba(255, 255, 255, 0.78);
    font-size: 1.25rem;
    line-height: 1.25;
  }
`

const Timeline = styled.div`
  display: grid;
  border-top: 1px solid var(--line);
`

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 2rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--line);

  time {
    color: var(--accent);
    font-size: 1.4rem;
    font-weight: 900;
  }

  span {
    color: rgba(255, 255, 255, 0.84);
    font-size: 1.55rem;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
`

const SectionHeader = styled.div`
  max-width: 62rem;
  margin-bottom: 2.5rem;

  h2 {
    margin: 0;
    font-size: clamp(2.5rem, 6vw, 6rem);
    line-height: 0.88;
  }

  p {
    max-width: 38rem;
    color: var(--muted);
    font-size: 1.25rem;
  }
`

const InstructorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Instructor = styled.article`
  background: #050505;
  padding-bottom: 1.25rem;

  strong,
  span {
    display: block;
    padding: 0 1.1rem;
  }

  strong {
    margin-top: 1rem;
    color: #fff;
    font-size: 1.35rem;
  }

  span {
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`

const InstructorPhoto = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;

  img {
    object-fit: cover;
    filter: grayscale(0.35) contrast(1.1);
    transition: transform 0.35s ease, filter 0.35s ease;
  }

  ${Instructor}:hover & img {
    transform: scale(1.05);
    filter: grayscale(0.05) contrast(1.12);
  }
`

const SponsorSection = styled(Section)`
  background: #070707;
`

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const SponsorLogo = styled.div`
  min-height: 8rem;
  display: grid;
  place-items: center;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: rgba(255, 255, 255, 0.48);
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.16em;
`

const QuoteSection = styled(Section)`
  background: var(--accent);
  color: #000;

  ${SectionNumber} {
    color: #000;
  }
`

const QuoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const QuoteBlock = styled.blockquote`
  margin: 0;
  padding: 2rem;
  background: var(--accent);

  p {
    margin: 0 0 1.5rem;
    font-size: clamp(1.6rem, 3vw, 2.45rem);
    line-height: 1.02;
    letter-spacing: -0.04em;
  }

  span {
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`

const FaqList = styled.div`
  display: grid;
  border-top: 1px solid var(--line);
`

const FaqItem = styled.details`
  border-bottom: 1px solid var(--line);

  summary {
    cursor: pointer;
    padding: 1.25rem 0;
    color: #fff;
    font-size: 1.65rem;
    font-weight: 800;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  p {
    max-width: 42rem;
    margin: 0 0 1.5rem;
    color: var(--muted);
    font-size: 1.15rem;
    line-height: 1.5;
  }
`

const FinalCta = styled.section`
  min-height: 62svh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 6rem 2rem;
  background:
    linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.9)),
    url('/drills_img.jpeg') center / cover;

  span {
    color: var(--accent);
    font-weight: 900;
    letter-spacing: 0.22em;
  }

  h2 {
    max-width: 72rem;
    margin: 0.85rem auto 1rem;
    font-size: clamp(3rem, 9vw, 8rem);
    line-height: 0.88;
  }

  p {
    max-width: 36rem;
    margin: 0 auto 2rem;
    color: var(--muted);
    font-size: 1.25rem;
  }
`
