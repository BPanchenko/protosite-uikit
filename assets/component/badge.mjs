export const cBadge = 'c-badge';
export const cBadgeDanger = 'c-badge--danger';
export const cBadgeInfo = 'c-badge--info';
export const cBadgePrimary = 'c-badge--primary';
export const cBadgeSuccess = 'c-badge--success';
export const cBadgeWarning = 'c-badge--warning';

const file = import.meta.resolve("./badge.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;