import {html, PolymerElement} from '@polymer/polymer';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import {tinycolor} from '@thebespokepixel/es-tinycolor';
import './color-picker-sl-slider.js';
import './color-picker-hue-slider.js';
import './color-picker-alpha-slider.js';
import './color-picker-selected-color.js';
import '../utils/vaadin-disabled-property-mixin.js';
import '../utils/color-picker-has-color-value-mixin.js';

/**
 * `<color-picker-slider>` allows to select a color from sliders.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class ColorPickerSliderElement extends ElementMixin(ThemableMixin(Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(PolymerElement)))) {

  static get template() {
    return html`
    <style include="color-picker-shared-styles">
      :host {
        display: flex;
      }

      :host > *, sl-slider {
        flex-grow: 1;
      }

      selected-color {
        flex-grow: 0 !important;
      }
    </style>

    <div class="vertical-spacing">
      <sl-slider disabled$="[[disabled]]"
                 hue="[[_hue]]"
                 step-x="[[_stepSl(stepHsl)]]"
                 step-y="[[_stepSl(stepHsl)]]"
                 theme$="[[theme]]"
                 value-x="{{_saturation}}"
                 value-y="{{_value}}"></sl-slider>
      <div class="horizontal-spacing" style="align-self: stretch;align-items: center;flex-grow: 0;">
        <selected-color disabled$="[[disabled]]"
                        previous-value="[[previousValue]]"
                        value="{{value}}"></selected-color>
        <div class="vertical-spacing">
          <hue-slider disabled$="[[disabled]]"
                      id="hueSlider"
                      step-x="[[stepHsl]]"
                      theme$="[[theme]]"
                      value-x="{{_hue}}"></hue-slider>
          <alpha-slider disabled$="[[disabled]]"
                        hidden$="[[disableAlpha]]"
                        hue="[[_hue]]"
                        id="alphaSlider"
                        step-x="[[stepAlpha]]"
                        theme$="[[theme]]"
                        value="[[_value]]"
                        value-x="{{_alpha}}"></alpha-slider>
        </div>
      </div>
    </div>
  `;
  }

  static get is() {
    return 'color-picker-slider';
  }

  static get version() {
    return '2.0.0-beta.3';
  }

  static get properties() {
    return {
      /**
       * The previous value.
       */
      previousValue: Object,
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
       * The current hue in the range `[0 - 360]`.
       */
      _hue: {
        type: Number,
        value: 0,
        observer: '_sliderColorChanged'
      },
      /**
       * The current saturation in the range `[0 - 1]`.
       */
      _saturation: {
        type: Number,
        value: 1,
        observer: '_sliderColorChanged'
      },
      /**
       * The current value in the range `[0 - 1]`.
       */
      _value: {
        type: Number,
        value: 1,
        observer: '_sliderColorChanged'
      },
      /**
       * The current alpha in the range `[0 - 1]`.
       */
      _alpha: {
        type: Number,
        value: 1,
        observer: '_sliderColorChanged'
      }
    };
  }

  /**
   * @protected
   */
  ready() {
    super.ready();
    this._createPropertyObserver('value', '_valueChanged', true);
  }

  /**
   * Update the color value if the slider values changed.
   * @private
   */
  _sliderColorChanged() {
    this._colorChanged(() => {
      this.value = tinycolor({h: this._hue, s: this._saturation, v: this._value}).setAlpha(this._alpha);
    });
  }

  /**
   * Update the slider values if the color value changed.
   * @private
   */
  _valueChanged() {
    this._colorChanged(() => {
      if (this.value) {
        const hsv = this.value.toHsv();
        this._hue = hsv.h;
        this._saturation = hsv.s;
        this._value = hsv.v;
        this._alpha = hsv.a;
      } else {
        this._hue = 0;
        this._saturation = 1;
        this._value = 1;
        this._alpha = 0;
      }
    });
  }

  /**
   * Prevent endless recursion.
   * @param updateAction
   * @private
   */
  _colorChanged(updateAction) {
    if (!this._updatingColor) {
      this._updatingColor = true;
      updateAction();
      this._updatingColor = false;
    }
  }

  _stepSl() {
    return this.stepHsl > 0.01 ? 0.01 : this.stepHsl;
  }
}

customElements.define(ColorPickerSliderElement.is, ColorPickerSliderElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorPickerSliderElement = ColorPickerSliderElement;
