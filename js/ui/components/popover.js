(function(UI){

    const cls = Object.create(null, {
        main: { value: 'c-popover' },
        inside: { value: 'c-popover__inside' }
    });

    const pop = document.createElement('section');
    const popInside = document.createElement('div');
    pop.classList.add(cls.main);
    pop.setAttribute('aria-hidden', 'true');
    popInside.classList.add(cls.inside);
    pop.appendChild(popInside);

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
        rectTT = pop.getBoundingClientRect();
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
        var x,y, popStyle = window.getComputedStyle(pop);

        var popMargin = {
            top: parseInt(popStyle.marginTop),
            right: parseInt(popStyle.marginRight),
            bottom: parseInt(popStyle.marginBottom),
            left: parseInt(popStyle.marginLeft)
        };
        popMargin.vertical = popMargin.top + popMargin.bottom;
        popMargin.horizontal = popMargin.left + popMargin.right;

        switch (position) {
            case 'top':
                x = rectHolder.left + rectHolder.width/2 - (rectTT.width + popMargin.horizontal)/2;
                y = rectHolder.top - rectTT.height - popMargin.vertical;
                break;
            case 'top-left':
                x = rectHolder.left - popMargin.left;
                y = rectHolder.top - rectTT.height - popMargin.vertical;
                break;
            case 'top-right':
                x = rectHolder.right - rectTT.width - popMargin.right;
                y = rectHolder.top - rectTT.height - popMargin.vertical;
                break;
            case 'right':
                x = rectHolder.right + popMargin.left;
                y = rectHolder.top + rectHolder.height/2 - (rectTT.height + popMargin.horizontal)/2;
                break;
            case 'right-top':
                x = rectHolder.right + popMargin.left;
                y = rectHolder.top - popMargin.top;
                break;
            case 'right-bottom':
                x = rectHolder.right + popMargin.left;
                y = rectHolder.bottom - rectTT.height - popMargin.bottom;
                break;
            case 'bottom':
                x = rectHolder.left + rectHolder.width/2 - (rectTT.width + popMargin.horizontal)/2;
                y = rectHolder.bottom + popMargin.top;
                break;
            case 'bottom-left':
                x = rectHolder.left - popMargin.left;
                y = rectHolder.bottom + popMargin.top;
                break;
            case 'bottom-right':
                x = rectHolder.right - rectTT.width - popMargin.right;
                y = rectHolder.bottom + popMargin.top;
                break;
            case 'left':
                x = rectHolder.left - rectTT.width - popMargin.horizontal;
                y = rectHolder.top + rectHolder.height/2 - (rectTT.height + popMargin.horizontal)/2;
                break;
            case 'left-top':
                x = rectHolder.left - rectTT.width - popMargin.horizontal;
                y = rectHolder.top - popMargin.top;
                break;
            case 'left-bottom':
                x = rectHolder.left - rectTT.width - popMargin.horizontal;
                y = rectHolder.bottom - rectTT.height - popMargin.bottom;
                break;
        }

        return `translate(${Math.round(x)}px,${Math.round(y)}px)`;
    }

    var positioningTT = _.throttle(function(mouseX = 0, mouseY = 0) {
        let result = new Promise(function(resolve, reject) {
            setTimeout(resolve, parseFloat(window.getComputedStyle(pop).transitionDuration) * 1000);
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

                popInside.innerHTML = this.options.content;
                document.body.appendChild(pop);

                rectTT = pop.getBoundingClientRect();
                positioningTT.call(this).then(() => pop.setAttribute('aria-hidden', 'false'));

                this.$el.on('mousemove.delegateEvents' + this.cid, _ons.mousemove.bind(this));
                $(window).on('scroll.delegateEvents' + this.cid, _ons.mouseleave.bind(this));
                return;
            }
        },
        mouseleave: {
            value: function(e){
                this.$el.off('mousemove.delegateEvents' + this.cid);
                $(window).off('scroll.delegateEvents' + this.cid);
                pop.setAttribute('aria-hidden', 'true');
                pop.remove();
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
            name: 'Popover',
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
                pop.setAttribute('data-position', position);
                pop.style.transform = getTransformStyle(position);

                return this;
            }
        }
    );

    function _init(elems){
        Array.from(elems)
            .filter(elem => elem.hasAttribute(UI.Popover.attr) && !elem[UI.Popover.reference])
            .forEach(elem => new UI.Popover(elem, elem.getAttribute(UI.Popover.attr)));
        return;
    }

    UI.dom.on('ready', function(doc){
        _init(doc.querySelectorAll(UI.Popover.selector));
    });

    UI.dom.on('change', function(doc, options){
        _init(options.added);
    });

}(UI));