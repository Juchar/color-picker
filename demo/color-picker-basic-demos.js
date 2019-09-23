import {html, PolymerElement} from '@polymer/polymer';
import '@vaadin/vaadin-demo-helpers/vaadin-demo-ready-event-emitter';

class ColorPickerBasicDemos extends window.DemoReadyEventEmitter(ColorPickerDemo(PolymerElement)) {
  static get is() {
    return 'color-picker-basic-demos';
  }

  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>Color Picker</h3>
    <vaadin-demo-snippet id="color-picker-basic-color-picker" when-defined="color-picker">
 
        <color-picker></color-picker>
    </vaadin-demo-snippet>

    <h3>Initial value and previous value</h3>
    <p>If you want to show a previous color use the <code>previous-value</code> property to specify
      a valid css color. To specify the initial value pass a valid css color to the
      <code>value</code> property.</p>
    <p>Hover and click the color field to reset the current value to the previous color.</p>
    <vaadin-demo-snippet id="color-picker-value" when-defined="color-picker">
        <color-picker previous-value="#ff00bf44" value="hsla(135,100%,50%,0.5)"></color-picker>
    </vaadin-demo-snippet>

    <h3>Palettes</h3>
    <p>Use the <code>palettes</code> property to set an array of palettes to be shown, whereas each
      palette is an array of colors specified as a valid css-color.</p>
    <p>
      <b>Note:</b> the array has to be in a valid JSON Format, so you have to invert the quotes
      (use single quotes outside, and double quotes inside):
    </p>
    <p>
      <code>
        '[
        [
        "hsl(0,100%,50%)",
        "hsl(45,100%,50%)",
        "hsl(90,100%,50%)",
        "hsl(135,100%,50%)",
        "hsl(180,100%,50%)",
        "hsl(225,100%,50%)",
        "hsl(270,100%,50%)",
        "hsl(315,100%,50%)"
        ],
        [
        "hsla(0,100%,50%,0.5)",
        "hsla(45,100%,50%,0.5)",
        "hsla(90,100%,50%,0.5)",
        "hsla(135,100%,50%,0.5)",
        "hsla(180,100%,50%,0.5)",
        "hsla(225,100%,50%,0.5)",
        "hsla(270,100%,50%,0.5)",
        "hsla(315,100%,50%,0.5)"
        ]
        ]'
      </code>
    </p>
    <vaadin-demo-snippet id="color-picker-palettes" when-defined="color-picker">
      <template preserve-content>
        <color-picker palettes='[["hsl(0,100%,50%)","hsl(45,100%,50%)","hsl(90,100%,50%)","hsl(135,100%,50%)","hsl(180,100%,50%)","hsl(225,100%,50%)","hsl(270,100%,50%)","hsl(315,100%,50%)"],
                      ["hsla(0,100%,50%,0.5)","hsla(45,100%,50%,0.5)","hsla(90,100%,50%,0.5)","hsla(135,100%,50%,0.5)","hsla(180,100%,50%,0.5)","hsla(225,100%,50%,0.5)","hsla(270,100%,50%,0.5)","hsla(315,100%,50%,0.5)"]]'></color-picker>
      </template>
    </vaadin-demo-snippet>
 `;
  }
}

customElements.define(ColorPickerBasicDemos.is, ColorPickerBasicDemos);
