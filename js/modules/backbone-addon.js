(function(Backbone){

  // @Collection

  var _collectionPrototype = Backbone.Collection.prototype;

  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (options.meta) this.setMetadata(options.meta);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  _.extend(Backbone.Collection.prototype, _collectionPrototype, {
    parse: function(response) {
      var list = [];
      if(_.isArray(response)) {
        list = response;
      } else {
        _.isArray(response.data) && (list = response.data);
        _.isObject(response.meta) && this.setMetadata(response.meta, list);
      }
      return list;
    },
    setMetadata: function(data, list) {
      if(!this.meta) this.meta = new Backbone.Model;
      console.assert(data instanceof Object, "Invalid metadata of collection");
      
      // define attribute types by type properties of first model in collection
      var first = list ? list[0] : this.length ? this.at(0).toJSON() : null;
      if(data.attributes) {
        for(var key in data.attributes) {
          attr = data.attributes[key];
          if(_.isString(attr)) {
            var name = attr;
            attr = { name: name };
          }
          if(first) {
            if(_.isNumber(first[key])) attr.type = "number";
            if(_.isString(first[key])) attr.type = "string";
          }
          data.attributes[key] = attr;

        }
      }
      
      return this.meta.set(data);
    }
  });


  // @View

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

  // @Events

  var eventMethods = {
    listenToAndRun: function (obj, name, callback) {
      this.listenTo.apply(this, arguments);
      if (!callback && typeof name === 'object') callback = this;
      callback.call(this, obj);
      return this;
    },
    onAndRun: function (name, callback) {
      this.on.apply(this, arguments);
      callback.call(this, this);
      return this;
    }
  };

  _.extend(Backbone.Events, eventMethods);
  _.extend(Backbone.Collection.prototype, eventMethods);
  _.extend(Backbone.Model.prototype, eventMethods);
  _.extend(Backbone.View.prototype, eventMethods);

}(Backbone));