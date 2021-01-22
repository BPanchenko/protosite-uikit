import {
    THREE,
    circle,
    lineFromShape,
    square,
    parseColors
  } from '../library.js'

  const DR = 0.5
  const LINE_WIDTH = 2
  
  export default function ({ colors }) {
    colors = parseColors(colors)
    console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)
  
    return function (scene) {
      scene.add(square(colors[0]))
      scene.add(circle(colors[1], -1,1, 2))

      for (let shape, r = DR; r < 2; r += DR ) {
        shape = new THREE.Shape().arc(-1, 1, r, 0, Math.PI * 2)
        scene.add(lineFromShape(shape, colors[2], { linewidth: LINE_WIDTH }))
      }

    }
  }