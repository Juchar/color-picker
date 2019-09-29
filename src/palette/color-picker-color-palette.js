import {html, PolymerElement} from '@polymer/polymer';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import '../utils/vaadin-disabled-property-mixin.js';
import '../utils/color-picker-has-color-value-mixin.js';
import './color-picker-color-checkbox.js';
import {tinycolor} from '@thebespokepixel/es-tinycolor';

/**
 * `<color-palette>` shows a set of colors that can be selected.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class ColorPaletteElement extends ElementMixin(ThemableMixin(Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(PolymerElement)))) {
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
    return '2.0.0-beta.3';
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
    return color && this.value && tinycolor(color).toRgbString() === tinycolor(this.value).toRgbString();
  }
}

customElements.define(ColorPaletteElement.is, ColorPaletteElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorPaletteElement = ColorPaletteElement;
