import {
  THREE,
  parseColors,
  square
} from '../library.js'

const THICK = 1
const CNT_LINES = 8

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 2, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  let dx = 2 / CNT_LINES

  return function (scene) {
    scene.add(square(colors[0]))

    var material = new THREE.LineBasicMaterial({ color: `#${colors[1].hex}` })
    var geometry, points, line

    for(let i = -CNT_LINES / 2; i <= CNT_LINES / 2; ++i) {
      points = [
        new THREE.Vector3(i*dx, 1, 0 ),
        new THREE.Vector3(i*dx, -1, 0 )
      ]
      geometry = new THREE.BufferGeometry().setFromPoints(points)
      line = new THREE.Line(geometry, material)
      scene.add(line)
    }
  }
}