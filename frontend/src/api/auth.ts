// src/api/auth.ts

import { apiFetch, setAccessToken, getAccessToken } from './http'

interface TokenPair {
  access: string
  refresh: string
}

/** Requests JWT & saves it in memmory */
export async function login(username: string, password: string) {
  const res = await apiFetch('/api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  if (!res.ok) throw new Error('Invalid credentials')
  const data = (await res.json()) as TokenPair
  setAccessToken(data.access)
}

/** Deletes token in memmory & revokes refresh-token backend */
export function logout() {
  fetch('/api/logout/', { method: 'POST', credentials: 'include' })
    .catch(() => null)
  setAccessToken(null)
}

/** Returns active/actual access-token (or null if no session found) */
export function getToken() {
  return getAccessToken()
}
