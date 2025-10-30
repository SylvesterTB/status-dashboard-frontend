"use client";
import HeroCard from "./HeroCard"

export default function Hero() {
  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    
  };
    const Cards = [
    { title: "Backend", description: "AWS stuff"},
    { title: "Front end", description: "React stuff"},
    { title: "TBD", description: "stuff"},
  ];
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-white text-black text-center p-8">
      <h1 className="text-5xl font-bold mb-4">Status Dashboard</h1>
      <p className="text-lg mb-8 max-w-md">
        Real-time service monitoring built with React and Tailwind
      </p>
      <div className="flex">
      {Cards.map((Card) => (
     <HeroCard key={Card.title} title={Card.title} description={Card.description as any} /> 
      ))}
      </div>     
     <button
        onClick={scrollToDashboard}
        className="px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
      >
        View Dashboard ↓
      </button>
    </section>
  );
}