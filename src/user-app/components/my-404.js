import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyChart extends PolymerElement {
    static get template() {
        return html`
       <h1>Page not found</h1>
        `;
    }
}
customElements.define('my-chart', MyChart);