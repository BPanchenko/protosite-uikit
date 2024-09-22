export const cFieldBox = 'c-field-box';
export const guideHorizontal = 'guide--horizontal';
export const guideVertical = 'guide--vertical';
export const line = 'line';
export const oArticle = 'o-article';
export const oArticlePicture = 'o-article__picture';
export const oBreadcrumb = 'o-breadcrumb';
export const oBreadcrumbItem = 'o-breadcrumb__item';
export const oContainer = 'o-container';
export const oForm = 'o-form';
export const oFormBody = 'o-form__body';
export const oFormButtons = 'o-form__buttons';
export const oFormHead = 'o-form__head';
export const oFormRow = 'o-form__row';
export const oGrid = 'o-grid';
export const sAxis = 's-axis';
export const sShort = 's-short';
export const sizes = 'sizes';

const file = import.meta.resolve("./objects.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;