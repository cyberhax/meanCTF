'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    cache: true,
    url: '/',
    template: '<main></main>'
  });
}
