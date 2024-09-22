export const cButton = 'c-button';
export const cListBody = 'c-list__body';
export const sLoading = 's-loading';

const file = import.meta.resolve("./loading.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;