import $ from 'jquery';

export class BaseElement {
    constructor() {
        this.element = null; // jQuery Object
        console.log(this.element);
        return;
    }

    appendToElement(el) {
        this.createElement();
        el.appendToElement(this.element);
    }

    createElement() {
        let s = this.getElementString();
        this.element = $(s);
    }

    // This is basically saying that this is an "interface" and that it needs this method
    getElementString() {
        throw 'Please override getElementString() in BaseElement';
    }
}