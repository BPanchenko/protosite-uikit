export const cProgress = 'c-progress';
export const cProgressStriped = 'c-progress--striped';
export const cProgressBar = 'c-progress__bar';

const file = import.meta.resolve("./progress.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;