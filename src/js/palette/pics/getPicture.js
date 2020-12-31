
let cash = new Map
let svg = document.createElement('svg')

console.log('getPicture(), svg =>', svg)

export default function (renderFunction) {
    if (!cash.has(renderFunction)) {
        // TODO
        cash.set(renderFunction, svg)
    }
    return cash.get(renderFunction)
}