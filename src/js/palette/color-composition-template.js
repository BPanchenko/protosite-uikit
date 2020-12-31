
import {
  COLORS,
  PALETTE
} from './settings.js'

import {
  getPicture,
  renderSquare
} from './pics/_import.js'

// Utilities
// ==========================================================================

function RENDER (container) {
  renderSquare()
}

// Class of Custom Element
// ==========================================================================

class ColorCompositionTemplate extends HTMLElement {
  constructor(options) {
    super(options)
    let shadow = this.attachShadow({mode: 'open'})
    console.log(options, shadow)
  }

  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }

}

// @Private
// ==========================================================================

function updateStyle (elem) {
  const shadow = elem.shadowRoot
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

export {
  ColorCompositionTemplate,
  RENDER,
  PALETTE
}