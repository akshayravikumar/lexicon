//search view controller - add stuff here later
  angular.module('lexiconApp')
  .controller("splashController", function($scope, $location, $firebaseArray) {

  	var fb = new Firebase('https://lexicongame.firebaseio.com/');

	$scope.errorMessage = "Welcome! Join a room to get started.";

	$scope.joinRoom = function(){

		if ($scope.roomName == undefined || $scope.roomName == "") {
			$scope.errorMessage = "Please enter a valid room name!";
			return;
		}

	   	console.log("Join game at " + $scope.roomName);

	   	$location.path("/game/" + $scope.roomName);
	};

});