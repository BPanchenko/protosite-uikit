import {
  parseColors,
  triangle
} from '../library.js'

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 4, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(triangle(colors[0], -1, 1, 1, 1, 0, 0))
    scene.add(triangle(colors[1], 1, 1, 1, -1, 0, 0))
    scene.add(triangle(colors[2], 1, -1, -1, -1, 0, 0))
    scene.add(triangle(colors[3], -1, -1, -1, 1, 0, 0))
  }
}