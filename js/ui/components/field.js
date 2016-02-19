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

    var onChangeFieldSearch = _.debounce(function (e) {
        var $input = $(this),
            $container = $input.parent('.c-field'),
            value = $input.val();

        value && $container.removeClass('is-invalid');

        return;
    }, 150);

    var onClickButton = function(e) {
        var $this = $(this),
            $container = $this.parent('.c-field'),
            $input = $this.siblings('.c-field-input').eq(0),
            $icon = $this.find('.iconic').eq(0);

        // processing the password field
        if($icon.data('glyph') == 'eye-closed') {
            $icon.data('glyph', 'eye-open');
            $input.attr('type', 'text')
        } else if($icon.data('glyph') == 'eye-open') {
            $icon.data('glyph', 'eye-closed');
            $input.attr('type', 'password')
        }

        // processing the search field
        if($icon.data('glyph') == 'loupe' && !$input.val()) {
            e.preventDefault();
            $container.addClass('is-invalid');
        }

        return;
    };

    return {
        NAME: 'field',
        $elements: null,
        $buttons: null,
        $inputs: null,

        init: function() {
            this.$elements = $('.c-field');
            this.$buttons = this.$elements.find('.c-field-button');
            this.$inputs = this.$elements.find('.c-field-input');

            this.$inputs.filter('*:not([type=file])')
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
            this.$inputs.filter('*[pattern]:not([type=email])').on('input', checkPattern);
            this.$inputs.filter('*[pattern][type=email]').on('change', checkPattern);

            // processing the file field
            this.$inputs.filter('input[type=file]').on('change', onChangeFieldFile);

            // processing the search field
            this.$inputs.filter('input[type=search]').on('change input', onChangeFieldSearch);

            // click by the field button
            this.$buttons.on('click', onClickButton);
        }
    };
});