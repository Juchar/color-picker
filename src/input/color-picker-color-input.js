import {PolymerElement} from '@polymer/polymer';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import '../utils/vaadin-disabled-property-mixin.js';
import '../utils/color-picker-has-color-value-mixin.js';

/**
 * `ColorInputElement` is an extendable base class for all inputs regarding color.
 *
 * It handles the setting and converting the value from the input and from
 * outside without causing stack overflows due to endless recursions.
 *
 * @abstract
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class ColorInputElement extends ElementMixin(ThemableMixin(Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(PolymerElement)))) {

  static get is() {
    return 'color-input';
  }

  static get version() {
    return '2.0.0-beta.3';
  }

  static get properties() {
    return {
      /**
       * The supplier function that is called if one of the `_observedInputProperties` is
       * changed and the `value` property should be updated.
       *
       * Should return a valid [TinyColor](https://github.com/bgrins/TinyColor|TinyColor)
       * color, e.g.:
       *
       * ```() => tinycolor('rgb(255, 255, 255)')```
       *
       * @abstract
       */
      _colorSupplier: Function,
      /**
       * The converter function that is called if the `value` property changed and the inputs
       * should be updated.
       *
       * Should consume the [tinycolor](https://github.com/bgrins/TinyColor|TinyColor) `value`
       * as an argument, e.g.:
       *
       * ```value => console.info(value)```
       *
       * @abstract
       */
      _toInputConverter: Function,
      /**
       * The properties that should trigger a call to `_colorSupplier` as the color has
       * changed from the input side.
       *
       * @abstract
       */
      _observedInputProperties: {
        type: Array,
        value: []
      },
      /**
       * Show and handle alpha values in the input.
       */
      disableAlpha: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * @protected
   */
  ready() {
    super.ready();

    this._createPropertyObserver('value', '_updateInput', true);
    this._observedInputProperties.forEach(p => this._createPropertyObserver(p, '_updateColor', true));
  }

  /**
   * Update the input with the new `value`.
   * @private
   */
  _updateInput() {
    if (!this._updatingColor) {
      this._updatingColor = true;
      this._toInputConverter(this.value);
      this._updatingColor = false;
    }
  }

  /**
   * Update the `value` from the input.
   * @private
   */
  _updateColor() {
    if (!this._updatingColor) {
      this._updatingColor = true;

      let color = this.value;
      try {
        color = this._colorSupplier();
      } catch (unused) {
        // Nothing to do here, invalid value
      }

      if (color.isValid()) {
        this.value = color;
      }

      this._updatingColor = false;
    }
  }
}

customElements.define(ColorInputElement.is, ColorInputElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorInputElement = ColorInputElement;
