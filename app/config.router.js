'use strict';

var app  = angular.module('starterApp', ['ui.router','ngMaterial','chart.js','restangular','ngTable']);


/* constants */

app.constant('JS_REQUIRES', {
    
    scripts: {

      'DashBoardCtrl': 'app.js'
  },

  modules :[{

        name: 'ngTable',
        files: ['node_moduless/ng-table/dist/ng-table.min.js', 'node_modules/ng-table/dist/ng-table.min.css']
      
  }]

});


/*   end constants */             
app.config(function ( $stateProvider , $urlRouterProvider , $mdThemingProvider, $mdIconProvider ,RestangularProvider ,$provide ,JS_REQUIRES ){

        //app.constant = $provide.constant;
        RestangularProvider.setBaseUrl('http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/');


        $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu"       , "./assets/svg/menu.svg"        , 24)
                .icon("share"      , "./assets/svg/share.svg"       , 24)
                .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
                .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
                .icon("phone"      , "./assets/svg/phone.svg"       , 512);

        $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('cyan');


        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
          })
          .state('registration',{
            url : '/registration',
            templateUrl : 'registration.html',
            controller : 'RegistrationCtrl' 
          })
          .state('app',{

            abstract: true,
            templateUrl : 'app.html'
            
          })
         .state('app.dashboard',{
            url : '/dashboard',
            views:{
              'mdcontent': {
                templateUrl : 'dashboard.html',
                controller : 'BarCtrl'
              }
            }

            //resolve: {'LineCtrl'}
          })
         .state('app.complaints',{
            url : '/complaints',
            views:{
              'mdcontent':{
              templateUrl : 'complaints.html',
              controller : 'ComplaintsCtrl'
            }
           }
         })
         .state('app.foodmenu',{
            url : '/foodmenu',
            views:{
              'mdcontent':{
                templateUrl : 'foodmenu.html',
                controller : 'FoodMenuCtrl'
              }
            }
         })
         .state('app.poll',{
            url : '/poll',
            cache:false,
            views:{
              'mdcontent':{
                templateUrl : 'poll.html',
                controller : 'pollCtrl'
              }
            }
          }) 
         .state('app.events',{
            url : '/events',
            cache:false,
            views: {
              'mdcontent':{
                templateUrl :'events.html',
                controller : 'EventsCtrl'
              }
            }

         })
         .state('app.events.new',{
            url : '/new',
            cache: false,
            views: {
                    'mdcontent': {
                        templateUrl: 'newevent.html',
                        controller: 'NewEventsCtrl'
                    }
            }
         
         })
         .state('app.timetable',{
            url: '/timetable',
            views : {
              'mdcontent':{
                templateUrl : 'timetable.html',
                controller : 'timetableCtrl'
              }
            }
         })
         .state('app.homework',{
            url: '/homework',
            views : {
              'mdcontent':{

                 templateUrl : 'homework.html',
                 controller : 'homeworkCtrl'
              }
            }
           
            
         })

         .state('app.arbit',{
            url:'/arbit',
            views :{
              'mdcontent' : {
                templateUrl : 'arbit.html',
                controller : 'arbitCtrl'
              }
            }
         })

          .state('app.suggestions',{
            url : '/suggestions',
            views:{
              'mdcontent':{
                templateUrl : 'suggestions.html',
                controller :  'FoodMenuCtrl'
              }
            }

         });


        $urlRouterProvider.otherwise('/dashboard');
  
});










app.controller('sampleController', ['$nutrition', '$scope', function ($nutrition, $scope) {
  'use strict';

  $scope.selected = [];

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  function success(desserts) {
    $scope.desserts = desserts;
  }

  $scope.getDesserts = function () {
    $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
  };

}]);




app.controller('arbitCtrl',function($scope,Restangular){

  Restangular.all('fetch-standard').getList()
  .then(function(response){
    //returns a list of users
    $scope.standard = response[0];

    console.log('standards',$scope.standard);
  
})

});






/* HOMEWORK FACTORY */


