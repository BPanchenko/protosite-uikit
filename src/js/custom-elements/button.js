;{

    /* Constants
     ========================================================================== */

    const CLS = Object.create(null, {
        'main': { value: 'c-button' },
        'text': { value: 'c-button__text' },

        'sm': { value: 'c-button--sm' },
        'lg': { value: 'c-button--lg' },
        'xl': { value: 'c-button--xl' }
    })

    /* Element Class
     ========================================================================== */

    class ButtonElement extends HTMLElement {
        constructor() {
            super();
            this.__html = this.innerHTML;
            this.__text = this.textContent;
            this.innerHTML = '';
            this.attachShadow({mode: 'open'});
        }

        connectedCallback() {
            this.render().cleanup()
        }

        render() {
            let { glyph, glyphAtRight, size, text, type } = this.dataset
            
            this._button = createTag('button', CLS.main)
            this._button.classList.add(CLS.main)
            if (this.__html) this._button.innerHTML = this.__html
            if (this.__text) this._button.appendChild(createTag('span', CLS.text, this.__text))

            this.shadowRoot.appendChild(this._button)

            if(!this.hasAttribute('type')) this.setAttribute('type', type || 'button')
            
            if (glyph) this.appendChild(createIconNode(glyph))
            if (glyphAtRight) this.appendChild(createIconNode(glyphAtRight))

            if (~['sm','lg','xl'].indexOf(size)) {
                this.classList.add(CLS[size])
            } else if (size) {
                console.warn('Size can take values "xs", "sm", "md", "lg" or "xl"')
            }

            return this
        }

        cleanup() {
            Object.keys(this.dataset).forEach(prop => delete this.dataset[prop])
            delete this.__html
            delete this.__text
        }
    }

    class ButtonGroupElement extends HTMLElement {
        connectedCallback() {
            this.classList.add('c-button-group')
        }
    }

    // Private function's

    function createIconNode(glyph) {
        let node = document.createElement('span')
        node.classList.add('c-button__icon')
        node.innerHTML = `<span class="iconic" data-glyph="${glyph}"></span>`
        return node
    }

    function createTag(tagName, cls, text) {
        let node = document.createElement(tagName)
        node.classList.add(cls)
        if (text) node.innerText = text
        return node
    }

    // Define the new element

    if (customElements) customElements.define('c-button', ButtonElement)
    if (typeof exports != 'undefined' && !exports.nodeType) exports.ButtonElement = ButtonElement

    if (customElements) customElements.define('c-button-group', ButtonGroupElement)
    if (typeof exports != 'undefined' && !exports.nodeType) exports.ButtonGroupElement = ButtonGroupElement
}