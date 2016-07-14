'use strict';

var app  = angular.module('starterApp', ['ui.router','ngMaterial','chart.js','ngTable']);


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




             
app.config(function ( $stateProvider , $urlRouterProvider , $mdThemingProvider, $mdIconProvider , $provide ,JS_REQUIRES ){

        //app.constant = $provide.constant;

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
            templateUrl : 'dashboard.html',
            controller :  'LineCtrl'
            //resolve: {'LineCtrl'}
          })
         .state('app.complaints',{
            url : '/complaints',
            templateUrl : 'complaints.html',
            controller : 'ComplaintsCtrl'
         })
         .state('app.foodmenu',{
            url : '/foodmenu',
            templateUrl : 'foodmenu.html',
            controller : 'FoodMenuCtrl'
         })
         .state('app.poll',{
            url : '/poll',
            templateUrl : 'poll.html',
            controller : 'pollCtrl'
         })
         .state('app.events',{
            url : '/events',
            templateUrl : 'events.html',
            controller : 'EventsCtrl'
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
            templateUrl : 'timetable.html',
            controller   : 'timetableCtrl'

         })
         .state('app.homework',{
            url: '/homework',
            templateUrl : 'homework.html',
            controller : 'homeworkCtrl'
            
         })
          .state('app.suggestions',{
            url : '/suggestions',
            templateUrl : 'suggestions.html',
            controller : 'FoodMenuCtrl'
         });


        $urlRouterProvider.otherwise('/dashboard');
  
});





/* factory */


/*
    var OtherComplaints = [];
    var TeacherComplaints = [];


    var getTeacherComplaint = function(id){

      var deferred = $q.defer();

      $http({
          method :  "GET",
          contentType : "aplication/json",
          url: 
      })
    }
*/



/* HOMEWORK FACTORY */


app.factory('homeworkService', function ($http, $q) {

    var getHomework = function (id) {

      var deferred = $q.defer();

      $http({
        method: "GET",
        contentType: "application/json",
        url: 'http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/parent/homework/' + id
      }).success(function (response) {
       var TeacherComplaints = response;
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
    
    return {
      getHomework: getHomework
    }

  })




/* end homework factory  */





app.factory('managementComplaintService', function ( $http, $q ) {

    var getDirectorTeacherComplaints = function (id) {

      var deferred = $q.defer();

      $http({
          method: "GET",
          contentType: "application/json",
          url: "http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/director/teacher-complaint"
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





app.controller('homeworkCtrl', function ($scope,$http,$state,homeworkService){

  homeworkService.getHomework().then(function (response) {
            $scope.homework = response;

            console.log('homework',$scope.homework);
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
            console.log('timetable',$scope.events);
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

app.controller('pollCtrl', function ($scope, $http, $state) {
    console.log('LoginCtrl');
       

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
      {type: 'text',value: '' },
      {type: 'text',value: '' },


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


    $scope.submitForm = function(ngModel) {
      console.log('gdgfdg');
      $scope.pollQuestion.push(
          {
              question2 : ngModel.question2,
              option1 : ngModel.radio123,
              option2 : ngModel.input123

          }
);
          console.log( 'pollQuestion' , $scope.pollQuestion );

        
    };


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





    
app.controller('ComplaintsCtrl',function ($scope, $stateParams, $http, $state, $filter, JS_REQUIRES, managementComplaintService){


      $scope.complaints = "List of Complaints";
    $http.get("http://nxtlifetechnologies.ind-cloud.everdata.com/srgsrk-test/director/teacher-complaint")
        .then(function (response) {
            
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
        });
});





app.controller("LineCtrl", function ($scope,thoughtService) {



  thoughtService.getTodayThought().then(function(response){

      $scope.todayThought = response ; 
      console.log(response);
  });



  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
});         

