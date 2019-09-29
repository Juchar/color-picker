import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ElementMixin} from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';
import './color-picker-color-slider.js';

/**
 * `<hue-slider>` is an element that allows to select a **hue** value using a slider.
 *
 * @memberof Vaadin.ColorPicker
 */
class HueSliderElement extends ElementMixin(ThemableMixin(Vaadin.ColorPicker.ColorSliderElement)) {

  static get is() {
    return 'hue-slider';
  }

  static get version() {
    return '2.0.0-beta.1';
  }

  /**
   * @constructor
   */
  constructor() {
    super();

    this.renderCallback = this._renderHue();

    this.enableX = true;
    this.minX = 0;
    this.maxX = 360;
    this.stepX = 1;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * The render callback for the background.
   * @returns {Function}
   * @private
   */
  _renderHue() {
    return (canvas) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.scrollWidth;
      const height = canvas.scrollHeight;

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      const step = 1 / 360;
      for (let i = 0; i <= 1; i += step) {
        gradient.addColorStop(i, `hsl(${360 * i}, 100%, 50%)`);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };
  }
}

customElements.define(HueSliderElement.is, HueSliderElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.HueSliderElement = HueSliderElement;
