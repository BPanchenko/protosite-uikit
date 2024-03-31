/// <reference path="shadows.d.ts" />

export const sShadow = 's-shadow'
export const sShadow16Dp = 's-shadow-16dp'
export const sShadow24Dp = 's-shadow-24dp'
export const sShadow2Dp = 's-shadow-2dp'
export const sShadow3Dp = 's-shadow-3dp'
export const sShadow4Dp = 's-shadow-4dp'
export const sShadow6Dp = 's-shadow-6dp'
export const sShadow8Dp = 's-shadow-8dp'
export const sShadowDiffuse = 's-shadow-diffuse'
export const sShadowDreamy = 's-shadow-dreamy'
export const sShadowLonger = 's-shadow-longer'
export const sShadowSharp = 's-shadow-sharp'
export const sShadowShorter = 's-shadow-shorter'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./shadows.css')

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
