export const cButton = 'c-button';
export const sIcon = 's-icon';

const file = import.meta.resolve("./icon.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;