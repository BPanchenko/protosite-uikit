/// <reference path="badge.d.ts" />

export const cBadge = 'c-badge'
export const cBadgeDanger = 'c-badge--danger'
export const cBadgeInfo = 'c-badge--info'
export const cBadgePrimary = 'c-badge--primary'
export const cBadgeSuccess = 'c-badge--success'
export const cBadgeWarning = 'c-badge--warning'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./badge.css')

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
