import {
  circle,
  parseColors,
  square,
  triangle
} from '../library.js'

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 4, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(square(colors[0]))
    scene.add(circle(colors[1], 0, 0, 0.8))
    scene.add(circle(colors[2], 0, 0, 0.4))
    scene.add(triangle(colors[3], -1, -1, 1, -1, 1, 1))
  }
}