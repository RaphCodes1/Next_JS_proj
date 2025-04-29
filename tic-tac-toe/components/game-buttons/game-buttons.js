'use client';
import { useState,useEffect,useRef } from 'react';
import styles from './game-buttons.module.css'
import { GrPowerReset } from "react-icons/gr"
import { FaArrowUp } from "react-icons/fa";
import PageScore from '@/app/scores/page';
import MainHeader from '../main-header/main-header';
import { updateButtons,checkWinner,winnerIndexes,checkGameEnd,resetGame,scoreTrack } from './game-buttons-functions';

export function boxHasValue(currXO,index)
{
    if(currXO[index] != ' ')
        return (1);
    return (0);
}
export default function GameButtons(){
    const [curXO, updateXO] = useState([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
    const [turn, updateTurn] = useState('X');
    const [score, updateScore] = useState([0,0,0]);
    const [gameResult, setGameResult] = useState(null);
    const newGameRef = useRef(null);
    const scoresRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        if (gameResult) {
            const { winner, status } = gameResult;
            scoreTrack(winner, status, updateScore);
        }
    }, [gameResult]); 

    const checkGameStatus = () => {
        const winner = checkWinner(curXO); 
        
        if (winner === 1) {
            const winnerTurn = turn == 'X'?'X':'O' ;
            setGameResult({ winner: winnerTurn, status: 'win' });
        }else if(winner === 2 && curXO.every(cell => cell !== ' ')){
            setGameResult({ winner: null, status: 'tie' });
        } 
        else {
            setGameResult({ winner: null, status: null });
        }
    };
    useEffect(() => {
        checkGameStatus();
    }, [curXO]);

    const scrollToSection = (section) => {
        if(section == 'newGame') newGameRef.current?.scrollIntoView({behavior: 'smooth'}); 
        if(section == 'scores') scoresRef.current?.scrollIntoView({behavior: 'smooth'}); 
        if(section == 'header') headerRef.current?.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <>
        <header ref={headerRef}>
            <MainHeader scrollToSection={scrollToSection} updateXO={updateXO} updateTurn={updateTurn}/>
        </header>
        <div className={styles.container} ref={newGameRef}>
            <header className={styles.turn}>
                {(() => {
                    if(!checkWinner(curXO))
                        return <h1 className={`${turn === 'X' ?styles.red:styles.blue}`}>{turn}'s turn</h1>
                    else if(checkWinner(curXO) == 1) 
                        return <h1 className={`${styles.gold}`}>{turn == 'X'?'O':'X'} is the winner!</h1>
                    else if(checkWinner(curXO) == 2)
                        return <h1 className={`${styles.red}`}>It's a tie!</h1>
                }
                )()}
            </header>
            <main className={`${styles.GameButton}`} >
                <section className={styles.ButtonGrid}>
                    {
                        curXO.map((value, index) => {
                            const winnerIdx = winnerIndexes(curXO);
                            let buttonClass = "";

                            if(checkGameEnd(curXO) || checkWinner(curXO))
                                winnerIdx.includes(index) ? buttonClass = styles.buttonGold:buttonClass = styles.buttonGray;
                            else
                                buttonClass = turn === 'X' ? styles.buttonRed: styles.buttonBlue;
                        
                        return <button key={index}
                        disabled={checkGameEnd(curXO) || checkWinner(curXO) == 1 || boxHasValue(curXO, index)}
                        onClick={() => updateButtons(turn, updateTurn,curXO,updateXO,index)}
                        className={buttonClass}>{value}</button>
                    })}
                </section>
                <button className={styles.resetBtn} onClick={() => resetGame(updateXO, updateTurn)}>
                    <div className={styles.resetLogo}><GrPowerReset size={30}/></div>
                    <h1>reset?</h1>
                </button>
            </main>
            <section className={styles.scorePage} ref={scoresRef}>
                <PageScore xWins={score[0]} oWins={score[1]} draws={score[2]}/>
                <button className={styles.topBtn} onClick={()=>scrollToSection('header')}>
                    <div className={styles.resetLogo}><FaArrowUp size={23}/></div>
                    <h1>back to top</h1>
                </button>
            </section>
        </div>
        </>
    );
}