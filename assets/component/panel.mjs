/// <reference path="panel.d.ts" />

export const cAvatar = 'c-avatar'
export const cButton = 'c-button'
export const cPanel = 'c-panel'
export const cPanelDivider = 'c-panel-divider'
export const cPanelBody = 'c-panel__body'
export const cPanelHead = 'c-panel__head'
export const cToolbar = 'c-toolbar'
export const sClean = 's-clean'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./panel.css')

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
