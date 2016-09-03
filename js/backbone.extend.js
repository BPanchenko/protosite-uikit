(function(Backbone){


    // @Events

    _.extend(Backbone.Events, {
        listenToAndRun: function(obj, name, callback) {
            this.listenTo.apply(this, arguments);
            if (!callback && typeof name === 'object') callback = this;
            callback.apply(this);
            return this;
        }
    });


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