'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './misc.routes';

export class MiscComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('ctfApp.misc', [uiRouter])
  .config(routes)
  .component('misc', {
    template: require('./misc.html'),
    controller: MiscComponent,
    controllerAs: 'miscCtrl'
  })
  .name;
