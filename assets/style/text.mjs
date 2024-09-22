export const sBold = 's-bold';
export const sCapitalize = 's-capitalize';
export const sExtraBold = 's-extra-bold';
export const sExtraLight = 's-extra-light';
export const sHeavy = 's-heavy';
export const sLight = 's-light';
export const sLowercase = 's-lowercase';
export const sMedium = 's-medium';
export const sNormal = 's-normal';
export const sSemiBold = 's-semi-bold';
export const sText = 's-text';
export const sThin = 's-thin';
export const sUppercase = 's-uppercase';

const file = import.meta.resolve("./text.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;