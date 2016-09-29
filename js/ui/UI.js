;(function (Backbone, _) {

    var UI = window.UI = _.extend({}, Backbone.Events);

    UI.Component = function (elem, options) {

    };

    document.addEventListener("DOMContentLoaded", function(){
        window.UI.trigger('ready');
        return;
    });
}(Backbone, _));