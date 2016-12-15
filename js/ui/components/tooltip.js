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
        var x,y;
        var scrollTop = document.body.scrollTop;
        var ttStyle = getComputedStyle(tt);

        var ttMarginTop = parseInt(ttStyle.marginTop),
            ttMarginLeft = parseInt(ttStyle.marginLeft);

        switch (position) {
            case 'bottom':
                x = rectHolder.left + (rectHolder.width - rectTT.width)/2;
                y = rectHolder.bottom + ttMarginTop;
                break;
            case 'top':
                x = rectHolder.left + (rectHolder.width - rectTT.width)/2;
                y = rectHolder.top - rectTT.height - ttMarginTop - scrollTop;
                break;
            case 'right':
                x = rectHolder.right + ttMarginLeft;
                y = rectHolder.top - rectTT.height/2;
                break;
            case 'left':

                break;
            case 'right-bottom':

                break;
            case 'right-top':

                break;
            case 'left-bottom':

                break;
            case 'left-top':

                break;
            case 'bottom-right':

                break;
            case 'bottom-left':

                break;
            case 'top-right':

                break;
            case 'top-left':

                break;
        }

        console.log(position, x, y);

        return `translate(${Math.round(x)}px,${Math.round(y)}px)`;
    };

    var positioningTT = _.throttle(function(mouseX = 0, mouseY = 0) {


        let x = rectHolder.left;
        let y = rectHolder.top;
        let position = this.options.position;

        y += rectHolder.height;
        y -= document.body.scrollTop;
        tt.setAttribute('data-position', position);
        rectTT = tt.getBoundingClientRect();

        /*
        var posParts = position.split('-'), newPosition = position;
        if(rectBody.bottom >= rectTT.bottom) posParts[0] = 'top';
        if(rectBody.top >= rectTT.top) posParts[0] = 'bottom';
        if(rectBody.right >= rectTT.right) posParts[1] = 'left';
        if(rectBody.left >= rectTT.left) posParts[1] = 'right';

        newPosition = posParts.join('-');
        if(newPosition != position) tt.setAttribute('data-position', newPosition);
        */

        tt.style.transform = getTransformStyle(position);
        return;
    }, 160);

    const _ons = Object.create(null, {
        mouseenter: {
            value: function(e){
                rectHolder = this.el.getBoundingClientRect();
                rectBody = document.body.getBoundingClientRect();

                ttInside.innerHTML = this.options.content;
                positioningTT.call(this);
                tt.setAttribute('aria-hidden', 'false');

                this.$el.on('mousemove.delegateEvents' + this.cid, _ons.mousemove.bind(this));
                document.body.appendChild(tt);
                return;
            }
        },
        mouseleave: {
            value: function(e){
                tt.setAttribute('aria-hidden', 'true');
                this.$el.off('mousemove.delegateEvents' + this.cid);
                tt.remove();
                return;
            }
        },
        mousemove: {
            value: function(e){
                positioningTT.call(this, e.clientX, e.clientY);
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
                position: 'right',
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