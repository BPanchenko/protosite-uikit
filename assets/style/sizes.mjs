/// <reference path="sizes.d.ts" />

export const cAvatar = 'c-avatar'
export const cButton = 'c-button'
export const icon = 'icon'
export const sDefaultSize = 's-default-size'
export const sIcon = 's-icon'
export const sLg = 's-lg'
export const sMd = 's-md'
export const sSm = 's-sm'
export const sXl = 's-xl'
export const sXs = 's-xs'
export const sXxl = 's-xxl'
export const sXxs = 's-xxs'
export const sXxxl = 's-xxxl'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./sizes.css')

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
