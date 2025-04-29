'use client';
import styles from './page.module.css'
export default function PageScore({xWins,oWins,draws}){
    return(
        <header className={styles.scores}>
            <h1 className={styles.title}>Current Standing</h1>
            {(()=>{
                if(xWins == 0 && oWins == 0)
                {
                    return(
                        <>
                            <h1 className={styles.xScore}>X score: {xWins}</h1>
                            <h1 className={styles.oScore}>O score: {oWins}</h1>
                            <h1 className={styles.drawScore}>Draws: {draws}</h1>
                        </>
                    )
                }
                else if(xWins > oWins)
                    return (
                    <>
                        <h1 className={styles.xScore}>X score: {xWins}</h1>
                        <h1 className={styles.oScore}>O score: {oWins}</h1>
                        <h1 className={styles.drawScore}>Draws: {draws}</h1>
                    </>
                    )
                else
                    return (
                        <>
                            <h1 className={styles.oScore}>O score: {oWins}</h1>
                            <h1 className={styles.xScore}>X score: {xWins}</h1>
                            <h1 className={styles.drawScore}>Draws: {draws}</h1>
                        </>
                    );
                
            })()}
           
        </header>
    );
}