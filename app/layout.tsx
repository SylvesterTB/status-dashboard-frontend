import Hero from "./components/Hero";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Hero />
        <main id="dashboard" className="min-h-screen p-8">
          {children}
        </main>
      </body>
    </html>
  );
}






