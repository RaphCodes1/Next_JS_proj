import GameButtons from "@/components/game-buttons/game-buttons";
import Head from 'next/head';
export default function Home() {
  
  return (
    <>
      <Head>
        <title>tic tac toe game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GameButtons />
    </>

  );
}
