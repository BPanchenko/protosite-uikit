import { PALETTE } from '../settings.js'
import { THREE } from '../library.js'

export default function ({ colors }) {
  colors.forEach((color, index) => colors[index] = PALETTE.get(color))
  
  return function (scene) {

  }
}