import UI from './ui/index';
import ButtonElement from './custom-elements/button';

import LocationHashModel from './ui/lib/LocationHashModel';

import './ui/components/popover';
import './ui/components/field';

console.log(ButtonElement);
window.LocationHashModel = LocationHashModel;
window.UI = UI;