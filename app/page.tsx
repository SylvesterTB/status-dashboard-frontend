"use client"
import StatusCard from "./components/StatusCard";
import { useState, useMemo, useEffect } from "react";
import { fetchStatus } from "./fetchStatus"

type Service = {
  url: string;
  status: string;
  response_time: number;
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data: Service[] = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Fetch error:", error); 
      }
    };
    fetchData();
  }, []);
  const fixedData = services.map((site: any) => {
    // name from URL
    const siteName = new URL(site.url).hostname.replace("www.", "");

  if (siteName === "httpstat.us" && site.status === "DOWN") {
    if (site.url?.includes("503")) {
      return { ...site, name: "HTTPStat.us (Test 503)" };
    } else if (site.url?.includes("404")) {
      return { ...site, name: "HTTPStat.us (Test 404)" };
    }
  }

  return { ...site, name: siteName };
});

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
      s.url.toLowerCase().includes(debouncedQuery) ||
      s.status.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery, services]);


  // set up filtering here

  type Grouped = {
  [key: string]: Service[]; // key = status, value = array of services
  };

  const grouped = filtered.reduce((groups, stat) => 
  {
    if(!groups[stat.status])
    {
      groups[stat.status] = [];
    }
    groups[stat.status].push(stat);
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
            className="w-full rounded-full text-slate-900 border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Search services"
          />
          
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
        {services.length === 0 ? (
            <div className="col-span-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl border" />
              ))}
            </div>
          ) : (
            Object.entries(grouped).map(([groupStatus, groupServices]) => (
              <div key={groupStatus} className="mb-8">
                <h2 className="font-semibold mb-2 px-10">{groupStatus}</h2>
                {groupServices.map((service) => {
                  const siteName = new URL(service.url).hostname.replace("www.", "");
                  const displayName =
                    siteName === "httpstat.us" && service.url.includes("503")
                      ? "HTTPStat.us (Test 503)"
                      : siteName === "httpstat.us" && service.url.includes("404")
                      ? "HTTPStat.us (Test 404)"
                      : siteName;

                  return (
                    <StatusCard
                      key={service.url}
                      name={displayName}
                      status={service.status}
                      response_time={service.response_time}
                    />
                  );
                })}
              </div>
            ))
          )}
        
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No services match your search.
          </div>
        )}
      </div>
    </main>
  );
}