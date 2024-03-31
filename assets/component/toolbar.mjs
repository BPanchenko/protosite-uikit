/// <reference path="toolbar.d.ts" />

export const cButton = 'c-button'
export const cToolbar = 'c-toolbar'
export const cToolbarLabel = 'c-toolbar__label'
export const icon = 'icon'
export const sIcon = 's-icon'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./toolbar.css')

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
