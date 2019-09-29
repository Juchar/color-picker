import {CheckboxElement} from '@vaadin/vaadin-checkbox/src/vaadin-checkbox';
import '@vaadin/vaadin-checkbox';
import ColorPickerUtils from '../utils/color-picker-utils';

let memoizedTemplate;

/**
 * `<color-checkbox>` extends the `<vaadin-checkbox>` to be suitable for selecting colors.
 * The color of the checkmark itself will be adjusted automatically to be readable on the
 * background color of the checkbox.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 */
class ColorCheckboxElement extends CheckboxElement {

  static get is() {
    return 'color-checkbox';
  }

  static get version() {
    return '2.0.0-beta.1';
  }

  static get properties() {
    return {
      /**
       * The color for the checkbox in the form of a
       * [TinyColor](https://github.com/bgrins/TinyColor|TinyColor) color.
       */
      color: {
        type: Object,
        notify: true
      }
    };
  }

  static get template() {
    if (!memoizedTemplate) {
      memoizedTemplate = super.template.cloneNode(true);

      const div = document.createElement('div');
      div.setAttribute('part', 'color-backdrop');

      memoizedTemplate.content.querySelector('label').prepend(div);
    }
    return memoizedTemplate;
  }

  /**
   * @protected
   */
  ready() {
    super.ready();
    this._createPropertyObserver('color', '_onColorChanged', true);
  }

  /**
   * Disable un-checking the checkbox once it has been checked.
   * @private
   */
  _toggleChecked() {
    if (!this.checked) {
      super._toggleChecked();
    }
  }

  /**
   * Update the checkbox styles.
   * @private
   */
  _onColorChanged() {
    const element = this.shadowRoot.querySelector('[part="checkbox"]');

    if (this.color) {
      element.style.background = this.color.toRgbString();
      element.style.color = ColorPickerUtils.getContrastColor(this.color);

      if (this.color.getLuminance() > 0.96) {
        element.classList.add('show-border');
      }
    } else {
      element.style.background = null;
    }
  }
}

customElements.define(ColorCheckboxElement.is, ColorCheckboxElement);

/**
 * @namespace Vaadin.ColorPicker
 */
window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ColorCheckboxElement = ColorCheckboxElement;
