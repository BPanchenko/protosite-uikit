(function(Backbone){
  
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