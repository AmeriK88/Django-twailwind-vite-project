// src/components/Features.ts
import { fetchTemplates, downloadTemplate } from '../api/templates'
import { getToken } from '../api/auth'

export async function createFeatures(): Promise<HTMLElement> {
  const section = document.createElement('section')
  section.id = 'features'
  section.className = 'py-24 bg-gray-800 text-white'

  // Carga los datos desde el API
  let cardsHtml: string
  try {
    const templates = await fetchTemplates()
    cardsHtml = templates.map(t => `
      <div class="card flex flex-col">
        <img src="${t.thumbnail}" alt="${t.title}" class="mb-4 rounded" />
        <h3 class="text-xl font-semibold mb-2">${t.title}</h3>
        <p class="text-gray-300 mb-4">${t.description}</p>
        <button
          data-url="${t.download_url}"
          class="download-btn px-4 py-2 bg-[var(--btn-grad-from)] rounded disabled:opacity-50"
        >
          Descargar
        </button>
      </div>
    `).join('')
  } catch (err) {
    console.error(err)
    cardsHtml = `
      <p class="text-center text-red-400">
        No se pudieron cargar las plantillas. Intenta de nuevo más tarde.
      </p>
    `
  }

  section.innerHTML = `
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">Plantillas Disponibles</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${cardsHtml}
      </div>
    </div>
  `

  // Función para habilitar/deshabilitar botones según auth
  function updateButtons() {
    const token = getToken()
    section.querySelectorAll<HTMLButtonElement>('.download-btn').forEach(btn => {
      btn.disabled = !token
    })
  }

  // Asigna eventos de descarga y estado inicial
  section.querySelectorAll<HTMLButtonElement>('.download-btn').forEach(btn => {
    const url = btn.dataset.url!
    btn.addEventListener('click', async () => {
      try {
        await downloadTemplate(url)
      } catch (e) {
        alert((e as Error).message)
      }
    })
  })

  // Estado inicial de los botones
  updateButtons()

  // Reaccionar a cambios de autenticación
  window.addEventListener('authChanged', updateButtons)

  return section
}