app.factory('homeworkService', function ($http, $q) {

    var getHomework = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: 'http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/management/homework/13'
      }).success(function (response) {
       var TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }


    var getStandard = function(id){
          var deferred = $q.defer();

          $http({
            method : "GET",
            contentType : "application/json",
            url : 'http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/fetch-standard'
          }).success(function(response){
            var getStandard = response ;
            deferred.resolve(response);
          }).error(function(response){
            deferred.reject(response);
          });

          return deferred.promise;
    }
    
    return {
      getHomework: getHomework ,
      getStandard : getStandard
    }

  })




/* end homework factory  */





app.factory('managementComplaintService', function ( $http, $q ) {

    var getDirectorTeacherComplaints = function (id) {

      var deferred = $q.defer();

      $http({
          method: "GET",
          contentType: "application/json",
          url: "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/teacher-complaint/13"
      }).success(function (response) {
          deferred.resolve(response);
      }).error(function (response) {
          deferred.reject(response);
      });

      return deferred.promise;
    }


    return {
      getDirectorTeacherComplaints: getDirectorTeacherComplaints
    }

  });


/* end of managementComplaintService */




/* parents complaints */


app.factory('parentsComplaintService',function($http , $q){

  var NewComplaints = function(model){

      var deferred = $q.defer();

      $http({
            method : "POST",
            contentType : "application/json",
            data: {
                    title : model.title,
                    parentId : 1,
                    childId : 2,
                    StandardID : 11,
                    categoryId : 1,
                    SubCategoryId: 3,
                    anonymous : 0,
                    comment : model.description
            },
            url : "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/save-complaint"
          }).success(function(response){
            deferred.resolve(response);
          }).error(function(response){
              deferred.reject(response);
          });

          return deferred.promise;

      }

      return {

            NewComplaints : NewComplaints 
      }

  
});





/* end of parents */ 














/*   end of factory */

app.factory('foodmenuService', function ($http, $q) {

    var getFoodmenu = function () {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/food-menu"
      }).success(function (response) {
        var foodMenu = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    return {
      getFoodmenu: getFoodmenu
    }

  })


/* fhjh ghfgjhd */
app.factory('timetableService', function ($http, $q) {

    var getTimetable = function (id) {

      var deferred = $q.defer();

      $http({
        method: 'GET',
        contentType: 'application/json',
        url:  'http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/time-table/' + id
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;

    }

    return {
      getTimetable: getTimetable
    }

})




  app.factory('EventsService',function($http,$q){


    var getEvents = function(standardIDs) {

        var deferred = $q.defer();


        $http({
          method : "GET",
          contentType : "aplication/json",
          url : 'http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test' + '/planner/1'
          }).success(function(response){
            deferred.resolve(response);

          }).error(function(response){
            deferred.reject(response);
          }) ;

          return deferred.promise;

        }


    return {
      getEvents : getEvents
    }


  })




  app.factory('thoughtService', function ($http, $q ) {

    var getTodayThought = function (date) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/fetch-thought-of-day/2016-07-09"
      }).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    return {
      getTodayThought: getTodayThought
    }

  })


app.factory('PollService',function($http,$q){

    var getPoll = function(){

      var deferred = $q.defer();
      $http({
        method : "GET",
        contentType : 'application/json',
        url : "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/fetch-poll-for-parent/2"

      }).success(function(response){

          deferred.resolve(response);

      }).error(function(response){
        deferred.reject(response);
      });
          return deferred.promise;
    }






    var AddPoll = function(user){

      var deferred = $q.defer();

      $http({
          method : "POST",
          contentType : "application/json",
          url : "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/add-poll",
          data: {
                        "teacherId": 13,
                        "question": user.question,
                        "dueDate": "2016-07-07",
                        "optionId": 3, 
                        "pollTypeId": 1,
                        "optionTypeId": 1,
                        "options": [user.option1 , user.option2 , user.option3] ,
                        "standardIds": [2]

                  }
              }).success(function (response) {
                  deferred.resolve(response);  
              }).error(function (response) {
                  deferred.reject(response);
              });

                return deferred.promise
          } 



    return {
              getPoll : getPoll,
              AddPoll : AddPoll
    }
})






app.service('userService', ['$q', function($q,$state){

    var users = [
      {
        name: 'DashBoard',
        child: 'dash-child',
        avatar: 'svg-5',
        content: 'Welcome to dashboard.'
      },
      {
        name: 'Complaints',
        child: 'dash-child',
        avatar: 'svg-5',
        content: 'Complaints'
      },
      {
        name: 'Accounts',
        child: 'dash-child',
        avatar: 'svg-6',
        content: "Accounts."
      },
      
      {
        name: 'Logout',
        child: 'dash-child',
        avatar: 'svg-7',
        content: "Thank You for using our application."
      }
    ];

    // Promise-based API
    return {

      loadAllUsers : function() {
        return $q.when(users);
      }
    };

}]);








app.controller('UserController', function(userService, $mdSidenav, $mdBottomSheet,$mdDialog, $timeout, $log){

        var self = this;

        self.selected     = null;
        self.users        = [ ];
        self.selectUser   = selectUser;
        self.toggleList   = toggleUsersList;
        self.makeContact  = makeContact;

        
        userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });



        function toggleUsersList() {
              $mdSidenav('left').toggle();
        }



        function selectUser ( user ) {
            self.selected = angular.isNumber(user) ? $scope.users[user] : user;
        }


        function makeContact(selectedUser) {

              $mdBottomSheet.show({
                controllerAs  : "vm",
                templateUrl   : './src/users/view/contactSheet.html',
                controller    : [ '$mdBottomSheet', ContactSheetController],
                parent        : angular.element(document.getElementById('content'))
              }).then(function(clickedItem) {
                $log.debug( clickedItem.name + ' clicked!');
              });

              
         function ContactSheetController( $mdBottomSheet ) {
                      this.user = selectedUser;
                      this.items = [
                        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
                        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
                        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
                        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
                      ];
                      this.contactUser = function(action) {
                    
                    $mdBottomSheet.hide(action);
                      };
               }

        }
});





