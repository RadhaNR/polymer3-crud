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
import './components/app-form.js';



setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class UserApp extends PolymerElement {
  static get template() {
    return html`
    
    <style include="granite-bootstrap">
    :host {
      --app-primary-color: #4285f4;
      --app-secondary-color: black;

      display: block;
    }

    app-drawer-layout:not([narrow]) [drawer-toggle] {
      display: none;
    }

    app-header {
      color: #fff;
      background-color: var(--app-primary-color);
    }

    app-header paper-icon-button {
      --paper-icon-button-ink-color: white;
    }

    .drawer-list {
      margin: 0 20px;
    }

    .drawer-list a {
      display: block;
      padding: 0 16px;
      text-decoration: none;
      color: var(--app-secondary-color);
      line-height: 40px;
    }

    .drawer-list a.iron-selected {
      color: black;
      font-weight: bold;
    }

  
  </style>

  <app-location route="{{route}}" url-space-regex="^[[rootPath]]" use-hash-as-path>
  </app-location>

  <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
  </app-route>

 


  <app-drawer-layout fullbleed="" narrow="{{narrow}}">
  <!-- Drawer content -->
  <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
    <app-toolbar class="btn btn-danger">Menu</app-toolbar>
    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
      <a name="user" href="#[[rootPath]]user">User List</a>
      <a name="chart" href="#[[rootPath]]chart">Chart</a>
      <a name="app-form" href="#[[rootPath]]app-form">app-form</a>
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
    <app-form name="app-form"></app-form>
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
    } else if (['user', 'chart', 'app-form'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'not-found';
    }

    // Close a non-persistent drawer when the page & route are changed.
    // if (!this.$.drawer.persistent) {
    //   this.$.drawer.close();
    // }
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

      case 'app-form':
        import('./components/app-form');
        break;
        
      case 'not-found':
        import('./components/my-404.js');
        break;
    }
  }
}

window.customElements.define('user-app', UserApp);
