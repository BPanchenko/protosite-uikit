
import * as renderSquare from './pics/square.js'

// Utilities
// ==========================================================================

function createItemElement(item) {
  let content = document.importNode(TPL.content, true)
  content.querySelector('.js-title').innerHTML = item.title
  content.querySelector('.js-description').innerHTML = item.description
  content.querySelector('.js-text').innerHTML = item.text

  let elem = document.createElement('div')
  elem.classList.add('c-list__item', 'o-fallacy-container')
  elem.appendChild(content)

  return (item.elem = elem)
}

const RENDER = function (colorCompositionElement) {
  console.log('RENDER =>', COLORS)
  COLORS.forEach (color =>  {
    console.log(color)
  })
}

// Class of Custom Element
// ==========================================================================

class ColorCompositionTemplate extends HTMLElement {
  constructor() {
    super()
    let shadow = this.attachShadow({mode: 'open'})
    console.log(this, shadow)
  }
  connectedCallback() {
    console.log('Custom square element added to page.');
    updateStyle(this);
  }
}

// @Private
// ==========================================================================

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
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
  RENDER
}