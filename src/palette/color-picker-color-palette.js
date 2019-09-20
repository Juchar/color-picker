import "../../../polymer/polymer-element.js";
import "../../../vaadin-themable-mixin/vaadin-themable-mixin.js";
import "../../../vaadin-element-mixin/vaadin-element-mixin.js";
import "../utils/vaadin-disabled-property-mixinimport "
import "../utils/color-picker-has-color-value-mixinimport "
import "color-picker-color-checkboximport "
import "../libraries/tinycolor-import.js";

/**
 * `<color-palette>` shows a set of colors that can be selected.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes Vaadin.ElementMixin
 * @mixes Vaadin.ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class ColorPaletteElement extends Vaadin.ElementMixin(Vaadin.ThemableMixin(
  Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(Polymer.Element)))) {
  static get template() {
    return html`
    <style include="color-picker-shared-styles">
      :host {
        width: 100%;
      }

      [part="container"] {
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      [part="container"] > * {
        flex-grow: 0 !important;
      }
    </style>

    <div class="horizontal-spacing" part="container">
      <dom-repeat as="color" items="[[palette]]">
        <template>
          <color-checkbox checked="[[_isSelected(color,value)]]"
                          color="[[color]]"
                          disabled$="[[disabled]]"
                          on-change="_setColorFromPalette"
                          theme$="[[theme]]"
                          value$="[[index]]"></color-checkbox>
        </template>
      </dom-repeat>
      </div>
        `;
  }

  static get is() {
    return 'color-palette';
  }

  static get version() {
    return '0.9.0';
  }

  static get properties() {
    return {
      /**
       * The palette of colors to show. Each color in the array should be a
       * [TinyColor](https://github.com/bgrins/TinyColor|TinyColor) color.
       */
      palette: Array
    };
  }

  /**
   * Set the current value.
   * @param e the click event
   * @private
   */
  _setColorFromPalette(e) {
    this.value = e.model.color;
  }

  /**
   * Check if a the provided color is the current value.
   * @param color
   * @returns {boolean}
   * @private
   */
  _isSelected(color) {
    return color && this.value && tinycolor(color).toHslString() === tinycolor(this.value).toHslString();
  }
}

customElements.define(ColorPaletteElement.is, ColorPaletteElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorPaletteElement = ColorPaletteElement;
