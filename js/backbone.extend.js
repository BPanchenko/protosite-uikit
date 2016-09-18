(function(Backbone){

    // @Events

    var eventMethods = {
        listenToAndRun: function (obj, name, callback) {
            this.listenTo.apply(this, arguments);
            if (!callback && typeof name === 'object') callback = this;
            callback.call(this, obj);
            return this;
        },
        onAndRun: function (name, callback) {
            this.on.apply(this, arguments);
            callback.call(this, this);
            return this;
        }
    };
    _.extend(Backbone.Events, eventMethods);
    _.extend(Backbone.Collection.prototype, eventMethods);
    _.extend(Backbone.Model.prototype, eventMethods);
    _.extend(Backbone.View.prototype, eventMethods);


    // @View

    _.extend(Backbone.View.prototype, {
        elems: null,
        _initElems: function() {
            if(!this.elems) {
                console.warn("Property `elems` is undefined");
                return this;
            }

            if(!(this.el instanceof HTMLElement)) {
                console.trace("HTML-container is undefined");
                return this;
            }

            _.each(this.elems, function(selector, key){
                if(_.isString(selector)) {
                    this.elems[key] = this.el.getElementsByClassName(selector);
                    console.assert(this.elems[key].length, this._name + ", element '" + selector + "' was not found");
                    if(this.elems[key].length == 1) this.elems[key] = this.elems[key][0];
                }
                return;
            }, this);

            return this;
        }
    });

}(Backbone));