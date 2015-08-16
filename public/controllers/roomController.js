angular.module('lexiconApp').controller('roomController', 
function($scope, $routeParams, $location, $firebaseObject){


	$scope.insideRoom = false;
	$scope.creator = false;
	$scope.publicGame = false;
	var id = -1;

	$scope.gameExists = false;

	$scope.waitingMessage = "Looking for the game...";
	$scope.waiting = true;


	$scope.gameName = $routeParams.name;

	// var game = games.postData("/find", {roomname: $scope.gameName});
	// console.log(game);

	var ref = new Firebase("https://lexicongame.firebaseio.com/" + $routeParams.name);

	$scope.gameObject = $firebaseObject(ref);


	$scope.gameObject.$loaded(function () {
		console.log($scope.gameObject);

		if ("players" in $scope.gameObject) {$scope.gameExists = true;} 
		else {$scope.gameExists = false;}

		$scope.createNewGame = function() {

			var pass = $scope.gamePassword;
			var playerName = $scope.playerName;

			if ($scope.gamePassword == undefined) {
				pass = "";
			}

			var letters = "AAAAAAAAAAAAABBBCCCDDDDDDEEEEEEEEEEEEEEEEEEFFFGGGGHHHIIIIIIIIIIIIJJKKLLLLLMMMNNNNNNNNOOOOOOOOOOOPPPQQRRRRRRRRRSSSSSSTTTTTTTTTUUUUUUVVVWWWXXYYYZZ"
    
			var gameData = {
				max_players: $scope.maxPlayers,
				num_players: 1, 
				public: $scope.publicGame, 
				started: false,
				last_move: Firebase.ServerValue.TIMESTAMP,
				creation_time: Firebase.ServerValue.TIMESTAMP,
				password : pass, 
				room_name : $routeParams.name, 
				number_turns: 0,
				remainingLetters : letters.split(""),
				usedLetters: [],
				players: {},
				messages: []
			};

			gameData.players[playerName] = {
						creator: true,
						points: 0,
						words: []
					};

			console.log(gameData);
			
			ref.set(gameData, function() {
				$scope.creator = true;
				enterRoom();
			});

		}

		$scope.joinExistingGame = function() {
			var playerName = $scope.playerName;

			if ($scope.gameObject.password.length == 0 || $scope.gameObject.password == $scope.gamePassword) {
				
				var updatedData = {
					num_players: $scope.gameObject.num_players + 1, 
					last_move: Firebase.ServerValue.TIMESTAMP,
				};

				var newPlayer = new Object();

				newPlayer[playerName] = {
							creator: false,
							points: 0,
							words: []
						};

				ref.update(updatedData, function() {
					console.log("updated game");
					ref.child('players').set(newPlayer, function() {
						console.log("added new player");
						$scope.creator = false;
						enterRoom();
					});	
				});
				// games.games.push({name : gameName, players: 0 , total: 10});	
			} else {
				$scope.statusMessage = "This password is incorrect. Please try again!"
			}
		}

		$scope.waiting = false;
	});

	enterRoom = function() {
		console.log("Entering room!");
		$scope.insideRoom = true;
		console.log($scope.insideRoom);
	}

});