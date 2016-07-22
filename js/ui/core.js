const Backbone = require('backbone'),
      $ = require('jquery'),
      _ = require('underscore'),
      s = require('underscore.string');

_.mixin(s);

// handlers of DOM events
const _ons = Object.create(null, {
    'windowResize': function(e) {
        UI.window.set({
            'width': window.innerWidth,
            'height': window.innerHeight
        });
        return;
    }
});

// {view} Backdrop
class Backdrop extends Backbone.View {
    NAME = 'UiBackdrop';
    className = 'c-backdrop';
    events = Object.create(null, {
        click: function (e) { this.trigger('click', this, e); }
    });
    tagName = 'div';

    constructor (options = {}) {
        console.log(super(options));
        console.log(this.NAME);
        this._ensureElement();
        this.initialize.apply(this, arguments);
    }

    show (options = {}) {
        this.el.setAttribute('class', this.className);
        document.body.appendChild(this.el);

        _.isNumber(options.opacity) && (this.el.style.opacity = options.opacity);
        _.isNumber(options.zIndex) && (this.el.style.zIndex = options.zIndex);

        this.trigger('show', this);
        return this;
    }
    hide () {
        this.el.style.opacity = 0;
        this.el.style.zIndex = '';

        // waiting for the end opacity css transition
        setTimeout(function () {
            this.el.style.opacity = '';
            document.body.removeChild(this.el);
            this.trigger('hide', this);
        }.bind(this), 160);

        return this;
    }
};


// {model} Window settings
var _window = new (Backbone.Model.extend({
    defaults: {
        width: 0,
        height: 0
    },
    initialize: function() {
        this._origin = window;
    }
}));


// {model} Container
var _container = new (Backbone.Model.extend({
    defaults: {
        width: 0,
        height: 0,
        format: ''
    },
    initialize: function() {
        this.listenTo(_window, 'change:width', _.throttle(this.setFormat));
        this.setFormat();
    },
    setFormat: function() {
        var format,
            win_width = _window.get('width');

        if(win_width >= 1360)
            format = 'xdesktop';
        else if(win_width >= 1180 && win_width <= 1359)
            format = 'desktop';
        else if(win_width >= 1024 && win_width <= 1179)
            format = 'tablet';
        else if(win_width >= 768 && win_width <= 1023)
            format = 'tablet-portrait';
        else if(win_width >= 480 && win_width <= 767)
            format = 'handset';
        else if(win_width <= 479)
            format = 'handset-portrait';

        return this.set({
            'format': format,
            'height': Math.max($(document.body).height(), _window.get('height')),
            'width': $('.o-container').eq(0).width()
        });
    }
}));

class UiCore {
    backdrop = new Backdrop;
    components = new Map();
    container = _container;
    window = _window;

    component (addon) {
        let _component;

        typeof addon == 'function' && (_component = new addon(this));
        typeof addon == 'object' && (_component = addon);

        if(_.isObject(_component)) {
            _.extend(_component, Backbone.Events);
            $(document).ready(_component.init.bind(_component));
            this.components.set(_.camelize(_component.NAME), _component);
        } else
            console.error("Error initialization of the component.", _component);
    }
}


window.UI = new UiCore;
window.addEventListener('resize', _ons.windowResize, false);

$(document).ready(_ons.windowResize);