(function(Backbone){

  Object.assign(Backbone.Model.prototype, {
    reset: function (options = {}) {
      this.set(_.result(this, 'defaults'), options);
      return this;
    }
  });

}(Backbone));