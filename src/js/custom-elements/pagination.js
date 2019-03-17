'use strict';

/**
 * Component: 'c-pagination'
 * 
 * Example:
<c-pagination data-displayed="5" data-current="7" data-pagesize="20" data-total="1234"></c-pagination>
 *
 * Markup:
<section class="c-pagination">
    <a class="c-pagination__prev" href="#prev" data-page="6" aria-disabled="false"></a>
    <a class="c-pagination__page" href="#page=1" data-page="1">1</a>
    <span class="c-pagination__ellipsis">&hellip;</span>
    <a class="c-pagination__page" href="#page=4" data-page="4" aria-selected="false">4</a>
    <a class="c-pagination__page" href="#page=5" data-page="5" aria-selected="false">5</a>
    <a class="c-pagination__page" href="#page=6" data-page="6" aria-selected="false">6</a>
    <a class="c-pagination__page" href="#page=7" data-page="7" aria-selected="true">7</a>
    <a class="c-pagination__page" href="#page=8" data-page="8" aria-selected="false">8</a>
    <a class="c-pagination__page" href="#page=9" data-page="9" aria-selected="false">9</a>
    <a class="c-pagination__page" href="#page=10" data-page="10" aria-selected="false">10</a>
    <span class="c-pagination__ellipsis">&hellip;</span>
    <a class="c-pagination__page" href="#page=124" data-page="124">124</a>
    <a class="c-pagination__next" href="#next" data-page="7" aria-disabled="false"></a>
</section>
 */

(function() {

    const attrs = ['data-displayed', 'data-current', 'data-pagesize', 'data-total'];

    const CLS = Object.create(null, {
        'main': { value: 'c-pagination' },
        'ellipsis': { value: 'c-pagination__ellipsis' },
        'next': { value: 'c-pagination__next' },
        'page': { value: 'c-pagination__page' },
        'prev': { value: 'c-pagination__prev' }
    });

    class PaginationElement extends HTMLElement {
        connectedCallback() {
            this.render();
            this.addEventListener('click', onClick, false);

            (new MutationObserver(() => this.render())).observe(this, {
                attributes: true,
                attributeFilter: attrs
            });
        }

        render() {
            let {
                current, pages,
                disabledFirst,
                disabledLast,
                prev, next,
                end, start
            } = this.calc();

            let html = `
                <a class="c-pagination__prev" href="#page=${prev}" data-page="${prev}" aria-disabled="${prev == 1}"></a>
                <a class="c-pagination__page" href="#page=1" data-page="1" aria-disabled="${disabledFirst}">1</a>
                <span class="c-pagination__ellipsis" aria-disabled="${disabledFirst}">&hellip;</span>
            `;

            for (let i = start; i <= end; i++) {
                html += `<a class="c-pagination__page" href="#page=${i}" data-page="${i}" aria-selected="${current == i}">${i}</a>`;
            }

            html += `
                <span class="c-pagination__ellipsis" aria-disabled="${disabledLast}">&hellip;</span>
                <a class="c-pagination__page" href="#page=${pages}" data-page="${pages}" aria-disabled="${disabledLast}">${pages}</a>
                <a class="c-pagination__next" href="#page=${next}" data-page="${next}" aria-disabled="${next == pages}"></a>
            `;

            this.innerHTML = html;
            return this;
        }

        calc() {
            let {
                current = 1,
                displayed = 5,
                pagesize = 20,
                total = 0
            } = this.options();
            
            this.classList.add(CLS.main);
            this.setAttribute('aria-disabled', !total);

            let edgesStart = Math.floor((displayed-1)/2);
            let edgesEnd = Math.ceil((displayed-1)/2);
            let pages = Math.ceil(total/pagesize);
            
            if (displayed > pages) displayed = pages;

            let disabledFirst = current < edgesStart + 1;
            let disabledLast = current > pages - edgesEnd;

            let prev = current - 1;
            let next = current + 1;

            if (prev < 1) prev = 1;
            if (next > pages) next = pages;

            let start = current - edgesStart;
            let end = current + edgesEnd;

            if (start < 1) start = 1, end = displayed;
            if (end > pages) end = pages, start = end - displayed + 1;

            return {
                current, pages,
                disabledFirst, disabledLast,
                prev, next,
                end, start
            };
        }

        options() {
            let {
                current = 1,
                displayed = 5,
                pagesize = 20,
                total = 0
            } = this.dataset;

            current   = parseInt(current);
            displayed = parseInt(displayed);
            pagesize  = parseInt(pagesize);
            total     = parseInt(total);

            return { current, displayed, pagesize, total };
        }
    }

    function onClick(evt) {
        evt.preventDefault();
        if (evt.target.dataset.hasOwnProperty('page')) {
            evt.currentTarget.dataset.current = evt.target.dataset.page;
        }
        return;
    }

    // Define the new element

    if (customElements) customElements.define('c-pagination', PaginationElement);
    if (typeof exports != 'undefined' && !exports.nodeType) exports.PaginationElement = PaginationElement;
}());