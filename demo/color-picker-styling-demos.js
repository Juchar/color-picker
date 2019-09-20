class ColorPickerStylingDemos extends DemoReadyEventEmitter(ColorPickerDemo(Polymer.Element)) {
  static get is() {
    return 'color-picker-styling-demos';
  }

  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>Small Color Picker</h3>
    <vaadin-demo-snippet id="color-picker-basic-color-picker-small" when-defined="color-picker">
      <template preserve-content>
        <color-picker theme="small"></color-picker>
      </template>
    </vaadin-demo-snippet>

    <h3>Pinning</h3>
    <h4>Pinned inputs</h4>
    <p>If you want all the input fields to be visible all the time instead of displaying
      a switch button, use the property <code>pinned-inputs</code>.</p>
    <vaadin-demo-snippet id="color-picker-pinned-inputs" when-defined="color-picker">
      <template preserve-content>
        <color-picker pinned-inputs palettes='[["hsl(0,100%,50%)","hsl(45,100%,50%)","hsl(90,100%,50%)","hsl(135,100%,50%)","hsl(180,100%,50%)","hsl(225,100%,50%)","hsl(270,100%,50%)","hsl(315,100%,50%)"],
                      ["hsla(0,100%,50%,0.5)","hsla(45,100%,50%,0.5)","hsla(90,100%,50%,0.5)","hsla(135,100%,50%,0.5)","hsla(180,100%,50%,0.5)","hsla(225,100%,50%,0.5)","hsla(270,100%,50%,0.5)","hsla(315,100%,50%,0.5)"]]'></color-picker>
      </template>
    </vaadin-demo-snippet>
    <h4>Pinned palettes</h4>
    <p>If you want all the palettes to be visible all the time instead of displaying
      a switch button, use the property <code>pinned-palettes</code>.</p>
    <vaadin-demo-snippet id="color-picker-pinned-palettes" when-defined="color-picker">
      <template preserve-content>
        <color-picker pinned-palettes palettes='[["hsl(0,100%,50%)","hsl(45,100%,50%)","hsl(90,100%,50%)","hsl(135,100%,50%)","hsl(180,100%,50%)","hsl(225,100%,50%)","hsl(270,100%,50%)","hsl(315,100%,50%)"],
                      ["hsla(0,100%,50%,0.5)","hsla(45,100%,50%,0.5)","hsla(90,100%,50%,0.5)","hsla(135,100%,50%,0.5)","hsla(180,100%,50%,0.5)","hsla(225,100%,50%,0.5)","hsla(270,100%,50%,0.5)","hsla(315,100%,50%,0.5)"]]'></color-picker>
      </template>
    </vaadin-demo-snippet>
 `;
  }
}
customElements.define(ColorPickerStylingDemos.is, ColorPickerStylingDemos);
