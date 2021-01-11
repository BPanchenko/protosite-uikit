import {
  getPicture,

  renderColumns,
  renderFilm,
  renderFrontSight,
  renderQuarterCircle,
  renderNineCircles,
  renderPyramid,
  renderRecord,
  renderSquares,
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
      render: renderNineCircles({
        colors: ['teal', 'light-green', 'light-green']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderPyramid({
        colors: ['orange', 'lime', 'blue-grey', 'pink']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderQuarterCircle({
        colors: ['indigo', 'violet', 'amber']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderSquares({
        colors: ['white', 'blue', 'green']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderRecord({
        colors: ['grey', 'cyan', 'lime']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderFilm({
        colors: ['brown', 'black', 'light-green', 'light-blue']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderFrontSight({
        colors: ['deep-orange', 'white', 'purple']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderTwoSemicircles({
        colors: ['orange', 'pink', 'blue-grey']
      })
    }))
    
    this.appendChild(getPicture({
      render: renderColumns({
        colors: ['teal', 'amber']
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