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
	var _win = new (Backbone.Model.extend({
		defaults: {
			width: 0,
			height: 0,
			format: ''
		},
		initialize: function() {
            this._origin = window;
			this.on('change:width', this.setFormat);
		},
        setFormat: function() {
			var _f, _w = this.get('width');
			
			
			if(_w >= 1360)
				_f = 'x-desktop';
			
			else if(_w >= 1180 && _w <= 1359)
				_f = 'desktop';
			
			else if(_w >= 1024 && _w <= 1179)
				_f = 'tablet';
			
			else if(_w >= 768 && _w <= 1023)
				_f = 'tablet--portrait';
				
			else if(_w >= 480 && _w <= 767)
				_f = 'handset';

            else if(_w <= 479)
                _f = 'handset--portrait';

			
			return this.set('format', _f);
		}
	}));
	
	
	// 
	var UiCore = {
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

		window: _win,

        _components: {},
        _helpers: {
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
            },
            isClassName: function(str) {
                return /^\.[\S]+$/.test(str);
            }
        }
	};
	
	return UiCore;
}));