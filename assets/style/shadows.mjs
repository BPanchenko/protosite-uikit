export const sShadow = 's-shadow';
export const sShadow16Dp = 's-shadow-16dp';
export const sShadow24Dp = 's-shadow-24dp';
export const sShadow2Dp = 's-shadow-2dp';
export const sShadow3Dp = 's-shadow-3dp';
export const sShadow4Dp = 's-shadow-4dp';
export const sShadow6Dp = 's-shadow-6dp';
export const sShadow8Dp = 's-shadow-8dp';
export const sShadowDiffuse = 's-shadow-diffuse';
export const sShadowDreamy = 's-shadow-dreamy';
export const sShadowLonger = 's-shadow-longer';
export const sShadowSharp = 's-shadow-sharp';
export const sShadowShorter = 's-shadow-shorter';

const file = import.meta.resolve("./shadows.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;