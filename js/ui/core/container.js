;(function(UI){

    // Window

    UI.window = new (Backbone.Model.extend({
        name: 'WindowModel',
        defaults: {
            width: 0,
            height: 0
        },
        _origin: window
    }));


    // Container

    UI.container = new (Backbone.Model.extend({
        name: 'ContainerModel',
        defaults: {
            width: 0,
            height: 0,
            format: ''
        },
        initialize: function(){
            this.listenTo(UI.window, 'change:width', this.setFormat);
        },
        setFormat: function() {
            var format,
                win_width = UI.window.get('width');

            if(win_width >= 1360)
                format = 'xdesktop';
            else if(win_width >= 1180)
                format = 'desktop';
            else if(win_width >= 1024)
                format = 'tablet';
            else if(win_width >= 768)
                format = 'tablet-portrait';
            else if(win_width >= 480)
                format = 'handset';
            else
                format = 'handset-portrait';

            return this.set({
                'format': format,
                'height': this.el.offsetHeight,
                'width': this.el.offsetWidth
            });
        }
    }));

    var onWindowResize = _.throttle(function() {
        UI.window.set({
            'width': window.innerWidth,
            'height': window.innerHeight
        });
        return;
    }, 160);

    document.addEventListener("DOMContentLoaded", function(){
        window.UI.container.el = document.body.getElementsByClassName('o-container')[0];
        return;
    });

    window.addEventListener('load', function(){
        window.addEventListener('resize', onWindowResize, false);
        onWindowResize();
    }, false);

}(UI));