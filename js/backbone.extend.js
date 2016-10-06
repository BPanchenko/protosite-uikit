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
        elems: {},
        tpl: '',
        template: function(){
            var data = this.model ? this.model.toJSON(): {};
            return _.template(this.tpl)(data);
        },
        render: function(){
            this.el.innerHTML = _.result(this, 'template');
            this._initElems();
            this.onRender && this.onRender.call(this);
            return this;
        },
        _initElems: function() {
            if(_.isEmpty(this.elems)) return this;

            if(!(this.el instanceof HTMLElement)) {
                console.trace("HTML-container is undefined");
                return this;
            }

            if(!this.__proto__.selectors) {
                // cache selectors of elements
                this.__proto__.selectors = _.clone(this.elems);
            }
            _.each(this.selectors, function(selector, key){
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