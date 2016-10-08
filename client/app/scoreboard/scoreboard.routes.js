'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('scoreboard', {
      cache: true,
      url: '/scoreboard',
      template: '<scoreboard></scoreboard>'
    });
}
