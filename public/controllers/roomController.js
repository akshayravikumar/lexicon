angular.module('lexiconApp').controller('roomController', 
function($scope, $routeParams, $location, $firebaseObject, $firebaseArray){


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
	$scope.messages = $firebaseArray(ref.child('messages'));

	$scope.gameObject.$loaded(function () {
		console.log($scope.gameObject);

		if ("players" in $scope.gameObject) {
			$scope.gameExists = true;
		} 
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
			$scope.statusMessage = "";	
			var playerName = $scope.playerName;

			if ($scope.gameObject.password.length == 0 || $scope.gameObject.password == $scope.gamePassword) {
				if (!($scope.playerName in $scope.gameObject.players)) {
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
						ref.child('players').update(newPlayer, function() {
							console.log("added new player");
							$scope.creator = false;
							enterRoom();
						});	
					});
					// games.games.push({name : gameName, players: 0 , total: 10});	
				} else {
					$scope.statusMessage = "Sorry, that name is already taken!";	
				}
			}
			else {
				$scope.statusMessage = "This password is incorrect. Please try again!";
			}
		}

		if ($scope.gameObject.num_players >= $scope.gameObject.max_players) {
			$scope.waitingMessage = "Sorry, this game is full. Feel free to start a new one!";
		} else {
			$scope.waiting = false;
		}
	});

	enterRoom = function() {
		console.log("Entering room!");
		$scope.insideRoom = true;
		console.log($scope.insideRoom);
	}

	$scope.messages.$loaded(function() {
		$scope.sendMessage = function() {
			if ($scope.messageBody.length > 0) {
				$scope.messages.$add({
					type: "message",
				 	name: $scope.playerName,
			      	text: $scope.messageBody
			    });
			}
			$scope.messageBody = "";
		}
	});

});