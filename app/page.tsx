"use client"
import StatusCard from "./components/StatusCard";
import { useState, useMemo, useEffect } from "react";

type Service = {
  name: string;
  groupStatus: string;
  timeChecked: string;
};

export default function Home() {
  const services = [
    { name: "Website A", groupStatus: "up", timeChecked: "~min"},
    { name: "API Server", groupStatus: "down", timeChecked: "<30s"},
    { name: "Database A", groupStatus: "unknown", timeChecked: "N/A"},
    { name: "Website B", groupStatus: "up", timeChecked: "~min" },
    { name: "Database B", groupStatus: "unknown", timeChecked: "N/A"},
    { name: "Website C", groupStatus: "up", timeChecked: "~min" },
    { name: "Website D", groupStatus: "down", timeChecked: "~min" },
  ];
 // setting up search bar here 
  const [query, setQuery] = useState<string>("");

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => clearTimeout(id);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return services;
    return services.filter((s) =>
      s.name.toLowerCase().includes(debouncedQuery) ||
      s.groupStatus.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery, services]);

  // set up filtering here

  type Grouped = {
  [key: string]: Service[]; // key = status, value = array of services
  };

  const grouped = filtered.reduce((groups, stat) => 
  {
    if(!groups[stat.groupStatus])
    {
      groups[stat.groupStatus] = [];
    }
    groups[stat.groupStatus].push(stat);
    return groups;
  }, {} as Grouped);





  return (
    <main className="p-8">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <label htmlFor="service-search" className="sr-only">Search services</label>
        <div className="relative bg-white rounded-full">
          <input
            id="service-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services by name or status (e.g. 'api' or 'down')"
            className="w-full rounded-full border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Search services"
          />
          {/* optional clear button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Showing {filtered.length} / {services.length}
        </p>
      </div>

      {/* Grid of cards */}
      <div id="dashboard" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([groupStatus, services]) => (
          <div key={groupStatus} className="mb-8">
            <h2>{groupStatus}</h2>
            {services.map(service => (
              <StatusCard 
                key={service.name} 
                name={service.name} 
                status={service.groupStatus as any} 
                timeChecked={service.timeChecked as any} 
                />
              ))}
            </div>
          ))};
        
        
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No services match your search.
          </div>
        )}
      </div>
    </main>
  );
}