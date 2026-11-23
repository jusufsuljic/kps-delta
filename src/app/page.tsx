import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import obukaImg from '@/../public/obukaimg.jpg';
import registerImg from '@/../public/registerimg.png';
import drillsImg from '@/../public/drills_sharp.png';
import teamImg from '@/../public/onamaimg.jpg';
import squadImg from '@/../public/squad.jpg';
import { leaderboardUrl } from './lib/trainings';
import styles from './page.module.css';

const tiles = [
  { title: 'UČLANI SE', description: 'Tvoj prvi korak u KPS Delta.', href: '/prijava', image: registerImg, position: '50% 40%' },
  { title: 'OBUKA', description: 'Pronađi obuku za svoj nivo iskustva.', href: '/obuka', image: obukaImg, position: '50% 45%' },
  { title: 'DRILLS', description: 'Vježbe i mete za tvoj sljedeći trening.', href: '/drills', image: drillsImg, position: '50% 50%' },
  { title: 'LEADERBOARD', description: 'Rezultati i rangiranje na jednom mjestu.', href: leaderboardUrl, image: teamImg, position: '50% 50%' },
];

export default function Home() {
  return (
    <>
      <h1 className={styles.srOnly}>KPS Delta — Klub praktičnog streljaštva</h1>
      <nav className={styles.tiles} aria-label="Istraži Deltu">
        {tiles.map((tile, i) => (
          <Link href={tile.href} className={styles.tile} key={tile.title}>
            <Image src={tile.image} alt="" fill priority={i < 2} sizes="(max-width: 767px) 100vw, 50vw" style={{ objectPosition: tile.position }} />
            <span className={styles.tileCopy}>
              <span className={styles.tileTitle}>{tile.title}</span>
              <span className={styles.tileText}>{tile.description}</span>
            </span>
          </Link>
        ))}
      </nav>

      <section className={styles.club} aria-labelledby="club-title">
        <div className={styles.clubImage}><Image src={squadImg} alt="Tim KPS Delta" fill sizes="(max-width: 767px) 100vw, 50vw" /></div>
        <div className={styles.clubCopy}>
          <span className="label">KPS Delta · Sarajevo</span>
          <h2 id="club-title">AIM AND HIT.<br /><span>SIMPLE AS THAT.</span></h2>
          <p>Okupljamo početnike i iskusne strijelce koji dijele strast prema sportu. Kroz edukaciju, trening i podršku gradimo kulturu sigurnog i odgovornog streljaštva.</p>
          <Link href="/o-nama" className={styles.textLink}>VIŠE O KLUBU <FiArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
