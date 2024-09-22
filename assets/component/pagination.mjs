export const cPagination = 'c-pagination';
export const cPaginationEllipsis = 'c-pagination__ellipsis';
export const cPaginationNext = 'c-pagination__next';
export const cPaginationPage = 'c-pagination__page';
export const cPaginationPrev = 'c-pagination__prev';

const file = import.meta.resolve("./pagination.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;