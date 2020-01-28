import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './components/user-list.js';
import './components/my-chart.js';

setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class UserAppApp extends PolymerElement {
  static get template() {
    return html`
    <style>
    
  </style>

  <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
  </app-location>

  <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
  </app-route>

  <app-drawer-layout fullbleed="" narrow="{{narrow}}">
  <!-- Drawer content -->
  <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
    <app-toolbar>Menu</app-toolbar>
    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
      <a name="user" href="[[rootPath]]user">View One</a>
      <a name="chart" href="[[rootPath]]chart">View Two</a>
    </iron-selector>
  </app-drawer>

  <!-- Main content -->
  <app-header-layout has-scrolling-region="">

    <app-header slot="header" condenses="" reveals="" effects="waterfall">
      <app-toolbar>
        <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
        <div main-title="">My App</div>
      </app-toolbar>
    </app-header>

    <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
    <user-list name="user"></user-list>
    <my-chart name="chart"></my-chart>
      <my-404 name="not-found"></my-404>
    </iron-pages>
  </app-header-layout>
</app-drawer-layout>

   
    
      
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'user';
    } else if (['user', 'chart'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'not-found';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'user':
        import('./components/user-list.js');
        break;
      case 'chart':
        import('./components/my-chart');
        break;
    
      case 'not-found':
        import('./components/my-404.js');
        break;
    }
  }
}

window.customElements.define('user-app-app', UserAppApp);
