// src/api/templates.ts
import { getToken } from './auth'

export interface Template {
  id: number
  title: string
  description: string
  thumbnail: string
  download_url: string
}

const API_BASE = 'http://127.0.0.1:8000'

export async function fetchTemplates(): Promise<Template[]> {
  const res = await fetch(`${API_BASE}/api/plantillas/`)
  if (!res.ok) throw new Error('Error al obtener plantillas')
  return res.json()
}

// opcional: función para descargar vía fetch si necesitas control
export async function downloadTemplate(url: string): Promise<void> {
  const token = getToken()
  if (!token) throw new Error('No autorizado')
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Error al descargar')
  const blob = await res.blob()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = url.split('/').pop()!
  document.body.appendChild(a)
  a.click()
  a.remove()
}
