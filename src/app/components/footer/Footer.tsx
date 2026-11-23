'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp, FaFacebook, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}><Image src="/delta_logo.svg" width={80} height={80} alt="KPS Delta" /><p>AIM AND HIT.<br /><span>SIMPLE AS THAT.</span></p></div>
          <div className={styles.column}><h2>ISTRAŽI DELTU</h2><Link href="/obuka">Obuka</Link><Link href="/drills">Delta drills</Link><Link href="/prijava">Učlani se</Link><Link href="/o-nama">O nama</Link></div>
          <div className={styles.column}><h2>KONTAKT</h2><a href="mailto:kpsdelta@hotmail.com">kpsdelta@hotmail.com</a><a href="tel:+38761032285">+387 61 032 285</a><span>71000 Sarajevo, BiH</span><Link href="/kontakt">Pošalji pitanje ↗</Link></div>
          <div className={styles.column}><h2>PRATI NAS</h2><div className={styles.socials}>
            <a href="https://www.instagram.com/kps.delta?igsh=MTNtZHNyNTM5emN3cQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/38761032285" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="https://www.facebook.com/share/1CG9kJuaCs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://youtube.com/@teamdeltahq?si=wn4dEFY6wSrowfZQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div><div className={styles.origin}><Image src="/bosnia.svg" width={60} height={60} alt="" /><span>MADE IN</span><span>B&amp;H</span></div></div>
        </div>
        <div className={styles.bottom}><span>© {new Date().getFullYear()} KPS DELTA</span><span>KLUB PRAKTIČNOG STRELJAŠTVA</span><a href="https://www.freeprivacypolicy.com/live/41743ff7-e72b-4a49-a56d-2b4d9e7bc7f8" target="_blank" rel="noopener noreferrer">PRAVILA O PRIVATNOSTI ↗</a></div>
      </div>
    </footer>
  );
}
