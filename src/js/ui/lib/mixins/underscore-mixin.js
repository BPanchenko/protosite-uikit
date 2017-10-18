(function(_){
    s && _.mixin(s.exports());

    _.mixin({
        'checkEmail': function (str) {
            return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(str);
        },
        'checkUrl': function (str) {
            return /^(?:\S+)\.(?:\S+)$/i.test(str);
        },
        'queryToObject': function (str) {
            var obj = {};
            typeof str == 'string' && str && str.split('&').forEach(function (p) {
                var t = p.split('='), v = t[1] ? decodeURIComponent(t[1]) : null;
                obj[decodeURIComponent(t[0])] = /^\d+$/.test(v) ? +v : v;
            });
            return obj;
        },
        'objectToQuery': function(obj) {
            return Object.keys(obj).map(function(key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(obj[key]);
            }).join('&');
        },
        'parseUrl': function (str) {
            var _temp = /^(?:([a-z0-9_\-\.]+):\/\/)*(?:([a-z0-9_\-\.]+)(?:\:)*([a-z0-9_\-\.]+)*\@)*([a-z0-9][a-z0-9_\-\.]+)(?:\:([\d]+))*(?:\/([^?#]*))*(?:\?([^?#]*))*(?:\#([^?#]*))*/gi.exec(str);

            return {
                scheme: _temp[1] || false,
                user: _temp[2] || false,
                pass: _temp[3] || false,
                host: _temp[4] || false,
                port: _temp[5] || false,
                path: _temp[6] || false,
                query: _temp[7] || false,
                fragment: _temp[8] || false
            };
        },
        'stringToObject': function(string) {
            string = string.replace(/'/g, '"');
            string = string.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
                var count = string.substring(0, i).match(/"/g);
                return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
            });

            return JSON.parse(string);
        }
    });
})(_);