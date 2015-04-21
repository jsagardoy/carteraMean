var app = angular.module("appCartera",['ui.router']);

app.config (['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {     
	
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '/templates/home.html',
		controller: 'empresasCtrl'		
	}).state('agregarCartera', {
		url: '/agregarCartera',
		templateUrl: '/templates/agregarCartera.html',
		controller: 'empresasCtrl'
		//resolve:{mostrarCarteraPromise: ['empresas', function(empresas){empresas.getAll();}]}
		
	}).state('mostrarCartera', {
		url: '/mostrarCartera',
		templateUrl: '/templates/mostrarCartera.html',
		controller: 'empresasCtrl',
		resolve:{mostrarCarteraPromise: ['empresas', function(empresas){empresas.getEmpresas();}]}
		
	})/*.state('cerrarCartera', {
		url: '/cerrarCartera',
		templateUrl: '/templates/cerrarPosicionCartera.html',
		controller: 'MainCtrl',
	})*/.state('historicos', {
		url: '/historicos',
		templateUrl: '/templates/mostrarHistorico.html',
		controller: 'MainCtrl'
		//resolve:{mostrarHistoricosPromise: ['historicos', function(historicos){return historicos.getAll();}]}										  
	}).state('dividendos', {
		url: '/dividendos',
		templateUrl: '/templates/addDividendo.html',
		controller: 'MainCtrl'
	});

	$urlRouterProvider.otherwise('home');
	
}]);



