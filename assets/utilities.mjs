export const guideHorizontal = 'guide--horizontal'
export const guideVertical = 'guide--vertical'
export const line = 'line'
export const oContainer = 'o-container'
export const sAxis = 's-axis'
export const sizes = 'sizes'
export const uAlignCenter = 'u-align-center'
export const uAlignLeft = 'u-align-left'
export const uAlignRight = 'u-align-right'
export const uCentering = 'u-centering'
export const uClearfix = 'u-clearfix'
export const uDisplayBlock = 'u-display-block'
export const uDisplayContents = 'u-display-contents'
export const uDisplayFlowRoot = 'u-display-flow-root'
export const uDisplayInline = 'u-display-inline'
export const uDisplayInlineBlock = 'u-display-inline-block'
export const uFloatLeft = 'u-float-left'
export const uFloatRight = 'u-float-right'
export const uGrid = 'u-grid'
export const uHidden = 'u-hidden'
export const uHiddenHover = 'u-hidden-hover'
export const uHiddenNotouch = 'u-hidden-notouch'
export const uInvisible = 'u-invisible'
export const uInvisibleHover = 'u-invisible-hover'
export const uMargin = 'u-margin'
export const uMarginBottom = 'u-margin-bottom'
export const uMarginBottomRemove = 'u-margin-bottom-remove'
export const uMarginLeft = 'u-margin-left'
export const uMarginLeftRemove = 'u-margin-left-remove'
export const uMarginLg = 'u-margin-lg'
export const uMarginLgBottom = 'u-margin-lg-bottom'
export const uMarginLgLeft = 'u-margin-lg-left'
export const uMarginLgRight = 'u-margin-lg-right'
export const uMarginLgTop = 'u-margin-lg-top'
export const uMarginMd = 'u-margin-md'
export const uMarginMdBottom = 'u-margin-md-bottom'
export const uMarginMdLeft = 'u-margin-md-left'
export const uMarginMdRight = 'u-margin-md-right'
export const uMarginMdTop = 'u-margin-md-top'
export const uMarginRemove = 'u-margin-remove'
export const uMarginRight = 'u-margin-right'
export const uMarginRightRemove = 'u-margin-right-remove'
export const uMarginSm = 'u-margin-sm'
export const uMarginSmBottom = 'u-margin-sm-bottom'
export const uMarginSmLeft = 'u-margin-sm-left'
export const uMarginSmRight = 'u-margin-sm-right'
export const uMarginSmTop = 'u-margin-sm-top'
export const uMarginTop = 'u-margin-top'
export const uMarginTopRemove = 'u-margin-top-remove'
export const uMarginXl = 'u-margin-xl'
export const uMarginXlBottom = 'u-margin-xl-bottom'
export const uMarginXlLeft = 'u-margin-xl-left'
export const uMarginXlRight = 'u-margin-xl-right'
export const uMarginXlTop = 'u-margin-xl-top'
export const uMarginXs = 'u-margin-xs'
export const uMarginXsBottom = 'u-margin-xs-bottom'
export const uMarginXsLeft = 'u-margin-xs-left'
export const uMarginXsRight = 'u-margin-xs-right'
export const uMarginXsTop = 'u-margin-xs-top'
export const uMarginXxl = 'u-margin-xxl'
export const uMarginXxlBottom = 'u-margin-xxl-bottom'
export const uMarginXxlLeft = 'u-margin-xxl-left'
export const uMarginXxlRight = 'u-margin-xxl-right'
export const uMarginXxlTop = 'u-margin-xxl-top'
export const uPositionAbsolute = 'u-position-absolute'
export const uPositionBottom = 'u-position-bottom'
export const uPositionBottomLeft = 'u-position-bottom-left'
export const uPositionBottomRight = 'u-position-bottom-right'
export const uPositionCover = 'u-position-cover'
export const uPositionRelative = 'u-position-relative'
export const uPositionTop = 'u-position-top'
export const uPositionTopLeft = 'u-position-top-left'
export const uPositionTopRight = 'u-position-top-right'
export const uScrollDisable = 'u-scroll-disable'
export const uScrollEnable = 'u-scroll-enable'
export const uTextBottom = 'u-text-bottom'
export const uTextBreak = 'u-text-break'
export const uTextCenter = 'u-text-center'
export const uTextJustify = 'u-text-justify'
export const uTextLeft = 'u-text-left'
export const uTextMiddle = 'u-text-middle'
export const uTextNowrap = 'u-text-nowrap'
export const uTextRight = 'u-text-right'
export const uTextTop = 'u-text-top'
export const uTextTruncate = 'u-text-truncate'
export const uVerticalAlign = 'u-vertical-align'
export const uVerticalAlignBottom = 'u-vertical-align-bottom'
export const uVerticalAlignMiddle = 'u-vertical-align-middle'
export const uVerticalAlignTop = 'u-vertical-align-top'
export const uVisibleToggle = 'u-visible-toggle'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./utilities.css')

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
