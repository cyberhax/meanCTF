'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('question', {
      cache: false,
      url: '/question',
      template: '<question></question>'
    });
}
