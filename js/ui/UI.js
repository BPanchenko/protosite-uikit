(function (Backbone, _) {

    // {object} UI

    var UI = window.UI = _.extend({}, Backbone.Events);
    var _selectorsOfComponents = {};

    // {class} Component

    UI.Component = function (elem, options = {}) {
        console.assert(elem instanceof HTMLElement, "A component element is not HTMLElement");

        // equivalent Backbone.View
        this.cid = _.uniqueId('component');
        this.options = options;
        this.el = elem;
        this._ensureElement();
        this.initialize.apply(this, arguments);

        // reference to component on element
        elem[this.constructor.reference] = this;
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

        // mapping component selector
        _selectorsOfComponents[protoProps.name] = child.selector;

        return child;
    };

    _.extend(UI.Component.prototype, Backbone.View.prototype);

}(Backbone, _));