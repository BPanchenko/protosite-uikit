'use strict';

(function() {

    class ButtonElement extends HTMLElement {
        connectedCallback() {
            this.classList.add('c-button');
            if(!this.hasAttribute('type')) this.setAttribute('type', 'button');

            if (this.dataset.glyph) {
                this.appendChild(createIconNode(this.dataset.glyph));
                delete this.dataset.glyph;
            }

            if (this.dataset.text) {
                this.appendChild(createTextNode(this.dataset.text));
                delete this.dataset.text;
            }

            if (this.dataset.glyphAtRight) {
                this.appendChild(createIconNode(this.dataset.glyphAtRight));
                delete this.dataset.glyphAtRight;
            }
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