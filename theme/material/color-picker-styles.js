import "../../../vaadin-material-styles/color.js";
import "../../../vaadin-material-styles/shadow.js";
import "../../../vaadin-material-styles/typography.js";
import "input/color-picker-hex-input-styles.js";
import "input/color-picker-hsla-input-styles.js";
import "input/color-picker-rgba-input-styles.js";
import "palette/color-picker-color-checkbox-styles.js";
import "slider/color-picker-color-slider-styles.js";
import "slider/color-picker-selected-color-styles.js";
import "components/color-picker-element-carousel-styles.js";
import "components/color-picker-responsive-canvas-styles.js";

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`
<dom-module id="material-color-picker" theme-for="color-picker">
  <template>
    <style>
      :host {
        --color-picker-spacing: 16px;
        --color-picker-alpha-checkerboard-foreground-color: var(--material-disabled-color);
        --color-picker-alpha-checkerboard-background-color: var(--material-background-color);
        --color-picker-alpha-checkerboard-tile-size: calc(36px / 2);
        --color-picker-alpha-checkerboard-background-style: {
          background-image:
            linear-gradient(45deg, var(--color-picker-alpha-checkerboard-foreground-color) 25%, transparent 25%, transparent 75%, var(--color-picker-alpha-checkerboard-foreground-color) 75%),
            linear-gradient(45deg, var(--color-picker-alpha-checkerboard-foreground-color) 25%, var(--color-picker-alpha-checkerboard-background-color) 25%, var(--color-picker-alpha-checkerboard-background-color) 75%, var(--color-picker-alpha-checkerboard-foreground-color) 75%);
          background-size: var(--color-picker-alpha-checkerboard-tile-size) var(--color-picker-alpha-checkerboard-tile-size);
          background-position: 0 0, calc(var(--color-picker-alpha-checkerboard-tile-size) / 2) calc(var(--color-picker-alpha-checkerboard-tile-size) / 2);
        };

        width: calc(36px * 9 + var(--color-picker-spacing) * 8);
      }
    </style>
  </template>
</dom-module>

<dom-module id="color-picker-shared-styles">
  <template>
    <style>
      .horizontal-spacing,
      .vertical-spacing {
        align-items: center;
        display: flex;
      }

      .horizontal-spacing > :not(style),
      .vertical-spacing > :not(style) {
        flex-grow: 1;
        align-items: stretch;
      }

      .horizontal-spacing {
        flex-direction: row;
        margin-right: calc(var(--color-picker-spacing) * -1);
      }

      .horizontal-spacing > :not(style) {
        margin-right: var(--color-picker-spacing);
      }

      .vertical-spacing {
        flex-direction: column;
        margin-bottom: calc(var(--color-picker-spacing) * -1);
      }

      .vertical-spacing > :not(style) {
        margin-bottom: var(--color-picker-spacing);
      }
    </style>
  </template>
</dom-module>

<dom-module id="color-value-text-field" theme-for="vaadin-text-field">
  <template>
    <style>
      :host([theme~="color-value-text-field"]),
      :host([theme~="color-value-text-field"]) .vaadin-text-field-container {
        width: auto;
      }

      :host([theme~="color-value-text-field"]) [part="label"] {
        align-self: center;
      }
    </style>
  </template>
</dom-module>
`;
document.head.appendChild($_documentContainer.content);
