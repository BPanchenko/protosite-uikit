export const cAvatar = 'c-avatar';
export const cAvatarLink = 'c-avatar__link';

const file = import.meta.resolve("./avatar.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;