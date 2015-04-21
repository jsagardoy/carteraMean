app.controller ("empresasCtrl",["$scope","$http", "empresas","historicos",function($scope,$http,empresas, historicos){
	//$scope.empresas=empresas.empresas;
	$scope.empresas=empresas.getEmpresas();
	$scope.historicos=historicos.historicos;
	
	
	$scope.addEmpresa=function(){

		empresa = empresas.newEmpresa($scope.nombre,$scope.simbolo, $scope.precioCompra,$scope.numTitulos,$scope.fechaEntrada,$scope.divisa,$scope.precioDivisaCompra);
		empresas.addEmpresa(empresa);
		$scope.limpiarFormulario();
	}

	$scope.limpiarFormulario = function(){
		//limpiamos el formulario despues de escribir
		$scope.nombre='';
		$scope.simbolo='';
		$scope.precioCompra='';
		$scope.numTitulos='';
		$scope.fechaEntrada='';
		$scope.divisa='';
		$scope.precioDivisaCompra='';
	};
	
	$scope.cerrarPosicion = function(indice){
		emp=$scope.empresas[indice];		
		empresas.cerrarPosicionEmpresa(emp, historicos);			
			//$scope.show(indice);
	};
	
	$scope.beneficioTotal=function(){
		benefTotal = 0;
		for (i = 0;i<$scope.historicos.length;i++){
			benefTotal = benefTotal+parseFloat($scope.historicos[i].beneficio);
		}
		for (i = 0;i<$scope.dividendos.length;i++){
			benefTotal = benefTotal+parseFloat($scope.dividendos[i].ingresoDividendo);
		}
		//benefTotal=benefTotal.toFixed(2);
		return benefTotal;
	};
	
	$scope.show=function(indice){
		$scope.empresas[indice].showme=!$scope.empresas[indice].showme;
			
	};
	
	$scope.cerrarPestanas=function(){
		for (i=0;i<$scope.empresas.length;i++){
			if($scope.empresas[i].showme==true){
				$scope.empresas[i].showme=false;
			}
		}
	};


	
	$scope.cerrarPestanas();
	
}]);