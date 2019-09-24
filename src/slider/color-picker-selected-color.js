import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ElementMixin} from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';
import '@polymer/iron-icon';
import '../utils/vaadin-disabled-property-mixin.js';
import '../utils/color-picker-has-color-value-mixin.js';
import '../utils/color-picker-utils.js';
import '../components/color-picker-responsive-canvas';
import 'tinycolor2';
import {html, PolymerElement} from '@polymer/polymer';
import ColorPickerUtils from '../utils/color-picker-utils';

/**
 * `<selected-color>` shows a selected color. If a previous color is specified, this one will
 * be also visible.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 * @mixes Vaadin.ColorPicker.HasColorValueMixin
 */
class SelectedColorElement extends ElementMixin(ThemableMixin(Vaadin.DisabledPropertyMixin(Vaadin.ColorPicker.HasColorValueMixin(PolymerElement)))) {
  static get template() {
    return html`<style include="color-picker-shared-styles">
      :host {
        position: relative;
      }
      [part="previous-color-canvas"],
      [part="selected-color-canvas"] {
        position: absolute;
        height: 100%;
      }
      [part="selected-color-canvas"] {
        width: 100%;
      }
      [part="previous-color-canvas"] {
        width: 50%;
      }
      [part="selected-color-canvas"] {
        left: 0;
      }
      [part="previous-color-canvas"] {
        right: 0;
      }
      [part="previous-icon"] {
        opacity: 0;
      }
      [part="halo"] {
        position: absolute;
        width: 100%;
        height: 100%;
        color: transparent;
        opacity: 0;
      }
      :host([has-previous-value]:hover) [part="previous-color-canvas"] {
        width: 100%;
      }
      :host([has-previous-value]:hover) [part="previous-icon"] {
        opacity: 1;
      }
    </style>
    <span part="halo"></span>
    <responsive-canvas disabled$="[[disabled]]"
                       part="selected-color-canvas"
                       render-callback="[[_renderSelectedColor(value)]]"></responsive-canvas>
    <responsive-canvas disabled$="[[disabled]]"
                       hidden$="[[!_showSelectPreviousValue(value,previousValue)]]"
                       on-click="_resetToPreviousValue"
                       part="previous-color-canvas"
                       render-callback="[[_renderPreviousColor(previousValue)]]">
      <iron-icon icon="vaadin:check" part="previous-icon"></iron-icon>
    </responsive-canvas>
  `;
  }

  static get is() {
    return 'selected-color';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {
      /**
       * The previous value.
       */
      previousValue: {
        type: Object,
        observer: '_previousValueChanged'
      },
      hasPreviousValue: {
        type: Boolean,
        reflectToAttribute: true,
        computed: '_showSelectPreviousValue(value,previousValue)'
      },
      previousIcon: Object,
      halo: Object
    };
  }

  ready() {
    super.ready();
    this.previousIcon = this.shadowRoot.querySelector('[part="previous-icon"]');
    this.halo = this.shadowRoot.querySelector('[part="halo"]');
  }

  /**
   * @private
   **/
  _previousValueChanged() {
    this.previousIcon.style.color = this.previousValue
      ? ColorPickerUtils.getContrastColor(this.previousValue)
      : 'transparent';
    this.halo.style.backgroundColor = this.previousValue ? this.previousValue.toHslString() : 'transparent';
  }

  /**
   * Check if a value is set for the previous value.
   * @returns {boolean}
   * @private
   */
  _showSelectPreviousValue() {
    return this.previousValue !== undefined && this.previousValue !== null
      && this.previousValue.toHslString() !== (this.value !== undefined && this.value !== null ? this.value.toHslString() : undefined);
  }

  /**
   * Callback to render the selected color.
   * @returns {Function}
   * @private
   */
  _renderSelectedColor() {
    return (canvas) => {
      SelectedColorElement._renderColor(canvas, this.value);
    };
  }

  /**
   * Callback to render the previous color.
   * @returns {Function}
   * @private
   */
  _renderPreviousColor() {
    return (canvas) => {
      SelectedColorElement._renderColor(canvas, this.previousValue);
    };
  }

  /**
   * Reset the value to the previous value.
   * @private
   **/
  _resetToPreviousValue() {
    this.value = this.previousValue;
  }

  /**
   * Render a color to a canvas.
   * @param canvas The canvas to show the color in.
   * @param color The color to show in the format of a valid
   * [TinyColor](https://github.com/bgrins/TinyColor|TinyColor) color
   * @private
   */
  static _renderColor(canvas, color) {
    const ctx = canvas.getContext('2d');
    const width = canvas.scrollWidth;
    const height = canvas.scrollHeight;

    ctx.clearRect(0, 0, width, height);

    if (color) {
      const hsl = tinycolor(color).toHsl();
      ctx.fillStyle =
        `hsla(${hsl.h || 0}, ${hsl.s * 100}%, ${hsl.l * 100}%, ${hsl.a})`;
      ctx.fillRect(0, 0, width, height);
    }
  }
}

customElements.define(SelectedColorElement.is, SelectedColorElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.SelectedColorElement = SelectedColorElement;
