export const sCursorAlias = 's-cursor-alias'
export const sCursorAllScroll = 's-cursor-all-scroll'
export const sCursorAuto = 's-cursor-auto'
export const sCursorCell = 's-cursor-cell'
export const sCursorColResize = 's-cursor-col-resize'
export const sCursorContextMenu = 's-cursor-context-menu'
export const sCursorCopy = 's-cursor-copy'
export const sCursorCrosshair = 's-cursor-crosshair'
export const sCursorDefault = 's-cursor-default'
export const sCursorEResize = 's-cursor-e-resize'
export const sCursorEwResize = 's-cursor-ew-resize'
export const sCursorGrab = 's-cursor-grab'
export const sCursorGrabbing = 's-cursor-grabbing'
export const sCursorHelp = 's-cursor-help'
export const sCursorMove = 's-cursor-move'
export const sCursorNResize = 's-cursor-n-resize'
export const sCursorNeResize = 's-cursor-ne-resize'
export const sCursorNeswResize = 's-cursor-nesw-resize'
export const sCursorNoDrop = 's-cursor-no-drop'
export const sCursorNone = 's-cursor-none'
export const sCursorNotAllowed = 's-cursor-not-allowed'
export const sCursorNsResize = 's-cursor-ns-resize'
export const sCursorNwResize = 's-cursor-nw-resize'
export const sCursorNwseResize = 's-cursor-nwse-resize'
export const sCursorPointer = 's-cursor-pointer'
export const sCursorProgress = 's-cursor-progress'
export const sCursorRowResize = 's-cursor-row-resize'
export const sCursorSResize = 's-cursor-s-resize'
export const sCursorSeResize = 's-cursor-se-resize'
export const sCursorSwResize = 's-cursor-sw-resize'
export const sCursorText = 's-cursor-text'
export const sCursorVerticalText = 's-cursor-vertical-text'
export const sCursorWResize = 's-cursor-w-resize'
export const sCursorWait = 's-cursor-wait'
export const sCursorZoomIn = 's-cursor-zoom-in'
export const sCursorZoomOut = 's-cursor-zoom-out'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./cursor.css')

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
