export const cDialog = 'c-dialog';
export const cDialogBody = 'c-dialog__body';
export const cDialogBodyViewport = 'c-dialog__body-viewport';
export const cDialogBodyWrapper = 'c-dialog__body-wrapper';
export const cDialogButtons = 'c-dialog__buttons';
export const cDialogHeader = 'c-dialog__header';
export const isClosed = 'is-closed';
export const isOpened = 'is-opened';

const file = import.meta.resolve("./dialog.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;