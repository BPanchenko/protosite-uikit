;(function (Backbone, _) {

    // {object} UI

    var UI = window.UI = _.extend({}, Backbone.Events);

    document.addEventListener("DOMContentLoaded", function(){
        window.UI.trigger('ready');
        return;
    });

    // {class} Component

    UI.Component = function (elem, options) {
        // Backbone.View constructor
        this.cid = _.uniqueId('component');
        this.options = options || {};
        this.el = elem;
        this._ensureElement();
        this.initialize.call(this, options);
        this.delegateEvents();

        // component references
        elem['ui' + this.name] = this;
        this.stack.push(elem);
    };

    UI.Component.extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function and add the prototype properties.
        child.prototype = _.create(parent.prototype, protoProps);
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        // component elements
        child.stack = [];

        // link to a component class on UI
        UI[protoProps.name] = child;

        return child;
    };

    _.extend(UI.Component.prototype, Backbone.View.prototype);

}(Backbone, _));