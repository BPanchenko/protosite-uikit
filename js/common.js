if (!Element.prototype.getParentByClassName) {
	Element.prototype.getParentByClassName = function(className) {
		var _el = this;
		do {
			_el = _el.parentNode;
			if (_el.classList.contains(className)) return _el;
		} while (_el.parentNode instanceof Element)
		return null;
	}
}
if (!Element.prototype.getPreviousByClassName) {
    Element.prototype.getPreviousByClassName = function (className) {
        var _el = this;
        while (_el.previousSibling) {
            _el = _el.previousSibling;
            if (_el.classList && _el.classList.contains(className)) return _el;
        }
        return null;
    }
}
if (!Element.prototype.getSiblings) {
    Element.prototype.getSiblings = function () {
        var _res = [];
        [].slice.call(this.parentNode.children).forEach(function (__el) {
            if (this != __el) _res.push(__el);
        }, this);
        return _res;
    }
}
if (!Element.prototype.getSiblingsByClassName) {
    Element.prototype.getSiblingsByClassName = function (className) {
        var _res = [], _el, _siblings = this.getSiblings(), _i = _siblings.length - 1;
        for (; _i>=0; _i--) {
            _el = _siblings[_i];
            if (_el.classList && _el.classList.contains(className)) _res.push(_el);
        }
        return _res;
    }
}

if(!Element.prototype.offset) {
	Element.prototype.offset = function() {
		var top=0, left=0, el=this;
		if (el.getBoundingClientRect) {
			var box = el.getBoundingClientRect(),
				body = document.body,
				docElem = document.documentElement,
				scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
				scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
				clientTop = docElem.clientTop || body.clientTop || 0,
				clientLeft = docElem.clientLeft || body.clientLeft || 0;
			
			top  = Math.round(box.top +  scrollTop - clientTop);
			left = Math.round(box.left + scrollLeft - clientLeft);
		} else {
			while(el) {
				top = top + parseFloat(el.offsetTop);
				left = left + parseFloat(el.offsetLeft);
				el = el.offsetParent;     
			}
		}
		return { 'top': top, 'left': left };
	}
}

if (!Element.prototype.remove) {
    Element.prototype.remove = function () { var p = this.parentElement; p.removeChild(this); return p; }
}

if(!Element.prototype.width || !Element.prototype.height) {
	Element.prototype.width = function(value){
		if(value) {
			if(/(\drem|em|px|pt)/i.test(value))
				this.style.width = value;
			else
				this.style.width = Math.round(value)+'px';
			return this;
		}
		return this.offsetWidth;
	}
	Element.prototype.height = function(value){
		if(value) {
			if(/(\drem|em|px|pt)/i.test(value))
				this.style.height = value;
			else
				this.style.height = Math.round(value)+'px';
			return this;
		}
		return this.offsetHeight;
	}
}

if (!Number.prototype.ci) {
    // (1).ci('cущност|ей|ь|и')
    Number.prototype.ci = function (c, f) {
		f || (f = true);
        c = c.split('|');
        var n = this.toString().substr(-2), res = f ? this + ' ' : '';
        return res + c[0] + ((/^[0,2-9]?[1]$/.test(n)) ? c[2] : ((/^[0,2-9]?[2-4]$/.test(n)) ? c[3] : c[1]));
    }
}

