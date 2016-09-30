'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('misc', {
      url: '/misc',
      template: '<misc></misc>'
    });
}
