import "@polymer/polymer/polymer-element.js";
import "@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js";
import "@vaadin/vaadin-element-mixin/vaadin-element-mixin.js";
import "../components/color-picker-element-carousel.js";
import "./color-picker-color-palette.js";
import "../utils/vaadin-disabled-property-mixin.js"
import "../utils/color-picker-has-color-value-mixin.js"

/**
 * `<color-picker-palette>` shows a set color palettes from which a color can be selected.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes Vaadin.ElementMixin
 * @mixes Vaadin.ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class ColorPickerPaletteElement extends Vaadin.ElementMixin(Vaadin.ThemableMixin(
  Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(Polymer.Element)))) {

  static get template() {
    return html`
    <style>
      :host {
        --switch-button-alignment: flex-start;
      }
    </style>

    <element-carousel disabled$="[[disabled]]"
                      pinned="[[pinned]]"
                      theme$="[[theme]]">
      <dom-repeat as="palette" disable-for-switch items="[[palettes]]">
        <template>
          <color-palette disabled$="[[disabled]]"
                         palette="[[palette]]"
                         theme$="[[theme]]"
                         value="{{value}}"></color-palette>
        </template>
      </dom-repeat>
    </element-carousel>
  `;
  }

  static get is() {
    return 'color-picker-palette';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * The palettes to show whereas each palette should be an array of
       * [TinyColor](https://github.com/bgrins/TinyColor|TinyColor) colors.
       */
      palettes: Array,
      /**
       * Pin all palettes visible or show them in a carousel.
       */
      pinned: {
        type: Boolean,
        value: false
      }
    };
  }
}

customElements.define(ColorPickerPaletteElement.is, ColorPickerPaletteElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorPickerPaletteElement = ColorPickerPaletteElement;
