/**
 * Backend API base URL.
 * Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:4000)
 * In production, use your deployed backend URL.
 */
export const API_BASE =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000")
    : "";

export function apiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const p = path.startsWith("/") ? path : `/${path}`;
  const apiPath = p.startsWith("/api") ? p : `/api${p}`;
  return `${base.replace(/\/$/, "")}${apiPath}`;
}
