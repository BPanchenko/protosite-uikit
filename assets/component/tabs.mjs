export const cPanel = 'c-panel';
export const cTab = 'c-tab';
export const cTabIndicator = 'c-tab-indicator';
export const cTabIcon = 'c-tab__icon';
export const cTabLabel = 'c-tab__label';
export const cTabsContainer = 'c-tabs-container';

const file = import.meta.resolve("./tabs.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;