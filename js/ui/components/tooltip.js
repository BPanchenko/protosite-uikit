(function(UI){

    const cls = Object.create(null, {
        main: { value: 'c-tooltip' },
        inside: { value: 'c-tooltip__inside' }
    });

    const tt = document.createElement('section');
    const ttInside = document.createElement('div');
    tt.classList.add(cls.main);
    tt.setAttribute('aria-hidden', 'true');
    ttInside.classList.add(cls.inside);
    tt.appendChild(ttInside);

    var sideRatio = 1.1;
    var rectHolder, rectTT, rectBody;

    function correctOnMouse(position, mouseX, mouseY) {
        var posParts = position.split('-');

        if(!rectTT.width || !rectTT.height) return position;

        if(['top', 'bottom'].indexOf(posParts[0]) != -1 && rectHolder.width > rectTT.width*sideRatio) {
            let third = rectHolder.width/3;
            if(mouseX <= rectHolder.left + third) posParts[1] = 'left';
            else if(mouseX <= rectHolder.left + 2*third) delete posParts[1];
            else if(mouseX <= rectHolder.right) posParts[1] = 'right';
            return _.compact(posParts).join('-');
        }

        if(['left', 'right'].indexOf(posParts[0]) != -1 && rectHolder.height > rectTT.height*sideRatio) {
            let third = rectHolder.height/3;
            if(mouseY <= rectHolder.top + third) posParts[1] = 'top';
            else if(mouseY <= rectHolder.top + 2*third) delete posParts[1];
            else if(mouseY <= rectHolder.bottom) posParts[1] = 'bottom';
            return _.compact(posParts).join('-');
        }

        return position;
    }

    function correctVisibility(position) {
        rectTT = tt.getBoundingClientRect();
        rectBody = document.body.getBoundingClientRect();

        let posParts = position.split('-');

        if (posParts[0] == 'bottom' && rectBody.bottom <= rectTT.bottom)
            posParts[0] = 'top';

        if (posParts[0] == 'top' && rectTT.top < 0)
            posParts[0] = 'bottom';

        if (posParts[0] == 'right' && rectBody.right <= rectTT.right)
            posParts[0] = 'left';

        if (posParts[0] == 'left' && rectTT.left < 0)
            posParts[0] = 'right';

        return posParts.join('-');
    }

    function getTransformStyle(position) {
        var x,y, ttStyle = window.getComputedStyle(tt);

        var ttMargin = {
            top: parseInt(ttStyle.marginTop),
            right: parseInt(ttStyle.marginRight),
            bottom: parseInt(ttStyle.marginBottom),
            left: parseInt(ttStyle.marginLeft)
        };
        ttMargin.vertical = ttMargin.top + ttMargin.bottom;
        ttMargin.horizontal = ttMargin.left + ttMargin.right;

        switch (position) {
            case 'top':
                x = rectHolder.left + rectHolder.width/2 - (rectTT.width + ttMargin.horizontal)/2;
                y = rectHolder.top - rectTT.height - ttMargin.vertical;
                break;
            case 'top-left':
                x = rectHolder.left - ttMargin.left;
                y = rectHolder.top - rectTT.height - ttMargin.vertical;
                break;
            case 'top-right':
                x = rectHolder.right - rectTT.width - ttMargin.right;
                y = rectHolder.top - rectTT.height - ttMargin.vertical;
                break;
            case 'right':
                x = rectHolder.right + ttMargin.left;
                y = rectHolder.top + rectHolder.height/2 - (rectTT.height + ttMargin.horizontal)/2;
                break;
            case 'right-top':
                x = rectHolder.right + ttMargin.left;
                y = rectHolder.top - ttMargin.top;
                break;
            case 'right-bottom':
                x = rectHolder.right + ttMargin.left;
                y = rectHolder.bottom - rectTT.height - ttMargin.bottom;
                break;
            case 'bottom':
                x = rectHolder.left + rectHolder.width/2 - (rectTT.width + ttMargin.horizontal)/2;
                y = rectHolder.bottom + ttMargin.top;
                break;
            case 'bottom-left':
                x = rectHolder.left - ttMargin.left;
                y = rectHolder.bottom + ttMargin.top;
                break;
            case 'bottom-right':
                x = rectHolder.right - rectTT.width - ttMargin.right;
                y = rectHolder.bottom + ttMargin.top;
                break;
            case 'left':
                x = rectHolder.left - rectTT.width - ttMargin.horizontal;
                y = rectHolder.top + rectHolder.height/2 - (rectTT.height + ttMargin.horizontal)/2;
                break;
            case 'left-top':
                x = rectHolder.left - rectTT.width - ttMargin.horizontal;
                y = rectHolder.top - ttMargin.top;
                break;
            case 'left-bottom':
                x = rectHolder.left - rectTT.width - ttMargin.horizontal;
                y = rectHolder.bottom - rectTT.height - ttMargin.bottom;
                break;
        }

        return `translate(${Math.round(x)}px,${Math.round(y)}px)`;
    }

    var positioningTT = _.throttle(function(mouseX = 0, mouseY = 0) {
        let result = new Promise(function(resolve, reject) {
            setTimeout(resolve, parseFloat(window.getComputedStyle(tt).transitionDuration) * 1000);
        });

        let position = this.options.position;
        this.position(position);

        let correctedPosition = correctVisibility(position);
        if (correctedPosition != position) {
            position = correctedPosition;
            this.position(position);
        }

        if(!this.options.floating) return result;

        correctedPosition = correctOnMouse(position, mouseX, mouseY);
        if(correctedPosition != position) {
            position = correctedPosition;
            this.position(position);
        }

        return result;
    }, 160);

    const _ons = Object.create(null, {
        mouseenter: {
            value: function(e){
                rectHolder = this.el.getBoundingClientRect();

                ttInside.innerHTML = this.options.content;
                document.body.appendChild(tt);

                rectTT = tt.getBoundingClientRect();
                positioningTT.call(this).then(() => tt.setAttribute('aria-hidden', 'false'));

                this.$el.on('mousemove.delegateEvents' + this.cid, _ons.mousemove.bind(this));
                $(window).on('scroll.delegateEvents' + this.cid, _ons.mouseleave.bind(this));
                return;
            }
        },
        mouseleave: {
            value: function(e){
                this.$el.off('mousemove.delegateEvents' + this.cid);
                $(window).off('scroll.delegateEvents' + this.cid);
                tt.setAttribute('aria-hidden', 'true');
                tt.remove();
                return;
            }
        },
        mousemove: {
            value: function(e){
                positioningTT.call(this, e.clientX, e.clientY);
                return;
            }
        },
        scroll: {
            value: function(e){
                positioningTT.call(this);
                return;
            }
        }
    });

    /** Class component */

    UI.Component.extend(
        // selfProps
        {
            name: 'Tooltip',
            defaults: {
                content: '',
                position: 'bottom',
                floating: true
            },
            events: {
                'animationend': ev => console.log(ev),
                'mouseenter': _ons.mouseenter,
                'mouseleave': _ons.mouseleave
            },
            initialize: function(){
                if(_.isString(this.options)) this.options = { content: this.options };
                this.options = Object.assign(_.clone(this.defaults), this.options);
            },

            position: function(position) {
                if(!position) return this;

                this.options.position = position;
                tt.setAttribute('data-position', position);
                tt.style.transform = getTransformStyle(position);

                return this;
            }
        }
    );

    function _init(elems){
        Array.from(elems)
            .filter(elem => elem.hasAttribute(UI.Tooltip.attr) && !elem[UI.Tooltip.reference])
            .forEach(elem => new UI.Tooltip(elem, elem.getAttribute(UI.Tooltip.attr)));
        return;
    }

    UI.dom.on('ready', function(doc){
        _init(doc.querySelectorAll(UI.Tooltip.selector));
    });

    UI.dom.on('change', function(doc, options){
        _init(options.added);
    });

}(UI));