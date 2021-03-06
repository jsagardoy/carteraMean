app.controller ("empresasCtrl",["$scope","$http", "empresas","historicos","dividendos", function($scope,$http,empresas, historicos,dividendos){
	$scope.empresas=empresas.empresas;
	//$scope.empresas=empresas.getEmpresas();
	$scope.historicos=historicos.historicos;
	$scope.dividendos=dividendos.dividendos;
	
	
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
	
	$scope.cerrarPosicion = function(empresa){
		emp=empresa;		
		empresas.cerrarPosicionEmpresa(emp, historicos);
		$scope.cerrarPestanas();
		$scope.show(empresa);
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
	
	$scope.show=function(empresa){
		empresa.showme=!empresa.showme;		
	};
	
	$scope.showCerrar=function(empresa){
		empresa.showmeCerrar=!empresa.showmeCerrar;		
	};
	
	$scope.cerrarPestanas=function(){
		//$scope.empresas=empresas.getEmpresas();
		for (i=0;i<$scope.empresas.length;i++){
			if($scope.empresas[i].showmeCerrar==true){
				$scope.empresas[i].showmeCerrar=false;
			}
		}
	};
	//añade dividendos a una empresa
	$scope.addDiv=function(empresa){
		dividendos.addDividendo(empresa);
	};

	
}]);