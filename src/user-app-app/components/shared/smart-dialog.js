import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';

class SmartDialog extends PolymerElement {
    static get template() {
        return html`
        <paper-dialog  entry-animation="scale-up-animation" exit-animation="fade-out-animation" with-backdrop>
        <slot></slot>
        </paper-dialog>

        
        `;
    }
}
customElements.define('smart-dialog', SmartDialog);