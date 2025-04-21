import Link from 'next/link'
import Image from 'next/image'
import styles from '@/components/main-header/main-header.module.css'
import logoImg from '@/assets/logo.png'
import HeaderBg from './header-bg'
import NavLink from './nav-head';
export default function MainHeader(){
    
    return(
        <>
        <HeaderBg />
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image src={logoImg} alt="plate with food" priority/>
                NextLevel Food
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals">Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Community</NavLink>
                    </li>
                </ul>

            </nav>
        </header>
        </>
    )
}