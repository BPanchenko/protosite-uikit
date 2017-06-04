(function (_, Backbone) {
  var doc = document.documentElement;
  var Components = [], componentSelectors = [];

  // {object} UI

  var UI = window.UI = Object.assign({}, Backbone.Events);

  // {object} UI.dom

  UI.dom = Object.create(Backbone.Events);

  UI.dom.observer = new MutationObserver(function(mutations) {
    var options = {
        added: [],
        removed: []
    };

    mutations.forEach(function(record){
      if(record.type == 'childList') {
        let added = Array.from(record.addedNodes).filter(elem => elem instanceof HTMLElement);
        let removed = Array.from(record.removedNodes).filter(elem => elem instanceof HTMLElement);
        options.added = options.added.concat(added);
        options.removed = options.removed.concat(removed);
      }
    });

    UI.dom.trigger('change', doc, options);
  });

  // {class} Component

  UI.Component = function (elem, options = '') {
    if(arguments.length == 1 && _.isObject(elem) && !_.isElement(elem)) options = elem;

    // options is string or object, with an attempt conversion string to object
    try {
      options = _.stringToObject(options);
    } catch(err) {  }
    this.options = options;

    // equivalent Backbone.View
    this.cid = _.uniqueId('component');
    this.el = _.isElement(elem) ? elem : _.isElement(options.el) ? options.el : null;
    this._ensureElement();

    // initialize
    this.initialize.apply(this, arguments);

    // reference to component on element
    this.el[this.constructor.reference] = this;
  };

  UI.Component.extend = function(protoProps = {}, staticProps = {}) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    Object.assign(child, {
        attr: `ui-${protoProps.name.toLowerCase()}`,
        reference: `_ui${protoProps.name}`,
        selector: `*[ui-${protoProps.name.toLowerCase()}]`
    }, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    // link to a component class on UI
    UI[protoProps.name] = child;
    Components.push(child);

    // save component selector
    componentSelectors.push(child.selector);

    return child;
  };

  Object.assign(UI.Component.prototype, Backbone.View.prototype);

  function initComponentsOnElements (elems) {
    var componentElems = [];
    elems = Array.from(elems);
    Components.forEach(Component => {
      elems.filter(elem => elem.hasAttribute(Component.attr) && !elem[Component.reference])
          .forEach(elem => {
            new Component(elem, elem.getAttribute(Component.attr));
            componentElems.push(elem);
          });
    });
    return componentElems;
  }

  // DOM events

  UI.dom.on('change', function(doc, options){
    if(componentSelectors.length) initComponentsOnElements(options.added);
  });

  UI.dom.on('ready', function(doc){
    UI.dom.observer.observe(doc, {
        childList: true,
        subtree: true
    });

    if(componentSelectors.length) initComponentsOnElements(doc.querySelectorAll(componentSelectors.join(',')));
  });

  document.addEventListener("DOMContentLoaded", function(){
    UI.dom.trigger('ready', doc);
    return;
  });

}(_, Backbone));