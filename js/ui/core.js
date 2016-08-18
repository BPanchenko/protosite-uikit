var $ = require("jquery"),
    _ = require("underscore"),
    Backbone = require("backbone"),
    moment = require("moment");


// DOM-listeners
var _ons = {
    'window': {
        'resize': function(e) {
            ui.window.set({
                'width': window.innerWidth,
                'height': window.innerHeight
            });
            return;
        }
    }
};

window.addEventListener('resize', _ons.window.resize, false);
$(document).ready(_ons.window.resize);

// {view} Backdrop
var _backdrop = new (Backbone.View.extend({
    tagName: 'div',
    className: 'c-backdrop',

    events: {
        'click': function (e) { this.trigger('click', this, e); }
    },

    show: function (options) {
        options || (options = {});
        document.body.appendChild(this.el);

        _.isNumber(options.opacity) && (this.el.style.opacity = options.opacity);
        _.isNumber(options.zIndex) && (this.el.style.zIndex = options.zIndex);

        this.trigger('show', this);
        return this;
    },
    hide: function () {
        this.el.style.opacity = 0;
        this.el.style.zIndex = '';

        // waiting for the end opacity css transition
        setTimeout(function () {
            this.el.style.opacity = '';
            this.trigger('hide', this);
            try { document.body.removeChild(this.el); } catch(e){}
        }.bind(this), 160);

        return this;
    }
}));


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

console.log(root);
//
window.ui = {
    backdrop: _backdrop,
    container: _container,
    window: _window,

    _components: {},
    component: function(addon) {
        var _component;

        typeof addon == 'function' && (_component = new addon(this));
        typeof addon == 'object' && (_component = addon);

        if(_.isObject(_component)) {
            this._components[_.camelize(_component.NAME)] = _component;
            _.extend(_component, Backbone.Events);
            $(document).ready(_component.init.bind(_component));
        } else
            console.error("Error initialization of the component.", _component);
    }
};