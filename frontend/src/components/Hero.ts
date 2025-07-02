// src/components/Hero.ts
export function createHero(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'hero'
  section.className = 'relative h-screen flex items-center justify-center overflow-hidden'
  section.innerHTML = `
    <canvas id="scene" class="absolute inset-0 w-full h-full z-0"></canvas>
    <div class="absolute inset-0 bg-black/20 z-10"></div>
    <div class="container mx-auto px-6 text-center space-y-6 relative z-20">
      <h1 class="hero-title text-5xl md:text-6xl font-extrabold drop-shadow-lg">
        Innovating Beyond <span class="text-[var(--btn-grad-from)]">Boundaries</span>
      </h1>
      <p class="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
        Creamos experiencias 3D inmersivas que transforman tu presencia web.
      </p>
      <div
        class="hero-buttons flex flex-col md:flex-row items-center justify-center gap-6"
      >
        <a
          href="#features"
          class="px-8 py-3 font-medium rounded-lg bg-gradient-to-r from-[var(--btn-grad-from)] to-[var(--btn-grad-to)] shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Ver características
        </a>
        <a
          href="#contacto"
          class="px-8 py-3 font-medium rounded-lg bg-transparent border-2 border-[var(--btn-grad-from)] hover:bg-[var(--btn-grad-from)] hover:text-black transition-all duration-300"
        >
          Contáctanos
        </a>
      </div>
    </div>
  `
  return section
}
