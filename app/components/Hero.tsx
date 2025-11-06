"use client";
import HeroCard from "./HeroCard"

export default function Hero() {
  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    
  };
  const Cards = [
  {
    title: "Backend",
    description: "Built on AWS Lambda and ECS for efficient, scalable monitoring.",
  },
  {
    title: "Frontend",
    description: "Designed with React and Tailwind for smooth, responsive interaction.",
  },
  {
    title: "Infrastructure",
    description: "Integrates cloud-based metrics and live updates for real-time insights.",
  },
];
  return (
  <section className="relative min-h-screen flex flex-col justify-center items-center text-black text-center p-8 bg-gray-50">
      <h1 className="text-5xl font-bold mb-4">Status Dashboard</h1>
      <p className="text-lg mb-8 max-w-md">
      Real-time system insights, powered by AWS and React.      
      </p>
      <div className="flex gap-8">
      {Cards.map((Card) => (
     <HeroCard key={Card.title} title={Card.title} description={Card.description as any} /> 
      ))}
      </div> 
      <div className="column-gap-8">  
     <button
        onClick={scrollToDashboard}
        className="mt-10 px-6 py-3 border-2 border-black rounded-full hover:bg-slate-800 hover:text-white transition-all duration-300"
      >
        View Dashboard ↓
      </button>
      </div>  
       <div className="absolute bottom-0 left-0 w-full h-62 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </section>
  );
}