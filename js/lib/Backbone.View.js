(function(Backbone){

  var sourceViewPrototype = _.clone(Backbone.View.prototype);

  function defineElements() {
    var res = {};

    this._selectors || (this._selectors = _.clone(this.elems));

    for (let key in this._selectors) {
      let selector = this._selectors[key];

      if (_.isElement(selector)) {
        _elem = selector;
      } else if (/[\s,*#\.\[]{1}/.test(selector)) {
        _elem = this.el.querySelector(selector);
      } else {
        _elem = this.el.getElementsByClassName(selector)[0];
      }

      res[key] = _elem;
    }

    return res;
  }

  Object.assign(Backbone.View.prototype, {
    tpl: '',
    template: function() {
      var data = this.model ? this.model.toJSON() : {};
      return _.template(this.tpl)(data);
    },
    render: function() {
      this.trigger('before:render:' + this.name, this);
      this.onBeforeRender && this.onBeforeRender();

      if(this._isRendered && _.isFunction(this.reRender)) return this.reRender();

      this.el.innerHTML = this.template();
      this.model && (this.el.dataset.id = this.model.id);

      this._isRendered = true;
      this._isAttached = document.documentElement.contains(this.el);

      this.elems = defineElements.call(this);

      this.trigger('render:' + this.name, this);
      this.onRender && this.onRender.call(this);
      return sourceViewPrototype.render.call(this);
    },
    remove: function() {
      this.removeChildren();
      return sourceViewPrototype.remove.call(this);
    },
    removeChildren: function() {
      if(!this.children) return this;
      if(!(this.children instanceof Map)) {
        console.warn("Children is't a Map");
        return this;
      }
      for(var view of this.children.values()) {
        if(!this.collection.get(view.model.cid)) {
          this.children.delete(view.model.cid);
          view.remove();
        }
      }
      return this;
    }
  });
    
}(Backbone));