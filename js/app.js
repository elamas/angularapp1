var myApp = angular.module('angularapp1', ['ngRoute']).

	config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  $locationProvider.hashPrefix('!');

	  $routeProvider.otherwise({redirectTo: '/home'});
	}]);


myApp.controller('MyAppController', ['$scope', '$location', function($scope, $location) {
	console.log("[MyAppController]");
	$scope.model = new Model();//este objeto lo heredan el resto de controllers
	console.log("[MyAppController]$scope.model: " + $scope.model);
	console.log($scope.model);
	
	$scope.go = function ( path ) {
	  $location.path( path );
	};	
}]);

