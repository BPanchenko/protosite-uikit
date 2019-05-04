'use strict';

(function() {

    /* Constants
     ========================================================================== */

    const CLS = Object.create(null, {
        'main': { value: 'c-button' },

        'sm': { value: 'c-button--sm' },
        'lg': { value: 'c-button--lg' },
        'xl': { value: 'c-button--xl' }
    });

    /* Element Class
     ========================================================================== */

    class ButtonElement extends HTMLElement {
        connectedCallback() {
            this.render().cleanup();
        }

        render() {
            let { glyph, glyphAtRight, size, text } = this.dataset;

            this.classList.add(CLS.main);

            if(!this.hasAttribute('type')) this.setAttribute('type', 'button');
            
            if (glyph) this.appendChild(createIconNode(glyph));
            if (glyphAtRight) this.appendChild(createIconNode(glyphAtRight));
            if (text) this.appendChild(createTextNode(text));

            if (~['sm','lg','xl'].indexOf(size)) {
                this.classList.add(CLS[size]);
            } else if (size) {
                console.warn('Size can take values "xs", "sm", "md", "lg" or "xl"');
            }

            return this;
        }

        cleanup() {
            this.removeAttribute('data-glyph');
            this.removeAttribute('data-glyph-at-right');
            this.removeAttribute('data-size');
            this.removeAttribute('data-text');
        }
    }

    class ButtonGroupElement extends HTMLElement {
        connectedCallback() {
            this.classList.add('c-button-group');
        }
    }

    // Private function's

    function createIconNode(glyph) {
        let node = document.createElement('span');
        node.classList.add('c-button__icon');
        node.innerHTML = `<span class="iconic" data-glyph="${glyph}"></span>`;
        return node;
    }

    function createTextNode(text) {
        let node = document.createElement('span');
        node.classList.add('c-button__text');
        node.innerText = text;
        return node;
    }

    // Define the new element

    if (customElements) customElements.define('c-button', ButtonElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.ButtonElement = ButtonElement;

    if (customElements) customElements.define('c-button-group', ButtonGroupElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.ButtonGroupElement = ButtonGroupElement;
}());