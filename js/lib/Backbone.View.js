(function(Backbone){
  
  _.extend(Backbone.View.prototype, {
    tpl: '',
    template: function() {
      var data = this.model ? this.model.toJSON() : {};
      return _.template(this.tpl)(data);
    },
    render: function() {
      if(this._isRendered && _.isFunction(this.reRender)) {
        return this.reRender();
      }
      
      this.el.innerHTML = _.result(this, 'template');
      this._initElems();
      this.onRender && this.onRender.call(this);
      this._isRendered = true;
      
      return this;
    },
    
    _initElems: function() {
      if(_.isEmpty(this.elems)) return this;
      
      if(!(this.el instanceof HTMLElement)) {
        console.trace("HTML-container is undefined");
        return this;
      }
      
      if(!this.__proto__.selectors) {
        // cache selectors of elements
        this.__proto__.selectors = _.clone(this.elems);
      }
      
      _.each(this.selectors, function(selector, key){
        if(_.isString(selector)) {
          this.elems[key] = this.el.getElementsByClassName(selector);
          console.assert(this.elems[key].length, this._name + ", element '" + selector + "' was not found");
          if(this.elems[key].length == 1) this.elems[key] = this.elems[key][0];
        }
        return;
      }, this);
      
      return this;
    }
  });
    
}(Backbone));