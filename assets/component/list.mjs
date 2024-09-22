export const cList = 'c-list';
export const cListBody = 'c-list__body';
export const cListCell = 'c-list__cell';
export const cListFoot = 'c-list__foot';
export const cListHead = 'c-list__head';
export const cListItem = 'c-list__item';
export const cListMeta = 'c-list__meta';

const file = import.meta.resolve("./list.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;