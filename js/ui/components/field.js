(function(addon) {

    if (window.UI)
        UI.component(addon);

    if (typeof define == 'function' && define.amd)
        define('ui-components-field', ['ui'], function (UiCore) {
            return addon(UiCore);
        });

})(function(UiCore){

    return {
        NAME: 'field',
        $elements: null,

        init: function() {
            this.$elements = $('.c-field-input');

            this.$elements
                .on('focus', function (e) {
                    var $container = $(this).parents('.c-field').eq(0);
                    $container.length && $container.addClass('is-focused');
                    return;
                })
                .on('blur', function (e) {
                    var $input = $(this),
                        $container = $input.parents('.c-field').eq(0),
                        value = $input.val();
                    $container.removeClass('is-focused');
                    $container[ !!value ? 'addClass' : 'removeClass']('is-filled');
                    return;
                });

            this.$elements.filter('*[pattern]').on('input', _.debounce(function (e) {
                var $input = $(this),
                    $container = $input.parents('.c-field').eq(0),
                    value = $input.val(),
                    pattern = $input.attr('pattern');

                if(value) {
                    var reg = new RegExp(pattern);
                    if(reg.test(value))
                        $container.addClass('is-valid').removeClass('is-invalid');
                    else
                        $container.addClass('is-invalid').removeClass('is-valid');
                } else
                    $container.removeClass('is-valid is-invalid');

                return;
            }, 150));
        }
    };
});