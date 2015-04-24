app.controller ("historicosCtrl",["$scope","$http", "historicos","dividendos", function($scope,$http,historicos,dividendos){

	$scope.historicos=historicos.historicos;
	$scope.dividendos=dividendos.dividendos;
	$scope.mostarContenidoHistoricos=false;
	$scope.mostarContenidoDividendos=false;
	
	
	$scope.rentabilidadTotal=function(){
		rentTotal = 0;
		inversionInicialAcumulada=0;
		benef = Number($scope.beneficioTotal());
		
		for (i = 0;i<$scope.historicos.length;i++){
			inversionInicialAcumulada = inversionInicialAcumulada+Number($scope.historicos[i].inversionInicial);
		}
		rentTotal = benef/inversionInicialAcumulada *100;
		//rentTotal=rentTotal.toFixed(2)
		if (inversionInicialAcumulada==0){
			return 0;
		}else{
			return rentTotal.toFixed(2);
		}
	};
	
	$scope.beneficioTotal =  function(){
		benef=0;
		for (i=0; i<$scope.historicos.length;i++){
			benef=benef+Number($scope.historicos[i].beneficio);
		}
		for (i=0;i<$scope.dividendos.length;i++){
			benef=benef+Number($scope.dividendos[i].ingresoDividendo);
		}
		return benef.toFixed(2);
	}
	$scope.mostrarHistorico=function(historico){
		historico.mostrar=!historico.mostrar;		
	};
	$scope.mostrarContenidoHistoricos = function(){
		$scope.mostarContenidoHistoricos=!$scope.mostarContenidoHistoricos;
	}
	$scope.mostrarContenidoDividendos = function(){
		$scope.mostarContenidoDividendos=!$scope.mostarContenidoDividendos;
	}
	
}]);