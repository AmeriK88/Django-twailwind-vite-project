// src/components/Nav.ts
import { createAuthSection } from './Auth'

export function createNav(): HTMLElement {
  const header = document.createElement('header')
  header.id = 'mainNav'
  header.className =
    'fixed top-0 w-full z-50 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md text-white transition-all'

  // Contenedor interior
  const container = document.createElement('div')
  container.className = 'max-w-7xl mx-auto flex items-center justify-between px-6'

  // 1) Logo / Brand
  const brand = document.createElement('a')
  brand.href = '#'
  brand.className = 'text-2xl font-bold'
  brand.textContent = 'Brand'

  // 2) Nav links (escritorio)
  const navLinks = document.createElement('nav')
  navLinks.className = 'hidden md:flex items-center gap-6'
  navLinks.innerHTML = `
    <a href="#hero"      class="nav-link text-white">Inicio</a>
    <a href="#features"  class="nav-link text-white">Características</a>
    <a href="#proyectos" class="nav-link text-white">Proyectos</a>
    <a href="#contacto"  class="btn-primary px-4 py-2 text-white">Contacto</a>
  `
  // Añade icono 👤 con dropdown
  navLinks.appendChild(createAuthSection())

  // 3) Botón toggle móvil
  const toggleBtn = document.createElement('button')
  toggleBtn.id = 'navToggle'
  toggleBtn.className = 'md:hidden p-1'
  toggleBtn.innerHTML = `
    <svg id="navIcon" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
    </svg>`

  // 4) Off-canvas móvil
  const mobileMenu = document.createElement('nav')
  mobileMenu.id = 'mobileMenu'
  mobileMenu.className = 'hidden md:hidden bg-black/90 backdrop-blur-md text-white'
  mobileMenu.innerHTML = `
    <ul class="flex flex-col gap-4 py-4 px-6">
      <li><a href="#hero"      class="nav-link-mobile">Inicio</a></li>
      <li><a href="#features"  class="nav-link-mobile">Características</a></li>
      <li><a href="#proyectos" class="nav-link-mobile">Proyectos</a></li>
      <li><a href="#contacto"  class="nav-link-mobile">Contacto</a></li>
    </ul>
  `
  // Añade allí también el icono 👤 con su dropdown
  mobileMenu.appendChild(createAuthSection())

  // Ensambla todo
  container.append(brand, navLinks, toggleBtn)
  header.append(container, mobileMenu)

  return header
}
