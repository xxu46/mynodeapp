var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', 
	['$scope','$http', 
		function($scope, $http) {
			
			var refresh = function() {
				$http.get('/contactlist').success(function(response) {
					console.log('I got the data I requested');
					$scope.contactlist = response;
					$scope.contact = "";
				});
			};

			refresh();
			

			$scope.addContact = function() {
				console.log($scope.contact);
				$http.post('/contactlist', $scope.contact).success(function(response) {
					console.log(response);
					refresh();
				});
			};

			$scope.remove = function(id) {
				console.log(id);
				$http.delete('/contactlist/' + id).success(function(response) {
						refresh();
				});
			};


			$scope.edit = function(id) {
				$http.get('/contactlist/' + id).success(function(response) {
					$scope.contact = response;
				});
			};

			$scope.update = function() {
				$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
					refresh();
				});
			};

			$scope.clear = function() {
				$scope.contact = '';
			};
		}
	]
);