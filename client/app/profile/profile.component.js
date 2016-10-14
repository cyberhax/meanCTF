'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './profile.routes';

export class ProfileComponent {
  /*@ngInject*/
  constructor($scope,User,$http) {
    User.get().$promise.then((user)=>{
      $scope.user = user;
      retrieveQuestions();
    });

    function retrieveQuestions() {
      $http.get('api/questions').success(questions => {
        // console.log($scope.user.question);
        $scope.questions = questions.filter(soal => {
          return ($scope.user.question.includes(soal._id));
        });
      });
    }
    
  }

  
}

export default angular.module('ctfApp.profile', [uiRouter])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    controllerAs: 'profileCtrl'
  })
  .name;
