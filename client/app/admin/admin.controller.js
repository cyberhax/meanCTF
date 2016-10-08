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

    $scope.editQuestion = function (index) {
        console.log('index',index);
        $http.put('/api/questions/'+$scope.questions[index]._id,$scope.questions[index]).success(()=>{
            console.log('Done update');
        });
    };

    function retrieveQuestions(){
      $http.get('api/questions').then(questions => {
            // console.log($scope.user.question);
            $scope.questions = questions.data;
            console.log(questions.data);
          });
      }

    retrieveQuestions();

  }

  

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
