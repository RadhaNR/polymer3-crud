

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">

  <template>
  <link rel="stylesheet"  href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" /> 
    <style>
    
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

