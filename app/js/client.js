const angular = require('angular');
require('angular-route');
const usersApp = angular.module('usersApp', ['ngRoute']);

require('./services')(usersApp);

require('./users')(usersApp);
require('./auth')(usersApp);

usersApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'UsersController',
      templateUrl: '/views/users_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