app.controller('homeworkCtrl', function ($scope,$http,$state,homeworkService,$filter){

    //filter()

  homeworkService.getHomework().then(function (response) {
            $scope.homework = response;

            console.log('homework',$scope.homework);
    });


  homeworkService.getStandard().then(function(response){

      $scope.getStandards =response ; 
      console.log('getStandards',response);
   });

});


app.controller('timetableCtrl', function ($scope,$http,$state,timetableService){

  timetableService.getTimetable(4).then(function (response) {
            $scope.timetable = response;

            console.log('timetable',$scope.timetable);
    });

});





app.controller('EventsCtrl', function ($scope,$http,$state,EventsService,$rootScope){

  var scope = $rootScope;

  EventsService.getEvents().then(function (response) {
           $scope.events = response;
            scope.$watch('events', function(newValue, oldValue) {
                  scope.counter = scope.counter + 1;
            });
            console.log('events',$scope.events);
    });



      


  $scope.myDate = new Date();



  $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());

  $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
  

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  }
  

  $scope.getDate  = function(){
    console.log('date',myDate);
    return Mymodel.myDate ;
  }

  console.log($scope.myDate);
  
  

});



app.controller('NewEventsCtrl', function ($scope,$http,$state,EventsService){

  EventsService.getEvents().then(function (response) {
            $scope.newevents = response;

            console.log('new',$scope.newevents);
    });

});





app.controller('RegistrationCtrl', function ($scope,$http,$state){

    console.log('RegistrationCtrl');
          $scope.SubmitLogin = function(){
          $state.go('registration');
    };


    $scope.register = "Vinay Singh's " ;

});






app.controller('LoginCtrl', function ($scope, $http, $state) {
    console.log('LoginCtrl');
    $scope.SubmitLogin = function(){

      $state.go('login');

    };
    
});

