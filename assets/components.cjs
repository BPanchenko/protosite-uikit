const classNames = new Map([
  ['cAvatar', 'c-avatar'],
  ['cAvatarLink', 'c-avatar__link'],
  ['cBackdrop', 'c-backdrop'],
  ['cBadge', 'c-badge'],
  ['cBadgeDanger', 'c-badge--danger'],
  ['cBadgeInfo', 'c-badge--info'],
  ['cBadgePrimary', 'c-badge--primary'],
  ['cBadgeSuccess', 'c-badge--success'],
  ['cBadgeWarning', 'c-badge--warning'],
  ['cButton', 'c-button'],
  ['cButtonIcon', 'c-button__icon'],
  ['cButtonText', 'c-button__text'],
  ['cChart', 'c-chart'],
  ['cChartAxis', 'c-chart__axis'],
  ['cChartCanvas', 'c-chart__canvas'],
  ['cChartControls', 'c-chart__controls'],
  ['cChartGraph', 'c-chart__graph'],
  ['cCombobox', 'c-combobox'],
  ['cCtrl', 'c-ctrl'],
  ['cCtrlGroup', 'c-ctrl-group'],
  ['cCtrlPopover', 'c-ctrl-popover'],
  ['cCtrlSort', 'c-ctrl-sort'],
  ['cDialog', 'c-dialog'],
  ['cDialogBody', 'c-dialog__body'],
  ['cDialogBodyViewport', 'c-dialog__body-viewport'],
  ['cDialogBodyWrapper', 'c-dialog__body-wrapper'],
  ['cDialogButtons', 'c-dialog__buttons'],
  ['cDialogHeader', 'c-dialog__header'],
  ['cField', 'c-field'],
  ['cFieldBox', 'c-field-box'],
  ['cFieldButton', 'c-field-button'],
  ['cFieldError', 'c-field-error'],
  ['cFieldIcon', 'c-field-icon'],
  ['cFieldInfo', 'c-field-info'],
  ['cFieldLabel', 'c-field-label'],
  ['cFieldSelect', 'c-field-select'],
  ['cList', 'c-list'],
  ['cListBody', 'c-list__body'],
  ['cListCell', 'c-list__cell'],
  ['cListFoot', 'c-list__foot'],
  ['cListHead', 'c-list__head'],
  ['cListItem', 'c-list__item'],
  ['cListMeta', 'c-list__meta'],
  ['cPagination', 'c-pagination'],
  ['cPaginationEllipsis', 'c-pagination__ellipsis'],
  ['cPaginationNext', 'c-pagination__next'],
  ['cPaginationPage', 'c-pagination__page'],
  ['cPaginationPrev', 'c-pagination__prev'],
  ['cPanel', 'c-panel'],
  ['cPanelDivider', 'c-panel-divider'],
  ['cPanelBody', 'c-panel__body'],
  ['cPanelHead', 'c-panel__head'],
  ['cPopover', 'c-popover'],
  ['cPopoverBody', 'c-popover__body'],
  ['cProgress', 'c-progress'],
  ['cProgressStriped', 'c-progress--striped'],
  ['cProgressBar', 'c-progress__bar'],
  ['cTab', 'c-tab'],
  ['cTabIndicator', 'c-tab-indicator'],
  ['cTabIcon', 'c-tab__icon'],
  ['cTabLabel', 'c-tab__label'],
  ['cTabsContainer', 'c-tabs-container'],
  ['cThumbnail', 'c-thumbnail'],
  ['cThumbnailLg', 'c-thumbnail--lg'],
  ['cThumbnailMd', 'c-thumbnail--md'],
  ['cThumbnailSm', 'c-thumbnail--sm'],
  ['cThumbnailSquare', 'c-thumbnail--square'],
  ['cThumbnailXl', 'c-thumbnail--xl'],
  ['cThumbnailXs', 'c-thumbnail--xs'],
  ['cThumbnailCaption', 'c-thumbnail__caption'],
  ['cThumbnailLink', 'c-thumbnail__link'],
  ['cThumbnailShutter', 'c-thumbnail__shutter'],
  ['cToolbar', 'c-toolbar'],
  ['cToolbarLabel', 'c-toolbar__label'],
  ['dot', 'dot'],
  ['handle', 'handle'],
  ['icon', 'icon'],
  ['iconic', 'iconic'],
  ['isClosed', 'is-closed'],
  ['isFilled', 'is-filled'],
  ['isFocused', 'is-focused'],
  ['isHidden', 'is-hidden'],
  ['isInvalid', 'is-invalid'],
  ['isOpened', 'is-opened'],
  ['isVisible', 'is-visible'],
  ['line', 'line'],
  ['point', 'point'],
  ['pointHovered', 'point--hovered'],
  ['sClean', 's-clean'],
  ['sFloating', 's-floating'],
  ['sIcon', 's-icon'],
  ['sLinkset', 's-linkset'],
  ['tick', 'tick']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'components.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
        return stylesheet;

      default:
        return target.get(attr.toString());
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
