(function() {

    const FIELD_CLS = Object.create(null, {
        box: { value: 'c-field-box' },
        button: { value: 'c-field-button' },
        buttonIcon: { value: 'iconic' },
        error: { value: 'c-field-error' },
        field: { value: 'c-field' },
        filled: { value: 'is-filled' },
        focused: { value: 'is-focused' },
        label: { value: 'c-field-label' },
        icon: { value: 'c-field-icon' },
        info: { value: 'c-field-info' },
        invalid: { value: 'is-invalid' },
        valid: { value: 'is-valid' }
    });

    const PATTERN_EMAIL = '^\\S+@\\S+\\.\\S+$';
    const PATTERN_PWD = '^\\w{6,20}$';

    /* Class `FieldElement`
     ========================================================================== */

    class FieldElement extends HTMLElement {

        connectedCallback() {
            this._children = Array.from(this.children);
            this.classList.add(FIELD_CLS.box);

            this.render().cleanup();

            this.addEventListener('click', e => this.focus());
            this._field.addEventListener('blur', e => this.blur());
            this._field.addEventListener('change', e => this.change());
            this._field.addEventListener('focus', e => this.focus());
            this._field.addEventListener('input', e => this.input());
            if(this._button) this._button.addEventListener('click', e => this.clickButton(e));

            this.blur().change();
        }

        // Listeners

        blur() {
            this.isFilled();
            this.classList.remove(FIELD_CLS.focused);
            return this;
        }
        change() {
            this.isFilled();

            switch (this.type) {
                case 'checkbox':
                case 'radio':
                    // TODO: trigger a change event by checked is false
                    this.setAttribute('aria-checked', this._field.checked);
                    break;
                case 'email':
                    this.isValid(PATTERN_EMAIL);
                    break;
                case 'file':
                    // TODO: save value in fake input
                    break;
                case 'password':
                    this.isValid(PATTERN_PWD);
                    break;
                default:
                    if (this.pattern) this.isValid();
            }

            return this;
        }
        clickButton(e) {
            switch (this.type) {
                case 'password':
                case 'text':
                    if(this.buttonGlyph === 'eye-closed') {
                        e.preventDefault();
                        this.buttonGlyph = 'eye-open';
                        this.type = 'text';
                    } else if(this.buttonGlyph === 'eye-open') {
                        e.preventDefault();
                        this.buttonGlyph = 'eye-closed';
                        this.type = 'password';
                    }
                    break;
                case 'search':
                    if (!this.value) {
                        e.preventDefault();
                        this.classList.add(FIELD_CLS.invalid);
                    } else {
                        this.classList.remove(FIELD_CLS.invalid);
                    }
                    break;
            }
            return this;
        }
        focus() {
            if(this.disabled) return false;
            this.classList.add(FIELD_CLS.focused);

            this._field.focus();

            // TODO: fix errors when the type is checkbox or radiobutton
            if(this.isCheckable()) this._field.click();

            return this;
        }
        input() {
            if(this.pattern && !~['email', 'password'].indexOf(this.type)) this.isValid();
            return this;
        }

        // States

        isFilled() {
            let val = this.value;
            let is = !!val && val!=='0' && val!=='null';
            this.classList[ is ? 'add' : 'remove'](FIELD_CLS.filled);
            return is;
        }

        isValid(pattern = null) {
            let val = this.value;
            let ptr = pattern || this.pattern;

            // is exists value and pattern

            if (!val || !ptr) {
                this.classList.remove(FIELD_CLS.invalid, FIELD_CLS.valid);
                return null;
            }

            // check pattern

            let reg = new RegExp(ptr);
            let is = reg.test(val);

            if (is) {
                this.classList.add(FIELD_CLS.valid);
                this.classList.remove(FIELD_CLS.invalid);
            } else {
                this.classList.add(FIELD_CLS.invalid);
                this.classList.remove(FIELD_CLS.valid);
            }

            return is;
        }

        // Rendering

        cleanup() {
            this.removeAttribute('data-button');
            this.removeAttribute('data-button-glyph');
            this.removeAttribute('data-error');
            this.removeAttribute('data-glyph');
            this.removeAttribute('data-glyph-at-right');
            this.removeAttribute('data-label');
            this.removeAttribute('data-info');
            this.removeAttribute('data-info-tooltip');
            this.removeAttribute('data-name');
            this.removeAttribute('data-pattern');
            this.removeAttribute('data-type');
            this.removeAttribute('placeholder');
            return this;
        }
        isCheckable() {
            return ~['radio', 'checkbox'].indexOf(this.type);
        }
        render() {
            if (this.glyph) this._icon = this.renderIcon(this.glyph);
            if (this.label && !this.isCheckable()) this._label = this.renderLabel(this.label);

            this._field = this.renderField();

            if (this.label && this.isCheckable()) this._label = this.renderLabel(this.label);
            if (this.glyphAtRight) this._iconAtRight = this.renderIcon(this.glyphAtRight);
            if (this.button) this._button = this.renderButton({ text: this.button, type: this.buttonType });
            if (this.buttonGlyph) this._button = this.renderButton({ glyph: this.buttonGlyph, type: this.buttonType });
            if (this.error) this._error = this.renderError(this.error);
            if (this.info) this._info = this.renderInfo(this.info);

            this.disabled = this.getAttribute('aria-disabled') === 'true';
            return this;
        }

        renderButton(options) {
            let { glyph, text, type = 'button' } = options;
            let btn = createTag('button', FIELD_CLS.button);
            let inner = createTag('span', glyph ? FIELD_CLS.buttonIcon : '');
            btn.type = type;
            if (glyph) inner.dataset.glyph = glyph;
            if (text) inner.innerText = text;
            btn.appendChild(inner);
            this.appendChild(btn);
            return btn;
        }

        renderError(text) {
            let elem = createTag('span', FIELD_CLS.error, text);
            this.appendChild(elem);
            return elem;
        }

        renderField() {
            let elem = createField({
                children: this._children,
                name: this.name,
                pattern: this.pattern,
                placeholder: this.placeholder,
                type: this.type
            });
            this.appendChild(elem);
            return elem;
        }

        renderIcon(glyph) {
            let elem = createIcon(glyph);
            this.appendChild(elem);
            return elem;
        }

        renderInfo(text) {
            let elem = createTag('span', FIELD_CLS.info, text);
            this.appendChild(elem);
            return elem;
        }

        renderLabel(text) {
            let elem = createTag('span', FIELD_CLS.label, text);
            this.appendChild(elem);
            return elem;
        }

        // Attributes

        get disabled() {
            return this._field.hasAttribute('disabled');
        }
        set disabled(flag) {
            if(flag !== false) {
                this.setAttribute('aria-disabled', true);
                this._field.setAttribute('disabled', 'disabled');
            } else {
                this.setAttribute('aria-disabled', false);
                this._field.removeAttribute('disabled');
            }
        }

        get button() {
            return this.dataset.button || this.getAttribute('button');
        }
        get buttonGlyph() {
            let glyph = this.dataset.buttonGlyph || this.getAttribute('button-glyph');
            if (!glyph && this._button) glyph = this._button.children[0].dataset.glyph;
            return glyph;
        }
        set buttonGlyph(val) {
            if (this._button) this._button.children[0].dataset.glyph = val;
            else this.dataset.buttonGlyph = val;
        }
        get buttonType() {
            return this.dataset.buttonType || this.getAttribute('button-type');
        }

        get error() {
            return this.dataset.error;
        }

        get glyph() {
            return this.dataset.glyph || this.getAttribute('glyph');
        }
        set glyph(val) {
            this.dataset.glyph = val;
            this.renderIcon(val);
        }

        get glyphAtRight() {
            return this.dataset.glyphAtRight || this.getAttribute('glyph-at-right');
        }

        get label() {
            return this.dataset.label || this.getAttribute('label');
        }
        set label(val) {
            this.dataset.glyph = val;
            this.renderLabel(val);
        }

        get info() {
            return this.dataset.info || this.getAttribute('info');
        }
        get name() {
            return this.dataset.name || this.getAttribute('name');
        }
        get pattern() {
            return this.dataset.pattern || this.getAttribute('pattern');
        }
        get placeholder() {
            return this.dataset.placeholder || this.getAttribute('placeholder');
        }
        get type() {
            let type = this.dataset.type || this.getAttribute('type');
            if (!type && this._field) type = this._field.getAttribute('type');
            return type || 'text';
        }
        set type(val) {
            // TODO: reRender this._field
            if (this._field) this._field.setAttribute('type', val);
            else this.dataset.type = val;
        }
        get value() {
            let val;
            if (this._field) val = this._field.value.trim();
            else if (this.dataset.value) val = this.dataset.value.trim();
            else if (this.type == 'text') val = this.innerHTML.trim();
            return val;
        }
    }

    // Private function's

    function createField(options = {}) {
        let { children, name, pattern, placeholder, type = 'text' } = options;
        let node;
        switch (type) {
            case 'select':
                node = document.createElement('select');
                if (children.length) {
                    Array.from(children).forEach(child => {
                        if (child instanceof HTMLOptionElement) node.appendChild(child);
                    });
                }
                break;
            case 'textarea':
                node = document.createElement('textarea');
                break;
            default:
                node = document.createElement('input');
                node.setAttribute('role', type === 'text' ? 'textbox' : type);
                node.setAttribute('type', type);
        }
        node.classList.add('c-field');
        name && node.setAttribute('name', name);
        pattern && node.setAttribute('name', pattern);
        placeholder && node.setAttribute('placeholder', placeholder);
        return node;
    }

    function createIcon(glyph) {
        let node = document.createElement('span');
        node.classList.add(FIELD_CLS.icon);
        node.innerHTML = `<span class="iconic" data-glyph="${glyph}"></span>`;
        return node;
    }

    function createTag(tagName, cls, text) {
        let node = document.createElement(tagName);
        node.classList.add(cls);
        if (text) node.innerText = text;
        return node;
    }

    // Define the new element's

    if (customElements) {
        customElements.define('c-field', FieldElement);
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        exports.FieldElement = FieldElement;
    }
}());