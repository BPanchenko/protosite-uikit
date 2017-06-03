(function(Backbone){

  Object.defineProperties(Backbone.Model.prototype, {
    reset: {
      value: function (options) {
        this.set(_.result(this, 'defaults'), options);
        return this;
      },
      enumerable: false
    }
  });

}(Backbone));