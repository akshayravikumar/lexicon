var app = angular.module('flapperNews', ['ui.router']);


app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

    .state('game', {
	  url: '/game/{name}',
	  templateUrl: '/game.html',
	  controller: 'GameCtrl'
	});

  $urlRouterProvider.otherwise('home');
  
  $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

}]);


app.factory('games', [function(){
  var o = {
    games: [
		  {name: 'game1', players: 2, total: 5},
		  {name: 'post 1', players: 2, total: 5},
		  {name: 'post 1', players: 2, total: 5},
		  {name: 'post 1', players: 2, total: 5},
		  {name: 'post 1', players: 2, total: 5},
		  {name: 'post 1', players: 2, total: 5}  
		]
  };
  return o;
}]);


app.controller('MainCtrl', [
'$scope', 'games', '$location',
function($scope, games, $location){

	$scope.games = games.games;

  	$scope.test = 'Hello world!';

	$scope.joinRoom = function(){
		if ($scope.roomName == undefined || $scope.roomName == "") {return;}

	   	console.log("Join game at " + $scope.roomName);

	   	$location.path("/game/" + $scope.roomName);
	};

}]);


app.controller('GameCtrl', [
'$scope', 'games','$stateParams',
function($scope, games, $stateParams, $location){

	$scope.gameName = $stateParams.name;

	var id = -1;

	$scope.gameExists = false;

	for (var i = 0; i < games.games.length; i++) {
		if (games.games[i].name == $scope.gameName) {
			$scope.gameExists = true;
			id = i;
		}
	}

	$scope.joinExistingGame = function() {
		console.log("joining game " + $scope.gameName);
		games.games[id].players++;
	}

	$scope.createNewGame = function() {
		games.games.push({name : gameName, players: 0 , total: 10});
	}

}]);