import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ElementMixin} from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';
import './color-picker-color-slider.js';
import {tinycolor} from '@thebespokepixel/es-tinycolor';

/**
 * `<alpha-slider>` is an element that allows to select an **alpha** value using a slider.
 *
 * @memberof Vaadin.ColorPicker
 */
class AlphaSliderElement extends ElementMixin(ThemableMixin(Vaadin.ColorPicker.ColorSliderElement)) {

  static get is() {
    return 'alpha-slider';
  }

  static get version() {
    return '2.0.0-beta.4';
  }

  static get properties() {
    return {
      /**
       * The **h**sv-hue of the color to show as background in the range `[0 - 360]`.
       */
      hue: {
        type: Number,
        value: 0
      },
      /**
       * The hs**v**-value of the color to show as background in the range `[0 - 1]`.
       */
      value: {
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

    this.renderCallback = this._renderAlpha();
    this.enableX = true;
    this.minX = 0;
    this.maxX = 1;
    this.stepX = 0.01;
  }

  /**
   * @protected
   */
  ready() {
    super.ready();

    this._createPropertyObserver('hue', 'renderCanvas', true);
    this._createPropertyObserver('value', 'renderCanvas', true);
  }

  /**
   * The render callback for the background depending on the current hue.
   * @returns {Function}
   * @private
   */
  _renderAlpha() {
    return (canvas) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.scrollWidth;
      const height = canvas.scrollHeight;
      const hsv = tinycolor({h: this.hue || 0, s: 1, v: this.value});

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, hsv.setAlpha(0).toRgbString());
      gradient.addColorStop(1, hsv.setAlpha(1).toRgbString());

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };
  }
}

customElements.define(AlphaSliderElement.is, AlphaSliderElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.AlphaSliderElement = AlphaSliderElement;
