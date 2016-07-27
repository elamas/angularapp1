'use strict';

myApp
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/category/:categoryId', {
    templateUrl: 'category/category.html',
    controller: 'CategoryController'
  });
}])

.controller('CategoryController', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
	console.log("[CategoryController]");
	var categoryId = $routeParams.categoryId;
	console.log("[CategoryController]categoryId: " + categoryId);
	console.log("[CategoryController]$scope.model: ");
	console.log($scope.model);
	var category = $scope.model.getCategory(categoryId);
	$scope.currCategory = category;//para poder pintar la categoria en el html

	//meto estas propiedades para poder pintar los checkboxes como marcados cuando corresponde mientras navego por la app, ya que no se pude poner ng-model con funciones
	//no me gusta mucho como he resuelto el tema de mostar rellena esta parte cuando se navega por la app.
	$scope.initCheckboxValues = function() {
		$scope.ckeckboxValues = new Array();
		$scope.selectValues = new Array();
		var item;
		for(var i in category.items){
			item = category.items[i];
			var orderItem = $scope.model.order.getOrderItem(item.id);
			$scope.ckeckboxValues[item.id] = (orderItem != null);
			$scope.selectValues[item.id] = new Array();
			var quantity;
			if (orderItem != null) {
				quantity = orderItem.quantity;
			} else {
				quantity = 1;
			}
			for (var i=1; i<=3; i++) {
				$scope.selectValues[item.id][i] = (i == quantity);
			}
		}
		console.log("[CategoryController]$scope.ckeckboxValues: ");
		console.log($scope.ckeckboxValues);
		console.log("[CategoryController]$scope.selectValues: ");
		console.log($scope.selectValues);
	}
	
	//meto los items en el modelo solo si no estaba ya. De esta manera si navego por la app no se hacen llamasas ajax innecesarias
	if (category.items == null || category.items.length == 0) {
		$http({
		  method: 'GET',
		  url: 'fake-ajax/get-items-' + categoryId + '.html'
		}).then(function successCallback(response) {
			console.log("[CategoryController] successCallback");
			var item;
			for(var i in response.data){
				item = new Item();
				item.parseFromObject(response.data[i]);
				if(item != null){
					category.items.push(item);
				}
				item = null;
			}
			$scope.initCheckboxValues();
		  }, function errorCallback(response) {
			console.log("[CategoryController] errorCallback");
		  });	
	} else {
		$scope.initCheckboxValues();
	}
	
	//se le llama cuando el usuario modifica el carrito
	$scope.updateOrder = function(itemId) {
		console.log("[CategoryController - updateOrder] itemId: " + itemId);
		
		var checkbox = document.getElementById("checkbox-" + itemId);
		var select = document.getElementById("select-" + itemId);
		
		var item = category.getItem(itemId);
		if (checkbox.checked) {
			$scope.model.order.addItem(item, Number(select.value));
		} else {
			$scope.model.order.removeItem(item);
		}
		
		console.log("[CategoryController - updateOrder]$scope.model: ");
		console.log($scope.model);
	};	
}]);

