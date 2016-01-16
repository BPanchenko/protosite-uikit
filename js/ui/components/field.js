(function(addon) {

    if (window.UI)
        UI.component(addon);

    if (typeof define == 'function' && define.amd)
        define('ui-components-field', ['ui'], function (UiCore) {
            return addon(UiCore);
        });

})(function(UiCore){

    var checkPattern = _.debounce(function () {
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
    }, 150);

    var onChangeFieldFile = function(e) {
        var $input = $(this),
            $container = $input.parent('.c-field'),
            $value = $container.find('.c-field-value').eq(0),
            value = $input.val();

        $container[ !!value ? 'addClass' : 'removeClass']('is-filled');

        if ($value.length) $value.text(value);
        else console.error("Не найден элемент значения для поля выбора файла!", $input);

        return;
    };

    return {
        NAME: 'field',
        $elements: null,

        init: function() {
            this.$elements = $('.c-field-input');

            this.$elements.filter('*:not([type=file])')
                .on('focus', function (e) {
                    var $container = $(this).parent('.c-field');
                    $container.length && $container.addClass('is-focused');
                    return;
                })
                .on('blur', function (e) {
                    var $input = $(this),
                        $container = $input.parent('.c-field'),
                        value = $input.val();
                    $container.removeClass('is-focused');
                    $container[ !!value ? 'addClass' : 'removeClass']('is-filled');
                    return;
                });

            // check fields with a pattern
            this.$elements.filter('*[pattern]:not([type=email])').on('input', checkPattern);
            this.$elements.filter('*[pattern][type=email]').on('change', checkPattern);

            // processing the field file
            this.$elements.filter('input[type=file]').on('change', onChangeFieldFile);
        }
    };
});