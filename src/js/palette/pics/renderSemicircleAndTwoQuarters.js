import {
  THREE,
  circle,
  meshFromShape,
  parseColors,
  square
} from '../library.js'

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 4, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(square(colors[0]))
    scene.add(circle(colors[1], -1, 0, 1))
    scene.add(circle(colors[2], 1, 0, 1))
    scene.add(meshFromShape(
      new THREE.Shape().moveTo(0, 0).arc(1, 0, 1, Math.PI, Math.PI * 1.5).lineTo(1,0).lineTo(0,0),
      colors[3]
    ))
  }
}