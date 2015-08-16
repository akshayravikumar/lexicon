angular.module('lexiconApp', ['ngRoute', "firebase"]) // ,'n3-pie-chart'
//routing definitions
.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
	    $routeProvider
		.when('/', {
	        templateUrl: '/views/splash.html',
	        controller: 'splashController'
	    })
	    .when('/game/:name', {
	    	templateUrl: '/views/room.html',
	    	controller: 'roomController'
	    })
	    .otherwise({
	        redirectTo: '/'
	    });
    //remove # from URL
    $locationProvider.html5Mode(true);
}])

.run(function($route, $rootScope, $location, $routeParams) {
    //watch for route changes and redirect accordingly
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    	//set current variable to template (used in showing/hiding elements)
    	$rootScope.current = next.templateUrl;
    	//check to see if user is authenticated
	});
})



// //nav-bar.html
// .directive("navBar", function() {
// 	return {
// 		restrict: 'E',
// 		templateUrl: '/views/nav-bar.html',
// 		controller: 'navBarController'
// 	};
// });
