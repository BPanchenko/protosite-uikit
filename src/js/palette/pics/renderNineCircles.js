import {
  THREE,
  parseColors
} from '../library.js'

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {

  }
}