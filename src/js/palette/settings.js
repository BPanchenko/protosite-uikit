
/* Constants
  ========================================================================== */

const COLORS = new Map([
  [
    'red', {
      name: 'Red',
      hex: ''
    }
  ], [
    'pink', {
      name: 'Pink',
      hex: ''
    }
  ], [
    'purple', {
      name: 'Purple',
      hex: ''
    }
  ], [
    'violet', {
      name: 'Violet (Deep Purple)',
      hex: ''
    }
  ], [
    'indigo', {
      name: 'Indigo',
      hex: ''
    }
  ], [
    'blue', {
      name: 'Blue',
      hex: ''
    }
  ], [
    'light-blue', {
      name: 'Light Blue',
      hex: ''
    }
  ], [
    'cyan', {
      name: 'Cyan',
      hex: ''
    }
  ], [
    'teal', {
      name: 'Teal',
      hex: ''
    }
  ], [
    'green', {
      name: 'Green',
      hex: ''
    }
  ], [
    'light-green', {
      name: 'Light Green',
      hex: ''
    }
  ], [
    'lime', {
      name: 'Lime',
      hex: ''
    }
  ], [
    'yellow', {
      name: 'Yellow',
      hex: ''
    }
  ], [
    'amber', {
      name: 'Amber',
      hex: ''
    }
  ], [
    'orange', {
      name: 'Orange',
      hex: ''
    }
  ], [
    'deep-orange', {
      name: 'Deep Orange',
      hex: ''
    }
  ], [
    'brown', {
      name: 'Brown',
      hex: ''
    }
  ], [
    'grey', {
      name: 'Grey',
      hex: ''
    }
  ], [
    'blue-grey', {
      name: 'Blue Grey',
      hex: ''
    }
  ], [
    'black', {
      name: 'Black',
      hex: '000000'
    }
  ], [
    'white', {
      name: 'White',
      hex: 'FFFFFF'
    }
  ]
])

/*
  TODO:
  document.documentElement.style.getPropertyValue('--clr-red') <= it's don't work

COLORS.forEach((value, key, map) => {
  value.value = document.documentElement.style.getPropertyValue(`--clr-${key}`)
  console.log(`--clr-${key}`, document.documentElement.style.getPropertyValue(`--clr-${key}`))
})
*/ 

const PALETTE = new Map(COLORS)

PALETTE.set('text', {
  name: 'Text Color',
  hex: '333333'
})
PALETTE.set('link', {
  name: 'Link Color',
  hex: '1565C0'
})

export {
  COLORS,
  PALETTE
}