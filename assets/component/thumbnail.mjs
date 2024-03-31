/// <reference path="thumbnail.d.ts" />

export const cPanel = 'c-panel'
export const cThumbnail = 'c-thumbnail'
export const cThumbnailLg = 'c-thumbnail--lg'
export const cThumbnailMd = 'c-thumbnail--md'
export const cThumbnailSm = 'c-thumbnail--sm'
export const cThumbnailSquare = 'c-thumbnail--square'
export const cThumbnailXl = 'c-thumbnail--xl'
export const cThumbnailXs = 'c-thumbnail--xs'
export const cThumbnailCaption = 'c-thumbnail__caption'
export const cThumbnailLink = 'c-thumbnail__link'
export const cThumbnailShutter = 'c-thumbnail__shutter'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./thumbnail.css')

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
