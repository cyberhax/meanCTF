'use strict';

export default class AdminController {
  users: Object[];

  /*@ngInject*/
  constructor(User,$http,$scope) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    $scope.question = '';
    $scope.createQuestion = function(){
        if($scope.question.name && $scope.question.info && $scope.question.answer && $scope.question.point){
        // console.log($scope.question);
        $http.post('/api/questions',$scope.question).success(()=>{
           $scope.question = "";
        });
        } //end if
    };
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
