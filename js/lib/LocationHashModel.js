(function(_, Backbone) {
  
  window.location.hashModel = new (Backbone.Model.extend({
    name: 'LocationHashModel',
    initialize: function () {
      this.on('change', function (model, options) {
        if (options.fromWindowHash) return;
        var query = _.objectToQuery(this.toJSON());
        if (getHash() != query) window.location.hash = query;
        return;
      });
    },
    getQuery: function(options = {}) {
      var attrs;
      if(options.omit) attrs = this.omit.apply(this, _.isString(options.omit) ? options.omit.split(',') : options.omit);
      else attrs = this.toJSON();
      return _.objectToQuery(attrs);
    }
  }));

  window.addEventListener("hashchange", onWindowHashChange, true);
  onWindowHashChange();

  function getHash() {
    return window.location.hash.substring(1);
  }

  function onWindowHashChange() {
    var data = _.queryToObject(getHash());
    var model = window.location.hashModel;
    if (_.isEmpty(data)) {
      model.clear();
    } else {
      _.difference(model.keys(), _.keys(data)).forEach(key => model.unset(key));
      model.set(data, { fromWindowHash: true });
    }
    return;
  }

}(_, Backbone));