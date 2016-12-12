(function(UI){

    var doc = document.documentElement;

    UI.dom = Object.create(Backbone.Events);

    UI.dom.observer = new MutationObserver(function(mutations) {
        var options = {
            added: [],
            removed: []
        };

        mutations.forEach(function(record){
            if(record.type == 'childList') {
                let added = Array.from(record.addedNodes).filter(elem => elem instanceof HTMLElement);
                let removed = Array.from(record.removedNodes).filter(elem => elem instanceof HTMLElement);
                options.added = options.added.concat(added);
                options.removed = options.removed.concat(removed);
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
        UI.dom.trigger('ready', doc);
        return;
    });

}(UI));