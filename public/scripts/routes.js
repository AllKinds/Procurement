procurement.config(function($routeProvider){
	$routeProvider
		.when('/softwares/:category', {
			templateUrl: 'partials/main.html',
			controller: 'mainCtrl'
		})
		.otherwise({
			redirectTo: '/softwares/home'
		})
});