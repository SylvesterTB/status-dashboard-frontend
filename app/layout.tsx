import Hero from "./components/Hero";
import "./globals.css";
import { Poppins, Inter } from "next/font/google";


const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${poppins.className} ${inter.className}`}>
        <Hero />
        <main id="dashboard" className="min-h-screen p-8">
          {children}
        </main>
      </body>
    </html>
  );
}






