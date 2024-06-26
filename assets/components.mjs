export const cAvatar = 'c-avatar'
export const cAvatarLink = 'c-avatar__link'
export const cBackdrop = 'c-backdrop'
export const cBadge = 'c-badge'
export const cBadgeDanger = 'c-badge--danger'
export const cBadgeInfo = 'c-badge--info'
export const cBadgePrimary = 'c-badge--primary'
export const cBadgeSuccess = 'c-badge--success'
export const cBadgeWarning = 'c-badge--warning'
export const cButton = 'c-button'
export const cButtonIcon = 'c-button__icon'
export const cButtonText = 'c-button__text'
export const cChart = 'c-chart'
export const cChartAxis = 'c-chart__axis'
export const cChartCanvas = 'c-chart__canvas'
export const cChartControls = 'c-chart__controls'
export const cChartGraph = 'c-chart__graph'
export const cCtrl = 'c-ctrl'
export const cCtrlGroup = 'c-ctrl-group'
export const cCtrlPopover = 'c-ctrl-popover'
export const cCtrlSort = 'c-ctrl-sort'
export const cDialog = 'c-dialog'
export const cDialogBody = 'c-dialog__body'
export const cDialogBodyViewport = 'c-dialog__body-viewport'
export const cDialogBodyWrapper = 'c-dialog__body-wrapper'
export const cDialogButtons = 'c-dialog__buttons'
export const cDialogHeader = 'c-dialog__header'
export const cField = 'c-field'
export const cFieldBox = 'c-field-box'
export const cFieldButton = 'c-field-button'
export const cFieldError = 'c-field-error'
export const cFieldIcon = 'c-field-icon'
export const cFieldInfo = 'c-field-info'
export const cFieldLabel = 'c-field-label'
export const cList = 'c-list'
export const cListBody = 'c-list__body'
export const cListCell = 'c-list__cell'
export const cListFoot = 'c-list__foot'
export const cListHead = 'c-list__head'
export const cListItem = 'c-list__item'
export const cListMeta = 'c-list__meta'
export const cPagination = 'c-pagination'
export const cPaginationEllipsis = 'c-pagination__ellipsis'
export const cPaginationNext = 'c-pagination__next'
export const cPaginationPage = 'c-pagination__page'
export const cPaginationPrev = 'c-pagination__prev'
export const cPanel = 'c-panel'
export const cPanelDivider = 'c-panel-divider'
export const cPanelBody = 'c-panel__body'
export const cPanelHead = 'c-panel__head'
export const cPopover = 'c-popover'
export const cPopoverBody = 'c-popover__body'
export const cProgress = 'c-progress'
export const cProgressStriped = 'c-progress--striped'
export const cProgressBar = 'c-progress__bar'
export const cSelectField = 'c-select-field'
export const cTab = 'c-tab'
export const cTabIndicator = 'c-tab-indicator'
export const cTabIcon = 'c-tab__icon'
export const cTabLabel = 'c-tab__label'
export const cTabsContainer = 'c-tabs-container'
export const cThumbnail = 'c-thumbnail'
export const cThumbnailLg = 'c-thumbnail--lg'
export const cThumbnailMd = 'c-thumbnail--md'
export const cThumbnailSm = 'c-thumbnail--sm'
export const cThumbnailSquare = 'c-thumbnail--square'
export const cThumbnailXl = 'c-thumbnail--xl'
export const cThumbnailXs = 'c-thumbnail--xs'
export const cThumbnailCaption = 'c-thumbnail__caption'
export const cThumbnailLink = 'c-thumbnail__link'
export const cThumbnailShutter = 'c-thumbnail__shutter'
export const cToolbar = 'c-toolbar'
export const cToolbarLabel = 'c-toolbar__label'
export const dot = 'dot'
export const handle = 'handle'
export const icon = 'icon'
export const iconic = 'iconic'
export const isClosed = 'is-closed'
export const isFilled = 'is-filled'
export const isFocused = 'is-focused'
export const isHidden = 'is-hidden'
export const isInvalid = 'is-invalid'
export const isOpened = 'is-opened'
export const isVisible = 'is-visible'
export const line = 'line'
export const point = 'point'
export const pointHovered = 'point--hovered'
export const sClean = 's-clean'
export const sFloating = 's-floating'
export const sIcon = 's-icon'
export const sLinkset = 's-linkset'
export const tick = 'tick'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./components.css')

	if (typeof CSSStyleSheet === 'undefined') {
		const { CSSStyleDeclaration } = await import('cssstyle')
		const { readFileSync } = await import('node:fs')
		const { fileURLToPath } = await import('node:url')
		const cssStyleDeclaration = new CSSStyleDeclaration()
		const cssText = readFileSync(fileURLToPath(cssFileURL), 'utf-8')
		cssStyleDeclaration.cssText = cssText
		return cssStyleDeclaration
	} else if (typeof CSSStyleSheet === 'function') {
		const cssStyleSheet = new CSSStyleSheet()
		const cssText = await fetch(cssFileURL).then((r) => r.text())
		cssStyleSheet.replaceSync(cssText)
		return cssStyleSheet
	}

	return Object.create(null)
})()

export default stylesheet
