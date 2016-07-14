angular.module('starterApp.controllers',[])
    .controller('ds', function ($scope, $http,$state) {
        // $scope.submitForm = function (Mymodel) {
        //     var request = $http({
        //         method: "POST",
        //         url: "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/management-login",
        //         header: {'Content-Type': 'application/json;'},
        //         data: {
        //             "name": Mymodel.username ,
        //             "password" : Mymodel.password ,
        //             "token"  :  null
        //         }
        //     }).then(function (reponse) {
        //         var result = reponse;
        //         console.log(result);
        //         console.log('fdsdfs');
        //         $state.go('dashboard');
        //       //  console.log('data', reponse.config.data);
        //     }, function (error) {
        //         var result = error.data;
        //         console.log('vinay singh fs');
        //     });
        console.log('LoginCtrl');
    });


