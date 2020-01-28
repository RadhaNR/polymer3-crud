import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './components/user-list.js';
import './components/my-chart.js';
/**
 * @customElement
 * @polymer
 */
class UserAppApp extends PolymerElement {
  static get template() {
    return html`
    <my-chart></my-chart>
    <br/>
      <user-list></user-list>
      
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'user-app-app'
      }
    };
  }
}

window.customElements.define('user-app-app', UserAppApp);
