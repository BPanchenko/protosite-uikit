(function(UI){

    const tpl = `
        <div class="c-pagination__pages">
            <a class="c-pagination__prev" href="#prev" data-page="<%=(page - 1)%>" aria-disabled="<%= page == 1 %>"></a>
            <% if(page > edges + 1) { %>
            <a class="c-pagination__page" href="#p=1" data-page="1">1</a>
            <span class="c-pagination__ellipsis">&hellip;</span>
            <% } %>
            <% for(var i = start; i <= end; i++) if(i) { %>
            <a class="c-pagination__page" href="#p=<%=i%>" data-page="<%=i%>" aria-selected="<%= page == i %>"><%=i%></a>
            <% } %>
            <% if(page < total - edges) { %>
            <span class="c-pagination__ellipsis">&hellip;</span>
            <a class="c-pagination__page" href="#p=<%= total %>" data-page="<%=total%>"><%= total %></a>
            <% } %>
            <a class="c-pagination__next" href="#next" data-page="<%=(page + 1)%>" aria-disabled="<%= page == total %>"></a>
        </div>
        <div class="c-pagination__perpage">
            <a href="#select-per-page" class="c-pagination__perpage__current"><%=itemsOnPage%></a>
            <div class="c-pagination__perpage__values">
            <% itemsOnPageValues.forEach(function(iop){ %>
            <a href="#p=1&itemsOnPage=<%=iop%>"
                 data-items_on_page="<%=iop%>"
                 class="c-pagination__perpage__value"
                 aria-selected="<%= itemsOnPage == iop %>"><%=iop%></a>
            <% });%>
            </div>
        </div>
    `;

    const observer = new MutationObserver(mutations => {
        let target = mutations[0].target;
        let attrs = _.stringToObject(target.getAttribute('ui-pagination'));
        target._uiPagination.model.set(attrs);
    });

    const paginationOptions = ['page', 'items', 'itemsOnPage', 'itemsOnPageValues'];

    const _hns = {
        model: {
            change: function(model) {
                this.el.setAttribute('ui-pagination', JSON.stringify(model.pick(paginationOptions)));
                this.render();
                return;
            }
        }
    };

    /** State model */

    class PaginationModel extends Backbone.Model {
        constructor(data) {
            // defaults
            data = Object.assign({
                page: 1,
                displayedPages: 7,
                edges: 3,
                items: 0,
                itemsOnPage: 20,
                itemsOnPageValues: [100, 50, 20]
            }, data);
            // constructor
            super(data);
        }
    }

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
                if(_.isString(this.options)) this.options = _.stringToObject(this.options);

                this.model = new PaginationModel(_.pick(this.options, paginationOptions));
                this.listenToAndRun(this.model, 'change', _hns.model.change);

                observer.observe(this.el, {
                    attributes: true,
                    attributeFilter: [this.constructor.attr]
                });
            },

            template: function () {
                var state = this.model.toJSON(),
                    data = Object.assign({
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
                this.el.innerHTML = this.template();
                this.el.setAttribute('aria-disable', !this.model.get('items'));
                return this;
            }
        }
    );

    /** Init component on elements */

    function _init(elems){
        Array.from(elems)
            .filter(elem => elem.hasAttribute(UI.Pagination.attr) && !elem[UI.Pagination.reference])
            .forEach(elem => new UI.Pagination(elem, elem.getAttribute(UI.Pagination.attr)));
        return;
    }

    UI.dom.on('ready', function(doc){
        _init(doc.querySelectorAll(UI.Pagination.selector));
    });

    UI.dom.on('change', function(doc, options){
        _init(options.added);
    });

}(UI));