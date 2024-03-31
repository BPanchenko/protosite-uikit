export const cList = 'c-list'
export const cListBody = 'c-list__body'
export const cListCell = 'c-list__cell'
export const cListFoot = 'c-list__foot'
export const cListHead = 'c-list__head'
export const cListItem = 'c-list__item'
export const cListMeta = 'c-list__meta'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./list.css')

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
