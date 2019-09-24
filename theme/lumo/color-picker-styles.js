const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<dom-module id="color-picker-styles" theme-for="color-picker">
  <template>
    <style>
      :host {
        --color-picker-spacing: var(--lumo-space-m);
        --color-picker-alpha-checkerboard-foreground-color: var(--lumo-contrast-20pct);
        --color-picker-alpha-checkerboard-background-color: var(--lumo-base-color);
        --color-picker-alpha-checkerboard-tile-size: calc(var(--lumo-size-m) / 2);
        --color-picker-alpha-checkerboard-background-style: {
          background-image:
            linear-gradient(45deg, var(--color-picker-alpha-checkerboard-foreground-color) 25%, transparent 25%, transparent 75%, var(--color-picker-alpha-checkerboard-foreground-color) 75%),
            linear-gradient(45deg, var(--color-picker-alpha-checkerboard-foreground-color) 25%, var(--color-picker-alpha-checkerboard-background-color) 25%, var(--color-picker-alpha-checkerboard-background-color) 75%, var(--color-picker-alpha-checkerboard-foreground-color) 75%);
          background-size: var(--color-picker-alpha-checkerboard-tile-size) var(--color-picker-alpha-checkerboard-tile-size);
          background-position: 0 0, calc(var(--color-picker-alpha-checkerboard-tile-size) / 2) calc(var(--color-picker-alpha-checkerboard-tile-size) / 2);
        };

        width: calc(var(--lumo-size-m) * 9 + var(--color-picker-spacing) * 8);
      }

      :host([theme~="small"]) {
        --color-picker-spacing: var(--lumo-space-s);

        width: calc(var(--lumo-size-s) * 9 + var(--color-picker-spacing) * 8);
      }
    </style>
  </template>
</dom-module>
`;
document.head.appendChild($_documentContainer.content);

const $_documentContainer2 = document.createElement('template');

$_documentContainer2.innerHTML = `
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
`;
document.head.appendChild($_documentContainer2.content);

const $_documentContainer3 = document.createElement('template');

$_documentContainer3.innerHTML = `
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

      :host([theme~="color-value-text-field"][theme~="small"][has-label]) {
        padding-top: var(--lumo-space-s);
      }
    </style>
  </template>
</dom-module>
`;
document.head.appendChild($_documentContainer3.content);
