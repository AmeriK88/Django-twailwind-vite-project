// src/api/auth.ts

interface TokenPair {
  access: string
  refresh: string
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    console.error('Login fallido:', res.status, err)
    throw new Error('Usuario o contraseña inválidos')
  }
  const data = (await res.json()) as TokenPair
  localStorage.setItem('token', data.access)
  // AVISA al resto de la app que ha cambiado el estado de autenticación
  window.dispatchEvent(new CustomEvent('authChanged'))
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function logout(): void {
  localStorage.removeItem('token')
  // AVISA al resto de la app que ha cambiado el estado de autenticación
  window.dispatchEvent(new CustomEvent('authChanged'))
}
