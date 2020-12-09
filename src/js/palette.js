;{

  /* Constants
   ========================================================================== */
  
  const COLORS = new Map([
    ['red', 'Red'],
    ['pink', 'Pink'],
    ['purple', 'Purple'],
    ['violet', 'Violet (Deep Purple)'],
    ['indigo', 'Indigo'],
    ['blue', 'Blue'],
    ['light-blue', 'Light Blue'],
    ['cyan', 'Cyan'],
    ['teal', 'Teal'],
    ['green', 'Green'],
    ['light-green', 'Light Green'],
    ['lime', 'Lime'],
    ['yellow', 'Yellow'],
    ['amber', 'Amber'],
    ['orange', 'Orange'],
    ['deep-orange', 'Deep Orange'],
    ['brown', 'Brown'],
    ['grey', 'Grey'],
    ['blue-grey', 'Blue Grey'],
    ['black', 'Black'],
    ['white', 'White']
  ])
  


  /* Palette View
   ========================================================================== */

  class PaletteView {
    constructor(container) {
      if (container instanceof String) container = document.querySelector(container)
      console.assert(container instanceof HTMLElement, 'Wrong palette container!')

      this.render();
    }

    render() {
      console.log('render()', COLORS);
    }
  }

  /* Color View
   ========================================================================== */
  
  class ColorElement extends HTMLElement {
    constructor() {
      super();
    }

    render() {

    }
  }

  /* Declarations
   ========================================================================== */

  customElements.define('c-color', ColorElement)

  /* Render View
   ========================================================================== */

  let palette = new PaletteView(document.querySelector('.js-palette-container'))

  console.log(palette)
}