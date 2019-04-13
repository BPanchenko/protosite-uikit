'use strict';

/**
 * Component: `c-thumbnail`
 *
 * Markup: <c-thumbnail
 *              data-src="..."
 *              data-href="..."
 *              data-size="xsmall|small|medium|large|xlarge"
 *              data-shadow="inset|2dp|3dp|4dp|6dp|8dp|16dp|24dp"
 * />
 */

(function() {

    /* Constants
     ========================================================================== */

    const CLS = Object.create(null, {
        'main': { value: 'c-thumbnail' },

        'caption': { value: 'c-thumbnail__caption' },
        'link': { value: 'c-thumbnail__link' },
        'img': { value: 'c-thumbnail__image' },
        'shutter': { value: 'c-thumbnail__shutter' },
        'xs': { value: 'c-thumbnail--xs' },
        'sm': { value: 'c-thumbnail--sm' },
        'md': { value: 'c-thumbnail--md' },
        'lg': { value: 'c-thumbnail--lg' },
        'xl': { value: 'c-thumbnail--xl' }
    });

    /* Element Class
     ========================================================================== */

    class AvatarElement extends HTMLElement {
        connectedCallback() {
            this.render().cleanup();
        }

        render() {
            let { src, href, size, target } = this.dataset;
            let text = this.innerText;
            this.innerHTML = '';

            this.classList.add(CLS.main);
            
            if (~['xs','sm','md','lg','xl'].indexOf(size)) {
                this.classList.add(CLS[size]);
            } else if (size) {
                console.warn('Size can take values "xs", "sm", "md", "lg" or "xl"');
            }

            let container = this;
            
            if (href) {
                this._link = document.createElement('a');
                this._link.classList.add(CLS.link);
                this._link.href = href;
                this._link.target = target || '_self';
                container.appendChild(this._link);
                container = this._link;
            }

            if (src) {
                this._img = document.createElement('img');
                this._img.classList.add(CLS.img);
                this._img.src = src;
                container.appendChild(this._img);
            }

            if (text) {
                if (href) {
                    this._text = document.createElement('span');
                    this._text.classList.add(CLS.shutter);
                } else {
                    this._text = document.createElement('figcaption');
                    this._text.classList.add(CLS.caption);

                }
                this._text.innerText = text;
                container.appendChild(this._text);
            }

            return this;
        }

        cleanup() {
            this.removeAttribute('data-src');
            this.removeAttribute('data-href');
            this.removeAttribute('data-size');
            this.removeAttribute('data-shadow');
            this.removeAttribute('data-target');
            return this;
        }
    }
    
    /* Define the new element
     ========================================================================== */

    if (customElements) customElements.define('c-thumbnail', AvatarElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.AvatarElement = AvatarElement;
}());