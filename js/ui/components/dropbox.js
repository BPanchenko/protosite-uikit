(function(UI){

    /** DOM events */

    var _ons = {
        change: {
            fieldFile: function(e){
                _dropFiles.call(this, e.currentTarget.files);
                return;
            }
        },
        click: {
            target: function(){
                this.elems.fieldFile.click();
                return;
            }
        },
        dragOver: function(e){
            e.preventDefault();
            this.el.classList.add('is-hover');
            this.elems.placeholder.dataset.text = 'Отпустите, чтобы начать загрузку';
            return;
        },
        dragLeave: function(e){
            e.preventDefault();
            this.el.classList.remove('is-hover');
            this.elems.placeholder.dataset.text = 'Загрузить файлы';
            return;
        },
        drop: function(e){
            e.preventDefault();
            e.dataTransfer && _dropFiles.call(this, e.dataTransfer.files);
            this.el.classList.add('is-drop');
            return;
        }
    };

    /** Class component */

    UI.Component.extend(
        // thisProps
        {
            name: 'Dropbox',
            tagName: 'section',
            className: 'o-dropbox',
            elems: null,
            type: null,
            url: null,

            events: {
                'click .js-target': _ons.click.target,
                'change .js-field-file': _ons.change.fieldFile,
                'dragover': _ons.dragOver,
                'dragleave': _ons.dragLeave,
                'drop': _ons.drop
            },

            initialize: function(){
                this.url = this.options.url || UI.Dropbox.url;
                this.type = this.options.type || UI.Dropbox.type;
            },

            render: function(){
                console.log(this.el);
                this.el.ondrop = _ons.drop.bind(this);
                _initElems.call(this);
                return this;
            }
        }
        // staticProps
        , {
            selector: '[ui-dropbox]',
            maxFiles: 5,
            maxFileSize: 4096 * 1024,
            type: 'image.*',
            url: 'http://api.protosite.rocks/photos/upload'
        }
    );

    /** Uploaded files */

    function _dropFiles (fileList) {
        _.each(fileList, function(file){
            (new FileView({
                file: file,
                type: this.type,
                url: this.url
            })).upload().render();
        }, this);
    }

    function _fileUploadProgress(e){
        var percent = parseInt(e.loaded / e.total * 100);
        console.log(percent);
        return this;
    }

    var errors = {
        exceededMaxFileSize: 'Файл слишком большой!'
    };

    var FileView = Backbone.View.extend({
        name: 'DropboxFileView',
        tagName: 'section',
        className: 'c-list__item',
        error: null,
        file: null,
        file_id: 0,
        isDownloaded: false,
        initialize: function(options){
            this.options = options;
            this.file = options.file;

            this.file.size > UI.Dropbox.maxFileSize && (this.error = 'exceededMaxFileSize');
            !this.file.type.match(this.options.type) && (this.error = 'wrongType');
        },

        template: function(){

        },
        render: function(){

            return this;
        },

        update: function(){
            if(this.error) return this;

            var formData = new FormData();

            var xhr = new XMLHttpRequest();
            xhr.timeout = 10000;
            xhr.open('PUT', this.options.url, true);
            xhr.send(formData);

            return xhr;
        },
        upload: function(){
            if(this.error) return this;

            var formData = new FormData();
            formData.append('file', this.file, this.file.name);

            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', _fileUploadProgress, false);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.isDownloaded = true;
                    this.file_id = JSON.parse(xhr.responseText).data.id;
                } else this.error = 'serverError';
                this.render();
            }.bind(this);
            xhr.open('POST', this.options.url, true);
            xhr.send(formData);

            return this;
        }
    });

    /** Private helpers */

    function _initElems(){
        this.elems = {
            fieldFile: this.el.getElementsByClassName('js-field-file')[0],
            files: this.el.getElementsByClassName('js-files')[0],
            placeholder: this.el.getElementsByClassName('js-placeholder')[0]
        };
        return this;
    }

    /** Init component on elements */

    UI.dom.on('ready change', function(doc, options){
        $('[ui-dropbox]').each(function(){
            if(!this._uiDropbox) {
                console.log((new UI.Dropbox(this, _.stringToObject(this.getAttribute('ui-dropbox')))).render());
            }
        });
    });

}(UI));