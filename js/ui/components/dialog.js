(function(addon) {

    if (window.UI)
        UI.component(addon);

    if (typeof define == 'function' && define.amd)
        define('ui-components-dialog', ['ui'], function (UiCore) {
            return addon(UiCore);
        });

})(function(UiCore){

    var _html = '';

    function _createComponent () {
        var elem = document.createElement('section');
        elem.classList.add('c-dialog');
        return elem;
    }

    //
    function _onMouseClick(e) {
        e.preventDefault();

        var target = e.currentTarget,
            elDialog = _createComponent(),
            options;

        try {
            options = _.stringToObject(target.getAttribute('data-ui-dialog'));
        } catch (err) {}

        if(options.tpl) {
            var template = document.body.querySelector(options.tpl);
        }

        UI.backdrop.show();
        document.body.appendChild(elDialog);
        elDialog.appendChild(template.content.cloneNode(true));

        setTimeout(function() {
            elDialog.classList.add('is-opened');
        }, 0);

        UI._components.dialog.stack.push(elDialog);

        return;
    }

    return {
        NAME: 'dialog',
        $elements: null,
        stack: [],

        init: function() {
            this.$elements = $('*[data-ui-dialog]');
            this.$elements.on('click', _onMouseClick);

            this.listenTo(UI.backdrop, 'click', this.remove);
        },

        remove: function() {
            var last = _.last(this.stack);

            UI.backdrop.hide();

            last.classList.remove('is-opened');
            last.classList.add('is-closed');
            setTimeout(function() {
                document.body.removeChild(last);
            }, 160);

            return this;
        }
    };
});