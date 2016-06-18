(function(addon) {

    if (window.UI)
        UI.component(addon);

    if (typeof define == 'function' && define.amd)
        define('ui-components-field', ['ui'], function (UiCore) {
            return addon(UiCore);
        });

})(function(UiCore){

    var $tooltip = $('<div>').addClass('c-tooltip');

    //
    function _onMouseMove(e) {
        var $target = $(this);
        console.log($target);

        $tooltip.css({
            'position': 'fixed',
            'top': e.clientY,
            'left': e.clientX
        });

        return;
    }

    //
    function _onMouseLeave(e) {
        var $target = $(this);

        console.log($target);

        $tooltip.css({
            'position': null,
            'top': null,
            'left': null
        });

        return;
    }

    return {
        NAME: 'field',
        $elements: null,
        $buttons: null,
        $inputs: null,

        init: function() {
            this.$elements = $('*[data-ui-tooltip]');

            this.$elements.on('mousemove', _onMouseMove);
            this.$elements.on('mouseleave', _onMouseLeave);

        }
    };
});