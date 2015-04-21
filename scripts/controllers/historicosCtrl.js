app.controller ("MainCtrl",["$scope","$http", "empresas", "historicos","dividendos", function($scope,$http,empresas,historicos,dividendos){
	//empresas.getAll();
	$scope.historicos=historicos.historicos;

	$scope.addEmpresa = function(empresa){
		empresa={
			nombre:$scope.nombre,
			simbolo:$scope.simbolo,
			precioCompra:$scope.precioCompra,
			numTitulos:$scope.numTitulos,
			fechaEntrada:$scope.fechaEntrada,
			divisa:$scope.divisa,
			precioDivisaCompra:$scope.precioDivisaCompra
		}
		empresas.postEmpresa(empresa);
		alert ("Empresa Añadida");
		this.limpiarFormulario();
	};
	
	$scope.cerrarPosicion = function(indice){

		if($scope.empresas[indice].numTitulos==$scope.empresas[indice].numTitulosVendidos){
			this.addHistoricos(indice);
			$scope.empresas.removeEmpresa($scope.empresas[indice]._id);
		}
		else {//en el caso de que se cierren solo una parte de la posición.
			numTitulosRestantes=$scope.empresas[indice].numTitulos-$scope.empresas[indice].numTitulosVendidos;
			this.addHistoricos(indice);
			$scope.empresas[indice].numTitulos=numTitulosRestantes;	
		};
		alert ("Posición cerrada");
		this.show(indice);
		

	};
	
	
	
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
	
	$scope.limpiarFormularioDividendo=function(indice){
		$scope.empresas[indice].showme=false;
		$scope.empresas[indice].dividendoAccion='';
		$scope.empresas[indice].fechaDividendo='';
		$scope.empresas[indice].precioDivisaDividendo='';
	}
	
	$scope.addDividendo=function(indice){
		
		if ($scope.empresas[indice].divisa !="EUR" && $scope.empresas[indice].divisa!="eur"){
			tipoCambio=$scope.empresas[indice].precioDivisaDividendo;
		}else{
			tipoCambio=1;
		}
		
		ingresoDividendo = (parseFloat($scope.empresas[indice].dividendoAccion)*parseFloat($scope.empresas[indice].numTitulos))/tipoCambio;
		rentabilidadDividendo=parseFloat($scope.empresas[indice].dividendoAccion)/parseFloat($scope.empresas[indice].precioCotizacion)*100;
		rentabilidadDividendo=rentabilidadDividendo.toFixed(2);

		$scope.dividendos.push({
			nombre:$scope.empresas[indice].nombre,
			dividendo:$scope.empresas[indice].dividendoAccion,
			simbolo:$scope.empresas[indice].simbolo,
			ingresoDividendo:ingresoDividendo,
			fecha:$scope.empresas[indice].fechaDividendo,
			precioDivisaDividendo:tipoCambio,
			rentabilidad:rentabilidadDividendo
		});
		
//limpiar formulario dividendo
		this.limpiarFormularioDividendo(indice);
		this.show(indice);
		alert("Dividendo Añadido");
		
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
	}

	$scope.cerrarPestanas();
	
}]);