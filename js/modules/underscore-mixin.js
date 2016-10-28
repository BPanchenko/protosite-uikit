(function(_){
    s && _.mixin(s.exports());

    _.mixin({
        'objectToQuery': function(obj) {
            return Object.keys(obj).map(function(key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(obj[key]);
            }).join('&');
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