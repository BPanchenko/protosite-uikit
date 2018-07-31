// We're importing the store Class here so we can test against it in the constructor
import Store from '../store/store.js';

export default class Component {
    constructor(props = {}) {

        // If there's a store passed in, subscribe to the state change
        if(props.store instanceof Store) {
            this.store = props.store;
            this.store.events.subscribe('stateChange', () => this.render());
        }

        // Store the HTML element to attach the render to if set
        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        } else {
            this.element = document.createElement(this.tagName);
            if(Array.isArray(this.className)) this.element.classList.add(...this.className);
            else if(this.className) this.element.classList.add('' + this.className);
        }
    }

    render() {
        return this;
    }

    get tagName() { return 'div'; }
    get className() { return null; }
}