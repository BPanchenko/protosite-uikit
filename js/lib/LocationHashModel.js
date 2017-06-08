(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Register as an anonymous module)
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('underscore', 'backbone'));
  } else {
    // Browser globals
    window.location.hashModel = new (factory(_, Backbone));
  }
}(function (_, Backbone) {

  const LocationHashModel = Backbone.Model.extend({
    name: 'LocationHashModel',
    initialize: function () {
      this.on('change', onChangeHashModel);
      window.addEventListener("hashchange", onChangeHashWindow.bind(this, this), true);
      onChangeHashWindow(this);
    },
    getQuery: function(options = {}) {
      var attrs;
      if(options.omit) attrs = this.omit.apply(this, _.isString(options.omit) ? options.omit.split(',') : options.omit);
      else attrs = this.toJSON();
      return _.objectToQuery(attrs);
    }
  });

  function getHash() {
    return window.location.hash.substring(1);
  }

  function onChangeHashModel(model, options) {
    if (options.fromHashWindow) return;
    var query = _.objectToQuery(this.toJSON());
    if (getHash() != query) window.location.hash = query;
    return;
  }

  function onChangeHashWindow(hashModel) {
    var data = _.queryToObject(getHash());
    if (_.isEmpty(data)) {
      hashModel.clear();
    } else {
      _.difference(hashModel.keys(), _.keys(data)).forEach(key => hashModel.unset(key));
      hashModel.set(data, { fromHashWindow: true });
    }
    return;
  }

  return LocationHashModel;
}));