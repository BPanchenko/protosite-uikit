import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js'
import * as _ from 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.12.0/underscore-esm-min.min.js'

import { PALETTE } from './settings.js'

let parseColors = list => _.compact(list.map(item => PALETTE.has(item) ? PALETTE.get(item) : null))

function circle(color, x, y, radius = 0.1) {
  let segments = 64
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })
  let geometry = new THREE.CircleGeometry(radius, segments)

  let mesh = new THREE.Mesh(geometry, material)
  mesh.matrix.setPosition(x, y, 0)
  mesh.matrixAutoUpdate = false

  return mesh
}

function lineFromShape(shape, color, { linewidth = 1, linecap = 'round', linejoin =  'round' } = {})  {
  
  shape.autoClose = true

  let points = shape.getPoints()
  let geometry = new THREE.BufferGeometry().setFromPoints(points)
  let material = new THREE.LineBasicMaterial({
    color: `#${color.hex}`,
    linewidth,
    linecap,
    linejoin
  })

  let line = new THREE.Line(geometry, material)

  return line
}

function meshFromShape(shape, color)  {
  shape.autoClose = true
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })
  let geometry = new THREE.ShapeBufferGeometry(shape)
  let mesh = new THREE.Mesh(geometry, material)
  return mesh
}

function square(color, x1 = -1, y1 = 1, x2 = 1, y2 = -1) {
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })

  let shape = new THREE.ShapeGeometry(
    new THREE.Shape([
      new THREE.Vector2(x1, y1),
      new THREE.Vector2(x2, y1),
      new THREE.Vector2(x2, y2),
      new THREE.Vector2(x1, y2),
      new THREE.Vector2(x1, y1)
    ])
  )

  let mesh = new THREE.Mesh(shape, material)

  return mesh
}

function triangle(color, x1, y1, x2, y2, x3, y3) {
  let material = new THREE.MeshBasicMaterial({ color: `#${color.hex}` })
  let shape = new THREE.Shape().moveTo(x1, y1).lineTo(x2, y2).lineTo(x3, y3).lineTo(x1, y1)
  let geometry = new THREE.ShapeBufferGeometry( shape )
  let mesh = new THREE.Mesh(geometry, material)
  return mesh
}

export {
  _,
  PALETTE,
  THREE,
  circle,
  lineFromShape,
  meshFromShape,
  parseColors,
  square,
  triangle
}