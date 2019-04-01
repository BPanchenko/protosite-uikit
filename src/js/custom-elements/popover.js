'use strict';

/**
 * Component: 'c-popover'
 * 
 * Example:
<a href="#" aria-controls="poID">...</a>
<c-popover id="poID">...</c-popover>
 */

(function() {
    
    /* Constants
     ========================================================================== */

    const CLS = Object.create(null, {
        main: { value: 'c-popover' },
        body: { value: 'c-popover__body' }
    });
    
    /* Element Class
     ========================================================================== */

    class PopoverElement extends HTMLElement {
        connectedCallback() {
            this._control = document.body.querySelector(`*[aria-controls=${this.id}]`);
            this.render();
            addEventListeners.call(this);
        }

        render() {
            this._innerHTML = this.innerHTML;
            this.innerHTML = '';
            this.classList.add(CLS.main);
            this._body = createBody.call(this);
            return this;
        }

        disconnectedCallback() {
            removeEventListeners.call(this);
        }
    }
    
    /* Private
     ========================================================================== */

    function addEventListeners() {
        
    }

    function createBody() {
        let elem = document.createElement('div');
        elem.classList.add(CLS.body);
        elem.innerHTML = this._innerHTML;
        this.appendChild(elem);
        return elem;
    }
    
    /* Define the new element
     ========================================================================== */

    if (customElements) customElements.define('c-popover', PopoverElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.PopoverElement = PopoverElement;
}());