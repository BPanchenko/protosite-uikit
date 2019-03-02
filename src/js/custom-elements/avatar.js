'use strict';

/**
 * Component: `c-avatar`
 *
 * Markup: <c-avatar
 *              data-src="..."
 *              data-href="..."
 *              data-size="xsmall|small|medium|large|xlarge"
 *              data-shadow="inset|2dp|3dp|4dp|6dp|8dp|16dp|24dp"
 * />
 */

(function() {

    const CLS = Object.create(null, {
        'avatar': { value: 'c-avatar' },
        'link': { value: 'c-avatar__link' },
        'image': { value: 'c-avatar__image' },
        'xs': { value: 'c-avatar--xs' },
        'sm': { value: 'c-avatar--sm' },
        'md': { value: 'c-avatar--md' },
        'lg': { value: 'c-avatar--lg' },
        'xl': { value: 'c-avatar--xl' }
    });

    class AvatarElement extends HTMLElement {
        connectedCallback() {
            this._children = Array.from(this.children);
            this.render().cleanup();
        }

        render() {
            this._figure = document.createElement('figure');
            this._figure.classList.add(CLS.avatar);
            this.appendChild(this._figure);

            let { src, href, size, shadow, target } = this.dataset;
            
            if (href) {
                this._link = document.createElement('a');
                this._link.classList.add(CLS.link);
                this._link.href = href;
                this._link.target = target || '_self';
                this._figure.appendChild(this._link);
            }

            if (src) {
                if (shadow == 'inset') {
                    this._figure.style.backgroundImage = `url(${src})`;
                } else {
                    this._img = document.createElement('img');
                    this._img.classList.add(CLS.image);
                    this._img.src = src;
                    if (this._link) {
                        this._link.appendChild(this._img);
                    } else {
                        this._figure.appendChild(this._img);
                    }
                }
            }
            
            if (~['xs','sm','md','lg','xl'].indexOf(size)) {
                this._figure.classList.add(CLS[size]);
            } else if (size) {
                console.warn("Size can take values 'xs', 'sm', 'md', 'lg' or 'xl'");
            }

            if (~['2dp','3dp','4dp','6dp','8dp','16dp','24dp'].indexOf(shadow)) {
                this._figure.classList.add(`s-shadow-${shadow}`);
            } else if (shadow && shadow != 'inset') {
                console.warn("Shadow can take values '2dp', '3dp', '4dp', '6dp', '8dp', '16dp' or '24dp'");
            }

            if (this._children.length) {
                this._children.forEach(child => this._figure.appendChild(child));
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

    // Define the new element

    if (customElements) customElements.define('c-avatar', AvatarElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.AvatarElement = AvatarElement;
}());