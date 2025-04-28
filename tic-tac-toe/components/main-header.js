import styles from './main-header.module.css'
import logoImg from '@/app/icon.png'
import Link from 'next/link'
import Image from 'next/image'

export default function MainHeader() {
    return (
      <header className={styles.header}>
        <Link href='/' className={styles.logo}>
          <Image src={logoImg} alt='tic tac toe' width={130} height={120}/>
          <h1>Tic Tac Toe</h1>
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href='/scores'>Scores</Link>
            </li>
            <li>
              <Link href='/'>New Game</Link>
            </li>
          </ul>
        </nav>

      </header>
  
    );
  }