app.factory("dividendos", ["$http",function($http){
	var objetoDividendo= {
    	dividendos: []
  	}
	
	objetoDividendo.addDividendo = function(emp){
		div=objetoDividendo.newDividendo(emp);
		objetoDividendo.postDividendos(div);
		this.limpiarFormularioDividendo(emp);
		alert("Formulario Añadido");
	};
	
		
	objetoDividendo.limpiarFormularioDividendo=function(emp){
		emp.showme=false;
		emp.dividendoAccion='';
		emp.fechaDividendo='';
		emp.precioDivisaDividendo='';
	};	
	
	
	objetoDividendo.newDividendo=function(emp){
		
		if (emp.divisa !="EUR" && emp.divisa!="eur"){
			tipoCambio=Number(emp.precioDivisaDividendo);
		}else{
			tipoCambio=1;
		}
		
		ingresoDividendo = (parseFloat(emp.dividendoAccion)*parseFloat(emp.numTitulos))/parseFloat(tipoCambio);
		rentabilidadDividendo=parseFloat(emp.dividendoAccion)/parseFloat(emp.precioCotizacion)*100;
		rentabilidadDividendo=rentabilidadDividendo.toFixed(2);
		ingresoDividendo=ingresoDividendo.toFixed(2);
	
		div={
			nombre:emp.nombre,
			dividendo:Number(emp.dividendoAccion),
			simbolo:emp.simbolo,
			ingresoDividendo:ingresoDividendo,
			fecha:emp.fechaDividendo,
			precioDivisaDividendo:Number(tipoCambio),
			rentabilidad:Number(rentabilidadDividendo)
		};
		return div;
	}
		
	//MANEJO BBDD
	objetoDividendo.getAll = function(){
            	objetoDividendo.getDividendos();           	
        	};
	
	objetoDividendo.getDividendos=function(){
			 return $http.get('/dividendos').success(function(response){
						objetoDividendo.dividendos=angular.copy(response);		
					});
	};
	
	objetoDividendo.postDividendos = function(dividendo){
		console.log("AÑADIENDO A BBDD DIVIDENDOS");	
		$http.post('/dividendos',dividendo).success(function(response){
			console.log(response);
		});			
	};
	
	
	
  return objetoDividendo;
	
}]);