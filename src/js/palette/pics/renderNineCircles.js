import {
  THREE,
  parseColors
} from '../library.js'

const RADIUS = 0.13

function square (color) {
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })

  let shape = new THREE.ShapeGeometry(
    new THREE.Shape([
      new THREE.Vector2(-1, 1),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(1, -1),
      new THREE.Vector2(-1, -1),
      new THREE.Vector2(-1, 1)
    ])
  )

  let mesh = new THREE.Mesh(shape, material)
  mesh.renderOrder = 1

  return mesh
}

function circle (color, x, y, radius = RADIUS) {
  let segments = 64
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })
  let geometry = new THREE.CircleGeometry(radius, segments)

  let mesh = new THREE.Mesh(geometry, material)
  mesh.matrix.setPosition(x, y, 0)
  mesh.matrixAutoUpdate = false
  mesh.renderOrder = 2

  return mesh
}

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(square(colors[0]))
    scene.add(circle(colors[1], -0.618 + RADIUS, 0.618 - RADIUS))
    scene.add(circle(colors[1], 0, 0.618 - RADIUS))
    scene.add(circle(colors[2], 0.618 - RADIUS, 0.618 - RADIUS))
    scene.add(circle(colors[1], -0.618 + RADIUS, 0))
    scene.add(circle(colors[2], 0, 0))
    scene.add(circle(colors[1], 0.618 - RADIUS, 0))
    scene.add(circle(colors[2], -0.618 + RADIUS, -0.618 + RADIUS))
    scene.add(circle(colors[1], 0, -0.618 + RADIUS))
    scene.add(circle(colors[1], 0.618 - RADIUS, -0.618 + RADIUS))
  }
}