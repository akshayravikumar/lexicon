//search view controller - add stuff here later
angular.module('lexiconApp').controller("splashController", function($scope,DataService, $location) {

	$scope.errorMessage = "hi";

	$scope.joinRoom = function(){

		if ($scope.roomName == undefined || $scope.roomName == "") {
			$scope.errorMessage = "Please enter a valid room name!";
			return;
		}

	   	console.log("Join game at " + $scope.roomName);

	   	$location.path("/game/" + $scope.roomName);
	};

});