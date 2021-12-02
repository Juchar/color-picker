import '@vaadin/vaadin-button/src/vaadin-button.js';
import '@vaadin/button/theme/lumo/vaadin-button-styles.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<dom-module id="color-picker-responsive-canvas-styles" theme-for="responsive-canvas">
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
