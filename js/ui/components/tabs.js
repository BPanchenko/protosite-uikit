(function(UI){
	
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
            	_el.style.transform = 'translate3d(-' + ui.win.get('width') + 'px,0,0)';
			else if(_i > this.i)
            	_el.style.transform = 'translate3d(' + ui.win.get('width') + 'px,0,0)';
			else
            	_el.style.transform = null;
			
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

    /** Class component */

    UI.Component.extend(
        // selfProps
        {
            name: 'Tabs',
            initialize: function(){
                this.elems.indicator = this.el.getElementsByClassName('ui-tabs-indicator')[0];
                this.elems.links = [].slice.call(this.el.getElementsByClassName('ui-tabs-link'));

                // definition initial index
                this.elems.links.forEach((function(_el, _i) {
                    if(_el.dataset.active == 'true')
                        this.i = _i;
                }).bind(this));

                if(typeof options.container == 'string') {
                    // this.elems.container = _helpers.findElement(this.el, options.container);
                    this.elems.views = [].slice.call(this.elems.container.children);

                    _setContainerHeight.call(this);
                    _setViewsWidth.call(this);
                    _positioningViews.call(this);
                    ui.win.on('change:width', (function(){
                        _setContainerHeight.call(this);
                        _setViewsWidth.call(this);
                        _positioningViews.call(this);
                    }).bind(this));
                }

                this.el.addEventListener('click', _onClickTabs.bind(this), false);

                _fixIndicator.call(this);
                _activateView.call(this);
            }
        }
    );

}(UI));