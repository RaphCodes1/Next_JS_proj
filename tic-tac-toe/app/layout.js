import "./globals.css";
import MainHeader from "@/components/main-header";
import { ScoreProvider } from "@/components/scoreTrack";
export const metadata = {
  title: "Tic-Tac-Toe Game",
  description: "Play tic tac toe using Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        <ScoreProvider>
          {children}
        </ScoreProvider>
      </body>
    </html>
  );
}
