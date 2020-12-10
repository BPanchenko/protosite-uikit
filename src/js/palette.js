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
  
  const TPL_COLOR = document.querySelector('.js-tmp-color')


  /* Palette View
   ========================================================================== */

  class PaletteView {
    constructor(container) {
      this.container = container instanceof String ? document.querySelector(container) : container
      console.assert(this.container instanceof HTMLElement, 'Wrong palette container!')

      this.render();
    }

    render() {
      COLORS.forEach((name, key, colors) => {
        console.log(name, key)
        this.container.appendChild(this.createColorElement(name, key))
      })
    }

    createColorElement(name, key) {
      let elem = document.createElement('c-color')
      elem.dataset.name = name
      elem.dataset.key = key
      return elem
    }
  }

  /* Color View
   ========================================================================== */
  
  class ColorElement extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      let content = document.importNode(TPL_COLOR.content, true)

      this.__name = content.querySelector('.js-name')
      this.__tone = content.querySelector('.js-tone')

      this.appendChild(content)
      this.classList.add(`s-bg-${this.dataset.key}`, 'u-flex', 'u-margin')

      this.__name.textContent = this.dataset.name

      console.log(this)
    }

    createTones() {
      // TODO: create list of tone elements
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