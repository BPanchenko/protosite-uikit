/// <reference path="tabs.d.ts" />

export const cPanel = 'c-panel'
export const cTab = 'c-tab'
export const cTabIndicator = 'c-tab-indicator'
export const cTabIcon = 'c-tab__icon'
export const cTabLabel = 'c-tab__label'
export const cTabsContainer = 'c-tabs-container'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./tabs.css')

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
