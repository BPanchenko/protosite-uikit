(function(UI){

  var ListHeadView = Backbone.View.extend({
    name: 'ListItemView',
    tagName: 'section',
    className: 'c-list__head'
  });

  var ListItemView = Backbone.View.extend({
    name: 'ListItemView',
    tagName: 'section',
    className: 'c-list__item'
  });

  /** List component */

  UI.Component.extend(
    {
      name: 'List',
      tagName: 'section',
      className: 'c-list',

      initialize: function() {

      },

      render: function() {

        return this;
      },

      remove: function() {

        return Backbone.View.prototype.remove.call(this);
      }
    }
  );

}(UI));