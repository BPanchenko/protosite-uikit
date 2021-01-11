import {
    THREE,
    lineFromShape,
    square,
    parseColors
  } from '../library.js'
  
  const RADIUS = 0.5
  
  export default function ({ colors }) {
    colors = parseColors(colors)
    console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)
  
    return function (scene) {
      scene.add(square(colors[0]))

      let shape = new THREE.Shape().arc(0, 0, RADIUS, 0, Math.PI * 2)
      scene.add(lineFromShape(shape, colors[1]))

      scene.add(square(colors[2], 0, 1, 1, 0))
      scene.add(square(colors[2], -1, 0, 0, -1))
    }
  }