if (!Number.prototype.pad) {
    Number.prototype.pad = function (size) {
        var s = this + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
}

if (!Number.prototype.separate) {
	Number.prototype.separate = function(sep, bits) {
		var s = sep || '&thinsp;',
			b = parseInt(bits) || 3,
			n = this+'';
		return n.replace(/\d(?=(\d{3})+[^\d])/g, '$&'+sep);
	}
}

if (!Number.prototype.toBoolean) {
    Number.prototype.toBoolean = function () {
        return !!+this;
    }
}

if (!Number.prototype.toWord) {
	Number.prototype.toWord = function() {
		var a, c = this;
		function k(b, c) {
			var d = c[0],
				e = c[1],
				f = c[2];
			return b % 10 == 1 && b % 100 != 11 ? d : b % 10 >= 2 && b % 10 <= 4 && (b % 100 < 10 || b % 100 >= 20) ? e : f
		}
		for (var d = {
			0: {
				1: "\u043e\u0434\u0438\u043d",
				2: "\u0434\u0432\u0430",
				3: "\u0442\u0440\u0438",
				4: "\u0447\u0435\u0442\u044b\u0440\u0435",
				5: "\u043f\u044f\u0442\u044c",
				6: "\u0448\u0435\u0441\u0442\u044c",
				7: "\u0441\u0435\u043c\u044c",
				8: "\u0432\u043e\u0441\u0435\u043c\u044c",
				9: "\u0434\u0435\u0432\u044f\u0442\u044c",
				10: "\u0434\u0435\u0441\u044f\u0442\u044c",
				11: "\u043e\u0434\u0438\u043d\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				12: "\u0434\u0432\u0435\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				13: "\u0442\u0440\u0438\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				14: "\u0447\u0435\u0442\u044b\u0440\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				15: "\u043f\u044f\u0442\u043d\u0430\u0446\u0430\u0442\u044c",
				16: "\u0448\u0435\u0441\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				17: "\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				18: "\u0432\u043e\u0441\u0435\u043c\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				19: "\u0434\u0435\u0432\u044f\u0442\u043d\u0430\u0434\u0446\u0430\u0442\u044c",
				20: "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044c",
				30: "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044c",
				40: "\u0441\u043e\u0440\u043e\u043a",
				50: "\u043f\u044f\u0442\u044c\u0434\u0435\u0441\u044f\u0442",
				60: "\u0448\u0435\u0441\u0442\u044c\u0434\u0435\u0441\u044f\u0442",
				70: "\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442",
				80: "\u0432\u043e\u0441\u0435\u043c\u044c\u0434\u0435\u0441\u044f\u0442",
				90: "\u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e",
				100: "\u0441\u0442\u043e",
				200: "\u0434\u0432\u0435\u0441\u0442\u0438",
				300: "\u0442\u0440\u0438\u0441\u0442\u0430",
				400: "\u0447\u0435\u0442\u044b\u0440\u0435\u0441\u0442\u0430",
				500: "\u043f\u044f\u0442\u044c\u0441\u043e\u0442",
				600: "\u0448\u0435\u0441\u0442\u044c\u0441\u043e\u0442",
				700: "\u0441\u0435\u043c\u044c\u0441\u043e\u0442",
				800: "\u0432\u043e\u0441\u0435\u043c\u044c\u0441\u043e\u0442",
				900: "\u0434\u0435\u0432\u044f\u0442\u044c\u0441\u043e\u0442"
			},
			1: {
				1: "\u043e\u0434\u043d\u0430",
				2: "\u0434\u0432\u0435"
			}
		}, i = {
			0: ["", "", ""],
			1: ["\u0442\u044b\u0441\u044f\u0447\u0430", "\u0442\u044b\u0441\u044f\u0447\u0438", "\u0442\u044b\u0441\u044f\u0447"],
			2: ["\u043c\u0438\u043b\u043b\u0438\u043e\u043d", "\u043c\u0438\u043b\u043b\u0438\u043e\u043d\u0430", "\u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432"],
			3: ["\u043c\u0438\u043b\u043b\u0438\u0430\u0440\u0434", "\u043c\u0438\u043b\u043b\u0438\u0430\u0440\u0434\u0430", "\u043c\u0438\u043b\u043b\u0438\u0430\u0440\u0434\u043e\u0432"],
			4: ["\u0442\u0440\u0438\u043b\u043b\u0438\u043e\u043d", "\u0442\u0440\u0438\u043b\u043b\u0438\u043e\u043d\u0430", "\u0442\u0440\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432"],
			5: ["\u043a\u0432\u0430\u0434\u0440\u0438\u043b\u043b\u0438\u043e\u043d", "\u043a\u0432\u0430\u0434\u0440\u0438\u043b\u043b\u0438\u043e\u043d\u0430", "\u043a\u0432\u0430\u0434\u0440\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432"],
			6: ["\u043a\u0432\u0438\u043d\u0442\u0438\u043b\u043b\u0438\u043e\u043d", "\u043a\u0432\u0438\u043d\u0442\u0438\u043b\u043b\u0438\u043e\u043d\u0430", "\u043a\u0432\u0438\u043d\u0442\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432"]
		}, h = "", j = (("" + c).match(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g)||[]).reverse(), e = 0; e < j.length; e++) {
				for (var f = d[e], c = j[e], b = "", g = 0; g < c.length; g++) if (a = c.substr(g), f && f[a] || d[0][a]) {
				b = b + " " + (f && f[a] || d[0][a]);
				break
			} else a = +c.substr(g, 1) * Math.pow(10, a.length - 1), +a in d[0] && (b = b + " " + d[0][a]);
//			b && (b = c + " = " + b + " " + k(+c, i[e] || i[0]) + "<br />");
			b && (b = b + " " + k(+c, i[e] || i[0]));
			h = b + h
		}
		return h || "\u043d\u043e\u043b\u044c"
	}
}


document.addEventListener("DOMContentLoaded", function(){
	
	[].slice.call(document.body.getElementsByClassName('ui-field-hint')).forEach(function (label) {
		label.dataset.initvalue = label.innerHTML;
	});
	
	document.body.addEventListener('focus', function(e){
		var fieldset, label,
			target = e.target;
	
		if(target.classList.contains('ui-field')) {
			fieldset = target.getParentByClassName('ui-fieldset');
			label = fieldset.getElementsByClassName('ui-field-hint')[0];
			if(fieldset instanceof HTMLElement) {
				label.innerHTML = "focus & filled";
				fieldset.classList.add('ui-fieldset--focus');
				fieldset.classList.add('ui-fieldset--filled');
			}
		}
		
		return;
	}, true);
	
	document.body.addEventListener('blur', function(e){
		var fieldset, label,
			field = e.target;
			
		if(field.classList.contains('ui-field')) {
			fieldset = field.getParentByClassName('ui-fieldset');
			label = fieldset.getElementsByClassName('ui-field-hint')[0];
			if(fieldset instanceof HTMLElement) {
				fieldset.classList.remove('ui-fieldset--focus');
				if(!field.value.trim()) {
					label.innerHTML = label.dataset.initvalue;
					fieldset.classList.remove('ui-fieldset--filled');
				} else
					label.innerHTML = "filled, value: " + field.value.trim();
			}
		}
		
		return;
	}, true);
	
	[].slice.call(document.body.getElementsByClassName('ui-field')).forEach(function(field){
		var fieldset;
		
		if(field.value.trim()) {
			fieldset = field.getParentByClassName('ui-fieldset');
			if(fieldset instanceof HTMLElement)
				fieldset.classList.add('ui-fieldset--filled');
		}
	});
	
}, false);