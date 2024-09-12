export const cFieldBox = 'c-field-box'
export const guideHorizontal = 'guide--horizontal'
export const guideVertical = 'guide--vertical'
export const line = 'line'
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
export const oGrid = 'o-grid'
export const sAxis = 's-axis'
export const sShort = 's-short'
export const sizes = 'sizes'

const stylesheet = await (async () => {
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
