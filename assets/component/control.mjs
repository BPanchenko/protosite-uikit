export const cCtrl = 'c-ctrl';
export const cCtrlGroup = 'c-ctrl-group';
export const cCtrlPopover = 'c-ctrl-popover';
export const cCtrlSort = 'c-ctrl-sort';

const file = import.meta.resolve("./control.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;