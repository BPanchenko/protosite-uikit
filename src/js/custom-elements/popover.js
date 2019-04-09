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

    const DEFAULT_POSITION = 'top';
    const DEFAULT_TRIGGER = 'hover';
    
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
        toggle() {
            if (this.classList.contains(CLS.show)) {
                this.hide();
            } else {
                this.show();
            }
            return this;
        }

        get position() {
            return this.dataset.position || (this.position = DEFAULT_POSITION);
        }
        set position(v) {
            this.dataset.position = v;
        }

        get trigger() {
            return (this.dataset.trigger || DEFAULT_TRIGGER).split(/[\s,]/g);
        }
        set trigger(v) {
            this.dataset.trigger = v.toString();
        }
    }
    
    /* Private
     ========================================================================== */

    function addEventListeners() {
        this.__onShow = (e) => { e.preventDefault(); this.show().placement(); };
        this.__onHide = (e) => { e.preventDefault(); this.hide(); };
        this.__onToggle = (e) => { e.preventDefault(); this.toggle(); };

        if (~this.trigger.indexOf('hover')) {
            this._control.addEventListener('mouseenter', this.__onShow);
            this._control.addEventListener('mouseleave', this.__onHide);
        }

        if (~this.trigger.indexOf('focus')) {
            this._control.addEventListener('focus', this.__onShow);
            this._control.addEventListener('blur', this.__onHide);
        }

        if (~this.trigger.indexOf('click')) {
            this._control.addEventListener('click', this.__onToggle);
        }
        
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
    
        var offset = {
            top: parseInt(style.marginTop),
            right: parseInt(style.marginRight),
            bottom: parseInt(style.marginBottom),
            left: parseInt(style.marginLeft)
        };
        offset.vertical = offset.top + offset.bottom;
        offset.horizontal = offset.left + offset.right;
    
        switch (this.position) {
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