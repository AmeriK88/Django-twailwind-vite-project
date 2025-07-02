// src/components/Auth.ts
import { login, logout, getToken } from '../api/auth'

export function createAuthSection(): HTMLElement {
  // Wrapper relativo para posicionar el dropdown/form
  const wrapper = document.createElement('div')
  wrapper.className = 'relative'

  // 1) Siempre ponemos el botón-icono
  const btn = document.createElement('button')
  btn.innerHTML = '👤'
  btn.title = 'Acceso'
  btn.className = 'ml-4 p-1 hover:bg-gray-700 rounded text-white'
  wrapper.appendChild(btn)

  // 2) Contenedor del formulario, oculto por defecto
  const dropdown = document.createElement('div')
  dropdown.className =
    'absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded shadow-lg p-4 hidden z-50'
  wrapper.appendChild(dropdown)

  // 3) Función que renderiza login o logout dentro del dropdown
  function render() {
    dropdown.innerHTML = ''
    const token = getToken()

    if (token) {
      const outBtn = document.createElement('button')
      outBtn.textContent = 'Cerrar sesión'
      outBtn.className =
        'w-full px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white'
      outBtn.addEventListener('click', () => {
        logout()
        window.dispatchEvent(new CustomEvent('authChanged'))
        render()
        dropdown.classList.add('hidden')
      })
      dropdown.append(outBtn)

    } else {
      const user = document.createElement('input')
      user.type = 'text'
      user.placeholder = 'Usuario'
      user.className =
        'w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none'

      const pass = document.createElement('input')
      pass.type = 'password'
      pass.placeholder = 'Contraseña'
      pass.className = user.className

      const submit = document.createElement('button')
      submit.textContent = 'Entrar'
      submit.className =
        'w-full mt-2 px-3 py-2 bg-[var(--btn-grad-from)] rounded text-black'
      submit.addEventListener('click', async () => {
        try {
          await login(user.value, pass.value)
          window.dispatchEvent(new CustomEvent('authChanged'))
          render()
          dropdown.classList.add('hidden')
        } catch (e) {
          alert((e as Error).message)
        }
      })

      dropdown.append(user, pass, submit)
    }
  }

  render()

  // 4) Toggle: siempre abre/cierra el formulario
  btn.addEventListener('click', e => {
    e.stopPropagation()
    dropdown.classList.toggle('hidden')
  })

  // 5) Cerrar si clicas fuera
  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target as Node)) {
      dropdown.classList.add('hidden')
    }
  })

  // 6) Y actualiza el contenido al hacer login/logout
  window.addEventListener('authChanged', () => {
    render()
    dropdown.classList.add('hidden')
  })

  return wrapper
}
