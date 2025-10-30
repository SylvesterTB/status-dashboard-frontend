type HeroCardProps = {
  title: string;
  description: string;
};

export default function LambdaCar({title, description}: HeroCardProps)
{
    return(
        <>
        <div className="w-72 h-64 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center transition-transform hover:-translate-y-2">
        <div className="flex flex-wrap justify-center gap-8">
        <h1 className="text-center">{title}</h1>
        <p>{description}</p>
        </div>
        </div>
        </>
    )
}