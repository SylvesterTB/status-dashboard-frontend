type StatusCardProps = {
  name: string;
  status: "up" | "down" | "unknown";
  timeChecked: "<30s" | "~min" | "N/A";
};

export default function StatusCard({ name, status, timeChecked }: StatusCardProps) {
    const statusColor =
    status === "up" ? "bg-green-500" : status === "down" ? "bg-red-500" : "bg-gray-400";
    const lastChecked = 
    timeChecked === "<30s" ? "text-green-300" : timeChecked === "~min" ? "text-orange-500" : timeChecked ===  "N/A" ? "text-red-700" : "bg-white-50";
    return (
        <div className="relative px-6 py-3 font-semibold border-2 border-black overflow-hidden group rounded-full cursor-pointer">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
        <div className="flex flex-col">
        <span className="absolute inset-0 bg-black translate-x-[100%] group-hover:translate-x-0 rounded-full transition-transform duration-400"></span>
        <span className="relative z-10 text-black group-hover:text-white transition-colors duration-400">{name}</span>
        <span className={`relative z-11 text-xs ${lastChecked}`}>Last Checked: {timeChecked}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-white z-10 ${statusColor}`}>{status}</span>
        </div>
        </div>
  );
}
