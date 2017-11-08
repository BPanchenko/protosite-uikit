(function() {

    const ButtonElement = document.registerElement('c-button', {
        prototype: Object.create(HTMLButtonElement.prototype, {
            attachedCallback: {
                value: function() {
                    console.log('attachedCallback', this, arguments);
                }
            },
            attributeChangedCallback: {
                value: function() {
                    console.log('attributeChangedCallback', this, arguments);
                }
            },
            createdCallback: {
                value: function() {
                    let text = this.innerText;
                    let html = `<span class="c-button__text">${text}</span>`;

                    if(this.hasAttribute('data-glyph')) {
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
            },
            detachedCallback: {
                value: function() {
                    console.log('detachedCallback', this, arguments);
                }
            }
        })
    });

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this || {};

    root.ButtonElement = ButtonElement;
})();