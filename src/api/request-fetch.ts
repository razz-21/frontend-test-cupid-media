import { PUBLIC_API_KEY, PUBLIC_API_URL } from "$env/static/public";

export async function requestFetch(input: RequestInfo | URL, init?: RequestInit) {
  const headers = new Headers();
  headers.append('X-API-Key', PUBLIC_API_KEY);

  const request =  fetch(`${PUBLIC_API_URL}${input}`, {
    ...init,
    headers
  });

  return (await request).json();
}