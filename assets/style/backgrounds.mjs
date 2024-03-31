/// <reference path="backgrounds.d.ts" />

export const sBgAmber = 's-bg-amber'
export const sBgBlack = 's-bg-black'
export const sBgBlue = 's-bg-blue'
export const sBgBlueGrey = 's-bg-blue-grey'
export const sBgBrown = 's-bg-brown'
export const sBgCyan = 's-bg-cyan'
export const sBgDeepOrange = 's-bg-deep-orange'
export const sBgGreen = 's-bg-green'
export const sBgGrey = 's-bg-grey'
export const sBgIndigo = 's-bg-indigo'
export const sBgLightBlue = 's-bg-light-blue'
export const sBgLightGreen = 's-bg-light-green'
export const sBgLime = 's-bg-lime'
export const sBgOrange = 's-bg-orange'
export const sBgPink = 's-bg-pink'
export const sBgPurple = 's-bg-purple'
export const sBgRed = 's-bg-red'
export const sBgTeal = 's-bg-teal'
export const sBgViolet = 's-bg-violet'
export const sBgWhite = 's-bg-white'
export const sBgYellow = 's-bg-yellow'

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve('./backgrounds.css')

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
