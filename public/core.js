var procurement = angular.module('procurement', ['ngRoute', 'ngMaterial'])



procurement.config(function($mdThemingProvider) {
	    $mdThemingProvider.theme('default')
	        .primaryPalette('deep-purple')
	        // If you specify less than all of the keys, it will inherit from the
	        // default shades
	        .accentPalette('light-green', {
	          'default': '200' // use shade 200 for default, and keep all other shades the same
	        })
					.warnPalette('purple')
					;
	});