'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('chat', {
      cache: true,
      url: '/chat',
      template: '<chat></chat>'
    });
}
