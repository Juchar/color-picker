import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`
<dom-module id="material-color-picker-responsive-canvas" theme-for="responsive-canvas">
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
</dom-module>
`;
document.head.appendChild($_documentContainer.content);
