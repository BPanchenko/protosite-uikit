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
            if (!this.dataset.position) this.dataset.position = 'bottom';

            this._body = createBody.call(this);
            this.hide();
            this.placement();

            return this;
        }

        placement() {
            this.style.transform = getTransformStyle.call(this);
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

    function correctionOnBrowser() {
        
    }

    function correctionOnMouse() {
        
    }

    function createBody() {
        let elem = document.createElement('div');
        elem.classList.add(CLS.body);
        elem.innerHTML = this._innerHTML;
        this.appendChild(elem);
        return elem;
    }

    function getTransformStyle() {
        let x,y;
        let ctrlRect = this._control.getBoundingClientRect();
        let rect = this.getBoundingClientRect();
        let style = window.getComputedStyle(this);
        let position = this.dataset.position;
    
        var offset = {
            top: parseInt(style.marginTop),
            right: parseInt(style.marginRight),
            bottom: parseInt(style.marginBottom),
            left: parseInt(style.marginLeft)
        };
        offset.vertical = offset.top + offset.bottom;
        offset.horizontal = offset.left + offset.right;
    
        switch (position) {
            case 'top':
                x = ctrlRect.left + ctrlRect.width/2 - (rect.width + offset.horizontal)/2;
                y = ctrlRect.top - rect.height - offset.vertical;
                break;
            case 'top-left':
                x = ctrlRect.left - offset.left;
                y = ctrlRect.top - rect.height - offset.vertical;
                break;
            case 'top-right':
                x = ctrlRect.right - rect.width - offset.right;
                y = ctrlRect.top - rect.height - offset.vertical;
                break;
            case 'right':
                x = ctrlRect.right + offset.left;
                y = ctrlRect.top + ctrlRect.height/2 - (rect.height + offset.horizontal)/2;
                break;
            case 'right-top':
                x = ctrlRect.right + offset.left;
                y = ctrlRect.top - offset.top;
                break;
            case 'right-bottom':
                x = ctrlRect.right + offset.left;
                y = ctrlRect.bottom - rect.height - offset.bottom;
                break;
            case 'bottom':
                x = ctrlRect.left + ctrlRect.width/2 - (rect.width + offset.horizontal)/2;
                y = ctrlRect.bottom;
                break;
            case 'bottom-left':
                x = ctrlRect.left - offset.left;
                y = ctrlRect.bottom;
                break;
            case 'bottom-right':
                x = ctrlRect.right - rect.width - offset.right;
                y = ctrlRect.bottom;
                break;
            case 'left':
                x = ctrlRect.left - rect.width - offset.horizontal;
                y = ctrlRect.top + ctrlRect.height/2 - (rect.height + offset.horizontal)/2;
                break;
            case 'left-top':
                x = ctrlRect.left - rect.width - offset.horizontal;
                y = ctrlRect.top - offset.top;
                break;
            case 'left-bottom':
                x = ctrlRect.left - rect.width - offset.horizontal;
                y = ctrlRect.bottom - rect.height - offset.bottom;
                break;
        }
    
        return `translate(${Math.round(x)}px,${Math.round(y)}px)`;
    }

    function removeEventListeners() {
        this._control.removeEventListener('mouseenter', this.__onEnterControl);
        this._control.removeEventListener('mouseleave', this.__onLeaveControl);
        return;
    }
    
    /* Hide all popovers when scrolling a window
     ========================================================================== */
    
    window.addEventListener('scroll', () => {
        Array.from(document.getElementsByTagName('c-popover')).forEach(elem => {
            elem.classList.add('is-hidden');
            elem.classList.remove('is-visible');
        })
    });
    
    /* Define the new element
     ========================================================================== */

    if (customElements) customElements.define('c-popover', PopoverElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.PopoverElement = PopoverElement;
}());