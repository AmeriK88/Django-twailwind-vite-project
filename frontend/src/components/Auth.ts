// src/components/Auth.ts
import { login, logout, getToken } from '../api/auth'

export function createAuthSection(): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'relative'

  const btn = document.createElement('button')
  btn.innerHTML = '👤'
  btn.title = 'Acceso'
  btn.className = 'ml-4 p-1 hover:bg-gray-700 rounded text-white'
  wrapper.appendChild(btn)

  const dropdown = document.createElement('div')
  dropdown.className =
    'absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded shadow-lg p-4 hidden z-50'
  wrapper.appendChild(dropdown)

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
      // Genera un sufijo único por instancia
      const uid = Math.random().toString(36).slice(2, 8)

      // Usuario
      const userLabel = document.createElement('label')
      userLabel.textContent = 'Usuario'
      userLabel.className = 'sr-only'
      userLabel.htmlFor = `auth-username-${uid}`

      const user = document.createElement('input')
      user.type = 'text'
      user.id = `auth-username-${uid}`
      user.name = 'username'
      user.autocomplete = 'username'
      user.placeholder = 'Usuario'
      user.className =
        'w-full mb-2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none'

      // Contraseña
      const passLabel = document.createElement('label')
      passLabel.textContent = 'Contraseña'
      passLabel.className = 'sr-only'
      passLabel.htmlFor = `auth-password-${uid}`

      const pass = document.createElement('input')
      pass.type = 'password'
      pass.id = `auth-password-${uid}`
      pass.name = 'password'
      pass.autocomplete = 'current-password'
      pass.placeholder = 'Contraseña'
      pass.className = user.className

      // Botón Entrar
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

      dropdown.append(userLabel, user, passLabel, pass, submit)
    }
  }

  render()

  btn.addEventListener('click', e => {
    e.stopPropagation()
    dropdown.classList.toggle('hidden')
  })

  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target as Node)) {
      dropdown.classList.add('hidden')
    }
  })

  window.addEventListener('authChanged', () => {
    render()
    dropdown.classList.add('hidden')
  })

  return wrapper
}
