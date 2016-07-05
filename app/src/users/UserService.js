(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', UserService]);


  function UserService($q,$state){
    var users = [
      {
        name: 'DashBoard',
        avatar: 'svg-1',
        content: 'Welcome to dashboard.'
      },
      {
        name: 'Complaints',
        avatar: 'svg-5',
        content: 'Complaints'
      },
      {
        name: 'Accounts',
        avatar: 'svg-6',
        content: "Accounts."
      },
      
      {
        name: 'Logout',
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
  }

})();
