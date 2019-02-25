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
        'xs': { value: 'c-avatar--xs' },
        'sm': { value: 'c-avatar--sm' },
        'md': { value: 'c-avatar--md' },
        'lg': { value: 'c-avatar--lg' },
        'xl': { value: 'c-avatar--xl' }
    });

    class AvatarElement extends HTMLElement {
        connectedCallback() {
            this.render();
        }

        render() {
            this._figure = document.createElement('figure');
            this._figure.classList.add(CLS.avatar);
            this.appendChild(this._figure);

            let { src, href, size, shadow } = this.dataset;
            
            if (src) {}
            if (href) {}
            
            if (~[
                'xsmall','small','medium','large','xlarge',
                'xs','sm','md','lg','xl'
            ].indexOf(size)) {
                
            }

            if (shadow) {}
        }
    }

    // Define the new element

    if (customElements) customElements.define('c-avatar', AvatarElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.AvatarElement = AvatarElement;
}());