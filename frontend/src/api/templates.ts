// src/api/templates.ts
import { apiFetch } from './http'   //  ← helper centralizado

export interface Template {
  id: number
  title: string
  description: string
  thumbnail: string
  download_url: string
}

/** Lista de plantillas */
export async function fetchTemplates(): Promise<Template[]> {
  const res = await apiFetch('/api/plantillas/')
  if (!res.ok) throw new Error('Error al obtener plantillas')
  return res.json()
}

/** Descarga el ZIP de una plantilla protegida */
export async function downloadTemplate(url: string): Promise<void> {
  // «url» ya es algo como "/api/plantillas/3/download/"
  const res = await apiFetch(url)
  if (!res.ok) {
    if (res.status === 401) throw new Error('Debes iniciar sesión')
    throw new Error('Error al descargar')
  }

  const blob = await res.blob()
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: url.split('/').pop() || 'plantilla.zip'
  })
  document.body.append(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(a.href)
}
