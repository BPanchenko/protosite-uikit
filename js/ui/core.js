;(function (Backbone, _) {

    // DOM-listeners
    const _ons = {
        'window': {
            'resize': _.throttle(function(e) {
                ui.window.set({
                    'width': window.innerWidth,
                    'height': window.innerHeight
                });
                return;
            }, 160)
        }
    };

    // {view} Backdrop
    const BackdropView = Backbone.View.extend({
        _name: 'BackdropView',
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
    });


    // {model} Window settings
    const WindowModel = Backbone.Model.extend({
        _name: 'WindowModel',
        _origin: window,
        defaults: {
            width: 0,
            height: 0
        }
    });


    // {model} Container
    const ContainerModel = Backbone.Model.extend({
        _name: 'ContainerModel',
        defaults: {
            width: 0,
            height: 0,
            format: ''
        },
        setFormat: function() {
            var format,
                win_width = ui.window.get('width');

            if(win_width >= 1360)
                format = 'xdesktop';
            else if(win_width >= 1180)
                format = 'desktop';
            else if(win_width >= 1024)
                format = 'tablet';
            else if(win_width >= 768)
                format = 'tablet-portrait';
            else if(win_width >= 480)
                format = 'handset';
            else
                format = 'handset-portrait';

            return this.set({
                'format': format,
                'height': this.el.offsetHeight,
                'width': this.el.offsetWidth
            });
        }
    });

    //{class} UiCore

    class UiCore {
        constructor() {
            this.components = [];

            this.backdrop = new BackdropView;
            this.window = new WindowModel;
            this.container = new ContainerModel;

            this.container.listenTo(this.window, 'change:width', this.container.setFormat);
        }

        component(addon) {
            console.assert(_.isObject(addon) || _.isFunction(addon), "Error initialization of the component.", addon);

            let component = _.isFunction(addon) ? new addon(this) : addon;
            _.extend(component, Backbone.Events);
            this.components[_.camelize(component._name)] = component;

            component.listenTo(this, 'ready', component.init);
            return this;
        }
    };

    _.extend(UiCore.prototype, Backbone.Events);

    window.ui = new UiCore;

    document.addEventListener("DOMContentLoaded", function(){
        window.ui.container.el = document.body.getElementsByClassName('o-container')[0];
        window.ui.trigger('ready');
        window.addEventListener('resize', _ons.window.resize, false);
        _ons.window.resize();
        return;
    });
}(Backbone, _));