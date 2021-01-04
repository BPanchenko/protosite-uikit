
/* Constants
  ========================================================================== */

const COLORS = new Map([
  [
    'red', {
      name: 'Red',
      hex: 'f44336'
    }
  ], [
    'pink', {
      name: 'Pink',
      hex: 'e91e63'
    }
  ], [
    'purple', {
      name: 'Purple',
      hex: '9c27b0'
    }
  ], [
    'violet', {
      name: 'Violet (Deep Purple)',
      hex: '673ab7'
    }
  ], [
    'indigo', {
      name: 'Indigo',
      hex: '3f51b5'
    }
  ], [
    'blue', {
      name: 'Blue',
      hex: '2196f3'
    }
  ], [
    'light-blue', {
      name: 'Light Blue',
      hex: '03a9f4'
    }
  ], [
    'cyan', {
      name: 'Cyan',
      hex: '00bcd4'
    }
  ], [
    'teal', {
      name: 'Teal',
      hex: '009688'
    }
  ], [
    'green', {
      name: 'Green',
      hex: '4caf50'
    }
  ], [
    'light-green', {
      name: 'Light Green',
      hex: '8bc34a'
    }
  ], [
    'lime', {
      name: 'Lime',
      hex: 'cddc39'
    }
  ], [
    'yellow', {
      name: 'Yellow',
      hex: 'ffeb3b'
    }
  ], [
    'amber', {
      name: 'Amber',
      hex: 'ffc107'
    }
  ], [
    'orange', {
      name: 'Orange',
      hex: 'ff9800'
    }
  ], [
    'deep-orange', {
      name: 'Deep Orange',
      hex: 'ff5722'
    }
  ], [
    'brown', {
      name: 'Brown',
      hex: '795548'
    }
  ], [
    'grey', {
      name: 'Grey',
      hex: '9e9e9e'
    }
  ], [
    'blue-grey', {
      name: 'Blue Grey',
      hex: '607d8b'
    }
  ], [
    'green-grey', {
      name: 'Green Grey',
      hex: '5e7d75'
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

PALETTE.set('brand', {
  name: 'Brand',
  hex: COLORS.get('blue').hex
})

PALETTE.set('link', {
  name: 'Link',
  hex: '1565C0'
})

PALETTE.set('text', {
  name: 'Text',
  hex: '333333'
})

export {
  COLORS,
  PALETTE
}