import "@vaadin/vaadin-icons/vaadin-icons.js";
import {html} from '@polymer/polymer';

const $_documentContainer = html`
<dom-module id="material-color-picker-selected-color" theme-for="selected-color">
  <template>
    <style>
      :host {
        --color-picker-selected-color-box-shadow: var(--material-shadow-elevation-2dp);

        width: 36px;
        height: 36px;
        box-shadow: var(--color-picker-selected-color-box-shadow);
        margin: 4px 0;
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
        background: var(--material-disabled-color);
        box-sizing: border-box;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }

      [part="previous-color-canvas"],
      [part="selected-color-canvas"] {
        transition: width .1s, border-radius .1s;
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
        transition: opacity .4s, transform .1s;
        will-change: opacity, transform;
      }

      [part="halo"] {
        border-radius: 50%;
        transform: scale(0);
        opacity: 0;
        transition: transform 0s 0.8s, opacity 0.8s;
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
        transition-duration: 0.08s, 0.01s;
        transition-delay: 0s, 0s;
        transform: scale(2.5);
        opacity: 0.15;
      }
    </style>
  </template>
</dom-module>
  `;
document.head.appendChild($_documentContainer.content);
