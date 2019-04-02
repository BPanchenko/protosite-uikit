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
        body: { value: 'c-popover__body' },
        show: { value: 'is-visible' },
        hide: { value: 'is-hidden' }
    });
    
    /* Element Class
     ========================================================================== */

    class PopoverElement extends HTMLElement {
        
        connectedCallback() {
            this._control = document.body.querySelector(`*[aria-controls=${this.id}]`);
            console.log(this._control);
            this.render();
            addEventListeners.call(this);
        }
        disconnectedCallback() {
            removeEventListeners.call(this);
        }

        render() {
            this._innerHTML = this.innerHTML;
            this.innerHTML = '';
            this.classList.add(CLS.main);
            this._body = createBody.call(this);
            this.hide();
            return this;
        }

        onControlEnter() {

            return;
        }
        onControlLeave() {

            return;
        }

        placement() {
            return this;
        }

        show() {
            this.classList.add(CLS.show);
            this.classList.remove(CLS.hide);
            return this;
        }
        hide() {
            this.classList.add(CLS.hide);
            this.classList.remove(CLS.show);
            return this;
        }
    }
    
    /* Private
     ========================================================================== */

    function addEventListeners() {
        this.__onEnterControl = () => this.show().placement();
        this.__onLeaveControl = () => this.hide();
        this._control.addEventListener('mouseenter', this.__onEnterControl);
        this._control.addEventListener('mouseleave', this.__onLeaveControl);
        return this;
    }

    function createBody() {
        let elem = document.createElement('div');
        elem.classList.add(CLS.body);
        elem.innerHTML = this._innerHTML;
        this.appendChild(elem);
        return elem;
    }

    function removeEventListeners() {
        this._control.removeEventListener('mouseenter', this.__onEnterControl);
        this._control.removeEventListener('mouseleave', this.__onLeaveControl);
        return;
    }
    
    /* Define the new element
     ========================================================================== */

    if (customElements) customElements.define('c-popover', PopoverElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.PopoverElement = PopoverElement;
}());