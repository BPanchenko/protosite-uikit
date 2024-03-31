/// <reference path="pagination.d.ts" />

export const cPagination = 'c-pagination'
export const cPaginationEllipsis = 'c-pagination__ellipsis'
export const cPaginationNext = 'c-pagination__next'
export const cPaginationPage = 'c-pagination__page'
export const cPaginationPrev = 'c-pagination__prev'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./pagination.css')

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
