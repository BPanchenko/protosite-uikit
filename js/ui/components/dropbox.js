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
            this.reset();
            return;
        },
        drop: function(e){
            e.preventDefault();
            e.dataTransfer && _dropFiles.call(this, e.dataTransfer.files);

            this.el.classList.add('is-drop');
            this.elems.placeholder.dataset.text = 'Файлы загружаются';

            setTimeout(this.reset.bind(this), 1200);
            return;
        }
    };

    /** Class component */

    UI.Component.extend(
        // thisProps
        {
            name: 'Dropbox',
            tagName: 'section',
            className: 'app-dropbox',
            elems: null,
            type: null,
            url: null,

            events: {
                'click .js-target': _ons.click.target,
                'change .js-field-file': _ons.change.fieldFile,
                'dragover': _ons.dragOver,
                'dragleave': _ons.dragLeave
            },

            initialize: function(){
                this.url = this.options.url || UI.Dropbox.url;
            },

            render: function(){
                this.el.addEventListener('drop', _ons.drop.bind(this), false);
                _initElems.call(this);
                return this;
            },
            reset: function(){
                this.el.classList.remove('is-drop', 'is-hover');
                this.elems.placeholder.dataset.text = 'Загрузить файлы';
                return;
            }
        }
        // staticProps
        , {
            selector: '[ui-dropbox]',
            url: 'http://api.protosite.rocks/photos/upload'
        }
    );

    /** Uploaded files */

    function _dropFiles (fileList) {
        _.each(fileList, function(file){
            var view = new FileView({
                file: file,
                url: this.url
            });
            this.elems.files.appendChild(view.el);
            view.upload().render();
        }, this);
    }

    function _fileUploadProgress(e){
        var percent = parseInt(e.loaded / e.total * 100);
        this.model.set('progress', percent);
        return this;
    }

    var FileView = Backbone.View.extend({
        name: 'DropboxFileView',
        tagName: 'section',
        className: 'c-list__item',

        file: null,
        model: null,

        initialize: function(options){
            this.options = options;
            this.file = options.file;

            var _temp = this.file.name.split('.'),
                _extension = _.last(_temp),
                _filename = this.file.name.replace('.'+_extension, '');

            this.model = new Backbone.Model({
                src: '',
                progress: 0,
                extension: _extension,
                filename: _filename,
                type: this.file.type,
                size: this.file.size
            });

            if (/image\/.+/.test(this.file.type)) {
                var reader  = new FileReader();
                reader.addEventListener("load", function (e) {
                    this.model.set('src', reader.result);
                }.bind(this), false);
                reader.readAsDataURL(this.file);
            }

            this.listenTo(this.model, 'change', this.render);
        },

        elems: {
            description: 'js-description',
            filename: 'js-filename',
            image: 'js-image',
            progressBar: 'js-progress-bar'
        },

        tpl: '<div class="c-list__column">'
                + '<figure class="c-thumbnail"><img src="<%= src %>" class="js-image"></figure>'
             + '</div>'
             + '<div class="c-list__column">'
                + '<span class="js-filename"><%= filename %>.<%= extension %></span>'
                + '<textarea class="c-field js-description"></textarea>'
             + '</div>'
             + '<div class="c-list__column app-dropbox__controls">'
                + '<button class="c-button c-button--link"><i class="iconic" data-glyph="trash"></i></button>'
             + '</div>'
             + '<div class="c-progress"><span class="c-progress__bar js-progress-bar"></span></div>',

        onRender: function(){
            !this.model.isNew() && (this.el.dataset.id = this.model.id);
            return;
        },

        reRender: function(){
            this.elems.filename.innerHTML = this.model.get('filename') + '.' + this.model.get('extension');
            this.elems.image.src = this.model.get('src');
            this.elems.progressBar.style.width = this.model.get('progress') + '%';
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
            xhr.upload.addEventListener('progress', _fileUploadProgress.bind(this), false);
            xhr.onload = function () {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    this.model.set(response.data);
                } else {
                    this.model.set('error', response.meta);
                }
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
                (new UI.Dropbox(this, _.stringToObject(this.getAttribute('ui-dropbox')))).render();
            }
        });
    });

}(UI));