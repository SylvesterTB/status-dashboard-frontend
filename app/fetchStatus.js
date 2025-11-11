export async function fetchStatus() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  if (!res.ok) throw new Error("Failed to fetch uptime data");
  return res.json();
}