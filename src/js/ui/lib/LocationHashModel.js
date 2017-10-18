import _ from 'underscore';
import Backbone from 'backbone';

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

export default LocationHashModel;