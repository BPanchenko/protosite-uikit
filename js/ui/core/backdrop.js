(function(UI){

    UI.backdrop = new (Backbone.View.extend({
        name: 'BackdropView',
        tagName: 'div',
        className: 'c-backdrop',

        events: {
            'click': function (e) {
                this.trigger('click', this, e);
            }
        },

        show: function (options) {
            options || (options = {});
            document.body.appendChild(this.el);

            _.isNumber(options.opacity) && (this.el.style.opacity = options.opacity);
            _.isNumber(options.zIndex) && (this.el.style.zIndex = options.zIndex);

            this.trigger('show', this);
            return this;
        },
        hide: function () {
            this.el.style.opacity = 0;
            this.el.style.zIndex = '';

            // waiting for the end opacity css transition
            setTimeout(function () {
                this.el.style.opacity = '';
                this.trigger('hide', this);
                try { document.body.removeChild(this.el); } catch(e){}
            }.bind(this), 160);

            return this;
        }
    }));

}(UI));