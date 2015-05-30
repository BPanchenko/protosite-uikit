(function (factory) {
    if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		window.UI.Tabs = factory();
	}
}(function () {
	
	var _helpers = window.UI._helpers;
	
	function _activateView() {
		if(!this.elems.views.length)
			return;
		
		this.elems.views.forEach((function(_el, _i) {
			_el.dataset.active = (_i == this.i);
		}).bind(this));
		
		return;
	}
	
	function _fixIndicator() {
		this.elems.indicator.style.left = this.elems.links[this.i].parentNode.offsetLeft + 'px';
		this.elems.indicator.style.width = this.elems.links[this.i].parentNode.offsetWidth + 'px';
		return;
	}
	
	function _onClickTabs(e) {
		e.preventDefault();
		
		if(e.target.classList.contains('ui-tabs-item')) {
			e.target.getElementsByClassName('ui-tabs-link')[0].click();
			return;
		}
			
		if(!e.target.classList.contains('ui-tabs-link') || e.target.dataset.active == 'true')
			return;
		
		// reset the active state of all the links
		this.elems.links.forEach((function(_el, _i) {
			if(e.target == _el) {
				_el.dataset.active = 'true';
				this.i = _i;
			} else
				_el.dataset.active = 'false';
		}).bind(this));
		
		_fixIndicator.call(this);
		_activateView.call(this);
		_positioningViews.call(this);
		
		return;
	}
	
	function _positioningViews() {
		if(!this.elems.views.length)
			return;
		
		this.elems.views.forEach((function(_el, _i) {
			if(_i < this.i)
            	_el.style.translate = 'transform3d(-' + window.innerWidth + 'px,0,0)';
			else if(_i > this.i)
            	_el.style.translate = 'transform3d(' + window.innerWidth + 'px,0,0)';
			else
            	_el.style.translate = null;
			
			return;
		}).bind(this));
		
		return;
	}
	
	function _setContainerHeight(activeView) {
		if(!this.elems.views.length)
			return;
			
		var _h = 0;
		this.elems.views.forEach((function(_el) {
			if(_el.offsetHeight > _h)
				_h = _el.offsetHeight;
		}).bind(this));
		
		this.elems.container.style.height = _h + 'px';
		
		return;
	}
	
	function _setViewsWidth() {
		if(!this.elems.views.length)
			return;
		
		this.views_width = this.elems.container.offsetWidth;
		this.elems.views.forEach((function(_el) {
			_el.style.width = this.views_width + 'px';
		}).bind(this));
		
		return;
	}
	
	var Tabs = function(el, options) {
		
		if(el instanceof HTMLElement)
			this.el = el;
		else
			console.error('Tabs element is not defined.');
			
		options = _helpers.extend((options || (options = {})), _helpers.getAttributeObject(this.el, this.attr_name));
		
		this.elems.indicator = this.el.getElementsByClassName('ui-tabs-indicator')[0];
		this.elems.links = [].slice.call(this.el.getElementsByClassName('ui-tabs-link'));
		
		// definition initial index
		this.elems.links.forEach((function(_el, _i) {
			if(_el.dataset.active == 'true')
				this.i = _i;
		}).bind(this));
		
		if(typeof options.container == 'string') {
			this.elems.container = _helpers.findElement(this.el, options.container);
			this.elems.views = [].slice.call(this.elems.container.children);
			
			_setContainerHeight.call(this);
			_setViewsWidth.call(this);
			_positioningViews.call(this);
			window.addEventListener('resize', (function(){
				_setContainerHeight.call(this);
				_setViewsWidth.call(this);
				_positioningViews.call(this);
			}).bind(this));
		}
		
		this.el.addEventListener('click', _onClickTabs.bind(this), false);
		
		_fixIndicator.call(this);
		_activateView.call(this);
	}
	
	Tabs.prototype = {
		attr_name: 'data-ui-tabs',
		el: null,
		elems: {},
		i: 0,
		views_width: 0
	};
	
	return Tabs;
}));