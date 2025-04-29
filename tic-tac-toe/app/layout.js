import "./globals.css";
export const metadata = {
  title: "Tic-Tac-Toe Game",
  description: "Play tic tac toe using Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
