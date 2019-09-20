import "@vaadin/vaadin-icons/vaadin-icons.js";
import "@vaadin/vaadin-button/theme/material/vaadin-button.js";

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`
<dom-module id="material-color-picker-element-carousel" theme-for="element-carousel">
  <template>
    <style>
      [part="switch-button"] {
        min-width: 0;
        height: 32px;
        width: 32px;
        margin: 8px 0;
      }
    </style>
  </template>
</dom-module>

<dom-module id="material-color-picker-element-carousel-switch-button" theme-for="vaadin-button">
  <template>
    <style>
      :host([part="switch-button"]) [part="prefix"] ::slotted(iron-icon) {
        margin-right: 0;
        margin-left: 0;
      }
    </style>
  </template>
</dom-module>
`;
document.head.appendChild($_documentContainer.content);
