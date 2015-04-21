app.factory("historicos",["$http", function($http){
	var objetoHistorico= {
    	historicos: []
  	}
	
	objetoHistorico.addHistoricos = function(empresa){
		
		if (empresa.divisa !="EUR" && empresa.divisa!="eur"){	
				precioDivisaCompra= empresa.precioDivisaCompra;
				precioDivisaVenta= empresa.precioDivisaVenta;
			} else{
				precioDivisaCompra= 1;
				precioDivisaVenta= 1;
			}
		
		beneficio = (empresa.precioVenta - empresa.precioCompra)*empresa.numTitulosVendidos/precioDivisaVenta;
		inversionInicial = (empresa.precioCompra*empresa.numTitulos)/empresa.precioDivisaCompra;
		inversionInicial = inversionInicial.toFixed(2);
		rentabilidad = beneficio/inversionInicial*100;
		beneficio = beneficio.toFixed(2);
		rentabilidad=rentabilidad.toFixed(2);
		
		historico={
			nombre: empresa.nombre,
			simbolo: empresa.simbolo,
			
			precioCompra: empresa.precioCompra,
			precioVenta:  empresa.precioVenta, 			
			
			fechaEntrada: empresa.fechaEntrada,
			fechaSalida:  empresa.fechaSalida,
			
			divisa: empresa.divisa,
			
			precioDivisaCompra:precioDivisaCompra,
			precioDivisaVenta:precioDivisaVenta,
			
			numTitulos: empresa.numTitulos,
			numTitulosVendidos:  empresa.numTitulosVendidos,
			
			inversionInicial: inversionInicial,
			beneficio: beneficio,
			rentabilidad:rentabilidad
		};
		objetoHistorico.postHistorico(historico);
	
	};
	
	//MANEJO BBDD
	objetoHistorico.getAll = function(){
            	objetoHistorico.getHistoricos();           	
        	};
	
	objetoHistorico.getHistoricos=function(){
			 return $http.get('/historicos').success(function(response){
						objetoHistorico.historicos=angular.copy(response);		
					});
	};
	
	objetoHistorico.postHistorico = function(historico){
		console.log("AÑADIENDO A BBDD HISTORICOS");	
		$http.post('/historicos',historico).success(function(response){
			console.log(response);
		});			
	};
	
  return objetoHistorico;
	
}]);