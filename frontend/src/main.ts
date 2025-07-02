// src/main.ts

import '@google/model-viewer';

import './styles/globals.css'
import { createNav }      from './components/Nav'    
import { createHowItWorks } from './components/HowItWorks'
import { createHero }     from './components/Hero'
import { createFeatures } from './components/Features'
import { initUI }         from './ui'
import { startScene }     from './scenes'

async function bootstrap() {
  const app = document.getElementById('app')!
  app.classList.add('pt-16')
  app.innerHTML = ''

  app.append(
    createNav(),
    createHero(),
    createHowItWorks(),
    await createFeatures()
  )

  initUI()
  startScene()
}

document.addEventListener('DOMContentLoaded', bootstrap)

