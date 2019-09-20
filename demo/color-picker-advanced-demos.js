class ColorPickerAdvancedDemos extends DemoReadyEventEmitter(ColorPickerDemo(Polymer.Element)) {
  static get is() {
    return 'color-picker-advanced-demos';
  }

  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>CSS Custom Properties</h3>
    <p>It is possible to use <b>CSS Custom Properties</b> to <b>initialize</b>:
    <ul>
      <li><code>value</code></li>
      <li><code>previous-value</code></li>
      <li><code>palettes</code></li>
    </ul>
    </p>
    <vaadin-demo-snippet id="color-picker-css-custom-property" when-defined="color-picker">
      <template preserve-content>
        <color-picker value="--lumo-primary-color" previous-value="--lumo-success-color"
                      palettes='[["--lumo-primary-color", "--lumo-success-color", "--lumo-error-color"]]'></color-picker>
      </template>
    </vaadin-demo-snippet>

    <h3>Resolution</h3>
    <p>It is possible to change the resolution of the alpha and hsl values using the
      <code>step-alpha</code> and <code>step-hsl</code> property.</p>
    <vaadin-demo-snippet id="color-picker-resolution" when-defined="color-picker">
      <template preserve-content>
        <color-picker step-alpha="0.001" step-hsl="0.01"></color-picker>
      </template>
    </vaadin-demo-snippet>

    <h3>Alpha handling</h3>
    <p>It is possible to disable the selection of an alpha value using the
      <code>disable-alpha</code> property.</p>
    <vaadin-demo-snippet id="color-picker-alpha" when-defined="color-picker">
      <template preserve-content>
        <color-picker disable-alpha></color-picker>
      </template>
    </vaadin-demo-snippet>

    <h3>Disabling color formats</h3>
    <p>To disable the input of a certain color format use the properties <code>disable-hex</code>,
      <code>disable-rgb</code> or <code>disable-hsl</code>.</p>
    <vaadin-demo-snippet id="color-picker-disable-color-format" when-defined="color-picker">
      <template preserve-content>
        <color-picker disable-hex></color-picker>
      </template>
    </vaadin-demo-snippet>
 `;
  }
}

customElements.define(ColorPickerAdvancedDemos.is, ColorPickerAdvancedDemos);