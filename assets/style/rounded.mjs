export const cButton = 'c-button';
export const cToolbar = 'c-toolbar';
export const sRounded = 's-rounded';

const file = import.meta.resolve("./rounded.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;