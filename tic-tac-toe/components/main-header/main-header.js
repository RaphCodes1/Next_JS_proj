'use client';
import styles from './main-header.module.css'
import logoImg from '@/app/icon.png'
import Link from 'next/link'
import Image from 'next/image'

export default function MainHeader({scrollToSection, updateXO, updateTurn}) {
    const handleClick = (e,section) => {
      e.preventDefault();
      scrollToSection(section);
    }
    const handleNewGame = (e, section, updateXO, updateTurn) => {
      e.preventDefault();
      scrollToSection(section);
      updateXO([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
      updateTurn('X');
    }
    return (
      <header className={styles.header}>
        <Link href='#newGame' onClick={(e) => handleClick(e, 'newGame')} className={styles.logo}>
        <div className={styles.imageContainer}>
          <Image src={logoImg} alt='tic tac toe' width={130} height={120}/>
        </div>
          <h1>Tic Tac Toe</h1>
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href='#scores' onClick={(e) => handleClick(e, 'scores')}>Scores</Link>
            </li>
            <li>
              <Link href='#newGame' onClick={(e) => handleNewGame(e, 'newGame', updateXO, updateTurn)}>New Game</Link>
            </li>
          </ul>
        </nav>

      </header>
  
    );
  }