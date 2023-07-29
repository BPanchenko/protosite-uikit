/// <reference path="utilities.css.d.ts" />
const classNames = new Map([
  ['guideHorizontal', 'guide--horizontal'],
  ['guideVertical', 'guide--vertical'],
  ['line', 'line'],
  ['oContainer', 'o-container'],
  ['sAxis', 's-axis'],
  ['sizes', 'sizes'],
  ['uAlignCenter', 'u-align-center'],
  ['uAlignLeft', 'u-align-left'],
  ['uAlignRight', 'u-align-right'],
  ['uCentering', 'u-centering'],
  ['uClearfix', 'u-clearfix'],
  ['uDisplayBlock', 'u-display-block'],
  ['uDisplayContents', 'u-display-contents'],
  ['uDisplayFlowRoot', 'u-display-flow-root'],
  ['uDisplayInline', 'u-display-inline'],
  ['uDisplayInlineBlock', 'u-display-inline-block'],
  ['uFloatLeft', 'u-float-left'],
  ['uFloatRight', 'u-float-right'],
  ['uGrid', 'u-grid'],
  ['uHidden', 'u-hidden'],
  ['uHiddenHover', 'u-hidden-hover'],
  ['uHiddenNotouch', 'u-hidden-notouch'],
  ['uInvisible', 'u-invisible'],
  ['uInvisibleHover', 'u-invisible-hover'],
  ['uMargin', 'u-margin'],
  ['uMarginBottom', 'u-margin-bottom'],
  ['uMarginBottomRemove', 'u-margin-bottom-remove'],
  ['uMarginLeft', 'u-margin-left'],
  ['uMarginLeftRemove', 'u-margin-left-remove'],
  ['uMarginLg', 'u-margin-lg'],
  ['uMarginLgBottom', 'u-margin-lg-bottom'],
  ['uMarginLgLeft', 'u-margin-lg-left'],
  ['uMarginLgRight', 'u-margin-lg-right'],
  ['uMarginLgTop', 'u-margin-lg-top'],
  ['uMarginMd', 'u-margin-md'],
  ['uMarginMdBottom', 'u-margin-md-bottom'],
  ['uMarginMdLeft', 'u-margin-md-left'],
  ['uMarginMdRight', 'u-margin-md-right'],
  ['uMarginMdTop', 'u-margin-md-top'],
  ['uMarginRemove', 'u-margin-remove'],
  ['uMarginRight', 'u-margin-right'],
  ['uMarginRightRemove', 'u-margin-right-remove'],
  ['uMarginSm', 'u-margin-sm'],
  ['uMarginSmBottom', 'u-margin-sm-bottom'],
  ['uMarginSmLeft', 'u-margin-sm-left'],
  ['uMarginSmRight', 'u-margin-sm-right'],
  ['uMarginSmTop', 'u-margin-sm-top'],
  ['uMarginTop', 'u-margin-top'],
  ['uMarginTopRemove', 'u-margin-top-remove'],
  ['uMarginXl', 'u-margin-xl'],
  ['uMarginXlBottom', 'u-margin-xl-bottom'],
  ['uMarginXlLeft', 'u-margin-xl-left'],
  ['uMarginXlRight', 'u-margin-xl-right'],
  ['uMarginXlTop', 'u-margin-xl-top'],
  ['uMarginXs', 'u-margin-xs'],
  ['uMarginXsBottom', 'u-margin-xs-bottom'],
  ['uMarginXsLeft', 'u-margin-xs-left'],
  ['uMarginXsRight', 'u-margin-xs-right'],
  ['uMarginXsTop', 'u-margin-xs-top'],
  ['uMarginXxl', 'u-margin-xxl'],
  ['uMarginXxlBottom', 'u-margin-xxl-bottom'],
  ['uMarginXxlLeft', 'u-margin-xxl-left'],
  ['uMarginXxlRight', 'u-margin-xxl-right'],
  ['uMarginXxlTop', 'u-margin-xxl-top'],
  ['uPositionAbsolute', 'u-position-absolute'],
  ['uPositionBottom', 'u-position-bottom'],
  ['uPositionBottomLeft', 'u-position-bottom-left'],
  ['uPositionBottomRight', 'u-position-bottom-right'],
  ['uPositionCover', 'u-position-cover'],
  ['uPositionRelative', 'u-position-relative'],
  ['uPositionTop', 'u-position-top'],
  ['uPositionTopLeft', 'u-position-top-left'],
  ['uPositionTopRight', 'u-position-top-right'],
  ['uScrollDisable', 'u-scroll-disable'],
  ['uScrollEnable', 'u-scroll-enable'],
  ['uTextBottom', 'u-text-bottom'],
  ['uTextBreak', 'u-text-break'],
  ['uTextCenter', 'u-text-center'],
  ['uTextJustify', 'u-text-justify'],
  ['uTextLeft', 'u-text-left'],
  ['uTextMiddle', 'u-text-middle'],
  ['uTextNowrap', 'u-text-nowrap'],
  ['uTextRight', 'u-text-right'],
  ['uTextTop', 'u-text-top'],
  ['uTextTruncate', 'u-text-truncate'],
  ['uVerticalAlign', 'u-vertical-align'],
  ['uVerticalAlignBottom', 'u-vertical-align-bottom'],
  ['uVerticalAlignMiddle', 'u-vertical-align-middle'],
  ['uVerticalAlignTop', 'u-vertical-align-top'],
  ['uVisibleToggle', 'u-visible-toggle']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(utilities.css);
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(css);
        return stylesheet;
      default:
        return target.get(attr);
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
