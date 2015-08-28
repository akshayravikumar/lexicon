angular.module('lexiconApp', ["ngRoute", "firebase", "ngAnimate",  'ngFitText' , 'luegg.directives', 'cfp.hotkeys']) // ,'n3-pie-chart'
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
	    .when('/about', {
	    	templateUrl: '/views/about.html',
	    })
	    .otherwise({
	        redirectTo: '/'
	    });
    //remove # from URL
    $locationProvider.html5Mode(true);
}])

.directive('scroll', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection(attr.scroll, function(newVal) {
        $timeout(function() {
         element[0].scrollTop = element[0].scrollHeight;
        });
      });
    }
  }
});



// //nav-bar.html
// .directive("navBar", function() {
// 	return {
// 		restrict: 'E',
// 		templateUrl: '/views/nav-bar.html',
// 		controller: 'navBarController'
// 	};
// });
