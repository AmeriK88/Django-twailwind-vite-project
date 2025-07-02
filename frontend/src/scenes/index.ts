// src/scenes/index.ts
import * as THREE from 'three'
import { EffectComposer }         from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass }             from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass }             from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader }             from 'three/examples/jsm/shaders/FXAAShader.js'
import { UnrealBloomPass }        from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const vertexShader = /* glsl */`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */`
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x)
         + (c - a) * u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float t = uTime * 0.2;
    float n = noise((uv + vec2(t)) * 3.0) * 0.5;
    vec3 color = mix(
      vec3(0.0, 0.1, 0.2),
      vec3(0.0, 0.4, 0.6),
      uv.y + n
    );
    gl_FragColor = vec4(color, 1.0);
  }
`

export function startScene() {
  const canvas = document.getElementById('scene') as HTMLCanvasElement

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Scene & Camera
  const scene  = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // Shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uRes:  { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader,
    fragmentShader
  })

  // Fullscreen quad
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material))

  // Post-processing
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const fxaaPass = new ShaderPass(FXAAShader)
  fxaaPass.material.uniforms['resolution'].value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  )
  composer.addPass(fxaaPass)

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.3, 1.0, 0.6
  )
  composer.addPass(bloomPass)

  // Animate
  const clock = new THREE.Clock()
  function animate() {
    requestAnimationFrame(animate)
    material.uniforms.uTime.value = clock.getElapsedTime()
    composer.render()
  }
  animate()

  // Resize handler
  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight
    renderer.setSize(w, h)
    composer.setSize(w, h)
    material.uniforms.uRes.value.set(w, h)
    fxaaPass.material.uniforms['resolution'].value.set(1/w, 1/h)
    bloomPass.setSize(w, h)
  })
}
