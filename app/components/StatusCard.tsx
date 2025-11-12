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
      // wrap the HelpCircle in a span that controls hover state
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex"
      >
        <HelpCircle className="text-gray-500 w-5 h-5 cursor-help" />
      </span>
    );

  return (
    <div className="relative px-6 py-3 font-semibold border-2 border-slate-900 overflow-visible group rounded-full cursor-pointer">
      <div className="flex items-center justify-between p-4 bg-slate-100 rounded-xl shadow-sm border relative">
        <div className="flex flex-col">
          <span className="absolute inset-0 bg-slate-900 translate-x-[100%] group-hover:translate-x-0 transition-transform duration-400"></span>

          <div className="relative z-10 flex items-center gap-2">
            {icon}
            <span className="text-black group-hover:text-white transition-colors duration-400">
              {name}
            </span>
          </div>

          <span className={`relative z-10 text-xs ${responseTimeColor}`}>
            Response time: {response_time.toFixed(2)}s
          </span>
        </div>

        <span className={`px-3 py-1 rounded-full text-white z-10 ${statusColor}`}>
          {status}
        </span>

        {/* tooltip: absolutely positioned, high z-index, fades in */}
        {status === "UNKNOWN" && (
          <div
            className={`absolute right-3 top-full mt-2 z-50 pointer-events-auto transform transition-opacity duration-200 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-md whitespace-nowrap">
              Website may be blocking bots or timed out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
