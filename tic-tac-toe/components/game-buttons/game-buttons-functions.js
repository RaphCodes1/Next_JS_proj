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