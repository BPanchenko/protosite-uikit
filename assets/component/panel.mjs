export const cAvatar = 'c-avatar';
export const cButton = 'c-button';
export const cPanel = 'c-panel';
export const cPanelDivider = 'c-panel-divider';
export const cPanelBody = 'c-panel__body';
export const cPanelHead = 'c-panel__head';
export const cToolbar = 'c-toolbar';
export const sClean = 's-clean';

const file = import.meta.resolve("./panel.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;