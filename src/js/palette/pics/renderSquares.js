import {
  parseColors,
  triangle,
  square
} from '../library.js'

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(square(colors[0]))
    scene.add(square(colors[1], -1, 0, 0, -1))
    scene.add(square(colors[1], 0, 1, 1, 0))
    scene.add(triangle(colors[2], 0, 0, 0, 1, 1, 0))
    scene.add(triangle(colors[2], 0, 0, 0, -1, -1, 0))
  }
}