import {
  THREE,
  lineFromShape,
  square,
  parseColors
} from '../library.js'

const LINE_WIDTH = 2

export default function ({ colors }) {
  colors = parseColors(colors)
  console.assert(colors.length === 4, `Wrong amount of colors: ${JSON.stringify(colors)}`)

  return function (scene) {
    scene.add(square(colors[0], -1, 1, 1, 0))
    scene.add(square(colors[2], -1, 0, 1, -1))

    //

    scene.add(lineFromShape(
      new THREE.Shape().arc(-1, 0.5, 0.5, 0, Math.PI * 2),
      colors[1], { linewidth: LINE_WIDTH }
    ))

    scene.add(lineFromShape(
      new THREE.Shape().arc(0, 0.5, 0.5, 0, Math.PI * 2),
      colors[1], { linewidth: LINE_WIDTH }
    ))

    scene.add(lineFromShape(
      new THREE.Shape().arc(1, 0.5, 0.5, 0, Math.PI * 2),
      colors[1], { linewidth: LINE_WIDTH }
    ))

    //

    scene.add(lineFromShape(
      new THREE.Shape().arc(-1, -0.5, 0.5, 0, Math.PI * 2),
      colors[3], { linewidth: LINE_WIDTH }
    ))

    scene.add(lineFromShape(
      new THREE.Shape().arc(0, -0.5, 0.5, 0, Math.PI * 2),
      colors[3], { linewidth: LINE_WIDTH }
    ))

    scene.add(lineFromShape(
      new THREE.Shape().arc(1, -0.5, 0.5, 0, Math.PI * 2),
      colors[3], { linewidth: LINE_WIDTH }
    ))

  }
}