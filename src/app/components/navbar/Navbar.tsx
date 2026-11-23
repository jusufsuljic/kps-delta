'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiArrowRight, FiArrowUpRight, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';
import { trainings, leaderboardUrl } from '../../lib/trainings';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const trainingButton = useRef<HTMLButtonElement>(null);
  const closeMenu = () => { setMenuOpen(false); setTrainingOpen(false); };
  const nextOpen = trainings.find(t => t.open);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setMenuOpen(false); setTrainingOpen(false); }
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  return (
    <header className={styles.header} ref={header} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        if (trainingOpen) { setTrainingOpen(false); trainingButton.current?.focus(); }
        else { setMenuOpen(false); menuButton.current?.focus(); }
      }
    }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(); }}>
      {nextOpen && (
        <Link href={`/obuka?tab=${nextOpen.id}`} onClick={closeMenu} className={styles.announce}>
          Prijave otvorene: <strong>{nextOpen.tabLabel}</strong>{nextOpen.date ? ` — ${nextOpen.date}` : ''} <FiArrowRight aria-hidden="true" />
        </Link>
      )}
      <div className={styles.main}>
        <Link href="/" className={styles.brand} aria-label="KPS Delta — početna" onClick={closeMenu}>
          <Image src="/delta_logo.svg" width={68} height={68} alt="" priority />
        </Link>
        <button ref={menuButton} type="button" className={styles.menuButton} onClick={() => { setMenuOpen(!menuOpen); setTrainingOpen(false); }} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav id="main-navigation" className={`${styles.nav} ${menuOpen ? styles.open : ''}`} aria-label="Glavna navigacija">
          <Link href="/" onClick={closeMenu} aria-current={pathname === '/' ? 'page' : undefined}>POČETNA</Link>
          <div className={styles.dropdown}>
            <button ref={trainingButton} type="button" onClick={() => setTrainingOpen(!trainingOpen)} aria-expanded={trainingOpen} aria-controls="training-menu" className={pathname === '/obuka' ? styles.active : ''}>OBUKA <FiChevronDown aria-hidden="true" /></button>
            {trainingOpen && <div id="training-menu" className={styles.dropdownMenu}>
              <Link href="/obuka?tab=pistol" onClick={closeMenu}>Pistol Level 1 <FiArrowUpRight aria-hidden="true" /></Link>
              <Link href="/obuka?tab=lowlight" onClick={closeMenu}>Low light pistol Level 1 <FiArrowUpRight aria-hidden="true" /></Link>
            </div>}
          </div>
          <Link href="/drills" onClick={closeMenu} aria-current={pathname === '/drills' ? 'page' : undefined}>DRILLS</Link>
          <Link href="/o-nama" onClick={closeMenu} aria-current={pathname === '/o-nama' ? 'page' : undefined}>O NAMA</Link>
          <Link href="/kontakt" onClick={closeMenu} aria-current={pathname === '/kontakt' ? 'page' : undefined}>KONTAKT</Link>
          <a href={leaderboardUrl} className={styles.leaderboard}>LEADERBOARD <FiArrowUpRight aria-hidden="true" /></a>
          <Link href="/prijava" onClick={closeMenu} className={styles.join} aria-current={pathname === '/prijava' ? 'page' : undefined}>UČLANI SE</Link>
        </nav>
      </div>
    </header>
  );
}
