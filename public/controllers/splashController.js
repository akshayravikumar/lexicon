//search view controller - add stuff here later
  angular.module('lexiconApp')
  .controller("splashController", function($scope, $location, $firebaseObject) {

  	var fb = new Firebase('https://lexicongame.firebaseio.com/');

  	$scope.games = $firebaseObject(fb);

	$scope.errorMessage = "Welcome! Join a room to get started.";

	$scope.joinRoom = function(){

		if ($scope.roomName == undefined || $scope.roomName == "" || !(/^[a-z0-9]+$/i.test($scope.roomName)) || $scope.roomName.length > 15) {
			$scope.errorMessage = "This is an invalid room name!  Please choose an alphanumeric name with at most 15 characters.";
			return;
		}

	   	console.log("Join game at " + $scope.roomName);

	   	$location.path("/game/" + $scope.roomName);
	};

});