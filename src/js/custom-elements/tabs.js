(function() {

    /* Class `TabsContainerElement`
     ========================================================================== */

    class TablistElement extends HTMLElement {

        get activeTab() {
            return this.dataset.activeTab;
        }

        get activeTabpanel() {
            return this.dataset.activeTabpanel;
        }

        connectedCallback() {
            this.classList.add('c-tabs-container');
            this.setAttribute('role', 'tablist');

            if (!this.indicator) {
                this.indicator = createIndicator();
                this.appendChild(this.indicator);
            }

            this.addEventListener('click', this.onSelectTab, false);
            setTimeout(this.activate.bind(this), 0);
        }

        activate() {
            let selectedTab = this.querySelector('.c-tab[aria-selected=true]');
            if(!selectedTab) selectedTab = this.children[0];
            selectedTab.dispatchEvent(new Event("click", { bubbles: true }));
        }

        onSelectTab(e) {
            let selectedTab;

            // unselect don't current tabs
            this.querySelectorAll('.c-tab').forEach(tab => {
                if(tab.contains(e.target)) selectedTab = tab;
                else tab.ariaSelected = false;
            });

            // dispatch a change event with the data of the selected tab
            if(selectedTab) {
                this.dataset.activeTab = selectedTab.id;
                this.dataset.activeTabpanel = selectedTab.ariaControls;
                this.dispatchEvent(new Event("change", { bubbles: true }));
            }

            this.renderIndicator();

            return;
        }

        renderIndicator() {
            let selectedTab = this.querySelector('.c-tab[aria-selected=true]');

            this.indicator.setAttribute('aria-hidden', !selectedTab);
            if(selectedTab) {
                this.indicator.style.width = selectedTab.clientWidth + 'px';
                this.indicator.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
            }
        }
    }

    /* Class `TabElement`
     ========================================================================== */

    class TabElement extends HTMLElement {

        get ariaControls() {
            return this.getAttribute('aria-controls') || '';
        }

        set ariaSelected(flag) {
            this.setAttribute('aria-selected', !!flag && flag != 'false');
        }

        connectedCallback() {
            this.classList.add('c-tab');
            this.setAttribute('role', 'tab');

            if (this.dataset.glyph) {
                this.appendChild(createIcon(this.dataset.glyph));
                delete this.dataset.glyph;
            }

            if (this.dataset.text) {
                this.appendChild(createLabel(this.dataset.text));
                delete this.dataset.text;
            }

            this.addEventListener('click', this.onSelectTab);
        }

        onSelectTab(e) {
            e.preventDefault();
            this.setAttribute('aria-selected', true);
            return;
        }
    }

    // Private function's

    function createIcon(glyph) {
        let node = document.createElement('span');
        node.classList.add('c-tab__icon');
        node.innerHTML = `<span class="iconic" data-glyph="${glyph}"></span>`;
        return node;
    }

    function createLabel(text) {
        let node = document.createElement('span');
        node.classList.add('c-tab__label');
        node.innerText = text;
        return node;
    }


    function createIndicator() {
        let node = document.createElement('span');
        node.classList.add('c-tab-indicator');
        return node;
    }

    // Define the new element's

    if (customElements) {
        customElements.define('c-tablist', TablistElement);
        customElements.define('c-tab', TabElement);
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        exports.TablistElement = TablistElement;
        exports.TabElement = TabElement;
    }
}());