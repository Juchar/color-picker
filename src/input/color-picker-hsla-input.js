import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import '@vaadin/vaadin-text-field/vaadin-number-field.js';
import './color-picker-color-input.js';
import 'tinycolor2';
import '../utils/color-picker-utils.js';
import {html} from '@polymer/polymer';
import ColorPickerUtils from '../utils/color-picker-utils';

/**
 * `<hsla-input>` is an element that allows to input **hsla** color codes.
 *
 * @memberof Vaadin.ColorPicker
 */
class HslaInputElement extends ElementMixin(ThemableMixin(Vaadin.ColorPicker.ColorInputElement)) {

  static get template() {
    return html`
    <style include="color-picker-shared-styles">
    </style>

    <div class="horizontal-spacing">
      <vaadin-number-field disabled$="[[disabled]]" label="H" max="360" min="0" minlength="1"
                           prevent-invalid-input
                           step="[[step]]"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{hue}}">
        <div slot="suffix">°</div>
      </vaadin-number-field>
      <vaadin-number-field disabled$="[[disabled]]" label="S" max="100" min="0"
                           minlength="1"
                           prevent-invalid-input
                           step="[[step]]"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{saturation}}">
        <div slot="suffix">%</div>
      </vaadin-number-field>
      <vaadin-number-field disabled$="[[disabled]]" label="L" max="100" min="0"
                           minlength="1"
                           prevent-invalid-input
                           step="[[step]]"
                           theme$="color-value-text-field align-center [[theme]]"
                           value="{{lightness}}">
        <div slot="suffix">%</div>
      </vaadin-number-field>
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
    </div>`;
  }

  static get is() {
    return 'hsla-input';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * The current hue in the range `[0 - 360]`.
       */
      hue: {
        type: Number,
        value: 0,
        notify: true
      },
      /**
       * The current saturation in the range `[0 - 100]`.
       */
      saturation: {
        type: Number,
        value: 100,
        notify: true
      },
      /**
       * The current saturation in the range `[0 - 100]`.
       */
      lightness: {
        type: Number,
        value: 50,
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
      },
      /**
       * Allowed number o intervals on the **hsl** value
       */
      step: {
        type: Number,
        value: 1
      }
    };
  }

  /**
   * @constructor
   */
  constructor() {
    super();

    this._observedInputProperties = ['hue', 'saturation', 'lightness', 'alpha'];

    this._colorSupplier = () => tinycolor({
      h: parseFloat(this.hue),
      s: parseFloat(this.saturation) / 100,
      l: parseFloat(this.lightness) / 100
    }).setAlpha(parseFloat(this.alpha));

    this._toInputConverter = color => {
      if (color) {
        const hsl = color.toHsl();
        this.hue = ColorPickerUtils.roundToNearest(hsl.h || 0, this.step);
        this.saturation = ColorPickerUtils.roundToNearest(hsl.s * 100, this.step);
        this.lightness = ColorPickerUtils.roundToNearest(hsl.l * 100, this.step);
        this.alpha = ColorPickerUtils.roundToNearest(color.getAlpha(), this.stepAlpha);
      } else {
        this.hue = '';
        this.saturation = '';
        this.lightness = '';
        this.alpha = '';
      }
    };
  }
}

customElements.define(HslaInputElement.is, HslaInputElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.HslaInputElement = HslaInputElement;
