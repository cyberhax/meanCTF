'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('scoreboard', {
      url: '/scoreboard',
      template: '<scoreboard></scoreboard>'
    });
}
