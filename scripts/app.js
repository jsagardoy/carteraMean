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
	}).state('historicos', {
		url: '/historicos',
		templateUrl: '/templates/mostrarHistorico.html',
		controller: 'historicosCtrl',
		resolve:{
					mostrarHistoricosPromise: ['historicos','dividendos', function(historicos,dividendos){
																	  		historicos.getAll();
																			dividendos.getAll();
																		}
			 		]
			 	}										  
	}).state('dividendos', {
		url: '/dividendos',
		templateUrl: '/templates/addDividendo.html',
		controller: 'empresasCtrl',
		resolve:{mostrarCarteraPromise: ['empresas', function(empresas){empresas.getEmpresas();}]}
	});

	$urlRouterProvider.otherwise('home');
	
}]);



