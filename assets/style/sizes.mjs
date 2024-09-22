export const cButton = 'c-button';
export const icon = 'icon';
export const sDefaultSize = 's-default-size';
export const sIcon = 's-icon';
export const sLg = 's-lg';
export const sMd = 's-md';
export const sSm = 's-sm';
export const sXl = 's-xl';
export const sXs = 's-xs';
export const sXxl = 's-xxl';
export const sXxxl = 's-xxxl';

const file = import.meta.resolve("./sizes.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;