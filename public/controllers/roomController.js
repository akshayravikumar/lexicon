
angular.module('lexiconApp').controller('roomController', 
function($scope, DataService, $routeParams, $location){

	$scope.gameName = $routeParams.name;

	// var game = games.postData("/find", {roomname: $scope.gameName});
	// console.log(game);

	$scope.insideRoom = false;
	$scope.creator = false;
	$scope.publicGame = false;
	var id = -1;

	$scope.gameExists = false;

	$scope.waitingMessage = "Looking for the game...";
	$scope.waiting = true;

	DataService.getGame($scope.gameName)
	.then (function (data) {

		console.log("found something???");
		console.log(data);
		console.log("found something???");

		if (data.found) {$scope.gameExists = true;}
		else {$scope.gameExists = false;}

		$scope.createNewGame = function() {

			console.log("lets do this!");

			var pass = $scope.gamePassword;

			if ($scope.gamePassword == undefined) {
				pass = "";
			}

			var data = {max_players: $scope.maxPlayers, public: $scope.publicGame, password : pass, roomname : $routeParams.name, player_name: $scope.playerName};
			
			console.log(data);

			if(DataService.postData('/db/new', data)) {
				$scope.creator = true;
				enterRoom();
			}
		}


		$scope.joinExistingGame = function() {
			if (data.gameObject.password.length == 0 || data.gameObject.password == $scope.gamePassword) {
				var dataJoin = {roomName : $scope.gameName, playerName: $scope.playerName};

				if(DataService.postData('/db/join', dataJoin)) {
					enterRoom();
				}
				// games.games.push({name : gameName, players: 0 , total: 10});	
			} else {
				$scope.statusMessage = "This password is incorrect. Please try again!"
			}
		}

		$scope.waiting = false;

	});
	// for (var i = 0; i < games.games.length; i++) {
	// 	if (games.games[i].name == $scope.gameName) {
	// 		$scope.gameExists = true;
	// 		id = i;
	// 	}
	// }
 


	enterRoom = function() {
		$scope.insideRoom = true;
	}

});