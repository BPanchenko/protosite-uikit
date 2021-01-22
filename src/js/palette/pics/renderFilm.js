import {
    circle,
    square,
    parseColors
  } from '../library.js'
  
  const RADIUS = 0.12
  
  export default function ({ colors }) {
    colors = parseColors(colors)
    console.assert(colors.length === 4, `Wrong amount of colors: ${JSON.stringify(colors)}`)
  
    return function (scene) {

      scene.add(square(colors[0], -1, 1, 1, 0)) // bg top
      scene.add(circle(colors[2], -1, 0.5, RADIUS))
      scene.add(circle(colors[2], -0.5, 0.5, RADIUS))
      scene.add(circle(colors[2], 0, 0.5, RADIUS))
      scene.add(circle(colors[2], 0.5, 0.5, RADIUS))
      scene.add(circle(colors[2], 1, 0.5, RADIUS))

      scene.add(square(colors[1], 0, 0, 1, -1)) // bg right bottom
      scene.add(circle(colors[3], 0, -1, 1)) // circle right bottom (last)

      scene.add(square(colors[1], -1, 0, 0, -1)) // bg left bottom
      scene.add(circle(colors[2], -1, -1, 1)) // circle left bottom
    }
  }