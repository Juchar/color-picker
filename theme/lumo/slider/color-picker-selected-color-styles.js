import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`
<dom-module id="lumo-color-picker-selected-color" theme-for="selected-color">
  <template>
    <style>
      :host {
        --color-picker-selected-color-box-shadow: var(--lumo-box-shadow-s);

        width: var(--lumo-size-m);
        height: var(--lumo-size-m);
        box-shadow: var(--color-picker-selected-color-box-shadow);
        margin: var(--lumo-space-xs) 0;
        border-radius: 50%;
      }

      [part="previous-color-canvas"],
      [part="selected-color-canvas"] {
        --responsive-canvas-background-style: var(--color-picker-alpha-checkerboard-background-style);
      }

      :host([disabled]) {
        pointer-events: none;
        box-shadow: none;
      }

      :host([disabled])::after {
        position: absolute;
        content: '';
        background: var(--lumo-contrast-10pct);
        box-sizing: border-box;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }

      [part="previous-color-canvas"],
      [part="selected-color-canvas"] {
        transition: width .2s cubic-bezier(.12, .32, .54, 1), border-radius .2s cubic-bezier(.12, .32, .54, 1);
        will-change: width, border-radius;
      }

      [part="selected-color-canvas"] {
        border-radius: 50%;
      }

      [part="previous-color-canvas"] {
        border-top-right-radius: 100% 50%;
        border-bottom-right-radius: 100% 50%;
      }

      [part="previous-icon"] {
        padding: 8px;
        box-sizing: border-box;
        transform: scale(0);
        transition: opacity .4s, transform .2s cubic-bezier(.12, .32, .54, 2);
        will-change: opacity, transform;
      }

      [part="halo"] {
        border-radius: 50%;
        transform: scale(1.4);
        transition: transform 0.1s, opacity 0.8s;
        will-change: transform, opacity;
      }

      :host([has-previous-value]:hover) [part="previous-color-canvas"] {
        border-radius: 50%;
      }

      :host([has-previous-value]:hover) [part="previous-icon"] {
        transform: scale(1);
      }

      :host([has-previous-value]:hover:active) [part="previous-icon"] {
        transform: scale(1.15);
      }

      :host([has-previous-value]:active) [part="halo"] {
        transition-duration: 0.01s, 0.01s;
        transform: scale(0);
        opacity: 0.4;
      }
    </style>
  </template>
</dom-module>
`;

document.head.appendChild($_documentContainer.content);
