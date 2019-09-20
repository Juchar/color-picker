import "@polymer/polymer/polymer-element.js";
import "@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js";
import "@vaadin/vaadin-element-mixin/vaadin-element-mixin.js";
import "../components/color-picker-element-carousel.js";
import "./color-picker-hex-input.js";
import "./color-picker-rgba-input.js";
import "./color-picker-hsla-input.js";
import "../utils/vaadin-disabled-property-mixin.js";
import "../utils/color-picker-has-color-value-mixin.js";
import "tinycolor2";

/**
 * `<color-picker-input>` allows to select a color from different inputs:
 * * HEX
 * * RGBA
 * * HSLA
 *
 * @memberof Vaadin.ColorPicker
 * @mixes Vaadin.ElementMixin
 * @mixes Vaadin.ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class ColorPickerInputElement extends Vaadin.ElementMixin(Vaadin.ThemableMixin(
  Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(Polymer.Element)))) {

  static get template() {
    return html`<element-carousel disabled$="[[disabled]]"
                      displayed-element-index="{{_visibleInputIndex}}"
                      pinned="[[pinned]]"
                      theme$="[[theme]]">
      <hex-input color-input="hex" disable-alpha="[[disableAlpha]]"
                 disable-for-switch$="[[disableHex]]"
                 disabled$="[[disabled]]"
                 theme$="[[theme]]" value="{{value}}"></hex-input>
      <rgba-input color-input="rgb"
                  disable-alpha="[[disableAlpha]]"
                  disable-for-switch$="[[disableRgb]]"
                  disabled$="[[disabled]]"
                  step-alpha="[[stepAlpha]]"
                  theme$="[[theme]]"
                  value="{{value}}"></rgba-input>
      <hsla-input color-input="hsl"
                  disable-alpha="[[disableAlpha]]"
                  disable-for-switch$="[[disableHsl]]"
                  disabled$="[[disabled]]"
                  step="[[stepHsl]]"
                  step-alpha="[[stepAlpha]]"
                  theme$="[[theme]]"
                  value="{{value}}"></hsla-input>
    </element-carousel>`;
  }

  static get is() {
    return 'color-picker-input';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * Pin all inputs visible or show them in a carousel.
       */
      pinned: {
        type: Boolean,
        value: false
      },
      /**
       * Disable the input of color in the **hex** format.
       */
      disableHex: {
        type: Boolean,
        value: false
      },
      /**
       * Disable the input of color in the **rgb(a)** format.
       */
      disableRgb: {
        type: Boolean,
        value: false
      },
      /**
       * Disable the input of color in the **hsl(a)** format.
       */
      disableHsl: {
        type: Boolean,
        value: false
      },
      /**
       * Disable the input of **alpha** values.
       */
      disableAlpha: {
        type: Boolean,
        value: false
      },
      /**
       * Allowed number o intervals on the **alpha** value
       */
      stepAlpha: {
        type: Number,
        value: 0.01
      },
      /**
       * Allowed number o intervals on the **hsl** value
       */
      stepHsl: {
        type: Number,
        value: 1
      },
      /**
       * The format that was last modified.
       */
      lastUsedFormat: {
        type: String,
        notify: true,
        readOnly: true
      },
      _visibleInputIndex: {
        type: Number,
        observer: '_onVisibleInputChanged'
      }
    };
  }

  ready() {
    super.ready();

    this.shadowRoot.querySelector('hex-input')._createPropertyObserver('value',
      (value) => this._updateLastUsedFormat(value, 'hex'), false);

    this.shadowRoot.querySelector('rgba-input')._createPropertyObserver('value',
      (value) => this._updateLastUsedFormat(value, 'rgb'), false);

    this.shadowRoot.querySelector('hsla-input')._createPropertyObserver('value',
      (value) => this._updateLastUsedFormat(value, 'hsl'), false);
  }

  _updateLastUsedFormat(value, format) {
    if (value !== this.value) {
      this._setLastUsedFormat(format);
    }
  }

  _onVisibleInputChanged() {
    this._setLastUsedFormat(['hex', 'rgb', 'hsl'][this._visibleInputIndex]);
  }
}

customElements.define(ColorPickerInputElement.is, ColorPickerInputElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorPickerInputElement = ColorPickerInputElement;
