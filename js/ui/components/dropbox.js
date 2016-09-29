;(function(UI){

    /** DOM events */

    var _ons = {
        dragOver: function(e){
            this.elems.placeholder.classList.add('is-hover');
            return;
        },
        dragLeave: function(e){
            this.elems.placeholder.classList.remove('is-hover');
            return;
        }
    };

    /** Uploaded files */

    /** Class component */

    UI.Component.extend(
        // protoProps
        {
            name: 'Dropbox',
            events: {
                'dragover': _ons.dragOver,
                'dragleave': _ons.dragLeave
            },
            initialize: function (elem, options) {
                options || (options = {});
                console.assert((this.el = elem) instanceof HTMLElement, "A 'DropboxComponent' element is not HTMLElement");

            }
        }
        // staticProps
        , {
            selector: '[ui-dropbox]'
        }
    );

}(UI));