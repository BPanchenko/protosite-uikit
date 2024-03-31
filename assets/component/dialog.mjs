export const cDialog = 'c-dialog'
export const cDialogBody = 'c-dialog__body'
export const cDialogBodyViewport = 'c-dialog__body-viewport'
export const cDialogBodyWrapper = 'c-dialog__body-wrapper'
export const cDialogButtons = 'c-dialog__buttons'
export const cDialogHeader = 'c-dialog__header'
export const isClosed = 'is-closed'
export const isOpened = 'is-opened'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./dialog.css')

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
