/// <reference path="objects.d.ts" />

export const cFieldBox = 'c-field-box'
export const oArticle = 'o-article'
export const oArticlePicture = 'o-article__picture'
export const oBreadcrumb = 'o-breadcrumb'
export const oBreadcrumbItem = 'o-breadcrumb__item'
export const oContainer = 'o-container'
export const oForm = 'o-form'
export const oFormBody = 'o-form__body'
export const oFormButtons = 'o-form__buttons'
export const oFormHead = 'o-form__head'
export const oFormRow = 'o-form__row'
export const sShort = 's-short'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./objects.css')

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
