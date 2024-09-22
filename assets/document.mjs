export const icon = 'icon';
export const isActive = 'is-active';
export const sCondensed = 's-condensed';
export const sIcon = 's-icon';
export const uTextLg = 'u-text-lg';
export const uTextSm = 'u-text-sm';
export const uTextXs = 'u-text-xs';

const file = import.meta.resolve("./document.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;