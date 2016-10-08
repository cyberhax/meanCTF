'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './chat.routes';

export class ChatComponent {
  /*@ngInject*/
  
  constructor($scope) {
    var imagePath = 'assets/images/cybersocks_transparent-b63369ad3c.png';

    this.message = 'Hello';
    $scope.name='sani';
    $scope.name2='sani';

    $scope.todos = [];
    for (var i = 0; i < 9; i++) {
    $scope.todos.push({
      face: imagePath,
      what: "Hang pi mana pi mana",
      who: "Lala",
      notes: "Testing for notes"
    });
  }
  }
}

export default angular.module('ctfApp.chat', [uiRouter])
  .config(routes)
  .component('chat', {
    template: require('./chat.html'),
    controller: ChatComponent,
    controllerAs: 'chatCtrl'
  })
  .name;
