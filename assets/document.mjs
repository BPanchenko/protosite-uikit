export const icon = 'icon'
export const isActive = 'is-active'
export const sCondensed = 's-condensed'
export const sIcon = 's-icon'
export const uTextLg = 'u-text-lg'
export const uTextSm = 'u-text-sm'
export const uTextXs = 'u-text-xs'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./document.css')

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
