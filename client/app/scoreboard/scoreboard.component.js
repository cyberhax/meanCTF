'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './scoreboard.routes';

export class ScoreboardComponent {
  /*@ngInject*/
  constructor($http,$scope,socket) {
    this.message = 'Hello';
    $http.get('/api/users/scoreboard').success(users=>{
      $scope.users = users;
      socket.syncUpdates('user',$scope.users);
      // console.log(users);
    });
  }
}

export default angular.module('ctfApp.scoreboard', [uiRouter])
  .config(routes)
  .component('scoreboard', {
    template: require('./scoreboard.html'),
    controller: ScoreboardComponent,
    controllerAs: 'scoreboardCtrl'
  })
  .name;
