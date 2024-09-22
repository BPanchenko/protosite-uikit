export const cButton = 'c-button';
export const cButtonIcon = 'c-button__icon';
export const cButtonText = 'c-button__text';
export const cPanel = 'c-panel';
export const sClean = 's-clean';

const file = import.meta.resolve("./button.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;