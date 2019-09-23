import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-text-field/vaadin-number-field.js';
import './color-picker-color-input.js';
import 'tinycolor2';
import '../utils/color-picker-utils.js';
import {html} from '@polymer/polymer';
import ColorPickerUtils from '../utils/color-picker-utils';

/**
 * `<rgba-input>` is an element that allows to input **rgba** color codes.
 *
 * @memberof Vaadin.ColorPicker
 */
class RgbaInputElement extends ElementMixin(ThemableMixin(Vaadin.ColorPicker.ColorInputElement)) {
  static get template() {
    return html`
    <style include="color-picker-shared-styles">
    </style>

    <div class="horizontal-spacing">
      <vaadin-number-field disabled$="[[disabled]]" label="R" max="255" min="0" minlength="1"
                           prevent-invalid-input
                           step="1"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{red}}"></vaadin-number-field>
      <vaadin-number-field disabled$="[[disabled]]" label="G" max="255" min="0" minlength="1"
                           prevent-invalid-input
                           step="1"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{green}}"></vaadin-number-field>
      <vaadin-number-field disabled$="[[disabled]]" label="B" max="255" min="0" minlength="1"
                           prevent-invalid-input
                           step="1"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{blue}}"></vaadin-number-field>
      <vaadin-number-field disabled$="[[disabled]]"
                           hidden$="[[disableAlpha]]"
                           label="A"
                           max="1"
                           min="0"
                           minlength="1"
                           prevent-invalid-input
                           step="[[stepAlpha]]"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{alpha}}"></vaadin-number-field>
    </div>
  `;
  }

  static get is() {
    return 'rgba-input';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * The current red value in the range `[0 - 255]`.
       */
      red: {
        type: Number,
        value: 0,
        notify: true
      },
      /**
       * The current green value in the range `[0 - 255]`.
       */
      green: {
        type: Number,
        value: 0,
        notify: true
      },
      /**
       * The current blue value in the range `[0 - 255]`.
       */
      blue: {
        type: Number,
        value: 0,
        notify: true
      },
      /**
       * The current alpha in the range `[0 - 1]`.
       */
      alpha: {
        type: Number,
        value: 1,
        notify: true
      },
      /**
       * Allowed number o intervals on the **alpha** value
       */
      stepAlpha: {
        type: Number,
        value: 0.01
      }
    };
  }

  /**
   * @constructor
   */
  constructor() {
    super();

    this._observedInputProperties = ['red', 'green', 'blue', 'alpha'];

    this._colorSupplier = () => tinycolor({
      r: parseFloat(this.red),
      g: parseFloat(this.green),
      b: parseFloat(this.blue)
    }).setAlpha(parseFloat(this.alpha));

    this._toInputConverter = color => {
      if (color) {
        const rgb = color.toRgb();
        this.red = rgb.r;
        this.green = rgb.g;
        this.blue = rgb.b;
        this.alpha = ColorPickerUtils.roundToNearest(color.getAlpha(), this.stepAlpha);
      } else {
        this.red = '';
        this.green = '';
        this.blue = '';
        this.alpha = '';
      }
    };
  }
}

customElements.define(RgbaInputElement.is, RgbaInputElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.RgbaInputElement = RgbaInputElement;
