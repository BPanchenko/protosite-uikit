export const sBold = 's-bold'
export const sCapitalize = 's-capitalize'
export const sCursive = 's-cursive'
export const sExtraBold = 's-extra-bold'
export const sExtraLight = 's-extra-light'
export const sHeavy = 's-heavy'
export const sLight = 's-light'
export const sLowercase = 's-lowercase'
export const sMedium = 's-medium'
export const sMonospace = 's-monospace'
export const sNormal = 's-normal'
export const sSans = 's-sans'
export const sSemiBold = 's-semi-bold'
export const sSerif = 's-serif'
export const sText = 's-text'
export const sThin = 's-thin'
export const sUppercase = 's-uppercase'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./text.css')

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
