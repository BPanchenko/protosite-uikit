(function(Backbone) {

  Object.defineProperties(Backbone.Events, {
    listenToAndRun: {
      value: function (obj, name, callback) {
        this.listenTo.apply(this, arguments);
        if (!callback && typeof name === 'object') callback = this;
        callback.call(this, obj);
        return this;
      },
      enumerable: false
    },
    onAndRun: {
      value: function (name, callback) {
        this.on.apply(this, arguments);
        callback.call(this, this);
        return this;
      },
      enumerable: false
    }
  });

  Object.assign(Backbone, Backbone.Events);
  Object.assign(Backbone.Collection.prototype, Backbone.Events);
  Object.assign(Backbone.Model.prototype, Backbone.Events);
  Object.assign(Backbone.View.prototype, Backbone.Events);
  
}(Backbone));