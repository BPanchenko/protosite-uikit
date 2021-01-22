import { THREE } from '../library.js'

export default function ({
    render,
    width = 200,
    height = 200
}) {

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFDF6E5)

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1)
  camera.position.set(0, 0, 10)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  renderer.setClearColor(new THREE.Color(0xEEEEEE))
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true

  scene.add(camera)
  render(scene)
  
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)

  renderer.domElement.removeAttribute('style')
  renderer.domElement.classList.add('c-picture')

  return renderer.domElement
}