'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import obukaImg from '@/../public/obukaimg.jpg';
import registerImg from '@/../public/registerimg.png';
import drillsImg from '@/../public/drills_sharp.png';
import teamImg from '@/../public/onamaimg.jpg';
import squadImg from '@/../public/squad.jpg';
import styles from './page.module.css';

export default function Home() {
  const leaderboardUrl = process.env.NODE_ENV === 'production' ? 'https://app.kpsdelta.ba' : 'https://kpsdeltaapp.netlify.app';
  const destinations = [
    { title: 'OBUKA', description: 'Pronađi obuku za svoj nivo iskustva.', href: '/obuka', image: obukaImg },
    { title: 'DELTA DRILLS', description: 'Vježbe i mete za tvoj sljedeći trening.', href: '/drills', image: drillsImg },
    { title: 'UČLANI SE', description: 'Tvoj prvi korak u KPS Delta.', href: '/prijava', image: registerImg },
    { title: 'LEADERBOARD', description: 'Rezultati i rangiranje na jednom mjestu.', href: leaderboardUrl, image: teamImg },
  ];

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroImage}><Image src={obukaImg} alt="Trening na otvorenom strelištu" fill priority sizes="(max-width: 767px) 100vw, 75vw" /></div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title">AIM AND HIT.<br /><span>SIMPLE AS THAT.</span></h1>
            <p className={styles.heroDescription}>Znanje, disciplina i zajednica.<br />Praktično streljaštvo počinje odgovornim pristupom.</p>
            <div className={styles.heroActions}>
              <Link href="/obuka" className={styles.button}>ISTRAŽI OBUKE <FiArrowRight aria-hidden="true" /></Link>
              <Link href="/o-nama" className={styles.textLink}>UPOZNAJ DELTU <FiArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
          <span className={styles.imageCaption}>KLUB PRAKTIČNOG STRELJAŠTVA DELTA</span>
        </div>
      </section>
      <div className={styles.missionStrip}><div><span>ODGOVORNOST.</span><span>PRECIZNOST.</span><span>NAPREDAK.</span><Link href="/prijava">TVOJ SLJEDEĆI KORAK <FiArrowRight aria-hidden="true" /></Link></div></div>
      <section className={styles.explore} aria-labelledby="explore-title">
        <div className={styles.sectionHeading}>
          <div><h2 id="explore-title">PRONAĐI SVOJ PRAVAC.</h2></div>
          <p>Od prvog treninga do sljedećeg izazova.</p>
        </div>
        <div className={styles.grid}>
          {destinations.map((item) => <Link href={item.href} className={styles.card} key={item.title}>
            <div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 25vw" /><span className={styles.cardArrow}><FiArrowUpRight aria-hidden="true" /></span></div>
            <div className={styles.cardCopy}><h3>{item.title}</h3><p>{item.description}</p></div>
          </Link>)}
        </div>
      </section>
      <section className={styles.club} aria-labelledby="club-title">
        <div className={styles.clubImage}><Image src={squadImg} alt="Tim KPS Delta" fill sizes="(max-width: 767px) 100vw, 50vw" /></div>
        <div className={styles.clubCopy}><h2 id="club-title">ZAJEDNIČKI CILJ.<br />ISTI TIM.</h2><p>Okupljamo početnike i iskusne strijelce koji dijele strast prema sportu. Kroz edukaciju, trening i podršku gradimo kulturu sigurnog i odgovornog streljaštva.</p><Link href="/o-nama" className={styles.button}>VIŠE O KLUBU <FiArrowRight aria-hidden="true" /></Link></div>
      </section>
    </>
  );
}
