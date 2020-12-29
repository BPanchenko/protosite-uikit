
class COLORS extends Map {
  static get [Symbol.species]() { return Map; }
}

class PALETTE extends COLORS {
  static get [Symbol.species]() { return Map; }
}

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

const RENDER = function () {

}

class ColorCompositionTemplate extends HTMLElement {

}

export default {
  ColorCompositionTemplate
}