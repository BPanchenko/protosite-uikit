export const sFlipHorizontal = 's-flip-horizontal';
export const sFlipRotate90 = 's-flip-rotate-90';

const file = import.meta.resolve("./transform.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;