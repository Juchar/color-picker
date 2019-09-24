import './color-picker-color-slider.js';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ElementMixin} from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';
/**
 * `<sl-slider>` is an element that allows to select a **saturation** and **lightness** value
 * from the hsv color space using a slider.
 *
 * @memberof Vaadin.ColorPicker
 */
class SlSliderElement extends ElementMixin(ThemableMixin(
  Vaadin.ColorPicker.ColorSliderElement)) {

  static get is() {
    return 'sl-slider';
  }

  static get version() {
    return '2.0.0-alpha.1';
  }

  static get properties() {
    return {

      /**
       * The **h**sv-hue of the color to show as background in the range `[0 - 360]`.
       */
      hue: {
        type: Number,
        value: 0
      }
    };
  }

  /**
   * @constructor
   */
  constructor() {
    super();

    this.renderCallback = this._renderSl();

    this.enableX = true;
    this.minX = 0;
    this.maxX = 1;
    this.stepX = 0.01;

    this.enableY = true;
    this.minY = 1;
    this.maxY = 0;
    this.stepY = 0.01;
  }

  /**
   * @protected
   */
  ready() {
    super.ready();
    this._createPropertyObserver('hue', 'renderCanvas', true);
  }

  /**
   * The render callback for the background.
   * @returns {Function}
   * @private
   */
  _renderSl() {
    return (canvas) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.scrollWidth;
      const height = canvas.scrollHeight;

      const whiteBlackGradient = ctx.createLinearGradient(1, 1, 1, height - 1);
      whiteBlackGradient.addColorStop(0, 'white');
      whiteBlackGradient.addColorStop(1, 'black');

      const colorGradient = ctx.createLinearGradient(0, 0, width - 1, 0);
      colorGradient.addColorStop(0, `hsla(${this.hue || 0}, 100%, 50%, 0)`);
      colorGradient.addColorStop(1, `hsla(${this.hue || 0}, 100%, 50%, 1)`);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = whiteBlackGradient;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = colorGradient;
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
    };
  }
}

customElements.define(SlSliderElement.is, SlSliderElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.SlSliderElement = SlSliderElement;
