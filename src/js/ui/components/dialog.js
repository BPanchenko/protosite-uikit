(function(UI){

    /** Class component */

    UI.Component.extend(
        // selfProps
        {
            name: 'Dialog',
            tagName: 'section',
            className: 'c-dialog',

            initialize: function(el, options) {
                this.listenTo(UI.backdrop, 'click', this.remove);
            },

            render: function() {

                return this;
            }
        },
        // staticProps
        {
            $holders: null,
            stack: [],
            remove: function() {
                var last = _.last(UI.Dialog.stack);

                last.remove();
                last.classList.remove('is-opened');
                last.classList.add('is-closed');
                setTimeout(function() {
                    document.body.removeChild(last);
                }, 160);

                !UI.Dialog.stack.length && UI.backdrop.hide();

                return this;
            }
        }
    );

}(UI));