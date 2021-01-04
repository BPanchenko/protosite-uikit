
import {
  COLORS,
  PALETTE
} from './settings.js'

import {
  getPicture,
  renderNineCircles
} from './pics/_import.js'

// Class of Custom Element
// ==========================================================================

class ColorCompositionTemplate extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.appendChild(getPicture({
      render: renderNineCircles({
        colors: new Set([
          PALETTE.get('green-grey'),
          PALETTE.get('yellow'),
          PALETTE.get('red')
        ])
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
    console.log('Custom square element attributes changed.', name, oldValue, newValue);
  }
}

export {
  ColorCompositionTemplate
}