import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.module.min.js'
import * as _ from 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.12.0/underscore-esm-min.min.js'

import { PALETTE } from './settings.js'

const parseColors = list => _.compact(list.map(item => PALETTE.has(item) ? PALETTE.get(item) : null))

export {
  _,
  PALETTE,
  THREE,
  parseColors
}