'use client';
import { useState,useEffect } from 'react';
import styles from './game-buttons.module.css'
import { GrPowerReset } from "react-icons/gr"
import { useScore } from '@/components/scoreTrack'
import PageScore from '@/app/scores/page';
export function changeTurn(turn, updateTurn)
{
    if(turn === 'X')
        updateTurn('O');
    else
        updateTurn('X');
}

export function updateButtons(turn, updateTurn, curXO, updateXO, index)
{
    changeTurn(turn, updateTurn);
    updateXO(curXO.map((item,i) => i === index ? turn :item));
}

export function checkWinner(curXO)
{   
    const winnerTable = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ]
    for(let i = 0; i < winnerTable.length; i++)
    {
        let countMatchO = 0;
        let countMatchX = 0;
        for(let f = 0;f < 3;f++)
        {   
            if(curXO[winnerTable[i][f]] == 'X')
                countMatchX++;
        }
        for(let f = 0;f < 3;f++)
        {   
            if(curXO[winnerTable[i][f]] == 'O')
                countMatchO++;
        }
        if(countMatchO == 3 || countMatchX == 3)
            return (1);
    }
    if(curXO.every(cell => cell !== ' '))
        return (2);
    
    return (0);
}

export function winnerIndexes(curXO)
{
    const winnerTable = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ]
    for(let i = 0; i < winnerTable.length; i++)
    {
        let countMatchO = 0;
        let countMatchX = 0;
        for(let f = 0;f < 3;f++)
        {   
            if(curXO[winnerTable[i][f]] == 'X')
                countMatchX++;
        }
        for(let f = 0;f < 3;f++)
        {   
            if(curXO[winnerTable[i][f]] == 'O')
                countMatchO++;
        }
        if(countMatchO == 3 || countMatchX == 3)
            return winnerTable[i];
    }
    return [];
}

export function checkGameEnd(curXO){
    if(curXO.every(cell => cell !== ' '))
        return (1);
    return(0);
}

export function resetGame(updateXO, updateTurn)
{
    updateXO([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
    updateTurn('X');
}

export function scoreTrack(turn,status,updateScore){
    let updt = turn == 'X'?'O':'X';
    if(updt == 'X' && status == 'win')
        updateScore(prevScore => [prevScore[0] + 1, prevScore[1], prevScore[2]]);
    else if(updt == 'O' && status == 'win')
        updateScore(prevScore => [prevScore[0], prevScore[1] + 1, prevScore[2]]);
    else if(status == 'tie')
        updateScore(prevScore => [prevScore[0], prevScore[1], prevScore[2] + 1]);
}


export default function GameButtons(){
    const [curXO, updateXO] = useState([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
    const [turn, updateTurn] = useState('X');
    const [score, updateScore] = useState([0,0,0]);
    const [gameResult, setGameResult] = useState(null);

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
    return (
        <div className={styles.container}>
            <header className={styles.turn}>
                {(() => {
                    if(!checkWinner(curXO))
                        return <h1 className={`${turn === 'X' ?styles.red:styles.blue}`}>{turn}'s turn</h1>
                    else if(checkWinner(curXO) == 1)
                    {   
                        return <h1 className={`${styles.gold}`}>{turn == 'X'?'O':'X'} is the winner!</h1>
                    }
                    else if(checkWinner(curXO) == 2)
                    {   
                        return <h1 className={`${styles.red}`}>It's a tie!</h1>
                    }
                }
                )()}
            </header>
            <main className={`${styles.GameButton}`}>
                    {
                        curXO.map((value, index) => {
                            const winnerIdx = winnerIndexes(curXO);
                            let buttonClass = "";

                            if(checkGameEnd(curXO) || checkWinner(curXO))
                            {
                                if(winnerIdx.includes(index)){
                                    buttonClass = styles.buttonGold;
                                } else {
                                    buttonClass = styles.buttonGray;
                                }
                            }
                            else
                                buttonClass = turn === 'X' ? styles.buttonRed: styles.buttonBlue;
                            
                            return <button key={index}
                            disabled={checkGameEnd(curXO) || checkWinner(curXO) == 1}
                            onClick={() => updateButtons(turn, updateTurn,curXO,updateXO,index)}
                            className={buttonClass}>{value}</button>
                    })}
                    <button className={styles.resetBtn} onClick={() => resetGame(updateXO, updateTurn)}>
                        <div className={styles.resetLogo}><GrPowerReset size={30}/></div>
                        <h1>reset?</h1>
                    </button>
            </main>
            <section className={styles.scorePage}>
                <PageScore xWins={score[0]} oWins={score[1]} draws={score[2]}/>
            </section>
        </div>
    );
}