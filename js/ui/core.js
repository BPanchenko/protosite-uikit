(function (factory) {
    if (typeof define === 'function' && define.amd) {
		define(['backbone', 'underscore'], factory);
	} else {
		window.UI || (window.UI = factory(Backbone, _));
	}
}(function (Backbone, _) {
    var _isPageLoaded, _readyCalls = [];

    var _domReady = function(callback) {
        _isPageLoaded ? callback() : _readyCalls.push(callback);
    };
	
	// Global handlers of DOM events
	var _ons = {
		'document': {
			'DOMContentLoaded': function(e) {
				_ons.window.resize();

                // run dom ready callbacks
                _isPageLoaded = true;
                _readyCalls.forEach(function(fn) { fn(); });
                _readyCalls = [];

				return;
			}
		},
		'window': {
			'resize': function(e) {
				UI.window.set({
					'width': window.innerWidth,
					'height': window.innerHeight
				});
				return;
			}
		}
	};
	
	document.addEventListener('DOMContentLoaded', _ons.document.DOMContentLoaded, false);
	window.addEventListener('resize', _ons.window.resize, false);
	
	
	// Window settings
	var _window = new (Backbone.Model.extend({
		defaults: {
			width: 0,
			height: 0
		},
		initialize: function() {
            this._origin = window;
		}
	}));


    // Container
    var _container = new (Backbone.Model.extend({
        defaults: {
            width: 0,
            height: 0,
            format: ''
        },
        initialize: function() {
            this.listenTo(_window, 'change:width', this.onChangeWindowWidth);
        },
        onChangeWindowWidth: function(model, win_width) {
            var format;

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

	
	// 
	var UiCore = {
        container: _container,
        window: _window,

		component: function(addon) {
            var _component;

            typeof addon == 'function' && (_component = new addon(this));
            typeof addon == 'object' && (_component = addon);

            if(_.isObject(_component)) {
                this._components[_.camelize(_component.NAME)] = _component;
                _domReady(_component.init);
            } else
                console.error("Error initialization of the component.", _component);
        },
        
        helpers: {
            getAttributeObject: function(el, attr_name) {
                var data;

                if(!el.hasAttribute(attr_name))
                    console.error('The element has no attribute "' + attr_name + '"');

                data = el.getAttribute(attr_name);
                data = data.replace(/'/g, '"');
                data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
                    var count = data.substring(0, i).match(/"/g);
                    return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
                });
                data = JSON.parse(data);

                return data;
            }
        },

        _components: {}
	};
	
	return UiCore;
}));