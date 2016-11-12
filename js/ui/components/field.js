(function(UI){

    const regEmail = new RegExp("^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$");

    const cls = Object.create(null, {
        box: { value: 'c-field-box' },
        button: { value: 'c-field-button' },
        error: { value: 'c-field-error' },
        field: { value: 'c-field' },
        icon: { value: 'c-field-icon' },
        mask: { value: 'c-field-mask' },
        filled: { value: 'is-filled' },
        focused: { value: 'is-focused' }
    });

    const selector = Object.create(null, {
        box: { value: '.'+cls.box },
        button: { value: '.'+cls.button },
        error: { value: '.'+cls.error },
        field: { value: '.'+cls.field },
        icon: { value: '.'+cls.icon },
        mask: { value: '.'+cls.mask },
        filled: { value: '.'+cls.filled },
        focused: { value: '.'+cls.focused }
    });

    const ons = Object.create(null, {
        blur: {
            value: function(e){
                let box = e.currentTarget.__box;
                let value = e.currentTarget.value;
                box && box.classList.remove(cls.focused);
                box && box.classList[ !!value ? 'add' : 'remove'](cls.filled);
                return;
            }
        },
        focus: {
            value: function(e){
                let box = e.currentTarget.__box;
                box && box.classList.add(cls.focused);
                return;
            }
        },
        change: {
            value: function(e){
                let field = e.currentTarget;
                let box = field.__box;
                let mask = field.__mask;

                let pattern = field.hasAttribute('pattern') ? new RegExp(field.pattern) : null;
                let value = field.value.trim();

                console.log(e.type, e.currentTarget);

                return;
            }
        },
        clickButton: {
            value: function(e){
                let box = e.currentTarget.__box;
                let field = e.currentTarget.__field;
                let icon = e.currentTarget.__icon;
                let value = field.value.trim();

                switch(field.type) {
                    case 'password':
                        if(icon.dataset.glyph == 'eye-closed') {
                            icon.dataset.glyph = 'eye-open';
                            icon.setAttribute('type', 'text');
                        } else if(icon.data('glyph') == 'eye-open') {
                            icon.dataset.glyph = 'eye-closed';
                            icon.setAttribute('type', 'password');
                        }
                        break;
                    case 'search':
                        if(!value) box.classList.add(cls.invalid);
                        break;
                }

                return;
            }
        },
        input: {
            value: function(e){
                let box = e.currentTarget.__box;
                console.log(e.type, e.currentTarget);
                return;
            }
        }
    });

    var checkPattern = _.debounce(function () {
        var $input = $(this),
            $box = $input.parents('.c-field-box').eq(0),
            value = $input.val(),
            pattern = $input.attr('pattern');

        if(value) {
            let reg = new RegExp(pattern);
            if(reg.test(value))
                $box.addClass('is-valid').removeClass('is-invalid');
            else
                $box.addClass('is-invalid').removeClass('is-valid');
        } else
            $box.removeClass('is-valid is-invalid');

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
            $box = $input.parents('.c-field-box').eq(0),
            value = $input.val();

        value && $box.removeClass('is-invalid');

        return;
    }, 150);

    /*
    // check fields with a pattern
    this.$inputs.filter('*[pattern]:not([type=email])').on('input', checkPattern);
    this.$inputs.filter('*[pattern][type=email]').on('change', checkPattern);

    // processing the file field
    this.$inputs.filter('input[type=file]').on('change', onChangeFieldFile);

    // processing the search field
    this.$inputs.filter('input[type=search]').on('change input', onChangeFieldSearch);
    */

    function listenField(elem) {
        if(elem instanceof Array) elem.forEach(el => listenField(el));
        if(!(elem instanceof HTMLElement)) return;

        elem.addEventListener('blur', ons.blur);
        elem.addEventListener('focus', ons.focus);
        elem.addEventListener('change', ons.change);
        elem.addEventListener('input', ons.input);

        if(elem.__button) {
            elem.__button.addEventListener('click', ons.clickButton);
        }

        return;
    }

    function initSubElementsOnFields(field) {
        if(field.hasOwnProperty('__box') || !field.classList.contains(cls.field)) {
            return field;
        }

        field.__box = field.parentNode.classList.contains(cls.box) ? field.parentNode : null;
        if(!field.__box) {
            return field;
        }

        field.__error = field.__box.querySelector(selector.error);
        field.__label = field.__box.querySelector(selector.label);
        field.__mask = field.__box.querySelector(selector.mask);

        field.__button = field.__box.querySelector(selector.button);
        if(field.__button) {
            field.__button.__field = field;
            field.__button.__icon = field.__button.querySelector(selector.icon);
        }

        return field;
    }

    function findChildFields(elem) {
        var result = [];
        if(elem instanceof HTMLCollection) elem = Array.from(elem);
        if(elem instanceof Array) elem.forEach(el => { result = result.concat(findChildFields(el)) });
        if(!(elem instanceof HTMLElement)) return result;

        if(elem.classList.contains(cls.field)) {
            result.push(initSubElementsOnFields(elem));
        } else {
            result = Array.from(elem.querySelectorAll(selector.field), initSubElementsOnFields);
        }
        
        return result;
    }

    /** add listeners on fields */

    UI.dom.on('ready', function(doc){
        listenField(findChildFields(doc));
    });
    
    UI.dom.on('change', function(doc, options){
        options.added.length && listenField(findChildFields(options.added));
    });
}(UI));