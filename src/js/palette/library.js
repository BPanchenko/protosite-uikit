import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js'
import * as _ from 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.12.0/underscore-esm-min.min.js'

import { PALETTE } from './settings.js'

let parseColors = list => _.compact(list.map(item => PALETTE.has(item) ? PALETTE.get(item) : null))

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

  return mesh
}

function circle (color, x, y, radius = 0.1) {
  let segments = 64
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })
  let geometry = new THREE.CircleGeometry(radius, segments)

  let mesh = new THREE.Mesh(geometry, material)
  mesh.matrix.setPosition(x, y, 0)
  mesh.matrixAutoUpdate = false

  return mesh
}

export {
  _,
  PALETTE,
  THREE,
  circle,
  square,
  parseColors
}