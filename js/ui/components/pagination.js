(function(UI){

    var tpl = '<div class="c-pagination__pages">'
                + '<a class="c-pagination__prev" href="#prev" data-page="<%=(page - 1)%>" aria-disabled="<%= page == 1 %>"></a>'
                + '<% if(page > edges + 1) { %>'
                + '<a class="c-pagination__page" href="#p=1" data-page="1">1</a>'
                + '<span class="c-pagination__ellipsis">&hellip;</span>'
                + '<% } %>'
                + '<% for(var i = start; i <= end; i++) if(i) { %>'
                + '<a class="c-pagination__page" href="#p=<%=i%>" data-page="<%=i%>" aria-selected="<%= page == i %>"><%=i%></a>'
                + '<% } %>'
                + '<% if(page < total - edges) { %>'
                + '<span class="c-pagination__ellipsis">&hellip;</span>'
                + '<a class="c-pagination__page" href="#p=<%= total %>" data-page="<%=total%>"><%= total %></a>'
                + '<% } %>'
                + '<a class="c-pagination__next" href="#next" data-page="<%=(page + 1)%>" aria-disabled="<%= page == total %>"></a>'
            + '</div>'
            + '<div class="c-pagination__perpage">'
                + '<a href="#select-per-page" class="c-pagination__perpage__current"><%=itemsOnPage%></a>'
                + '<div class="c-pagination__perpage__values">'
                + '<% itemsOnPageValues.forEach(function(iop){ %>'
                + '<a href="#p=1&itemsOnPage=<%=iop%>"'
                    + ' data-items_on_page="<%=iop%>"'
                    + ' class="c-pagination__perpage__value"'
                    + ' aria-selected="<%= itemsOnPage == iop %>"><%=iop%></a>'
                + '<% });%>'
                + '</div>'
            + '</div>';

    var observer = new MutationObserver(function(mutations) {
        var target = mutations[0].target;
        var attrs = _.stringToObject(target.getAttribute('ui-pagination'));
        target._uiPagination.model.set(attrs);
    });

    var paginationOptions = ['page','items','itemsOnPage','itemsOnPageValues'];

    var PaginationModel = Backbone.Model.extend({
        name: 'PaginationModel',
        defaults: {
            page: 1,
            displayedPages: 7,
            edges: 3,
            items: 0,
            itemsOnPage: 20,
            itemsOnPageValues: [100, 50, 20]
        }
    });

    var _hns = {
        model: {
            change: function(model){
                this.el.setAttribute('ui-pagination', JSON.stringify(this.model.pick(paginationOptions)));
                this.render();
                return;
            }
        }
    };

    /** Class component */

    UI.Component.extend(
        // thisProps
        {
            name: 'Pagination',
            tagName: 'section',
            className: 'c-pagination',

            events: {
                'click a': function(e){
                    e.preventDefault();

                    var target = e.currentTarget,
                        is_selected = target.getAttribute('aria-selected') == 'true',
                        is_disabled = target.getAttribute('aria-disabled') == 'true',
                        page = +target.dataset.page,
                        itemsOnPage = +target.dataset.items_on_page;

                    var attrs = this.model.pick('page', 'itemsOnPage');

                    if (is_selected || is_disabled) return;

                    if(!_.isNaN(page)) {
                        attrs.page = page;
                    }

                    if(!_.isNaN(itemsOnPage)) {
                        attrs.page = Math.ceil((attrs.page * attrs.itemsOnPage - Math.ceil(attrs.itemsOnPage/2))/itemsOnPage);
                        attrs.itemsOnPage = itemsOnPage;
                    }

                    this.model.set(attrs);
                    return;
                }
            },

            initialize: function(){
                this.model = new PaginationModel(_.pick(this.options, paginationOptions));
                this.listenTo(this.model, 'change', _hns.model.change);

                observer.observe(this.el, {
                    attributes: true,
                    attributeFilter: ['ui-pagination']
                });
            },

            template: function () {
                var state = this.model.toJSON(),
                    data = _.extend({
                        start: state.page - state.edges,
                        end: state.edges + state.page,
                        total: Math.ceil(state.items/state.itemsOnPage)
                    }, state);

                var displayedPages = data.total < state.displayedPages ? data.total : state.displayedPages;

                if(data.start < 1) {
                    data.start = 1;
                    data.end = displayedPages;
                }

                if(data.end > data.total) {
                    data.end = data.total;
                    data.start = data.end - displayedPages + 1;
                }

                return _.template(tpl)(data);
            },
            render: function () {
                this.el.innerHTML = _.result(this, 'template');
                this.el.setAttribute('aria-disable', !this.model.get('items'));
                return this;
            }
        }
    );

    /** Init component on elements */

    UI.dom.on('ready change', function(doc, options){
        $(UI.Pagination.selector).each(function(){
            if(!this[UI.Pagination.link]) {
                console.log((new UI.Pagination(this, _.stringToObject(this.getAttribute(UI.Pagination.attr)))).render());
            }
        });
    });

}(UI));