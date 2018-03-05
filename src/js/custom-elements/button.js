(function() {

    class ButtonElement extends HTMLElement {

        connectedCallback() {
            this.render();
        }

        render() {
            let text = this.innerText;
            let html = `<span class="c-button__text">${text}</span>`;

            if (this.hasAttribute('data-glyph')) {
                let glyph = this.getAttribute('data-glyph');
                html = `<span class="c-button__icon">
                                    <i class="iconic" data-glyph="${glyph}"></i>
                                </span>` + html;
            }

            this.classList.add('c-button');
            this.hasAttribute('s-danger') && this.classList.add('s-danger');
            this.hasAttribute('s-primary') && this.classList.add('s-primary');
            this.hasAttribute('s-success') && this.classList.add('s-success');
            this.hasAttribute('s-warning') && this.classList.add('s-warning');

            if(!this.hasAttribute('type')) this.setAttribute('type', 'button');

            this.innerHTML = html;
        }

    }

    if (customElements) {
        customElements.define('c-button', ButtonElement);
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        exports.ButtonElement = ButtonElement;
    }
}());