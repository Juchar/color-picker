import "@vaadin/vaadin-text-field/vaadin-text-field.js";
import "./color-picker-color-input.js";
import "tinycolor2";

/**
 * `<hex-input>` is an element that allows to input **hex** color codes.
 *
 * @memberof Vaadin.ColorPicker
 */
class HexInputElement extends Vaadin.ColorPicker.ColorInputElement {

  static get template() {
    return html`<vaadin-text-field autocomplete="on" clear-button-visible
                       disabled$="[[disabled]]" error-message="Not a valid hex color."
                       label="HEX"
                       pattern="[[_getPattern(disableAlpha)]]"
                       style="width: 100%"
                       theme$="color-value-text-field [[theme]]"
                       value="{{hex}}">
      <div slot="prefix">#</div>
    </vaadin-text-field>`;
  }

  static get is() {
    return 'hex-input';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * The color value as hex without the leading `#`.
       * Includes alpha value if enabled (e.g. `#FF00FF00`).
       */
      hex: {
        type: String,
        value: '000000',
        notify: true
      }
    };
  }

  /**
   * @constructor
   */
  constructor() {
    super();

    this._observedInputProperties = ['hex'];
    this._colorSupplier = () => {
      return tinycolor('#' + this.hex);
    };
    this._toInputConverter = color => this.hex = color ? (color.getAlpha() === 1 ? color.toHex() : color.toHex8()) : '';
  }

  /**
   * Returns the input validation pattern.
   * @returns {string} The pattern depending on the setting of `disableAlpha`.
   * @private
   */
  _getPattern() {
    if (this.disableAlpha) {
      return '([a-fA-F0-9]{3}|([a-fA-F0-9]{2}){2,3})';
    } else {
      return '([a-fA-F0-9]{3}|([a-fA-F0-9]{2}){2,4})';
    }
  }
}

customElements.define(HexInputElement.is, HexInputElement);

/**
 * @namespace Vaadin.ColorPicker
 */ window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.HexInputElement = HexInputElement;
