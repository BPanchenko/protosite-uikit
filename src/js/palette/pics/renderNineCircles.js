import {
  THREE,
  parseColors
} from '../library.js'

const RADIUS = 0.2

function background (color) {

  const material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })

  const shape = new THREE.ShapeGeometry(
    new THREE.Shape([
      new THREE.Vector2(-1, 1),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(1, -1),
      new THREE.Vector2(-1, -1),
      new THREE.Vector2(-1, 1)
    ])
  )

  const mesh = new THREE.Mesh(shape, material)
  mesh.renderOrder = 1
  
  return mesh
}

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(background(colors[0]))
  }
}