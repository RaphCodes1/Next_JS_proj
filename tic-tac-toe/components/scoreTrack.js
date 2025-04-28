'use client';
import { createContext,useState,useContext } from "react";

const ScoreContent = createContext();

export function ScoreProvider({children}){
    const[xWins, setXWins] = useState(0);
    const[oWins, setOWins] = useState(0);
    const[draws, setDraws] = useState(0);

    return(
        <ScoreContent.Provider value={{xWins, setXWins, oWins, setOWins, draws, setDraws}}>
            {children}
        </ScoreContent.Provider>
    );
}

export function useScore(){
    return useContext(ScoreContent);
}