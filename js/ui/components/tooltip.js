(function(UI){

    const cls = Object.create(null, {
        main: { value: 'c-tooltip' },
        inside: { value: 'c-tooltip__inside' }
    });

    const tooltip = document.createElement('section');
    tooltip.classList.add(cls.main);
    tooltip.innerHTML = `<div class="${cls.inside}"></div>`;

    const _ons = Object.create(null, {
        mouseenter: {
            value: function(e){

                return;
            }
        },
        mouseleave: {
            value: function(e){

                return;
            }
        },
        mousemove: {
            value: function(e){

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
                'mouseenter': _ons.mouseenter,
                'mouseleave': _ons.mouseleave,
                'mousemove': _ons.mousemove
            },
            initialize: function(){
                if(_.isString(this.options)) this.options = { content: this.options };
                this.options = _.extend(_.clone(this.defaults), this.options);
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