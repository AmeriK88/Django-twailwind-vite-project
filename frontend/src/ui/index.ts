// src/ui/index.ts
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function initUI() {
  // Elementos del menú móvil
  const navToggle = document.getElementById('navToggle')!
  const mobileMenu = document.getElementById('mobileMenu')!
  const navIcon = document.getElementById('navIcon')!

  // Toggle móvil
  navToggle.addEventListener('click', () => {
    const open = !mobileMenu.classList.toggle('hidden')
    navIcon.setAttribute(
      'd',
      open
        ? 'M6 18L18 6M6 6l12 12'
        : 'M4 6h16M4 12h16M4 18h16'
    )
  })

  // Cerrar menú al pulsar un link mobile
  document.querySelectorAll<HTMLElement>('.nav-link-mobile').forEach(link =>
    link.addEventListener('click', () => navToggle.click())
  )

  // ScrollSpy: resalta el enlace activo según sección en viewport
  const sections = document.querySelectorAll<HTMLElement>('section[id]')
  const navLinks = document.querySelectorAll<HTMLElement>('.nav-link, .nav-link-mobile')
  function onScroll() {
    const offset = window.scrollY + 80
    sections.forEach(sec => {
      const id = sec.id
      const start = sec.offsetTop
      const end = sec.offsetTop + sec.offsetHeight
      const isActive = offset >= start && offset < end
      navLinks.forEach(link => {
        const href = link.getAttribute('href')
        link.classList.toggle(
          'text-[var(--btn-grad-from)]',
          isActive && href === `#${id}`
        )
      })
    })
  }
  window.addEventListener('scroll', onScroll)
  onScroll()

  // Animaciones GSAP para header y enlaces
  gsap.from('header', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  })
  gsap.from('.nav-link', {
    y: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.2
  })

  // Cambia fondo y sombra del Nav al hacer scroll
  gsap.to('#mainNav', {
    backgroundColor: 'rgba(15,23,42,0.9)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    scrollTrigger: {
      trigger: '#hero',
      start: 'bottom top',
      toggleActions: 'play reverse play reverse'
    }
  })

  // Animaciones del Hero
  gsap.from('.hero-title', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  })
  gsap.from('.hero-subtitle', {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'power3.out'
  })
  gsap.from('.hero-buttons a', {
    opacity: 0.8,
    delay: 0.2,
    duration: 0.6,
    ease: 'power2.out'
  })

  // Ajusta patrón hexagonal según scroll en Features
  ScrollTrigger.create({
    trigger: '#features',
    start: 'top bottom',
    onEnter: () =>
      document.documentElement.style.setProperty('--hex-alpha', '0.4'),
    onLeaveBack: () =>
      document.documentElement.style.setProperty('--hex-alpha', '0.12')
  })

  // ------------------------------------------------------------
  // Animación 3D “rueda” en HowItWorks más suave y sin “atascos”
  const nav       = document.getElementById('mainNav')!
  const navHeight = nav.offsetHeight
  const section   = document.getElementById('how-it-works')!
  const sectionHeight = section.offsetHeight

  gsap.to('.how-wheel', {
    rotationY: 360,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '#how-it-works',
      start: () => `top ${navHeight}px`,
      end:   () => `+=${sectionHeight * 1.5}`,  // 1.5× la altura
      scrub: 0.5,            // seguimiento algo más ágil
      pin: true,             // fija la sección
      pinSpacing: true,      // crea el padding para no solapar
      anticipatePin: 1,
      invalidateOnRefresh: true         // recalcula tamaños en resize
    }
  })
}
