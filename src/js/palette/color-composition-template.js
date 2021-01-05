import {
  getPicture,
  renderNineCircles,
  renderTwoSemicircles
} from './pics/_import.js'

// Class of Custom Element
// ==========================================================================

class ColorCompositionTemplate extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    
    this.appendChild(getPicture({
      render: renderTwoSemicircles({
        colors: ['orange', 'pink', 'blue-grey']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderNineCircles({
        colors: ['green-grey', 'yellow', 'red']
      })
    }))
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  static get observedAttributes() {
    return ['data-width', 'data-height']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue === newValue) return null
    console.log('Custom square element attributes changed.', name, oldValue, newValue)
  }
}

export {
  ColorCompositionTemplate
}