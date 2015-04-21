app.factory("historicos",["$http", function($http){
	var objetoHistorico= {
    	historicos: []
  	}
	
	objetoHistorico.newHistorico = function(nombre,simbolo, precioCompra, precioVenta, fechaEntrada,
											 fechaSalida, divisa, precioDivisaCompra, precioDivisaVenta,
											 numTitulos,numTitulosVendidos, inversionInicial, benficio, rentabilidad){
		
		hist={
				nombre: nombre,
				simbolo: simbolo,

				precioCompra: precioCompra,
				precioVenta:  precioVenta, 			

				fechaEntrada: fechaEntrada,
				fechaSalida:  fechaSalida,

				divisa: divisa,

				precioDivisaCompra:precioDivisaCompra,
				precioDivisaVenta:precioDivisaVenta,

				numTitulos: numTitulos,
				numTitulosVendidos: numTitulosVendidos,

				inversionInicial: inversionInicial,
				beneficio: beneficio,
				rentabilidad:rentabilidad
		}
			return hist;
	}
	
	objetoHistorico.addHistoricos = function(empresa){
		
		if (empresa.divisa !="EUR" && empresa.divisa!="eur"){	
				precioDivisaCompra= empresa.precioDivisaCompra;
				precioDivisaVenta= empresa.precioDivisaVenta;
			} else{
				precioDivisaCompra= 1;
				precioDivisaVenta= 1;
			}
		//Calculo de datos
		beneficio = (empresa.precioVenta - empresa.precioCompra)*empresa.numTitulosVendidos/precioDivisaVenta;
		inversionInicial = (empresa.precioCompra*empresa.numTitulos)/empresa.precioDivisaCompra;
		inversionInicial = inversionInicial.toFixed(2);
		rentabilidad = beneficio/inversionInicial*100;
		beneficio = beneficio.toFixed(2);
		rentabilidad=rentabilidad.toFixed(2);
		
		historico=objetoHistorico.newHistorico(empresa.nombre, empresa.simbolo, empresa.precioCompra, empresa.precioVenta,
											  empresa.fechaEntrada, empresa.fechaSalida, empresa.divisa, precioDivisaCompra,
											   precioDivisaVenta,empresa.numTitulos,empresa.numTitulos,empresa.numTitulosVendidos,
											  inversionInicial, beneficio, rentabilidad);
		
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