app.controller('pollCtrl', function ($scope, $http, $state ,$mdSidenav,PollService) {
    console.log('LoginCtrl');
       

    PollService.getPoll().then(function (response) {
            $scope.polls = response;
            $scope.options = response.options;

            console.log('polls',$scope.polls);
            console.log('options',$scope.options);
    });



  $scope.submitForm = function(user) {
      PollService.AddPoll(user).then(function(response){
        console.log('added polls',response);
      });
  };



  $scope.data = {
      group1 : 'Banana',
      group2 : '2',
      group3 : 'avatar-1'
    };
    $scope.avatarData = [{
        id: "svg-1",
        title: 'avatar 1',
        value: 'avatar-1'
      },{
        id: "svg-2",
        title: 'avatar 2',
        value: 'avatar-2'
      },{
        id: "svg-3",
        title: 'avatar 3',
        value: 'avatar-3'
    }];



    $scope.radioData = [

      {
        type: 'text', 
        value : 'user.option1' 
      },

      {
        type: 'text' ,
        value : 'user.option2' 

      }
    ];


    $scope.pollQuestion = [
        //console.log( 'poll-pollQuestion' , $scope.pollQuestion );
          {
            'question' : 'messi or ronaldo' ,
            'option1'  : 'messi',
            'option2'  : 'ronaldo'

          },

          {
            'question' : 'Is sachin a god ???' ,
            'option1'  : 'yes',
            'option2'  : 'no'
          }
    ];




    $scope.addItem = function() {
    if($scope.radioData.length < 4){
        var r = 4;
        $scope.radioData.push({ type: 'text' , value: 2 });
      }
    };



    $scope.removeItem = function() {
      $scope.radioData.pop();
    };    
});







//app.controller()

app.controller('SuggestionsCtrl', function ($scope,$http,$state){

    console.log('dashboardCtrl');

    $scope.dashboard = "Vinay Singh's " ;

});





app.controller('FoodMenuCtrl', function ($scope,$http,$state,foodmenuService){

    console.log('dashboardCtrl');

    foodmenuService.getFoodmenu().then(function (response) {
            $scope.foodmenu = response;

            //console.log(foodmenu);
    });
    $scope.dashboard = "Vinay Singh's " ;

});





app.controller('DashBoardCtrl', function ($scope,$http,$state){

    console.log('dashboardCtrl');

    $scope.dashboard = "Vinay Singh's " ;

});







    
app.controller('ComplaintsCtrl',function ($scope, $stateParams, $http, $state, $filter, JS_REQUIRES, managementComplaintService , parentsComplaintService){


    
   managementComplaintService.getDirectorTeacherComplaints().then(function (response) {

                var date=[];
                for(var i=0;i<response.length ; i++){
                date.push($filter('date')(response[i].createdAt,'yyyy-MM-dd'));
                
                }

                
                for(var j=0;j<date.length;j++){

                  response[j].createdAt=date[j]; 

                }


                console.log('date',date);
                $scope.complaints_list = response;


                console.log('response' , $scope.complaints_list);
            });





   $scope.SubmitComplain = function(model){


      parentsComplaintService.NewComplaints(model).then(function(response){

          $scope.Newcomplaints = response ;
          console.log('newcomplain',response);

      })

   }

});



app.factory('ChartService', function ($http, $q) {

    var getGraph = function (id) {

      var deferred = $q.defer();


        $http({
        method: 'GET',
        contentType: 'application/json',
        url:  'http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/director/graph'}).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });


      return deferred.promise;

    }

        return {
              getGraph : getGraph
    }
});




app.controller("LineCtrl", function ($scope,ChartService) {

    ChartService.getGraph().then(function (response) {

      console.log('response',response);

      $scope.labels = [];
      $scope.data = [];

      angular.forEach(response.ComplaintByStatus.Complaint, function(val, index) {
        $scope.labels.push(val.statusName);
        $scope.data.push(val.count);
      });
      console.log($scope.labels, $scope.data);


      });

  
  });




app.controller("BarCtrl",function( $scope ,ChartService ){

  ChartService.getGraph().then(function(response){

      $scope.labels = [];
      $scope.series = ["A","B"];
      $scope.data = [];

     //categoryName ,complaintCount
     angular.forEach(response.ComplaintByCategory,function(val,index){

      $scope.labels.push(val.categoryName);
      $scope.data.push(val.complaintCount);
     });

  });


});    
        



