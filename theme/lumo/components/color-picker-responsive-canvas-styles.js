import '@vaadin/vaadin-button/src/vaadin-button.js';
import '@vaadin/vaadin-button/theme/lumo/vaadin-button-styles.js';

import {html} from '@polymer/polymer';

const $_documentContainer = html`
<dom-module id="lumo-color-picker-responsive-canvas" theme-for="responsive-canvas">
  <template>
    <style>
      :host([disabled]),
      :host([readonly]) {
        pointer-events: none;
      }

      [part="canvas"] {
        @apply --responsive-canvas-background-style;
        border-radius: inherit;
      }

      :host([disabled]) {
        opacity: 0.3;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
