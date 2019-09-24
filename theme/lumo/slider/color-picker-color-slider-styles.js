const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<dom-module id="color-picker-color-slider-styles" theme-for="color-slider">
  <template>
    <style>
      :host {
        --color-slider-size: calc(var(--lumo-size-m) / 2);
        --color-slider-handle-size: var(--color-slider-size);

        height: var(--color-slider-size);
        margin: calc(var(--lumo-space-xs) / 2) 0;
      }

      :host([theme~="small"]) {
        --color-slider-size: calc(var(--lumo-size-s) / 2 + 1px);
      }

      [part="canvas"] {
        border-radius: var(--lumo-border-radius);
        --responsive-canvas-background-style: var(--color-picker-alpha-checkerboard-background-style);
      }

      [part="handle"] {
        width: var(--color-slider-size);
        height: var(--color-slider-size);

        margin-left: calc(var(--color-slider-handle-size) * -0.5);
        margin-top: calc(var(--color-slider-handle-size) * -0.5);
        top: calc(var(--color-slider-handle-size) / 2);
        left: calc(var(--color-slider-handle-size) / 2);

        box-shadow: var(--lumo-box-shadow-s);

        border-radius: 50%;

        transition: transform .2s cubic-bezier(.12, .32, .54, 4);
        will-change: transform;
      }

      [part="background-reset"] {
        border-color: var(--lumo-base-color);
      }

      [part="background"] {
        content: "";
      }

      [part="background"],
      [part="background-reset"] {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        transition: border-width 0.2s cubic-bezier(.12, .32, .54, 1), border-color 0.15s;
        will-change: border-width, border-color;
        border: calc(var(--color-slider-handle-size) / 2) solid var(--lumo-base-color);
        box-sizing: border-box;
      }

      [part="handle"][active] [part="background"],
      [part="handle"][active] [part="background-reset"] {
        border-width: calc(var(--color-slider-handle-size) / 2 - 4px);
      }

      [part="handle"]::before {
        content: "test";
        color: transparent;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: var(--lumo-base-color);
        transform: scale(1.4);
        opacity: 0;
        transition: transform 0.1s, opacity 0.8s;
        will-change: transform, opacity;
      }

      [part="handle"][active]::before {
        transition-duration: 0.01s, 0.01s;
        transform: scale(0);
        opacity: 0.4;
      }

      [part="handle"][active] {
        transform: scale(1.2);
      }

      [part="handle"]::after {
        content: "";
        width: 0;
        height: 0;
        border: 3px solid var(--lumo-primary-color);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: 0.25s transform;
        will-change: transform;
        background-clip: content-box;
      }

      [part="handle"]:not([active]):hover::after {
        transform: translate(-50%, -50%) scale(1);
      }

      :host([focus-ring]) [part="handle"] {
        box-shadow: 0 0 0 3px var(--lumo-primary-color-50pct);
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) [part="handle"] {
        box-shadow: none;
      }

      :host([disabled]) [part="background"] {
        border-color: var(--lumo-contrast-5pct);
      }
    </style>
  </template>
</dom-module>
`;

document.head.appendChild($_documentContainer.content);

const $_documentContainer2 = document.createElement('template');

$_documentContainer2.innerHTML = `
<dom-module id="color-picker-sl-slider" theme-for="sl-slider">
  <template>
  <style>
  :host {
    height: calc(var(--color-slider-size) * 8);
    width: 100%;
  }
</style>
</template>
</dom-module>
`;

document.head.appendChild($_documentContainer2.content);
