// src/components/HowItWorks.ts
import registerIcon from '../assets/icons/register.svg'
import exploreIcon  from '../assets/icons/explore.svg'
import downloadIcon from '../assets/icons/download.svg'
import integrateIcon from '../assets/icons/integrate.svg'

export function createHowItWorks(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'how-it-works'
  section.className = 'relative z-20 py-24 bg-blue-900 text-white overflow-hidden'

  // Usa aquí los iconos importados y los títulos
  const steps = [
    { icon: registerIcon,  title: 'Regístrate' },
    { icon: exploreIcon,   title: 'Explora'    },
    { icon: downloadIcon,  title: 'Descarga'   },
    { icon: integrateIcon, title: 'Integra'    },
  ]

  section.innerHTML = `
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold mb-12">¿Cómo funciona?</h2>
      <div class="how-wheel relative w-full h-64 mx-auto">
        ${steps.map((step, i) => `
          <div class="wheel-item" style="--i:${i}">
            <div class="item-content bg-gray-800 bg-opacity-50 p-4 rounded flex flex-col items-center">
              <img src="${step.icon}" 
                   alt="${step.title}" 
                   class="icon w-16 h-16 mb-2 transform rotate-x-15 drop-shadow-lg"
              />
              <h3 class="font-semibold">${step.title}</h3>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
  return section
}
