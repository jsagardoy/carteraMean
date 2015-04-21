var express = require ("express");
var app= express();

var mongojs = require("mongojs");
var db = mongojs("cartera",["cartera"]);
var db2 = mongojs("historicos",["historicos"]);
var db3 = mongojs("dividendos",["dividendos"]);

var bodyParser = require("body-parser");


app.use(express.static("../"));
app.use(bodyParser.json());

//CARTERA

//GET
app.get("/mostrarCartera",function(req,res){

	console.log("I received a request");

	db.cartera.find(function(err, docs){
		console.log("MOSTRAR CARTERA");
		console.log(docs);
		res.json(docs);
	});	
});

//POST
app.post("/agregarCartera",function(req,res){
		console.log("AGREGAR CARTERA");
		console.log(req.body);
		db.cartera.insert(req.body, function(err,docs){
			res.json(docs);
		});
	});

//DELETE
app.delete("/cerrarCartera/:id", function(req, res){
	var id = req.params.id;
	console.log("ELIMINAR");
	console.log(id);
	db.cartera.remove({_id: mongojs.ObjectId(id)}, function(err,docs){
		res.json(docs);
	});
	
});

//HISTORICOS

//GET
app.get("/historicos",function(req,res){

	console.log("I received a request");
	db2.historicos.find(function(err, docs){
		console.log("MOSTRAR HISTORICO");
		console.log(docs);
		res.json(docs);
	});	
});

//POST
app.post("/historicos", function(req,res){
		console.log("AGREGAR HISTORICO");
		console.log(req.body);
		db2.historicos.insert(req.body, function(err,docs){
			res.json(docs);
		});
});
		
//DIVIDENDOS

//GET
app.get("/dividendos",function(req,res){

	console.log("I received a request");
	db3.dividendos.find(function(err, docs){
		console.log("MOSTRAR DIVIDENDO");
		console.log(docs);
		res.json(docs);
	});	
});

//POST
app.post("/dividendos", function(req,res){
		console.log("AGREGAR HISTORICO");
		console.log(req.body);
		db3.dividendos.insert(req.body, function(err,docs){
			res.json(docs);
		});
});


app.listen(3000);
console.log("Server listening on port 3000");