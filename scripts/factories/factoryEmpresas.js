app.factory("empresas", ["$http", function($http){
	
	var objetoEmpresa = {empresas:[]};
	
	objetoEmpresa.newEmpresa = function(nombre, simbolo, precioCompra,numTitulos,fechaEntrada, divisa, precioDivisaCompra){		
		empresa={
				nombre:nombre,
				simbolo:simbolo,
				precioCompra:Number(precioCompra),
				numTitulos:Number(numTitulos),
				fechaEntrada:fechaEntrada,
				divisa:divisa,
				precioDivisaCompra:Number(precioDivisaCompra)
			}
			return empresa;
	};
	
	objetoEmpresa.addEmpresa = function(emp){
		objetoEmpresa.postEmpresa(emp);
		alert ("Empresa Añadida");  	
	};
	
	objetoEmpresa.cerrarPosicionEmpresa = function(emp,historicos){

		if(emp.numTitulos==emp.numTitulosVendidos){		
			historicos.addHistoricos(emp);
			objetoEmpresa.removeEmpresa(emp._id);
		}
		else {//en el caso de que se cierren solo una parte de la posición.//tiene que actualizar la BBDD
			numTitulosRestantes=emp.numTitulos-emp.numTitulosVendidos;
			historicos.addHistoricos(emp);
			emp.numTitulos=numTitulosRestantes;	
		};

		
		alert ("Posición cerrada");
	};
	
	//MANEJO BBDD	
//	objetoEmpresa.getAll = function(){return objetoEmpresa.getEmpresas();};
	
	objetoEmpresa.getEmpresas=function(){			 
		$http.get('/mostrarCartera').success(function(response){
			console.log("success:"+response);
			objetoEmpresa.empresas=response||[];
			return objetoEmpresa.empresas;			
		});
		console.log(objetoEmpresa.empresas);
	};
	
	objetoEmpresa.postEmpresa = function(empresa){
		console.log("AÑADIENDO A BBDD");	
		$http.post('/agregarCartera',empresa).success(function(response){
			console.log(response);
			//objetoEmpresa.empresas=angular.copy(response);
			return response;
		});			
	};
	
	objetoEmpresa.removeEmpresa=function(indice){
		console.log("Eliminando de BBDD");
		$http.delete('/cerrarCartera/'+indice).success(function(response){return response;});
		
	};
  return objetoEmpresa;	
}]);