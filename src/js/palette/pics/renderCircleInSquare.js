import {
    circle,
    square,
    parseColors
  } from '../library.js'
  
  const RADIUS = 0.13
  
  export default function ({ colors }) {
    colors = parseColors(colors)
    console.assert(colors.length === 3, `Wrong amount of colors: ${JSON.stringify(colors)}`)
  
    return function (scene) {
      scene.add(square(colors[0]))
      scene.add(square(colors[1], -0.7, 0.7, 0.7, -0.7))
      scene.add(circle(colors[2], 0, 0, 0.4))
    }
  }