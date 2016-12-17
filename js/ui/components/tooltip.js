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

    var rectHolder, rectTT, rectBody;

    var getDataPosition = function() {

        return newPosition;
    };

    var getTransformStyle = function(position) {
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
                x = rectHolder.left + rectHolder.width/2 - rectTT.width/2;
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
                y = rectHolder.top + rectHolder.height/2 - rectTT.height/2 - ttMargin.horizontal/2;
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
                x = rectHolder.left + rectHolder.width/2 - rectTT.width/2;
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
                y = rectHolder.top + rectHolder.height/2 - rectTT.height/2 - ttMargin.horizontal/2;
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
    };

    var positioningTT = _.throttle(function(mouseX = 0, mouseY = 0) {
        let position = this.options.position;


        tt.setAttribute('data-position', position);
        tt.style.transform = getTransformStyle(position);

        /*
        var posParts = position.split('-'), newPosition = position;
        if(rectBody.bottom >= rectTT.bottom) posParts[0] = 'top';
        if(rectBody.top >= rectTT.top) posParts[0] = 'bottom';
        if(rectBody.right >= rectTT.right) posParts[1] = 'left';
        if(rectBody.left >= rectTT.left) posParts[1] = 'right';

        newPosition = posParts.join('-');
        if(newPosition != position) tt.setAttribute('data-position', newPosition);
        */

        let promise = new Promise(function(resolve, reject) {
            setTimeout(resolve, parseFloat(window.getComputedStyle(tt).transitionDuration) * 1000);
        });
        return promise;
    }, 160);

    const _ons = Object.create(null, {
        mouseenter: {
            value: function(e){
                rectHolder = this.el.getBoundingClientRect();
                rectBody = document.body.getBoundingClientRect();

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