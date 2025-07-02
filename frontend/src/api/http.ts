// src/api/http.ts

let accessToken: string | null = null

/** Saves access token in memmory */
export function setAccessToken(token: string | null) {
  accessToken = token
}

/** Returns active access token (or null) */
export function getAccessToken() {
  return accessToken
}

async function refreshAccessToken() {
  const res = await fetch('/api/token/refresh/', {
    method: 'POST',
    credentials: 'include'           // Re-sends coockie for refresh-token
  })
  if (!res.ok) throw new Error('Cannot refresh token')
  const data = await res.json()     // { access: '...' }
  setAccessToken(data.access)
}

/**
 * Fetch wrapper:
 * - Includes cookies (refresh-token)
 * - Adds header Authorization if accessToken available
 * - When receiving 401 tries a refresh of the token & retries the call
 */
export async function apiFetch(
  url: string,
  opts: RequestInit = {}
): Promise<Response> {
  const res = await fetch(url, {
    ...opts,
    credentials: 'include',
    headers: {
      ...(opts.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  })

  if (res.status === 401) {
    try {
      await refreshAccessToken()
      return apiFetch(url, opts)   // reintenta una vez
    } catch {
      setAccessToken(null)         // refresh falló → expiró sesión
    }
  }

  return res
}
