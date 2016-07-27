'use strict';

myApp
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope', '$http', function($scope, $http) {
	console.log("[HomeController]");
	console.log("[HomeController]$scope.model: ");
	console.log($scope.model);
	//meto las categorias en el modelo solo si no estaba ya. De esta manera si navego por la app no se hacen llamasas ajax innecesarias
	if ($scope.model.categories == null || $scope.model.categories.length == 0) {
		$http({
		  method: 'GET',
		  url: 'fake-ajax/get-categories.html'
		}).then(function successCallback(response) {
			console.log("[HomeController] successCallback");
			var category;
			for(var i in response.data){
				category = new Category();
				category.parseFromObject(response.data[i]);
				if(category != null){
					$scope.model.categories.push(category);
				}
				category = null;
			}
			
		  }, function errorCallback(response) {
			console.log("[HomeController] errorCallback");
		  });	
	}
}]);



