process.env.NODE_ENV !== 'prod' && console.time('t');

import '../less/core.less';
import './custom-elements/button';

import Vue from 'vue/dist/vue.esm.js';
import components from './components';
import directives from './directives';

components.install(Vue);
directives.install(Vue);

global.Vue = Vue;

process.env.NODE_ENV !== 'prod' && console.timeEnd('t');