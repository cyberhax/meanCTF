'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './question.routes';

export class QuestionComponent {
  /*@ngInject*/
  constructor($http, $scope, User,$timeout,$state) {
    
    $scope.status = true;

    $http.defaults.headers.post['Content-Type'] = 'application/json';
    $scope.user = '';
    $scope.test = {
      answer: '',
      user: User.get()
    };
    $timeout(retrieveQuestions,1500);

    $scope.user = User.get();
    $scope.myFilter = function(soal){
      // console.log('myfilter',$scope.user);
      return !($scope.user.question.includes(soal._id));
    }

    $scope.answer = function(answer, index) {
      $scope.test.answer = answer;
      if ($scope.test.answer) {
        // console.log('sned:', $scope.test);
        $http.post('api/questions/answer/' + $scope.questions[index]._id, $scope.test).success(function() {
          $scope.test = '';
          $state.go($state.$current, null, { reload: true });
        });
      }
    };

function retrieveQuestions(){
$http.get('api/questions').success(questions => {
      // console.log($scope.user.question);
      $scope.questions = questions.filter(soal => {
        return !($scope.user.question.includes(soal._id));
      });
    });
}
    
  }
}

export default angular.module('ctfApp.question', [uiRouter])
  .config(routes)
  .component('question', {
    template: require('./question.html'),
    controller: QuestionComponent,
    controllerAs: 'questionCtrl'
  })
  .name;
