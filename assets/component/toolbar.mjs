export const cButton = 'c-button';
export const cToolbar = 'c-toolbar';
export const cToolbarLabel = 'c-toolbar__label';
export const icon = 'icon';
export const sIcon = 's-icon';

const file = import.meta.resolve("./toolbar.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;