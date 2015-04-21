app.controller ("historicosCtrl",["$scope","$http", "historicos","dividendos", function($scope,$http,historicos,dividendos){

	$scope.historicos=historicos.historicos;
	$scope.dividendos=dividendos.dividendos;
	
	$scope.rentabilidadTotal=function(){
		rentTotal = 0;
		inversionInicialAcumulada=0;
		benef = $scope.beneficioTotal();
		
		for (i = 0;i<$scope.historicos.length;i++){
			inversionInicialAcumulada = inversionInicialAcumulada+$scope.historicos[i].inversionInicial;
		}
		rentTotal = benef/inversionInicialAcumulada *100;
		//rentTotal=rentTotal.toFixed(2)
		if (inversionInicialAcumulada==0){
			return 0;
		}else{
			return rentTotal.toFixed(2);;
		}
	};
	
	$scope.beneficioTotal =  function(){
		benef=0;
		for (i=0; i<$scope.historicos.length;i++){
			benef=benef+$scope.historicos[i].beneficio;
		}
		for (i=0;i<dividendos.length;i++){
			benef=benef+$scope.dividendos[i].ingresoDividendo;
		}
		return benef;
	}
	
	
}]);