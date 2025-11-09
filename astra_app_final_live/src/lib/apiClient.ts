/**
 * Simple API client for Astra frontend to talk to the backend.
 * Uses NEXT_PUBLIC_API_URL (set in .env.local or in deployment).
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} ${t}`);
  }
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`POST ${path} failed: ${res.status} ${t}`);
  }
  return res.json();
}
