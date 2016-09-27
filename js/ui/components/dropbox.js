;(function(ui){

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

    /** Class component */

    var DropboxComponent = UI.Component.extend({
        selector: '[ui-dropbox]',
        events: {
            'dragover': _ons.dragOver,
            'dragleave': _ons.dragLeave
        },
        constructor: function (elem, options) {
            options || (options = {});
            console.assert((this.el = elem) instanceof HTMLElement, "A 'DropboxComponent' element is not HTMLElement");
            _addEventListeners.call(this);
        }
    });

    /** Uploaded files */

}(ui));