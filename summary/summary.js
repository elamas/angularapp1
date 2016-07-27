'use strict';

myApp
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/summary', {
    templateUrl: 'summary/summary.html',
    controller: 'SummaryController'
  });
}])

.controller('SummaryController', ['$scope', function($scope) {
	console.log("[SummaryController]");
	console.log("[SummaryController]$scope.model: ");
	console.log($scope.model);
}]);