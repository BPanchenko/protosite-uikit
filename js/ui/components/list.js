(function(UI){

  var sourceViewPrototype = _.clone(Backbone.View.prototype);

  Object.assign(Backbone.View.prototype, {
    removeChildren: function() {
      if(!this.children) return this;
      if(!(this.children instanceof Map)) {
        console.warn("Children is't a Map");
        return this;
      }
      for(var view of this.children.values()) {
        if(!this.collection.get(view.model.cid)) {
          this.children.delete(view.model.cid);
          view.remove();
        }
      }
      return this;
    },
    remove: function() {
      this.removeChildren();
      return sourceViewPrototype.remove.call(this);
    }
  });
  
  var tpl_list = `
    <div class="c-list__head js-head"></div>
    <div class="c-list__body js-body"></div>
    <div class="c-list__foot js-foot"></div>
  `;

  var ListHeadView = Backbone.View.extend({
    name: 'ListItemView',
    className: 'c-list__head',
    initialize: function(options) {
      this.children = new Map();
      this.collection = options.collection;
      this.listenTo(this.collection.state, 'change:fields change:sort', this.render);
    },
    render: function() {
      let state = this.collection.state.toJSON();
      let fields = state.fields;

      for(let key in fields) {
        let elem = document.createElement('div');
        let field = fields[key];

        let sort, ariaSort = 'none';
        if(state.sortKey == key) {
          sort = state.sortOrder == 'asc' ? '-' + key : key;
          ariaSort = state.sortOrder == 'asc' ? 'ascending' : 'descending';
        } else {
          sort = field.short_type == 'numeric' ? '-' + key : key;
        }

        elem.innerHTML = `<a href="#sort=${sort}" aria-sort="${ariaSort}" class="c-ctrl-sort">${field.name}</a>`;
        elem.classList.add('c-list__head-box');
        this.el.appendChild(elem)
      }

      return this;
    }
  });
  
  var ListBodyView = Backbone.View.extend({
    name: 'ListItemView',
    className: 'c-list__body',
    
    hns: {
      'request': function() {
        this.el.classList.add('s-loading');
      },
      'sync': function() {
        this.el.classList.remove('s-loading');
      },
      'update': function() {
        this.render();
      }
    },

    initialize: function(options) {
      this.children = new Map();
      this.collection = options.collection;
      console.assert(this.collection instanceof Backbone.Collection, "Collection is undefined");
      this.listenTo(this.collection, 'request', this.hns.request);
      this.listenTo(this.collection, 'sync', this.hns.sync);
      this.listenTo(this.collection, 'update', this.hns.update);
    },

    onRender: function() {
      this.renderChildren();
      return this;
    },
    reRender: function() {
      this.removeChildren();
      this.renderChildren();
      return this;
    },
  
    renderChildren: function() {
      this.collection.each(model => {
        if(!this.children.has(model.cid)) {
          let view = new ListItemView({ model });
          this.el.appendChild(view.el);
          view.render();
          this.children.set(model.cid, view);
        }
      });
      return this;
    }
  });

  var ListItemView = Backbone.View.extend({
    name: 'ListItemView',
    tagName: 'section',
    className: 'c-list__item',
    template: function() {
      var html = this.model.values().map(function(val){
        return `<div class="c-list__item-box">${val}</div>`;
      }).join('');
      return html;
    }
  });

  /** List component */

  UI.Component.extend(
    {
      name: 'List',
      tagName: 'section',
      className: 'c-list',
      elems: {
        body: 'js-body',
        foot: 'js-foot',
        head: 'js-head'
      },
      tpl: tpl_list,

      initialize: function() {
        // Object.assign(this.options, defaultListOptions, this.options);
        this.collection = this.options.collection;
        console.log(this.options);
      },

      onRender: function() {
        this.children = new Map([
            ['head', new ListHeadView({
              el: this.elems.head,
              collection: this.collection
            })],
            ['body', new ListBodyView({
              el: this.elems.body,
              collection: this.collection
            })]
        ]);

        this.children.get('head').render();
        this.children.get('body').render();

        return this;
      }
    }
  );

}(UI));