type StatusCardProps = {
  name: string;
  status: string;
  response_time: number;
};

export default function StatusCard({ name, status, response_time }: StatusCardProps) {
  const statusLower = status.toLowerCase();    const statusColor =
    status === "UP" ? "bg-green-500" : status === "down" ? "bg-red-500" : "bg-gray-400";

    const responseTimeColor = 
    response_time < 1 ? "text-green-300" : response_time <  2 ? "text-yellow-600" : "text-red-700";
    return (
        <div className="relative px-6 py-3 font-semibold border-2 border-slate-900 overflow-hidden group rounded-full cursor-pointer">
          <div className="flex items-center justify-between p-4 bg-slate-100 rounded-xl shadow-sm border">
            <div className="flex flex-col">
              <span className="absolute inset-0 bg-slate-900 translate-x-[100%] group-hover:translate-x-0 rounded-full transition-transform duration-400"></span>
              <span className="relative z-10 text-black group-hover:text-white transition-colors duration-400">
                {name}
              </span>
              <span className={`relative z-10 text-xs ${responseTimeColor}`}>
                Response time: {response_time.toFixed(2)}s
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-white z-10 ${statusColor}`}>
              {status}
            </span>
          </div>
        </div>
      );
    }