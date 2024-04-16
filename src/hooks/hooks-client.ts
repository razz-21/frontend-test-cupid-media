import { PUBLIC_API_KEY } from "$env/static/public";
import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch: HandleFetch = async ({request, fetch}) => {
  request.headers.set('X-API-Key', PUBLIC_API_KEY);
  return fetch(request);
}