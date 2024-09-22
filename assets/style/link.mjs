export const cButton = 'c-button';
export const cPanel = 'c-panel';
export const sClean = 's-clean';
export const sLink = 's-link';

const file = import.meta.resolve("./link.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;