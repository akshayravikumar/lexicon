var app = angular.module('flapperNews', []);

app.controller('MainCtrl', ['$scope', '$location',
	function($scope, $location){
  		$scope.test = 'Hello world!!';

  		$scope.goToRoom = function() {
  			var name = $scope.roomName;
  			if (name != undefined) {
				$location.path("game/" + name);
			}
  		}
}
]);