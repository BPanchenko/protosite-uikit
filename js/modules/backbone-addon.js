(function(Backbone){

  // @Collection

  var CollectionStateModel = Backbone.Model.extend({
    defaults: {
      fields: [],
      page: 1,
      count: 20,
      sort: '-id',
      sortOrder: 'desc',
      sortKey: 'id',
      total: 0
    },
    initialize: function() {
     this.on('change:sortKey change:sortOrder', function() {
       var order = this.get('sortOrder');
       var sort = this.get('sortKey');
       if (order == 'desc') sort = '-' + sort;
       this.set('sort', sort);
     });
     this.on('change:sort', function(model, sort) {
       var attrs = {
          sortKey: sort.indexOf('-') === 0 ? sort.substring(1) : sort,
          sortOrder: sort.indexOf('-') === 0 ? 'desc' : 'asc'
       };
       this.set(attrs, { silent: true });
     });
    }
  });

  var collectionPrototype = Backbone.Collection.prototype;

  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._initState(options);
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  _.extend(Backbone.Collection.prototype, collectionPrototype, {
    fetch: function(options) {
      options || (options = {});
      options.data = _.extend({}, this.state.pick('count', 'sort'), options.data);
      options.data.offset = (this.state.get('page') - 1) * this.state.get('count');
      return collectionPrototype.fetch.call(this, options);
    },
    fetchFields: function() {
      var url = _.result(this, 'url');
      console.assert(url, 'A "url" property or function must be specified');
      return $.getJSON(url + '/fields')
          .done(function(resp) {
            this.state.set('fields', resp.data);
          }.bind(this))
          .fail(function(err) {
            console.error('Failed fetch collection fields', err);
          });
    },
    parse: function(response) {
      var list = [];
      if(_.isArray(response)) {
        list = response;
      } else {
        _.isArray(response.data) && (list = response.data);
        _.isObject(response.meta) && this.state.set(response.meta);
      }
      return list;
    },
    _initState: function (options) {
      options || (options = {});
      this.state = new CollectionStateModel(options.state);
      this.listenTo(
          this.state
          , 'change:page change:count change:sort'
          , _.debounce(this.fetch.bind(this, {}), 160)
      );
      return this;
    }
  });

  Backbone.Collection.extend = Backbone.Model.extend;


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