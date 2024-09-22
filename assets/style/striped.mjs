export const cList = 'c-list';
export const cListItem = 'c-list__item';
export const sStriped = 's-striped';

const file = import.meta.resolve("./striped.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;