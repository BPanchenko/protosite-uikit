(function(UI){

    /** Class component */

    UI.Component.extend(
        // selfProps
        {
            name: 'Dialog',
            tagName: 'section',
            className: 'c-dialog',

            initialize: function() {
                this.listenTo(UI.backdrop, 'click', this.remove);
            },

            render: function() {
                document.body.appendChild(this.el);
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

    UI.dom.on('ready change', function(doc, options){
        console.log('DOM ready or change', options);
        UI.Dialog.$holders = $('[ui-dialog]');
        UI.Dialog.$holders.on('click', function(){});
        (new UI.Dialog(UI.Dialog.$holders[0])).render();
    });

}(UI));