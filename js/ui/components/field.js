(function(UI){

  const regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const regPassword = /^\w{6,20}$/;

  const cls = Object.create(null, {
    box: { value: 'c-field-box' },
    button: { value: 'c-field-button' },
    buttonIcon: { value: 'iconic' },
    error: { value: 'c-field-error' },
    field: { value: 'c-field' },
    icon: { value: 'c-field-icon' },
    filled: { value: 'is-filled' },
    focused: { value: 'is-focused' },
    invalid: { value: 'is-invalid' },
    valid: { value: 'is-valid' }
  });

  const selector = Object.create(null, {
    box: { value: '.'+cls.box },
    button: { value: '.'+cls.button },
    buttonIcon: { value: '.'+cls.buttonIcon },
    error: { value: '.'+cls.error },
    field: { value: '.'+cls.field+':not([type=checkbox]):not([type=radio])' },
    fieldFake: { value: '.js-field-fake' },
    icon: { value: '.'+cls.icon },
    filled: { value: '.'+cls.filled },
    focused: { value: '.'+cls.focused }
  });

  const ons = Object.create(null, {
    blur: {
      value: function(e){
        let box = e.currentTarget.__box;
        let value = e.currentTarget.value;
        let isEmpty = value && value !='0' && value !='null';
        box && box.classList.remove(cls.focused);
        box && box.classList[ isEmpty ? 'add' : 'remove'](cls.filled);
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
        var field = e.currentTarget;

        if(['file', 'email', 'password'].indexOf(field.type) == -1 && !field.hasAttribute('pattern')) {
          return;
        }

        let box = field.__box;
        let value = field.value.trim();

        if(!value) {
          box.classList.remove('is-valid', 'is-invalid');
          return;
        }

        if(field.type == 'file') {
          field.__fake.value = value;
          return;
        }

        let pattern;
        if(field.hasAttribute('pattern')) pattern = new RegExp(field.pattern);
        else if(field.type == 'email') pattern = regEmail;
        else if(field.type == 'password') pattern = regPassword;
        
        checkPattern(pattern, box, value);

        return;
      }
    },
    clickButton: {
      value: function(e){
        var button = e.currentTarget;
        var field = button.__field;

        switch(field.type) {
          case 'search':
            let box = field.__box;
            let value = field.value.trim();
            if(!value) box.classList.add(cls.invalid);
            break;
          default:
            let icon = button.__icon;
            if(icon.dataset.glyph == 'eye-closed') {
              icon.dataset.glyph = 'eye-open';
              field.setAttribute('type', 'text');
            } else if(icon.dataset.glyph == 'eye-open') {
              icon.dataset.glyph = 'eye-closed';
              field.setAttribute('type', 'password');
            }
        }

        return;
      }
    },
    input: {
      value: function(e){
        var field = e.currentTarget;

        if(field.hasAttribute('pattern') && ['email', 'password'].indexOf(field.type) == -1){
          checkPattern(new RegExp(field.pattern), field.__box, field.value.trim());
        }

        return;
      }
    }
  });

  function checkPattern(pattern, box, value){
    if(!value) {
      box.classList.remove(cls.valid, cls.invalid);
      return true;
    }

    let isValid = pattern.test(value);
    if(isValid) {
      box.classList.add(cls.valid);
      box.classList.remove(cls.invalid);
    } else {
      box.classList.remove(cls.valid);
      box.classList.add(cls.invalid);
    }

    return isValid;
  }

  function listenField(elem) {
    if(elem instanceof Array) elem.forEach(el => listenField(el));
    if(!(elem instanceof HTMLElement)) return;

    elem.addEventListener('blur', ons.blur);
    elem.addEventListener('focus', ons.focus);
    elem.addEventListener('change', ons.change);
    elem.addEventListener('input', ons.input);
    elem.addEventListener('paste', ons.change);

    elem.dispatchEvent(new Event("blur"));
    elem.dispatchEvent(new Event("change"));

    if(elem.__button) {
      elem.__button.addEventListener('click', ons.clickButton);
    }

    return;
  }

  function initSubElementsOnFields(field) {
    if(field.hasOwnProperty('__box') || !field.classList.contains(cls.field)) return field;

    field.__box = field.parentNode.classList.contains(cls.box) ? field.parentNode : null;
    if(!field.__box) return field;

    field.__error = field.__box.querySelector(selector.error);
    field.__label = field.__box.querySelector(selector.label);

    if(field.type == 'file') {
      field.__fake = field.__box.querySelector(selector.fieldFake);
    }

    field.__button = field.__box.querySelector(selector.button);
    if(field.__button) {
      field.__button.__field = field;
      field.__button.__icon = field.__button.querySelector(selector.buttonIcon);
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