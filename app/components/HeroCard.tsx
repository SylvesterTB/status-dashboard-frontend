type HeroCardProps = {
  title: string;
  description: string;
};

export default function LambdaCar({title, description}: HeroCardProps)
{
    return(
        <>
        <div className="w-72 h-64 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center transition-transform duration-300 group hover:-translate-y-2 hover:shadow-2xl">
        <div className="flex flex-wrap justify-center gap-8">
        <div className="card-wrapper group">
        <h1 className="z-10 text-xl font-bold">{title}</h1>
        <p className="opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        {description}
        </p>        
        </div>
        </div>
        </div>
        </>
    )
}