'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('question', {
      cache: true,
      url: '/question',
      template: '<question></question>'
    });
}
