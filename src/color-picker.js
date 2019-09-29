import {html, PolymerElement} from '@polymer/polymer';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import './slider/color-picker-color-picker-slider.js';
import './input/color-picker-color-picker-input.js';
import './palette/color-picker-color-picker-palette.js';
import './utils/vaadin-disabled-property-mixin.js';
import ColorPickerUtils from './utils/color-picker-utils';

/**
 * `<color-picker>` allows to select a color using sliders, inputs or palettes.
 *
 * ```
 * <color-picker></color-picker>
 * ```
 *
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @demo demo/index.html
 */
class ColorPicker extends ElementMixin(ThemableMixin(PolymerElement)) {

  static get template() {
    return html`
    <style include="color-picker-shared-styles color-picker-styles">
      :host {
        display: block;
        max-width: 100%;
      }

      color-picker-input,
      color-picker-palette {
        flex-grow: 0 !important;
      }

      color-picker-input {
        margin-top: 0 !important;
      }
    </style>

    <div class="vertical-spacing" style="align-items: stretch; min-height: 100%;">
      <color-picker-slider disable-alpha="[[disableAlpha]]"
                           disabled$="[[disabled]]"
                           previous-value="[[_previousValueInternal]]"
                           step-alpha="[[stepAlpha]]"
                           step-hsl="[[stepHsl]]"
                           theme$="[[theme]]"
                           value="{{_valueInternal}}"></color-picker-slider>
      <color-picker-input disable-alpha="[[disableAlpha]]"
                          disable-hex="[[disableHex]]"
                          disable-hsl="[[disableHsl]]"
                          disable-rgb="[[disableRgb]]"
                          disabled$="[[disabled]]"
                          hidden$="[[!_showInputs(disableHex,disableRgb,disableHsl)]]"
                          last-used-format="{{lastUsedFormat}}"
                          pinned="[[pinnedInputs]]"
                          step-alpha="[[stepAlpha]]"
                          step-hsl="[[stepHsl]]"
                          theme$="[[theme]]"
                          value="{{_valueInternal}}"></color-picker-input>
      <color-picker-palette disabled$="[[disabled]]"
                            hidden$="[[!_showPalettes(_palettesInternal)]]"
                            palettes="[[_palettesInternal]]"
                            pinned="[[pinnedPalettes]]"
                            theme$="[[theme]]"
                            value="{{_valueInternal}}"></color-picker-palette>
    </div>
  `;
  }

  static get is() {
    return 'color-picker';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * Set to true to disable **hex** input.
       */
      disableHex: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to disable **rgb** input.
       */
      disableRgb: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to disable **hsl** input.
       */
      disableHsl: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to disable **alpha** input and **alpha** slider.
       */
      disableAlpha: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to have all inputs visible all the time instead of having a switch button.
       */
      pinnedInputs: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true to have all palettes visible all the time instead of having a switch button.
       */
      pinnedPalettes: {
        type: Boolean,
        value: false
      },
      /**
       * The color value as string. If the user switches the input or changes an input, the value will be
       * formatted related to the input. Should be a valid CSS color code or CSS Custom Property.
       */
      value: {
        type: String,
        notify: true,
        observer: '_onValueChanged'
      },
      /**
       * The value that should be used as previous value. Should be a valid CSS color code or CSS Custom Property.
       */
      previousValue: {
        type: String,
        observer: '_onPreviousValueChanged'
      },
      /**
       * The format that the user used last as input or by switching inputs. One of `hex`,`rgb`,`hsl`.
       */
      lastUsedFormat: {
        type: String,
        notify: true,
        observer: '_onValueInternalChanged'
      },
      /**
       * The palettes to be shown. Should be an Array of Arrays, whereas the inner Arrays should contain valid
       * CSS color codes or CSS Custom Properties.
       */
      palettes: {
        type: Array,
        observer: '_onPalettesChanged'
      },
      /**
       * The precision step to use for alpha values.
       */
      stepAlpha: {
        type: Number,
        value: 0.01
      },
      /**
       * The precision step to use for hsl values.
       */
      stepHsl: {
        type: Number,
        value: 1
      },
      _valueInternal: {
        type: Object,
        observer: '_onValueInternalChanged'
      },
      _previousValueInternal: Object,
      _palettesInternal: {
        type: Array,
        value: []
      },
    };
  }

  ready() {
    const initialColor = this.value ? this.value : this.previousValue;
    super.ready();

    if (initialColor) {
      this._valueInternal = ColorPickerUtils.getResolvedValue(this, initialColor);
    }
  }

  _showPalettes() {
    return this._palettesInternal ? this._palettesInternal.length > 0 : false;
  }

  _showInputs() {
    return !(this.disableHex && this.disableRgb && this.disableHsl);
  }

  _onValueChanged() {
    if (!this.valueInternalChanged) {
      this.valueChanged = true;
      this._valueInternal = this.value ? ColorPickerUtils.getResolvedValue(this, this.value) : undefined;
      this.valueChanged = false;
    }
  }

  _onValueInternalChanged() {
    if (!this.valueChanged) {
      this.valueInternalChanged = true;
      this.value = this._valueInternal
        ? ColorPickerUtils.getFormattedColor(this._valueInternal, this.lastUsedFormat, this.stepAlpha,
          this['step' + this.lastUsedFormat.charAt(0).toUpperCase() + this.lastUsedFormat.slice(1)] || 1)
        : undefined;
      this.valueInternalChanged = false;
    }
  }

  _onPreviousValueChanged() {
    this._previousValueInternal = this.previousValue
      ? ColorPickerUtils.getResolvedValue(this, this.previousValue)
      : undefined;
  }

  _onPalettesChanged() {
    this._palettesInternal =
      this.palettes
        ? this.palettes.map(palette => palette.map(color => ColorPickerUtils.getResolvedValue(this, color)))
        : undefined;
  }
}

customElements.define(ColorPicker.is, ColorPicker);

window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorPicker = ColorPicker;
