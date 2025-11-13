import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import { useState } from "react";

type StatusCardProps = {
  name: string;
  status: string;
  response_time: number;
};

export default function StatusCard({ name, status, response_time }: StatusCardProps) {
  const [hovered, setHovered] = useState(false);

  const statusColor =
    status === "UP" ? "bg-green-500" : status === "DOWN" ? "bg-red-500" : "bg-gray-400";

  const responseTimeColor =
    response_time < 1 ? "text-green-300" : response_time < 2 ? "text-yellow-600" : "text-red-700";

  const icon =
    status === "UP" ? (
      <CheckCircle2 className="text-green-500 w-5 h-5" />
    ) : status === "DOWN" ? (
      <AlertCircle className="text-red-500 w-5 h-5" />
    ) : (
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex"
      >
        <HelpCircle className="text-gray-500 w-5 h-5 cursor-help" />
      </span>
    );

  const Tooltip = status === "UNKNOWN" && (
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 pointer-events-auto transition-opacity duration-200 ${
        hovered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-slate-900 text-white text-xs px-3  rounded-lg shadow-md whitespace-nowrap">
        Website may be blocking bots or timed out
      </div>
    </div>
  );

  return (
    <div className="relative px-6 py-3 font-semibold border-2 border-slate-900 overflow-visible group rounded-full cursor-pointer">
      
      {Tooltip} 

      <div className="relative flex items-center justify-between p-4 bg-slate-100 rounded-full shadow-sm border border-transparent overflow-hidden"> 
        
        <span className="absolute inset-[-1px] bg-slate-900 translate-x-[101%] group-hover:translate-x-0 rounded-full transition-transform duration-500 ease-in-out"></span>

        <div className="relative z-10 flex flex-col">
          
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-black group-hover:text-white transition-colors duration-400">
              {name}
            </span>
          </div>

          <span className={`text-xs ${responseTimeColor}`}>
            Response time: {response_time.toFixed(2)}s
          </span>
        </div>

        <span className={`relative z-10 px-3 py-1 rounded-full text-white ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  );
}