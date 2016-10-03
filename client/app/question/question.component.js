'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './question.routes';

export class QuestionComponent {
  /*@ngInject*/
  constructor($http, $scope, User,$timeout,$state,$mdToast) {
    $scope.user = User.get();
    $scope.status = true;
    $http.defaults.headers.post['Content-Type'] = 'application/json';
    
    
    $timeout(retrieveQuestions,1000).then(()=>{
      console.log('done load question');
      });

      $scope.answer = function (answer, index) {
        $scope.test = {
            answer: '',
            user: $scope.user
          };
        $scope.test.answer = answer;
        console.log('answer',$scope.test.answer);
        if ($scope.test.answer) {
          console.log('sned:', $scope.test);
          $http.post('api/questions/answer/' + $scope.questions[index]._id, $scope.test).then(function (res) {            
            $scope.test = '';
            $state.go($state.$current, null, { reload: true });
            $mdToast.show(
                     $mdToast.simple()
                        .textContent('Betul!!!!')                       
                        .hideDelay(2000)
                        .position('bottom right')
            );
        },function(res){
            $mdToast.show(
                     $mdToast.simple()
                        .textContent('Salah!!!!')                       
                        .hideDelay(2000)
                        .position('bottom right')
            );
        })
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

function filter() {
  $scope.myFilter = function(soal){
      // console.log('myfilter',$scope.user);
      return !($scope.user.question.includes(soal._id));
    }
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
