import MealsGrid from '@/components/meals/meals-grid'
import styles from './page.module.css'
import Link from 'next/link'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react';

export async function Meals(){
    const meals = await getMeals();
    
    return <MealsGrid meals={meals}/>;
}
export default async function MealsPage(){
   

    return(
        <>
        <header className={styles.header}>
            <h1>
                Delicious meals, created
                <span className={styles.highlight}> by you</span>
            </h1>
            <p>
                Choose your favorite recipe and cook it yourself. It is easy and fun!
            </p>
            <p className={styles.cta}>
                <Link href='/meals/share'>
                    Share you favorite recipe
                </Link>
            </p>
            
        </header>
        <main className={styles.main}>
            <Suspense fallback={<p className={styles.loading}>We are checking...</p>}>
                <Meals />
            </Suspense>
        </main>
        </>
    )
}