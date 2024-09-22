export const cPopover = 'c-popover';
export const cPopoverBody = 'c-popover__body';
export const isHidden = 'is-hidden';
export const isVisible = 'is-visible';
export const sLinkset = 's-linkset';

const file = import.meta.resolve("./popover.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;