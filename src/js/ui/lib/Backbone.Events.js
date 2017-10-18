(function(Backbone) {

  var methods = {
    listenToAndRun: function (obj, name, callback) {
      this.listenTo.apply(this, arguments);
      callback.call(this, obj);
      return this;
    },
    onAndRun: function (name, callback) {
      this.on.apply(this, arguments);
      callback.call(this, this);
      return this;
    }
  };

  Object.assign(Backbone, methods);
  Object.assign(Backbone.Events, methods);
  Object.assign(Backbone.Collection.prototype, methods);
  Object.assign(Backbone.Model.prototype, methods);
  Object.assign(Backbone.View.prototype, methods);
  
}(Backbone));