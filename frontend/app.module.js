;(function() {
	angular
		.module('app', ['ui.codemirror', 'ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate'])
		.config(config)

	config.$inject = ['$stateProvider', '$urlRouterProvider']

	function config($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/state1");
        // Now set up the states
        $stateProvider
            .state('state1', {
                url: "/state1",
                templateUrl: "app/state1.html",
                controller: "state1Ctrl as vm"
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "app/state2.html",
                controller: 'state2Ctrl as vm'
            })
        }
})()