import StatusCard from "./components/StatusCard";

export default function Home() {
  const services = [
    { name: "Website A", status: "up", timeChecked: "~min"},
    { name: "API Server", status: "down", timeChecked: "<30s"},
    { name: "Database", status: "unknown", timeChecked: "N/A"},
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <StatusCard key={service.name} name={service.name} status={service.status as any} timeChecked={service.timeChecked as any} />
      ))}
    </div>
  );
}
