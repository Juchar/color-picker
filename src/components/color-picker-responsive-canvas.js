import {html, PolymerElement} from '@polymer/polymer';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin';
import {ElementMixin} from '@vaadin/vaadin-element-mixin';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '../utils/vaadin-disabled-property-mixin.js';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior';

/**
 * `<responsive-canvas>` is a wrapper for the `<canvas>` element that will automatically set
 * the `width` and `height` attribute of the canvas if it is resized.
 *
 * @memberof Vaadin.ColorPicker
 * @mixes ElementMixin
 * @mixes ThemableMixin
 * @mixes Vaadin.DisabledPropertyMixin
 */
class ResponsiveCanvasElement extends ElementMixin(ThemableMixin(Vaadin.DisabledPropertyMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)))) {

  static get template() {
    return html`<style include="color-picker-responsive-canvas-styles">
      :host {
        position: relative;
        background: #fff;
      }

      :host([hidden]) {
        display: none !important;
      }

      [part="canvas"], ::slotted(*) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    </style>

    <canvas height="[[_height]]" part="canvas" width="[[_width]]"></canvas>
    <slot></slot>`;
  }

  static get is() {
    return 'responsive-canvas';
  }

  static get version() {
    return '2.0.0-beta.3';
  }

  static get properties() {
    return {

      /**
       * The callback that is used to render the content of the canvas.
       * Should be a method handling the `canvas` as an argument: `function render(canvas)`.
       *
       * @property {Function} renderCallback
       */
      renderCallback: Function,
      /**
       * @private
       */
      _canvas: {
        type: Object,
        readOnly: true
      },
      /**
       * @private
       */
      _width: Number,
      /**
       * @private
       */
      _height: Number
    };
  }

  /**
   * @protected
   * */
  ready() {
    super.ready();

    this._set_canvas(this.shadowRoot.querySelector('[part~="canvas"]'));
    this._createPropertyObserver('renderCallback', '_refreshCanvas', true);
  }

  /**
   * @protected
   * */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-resize', this._refreshCanvas.bind(this));

    this._hiddenMutationObserver = new MutationObserver(mutations => {
      if (mutations.filter(mutation => mutation.type === 'attributes').length > 0
        && !this.hasAttribute('hidden')) {
        this._refreshCanvas();
      }
    });

    this._hiddenMutationObserver.observe(this, {attributes: true, attributeFilter: ['hidden']});
  }

  /**
   * @protected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._hiddenMutationObserver.disconnect();
  }

  /**
   * Refreshes the canvas by re-setting its size and re-rendering it.
   *
   * @private
   */
  _refreshCanvas() {
    this._refreshCanvasSize();
    this.renderCanvas();
  }

  /**
   * Re-sets the size of the canvas.
   *
   * @private
   */
  _refreshCanvasSize() {
    this._width = this._canvas.scrollWidth;
    this._height = this._canvas.scrollHeight;
  }

  /**
   * Renders the canvas using the provided `renderCallback`.
   */
  renderCanvas() {
    if (this.renderCallback) {
      this.renderCallback(this._canvas);
    }
  }
}

customElements.define(ResponsiveCanvasElement.is, ResponsiveCanvasElement);

/**
 * @namespace Vaadin.ColorPicker
 */ window.Vaadin = window.Vaadin || {};
window.Vaadin.ColorPicker = window.Vaadin.ColorPicker || {};
window.Vaadin.ColorPicker.ResponsiveCanvasElement = ResponsiveCanvasElement;
