export const cChart = 'c-chart'
export const cChartAxis = 'c-chart__axis'
export const cChartCanvas = 'c-chart__canvas'
export const cChartControls = 'c-chart__controls'
export const cChartGraph = 'c-chart__graph'
export const dot = 'dot'
export const handle = 'handle'
export const line = 'line'
export const point = 'point'
export const pointHovered = 'point--hovered'
export const tick = 'tick'

const stylesheet = await (async () => {
	const cssFileURL = import.meta.resolve('./chart.css')

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
