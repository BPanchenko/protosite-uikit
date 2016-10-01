(function(UI){

    var doc = document.documentElement;

    UI.dom = _.extend({}, Backbone.Events);

    UI.dom.observer = new MutationObserver(function(mutations) {
        var options = {
            added: [],
            removed: []
        };

        mutations.forEach(function(record){
            if(record.type == 'childList') {
                options.added = options.added.concat([].slice.call(record.addedNodes));
                options.removed = options.removed.concat([].slice.call(record.removedNodes));
            }
        });

        UI.dom.trigger('change', doc, options);
    });

    UI.dom.on('ready', function(){
        UI.dom.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

    document.addEventListener("DOMContentLoaded", function(){
        UI.dom.trigger('ready', doc, {});
        return;
    });

}(UI));