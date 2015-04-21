var express = require ("express");
var app= express();

var mongojs = require("mongojs");
var db = mongojs("cartera",["cartera"]);
var db2 = mongojs("historicos",["historicos"]);

var bodyParser = require("body-parser");


app.use(express.static("../"));
app.use(bodyParser.json());

app.get("/mostrarCartera",function(req,res){

	console.log("I received a request");

	db.cartera.find(function(err, docs){
		console.log("MOSTRAR CARTERA");
		console.log(docs);
		res.json(docs);
	});	
});

app.post("/agregarCartera",function(req,res){
		console.log("AGREGAR CARTERA");
		console.log(req.body);
		db.cartera.insert(req.body, function(err,docs){
			res.json(docs);
		});
	});

app.get("/historicos",function(req,res){

	console.log("I received a request");
	db2.historicos.find(function(err, docs){
		console.log("MOSTRAR HISTORICO");
		console.log(docs);
		res.json(docs);
	});	
});

app.post("/historicos", function(req,res){
		console.log("AGREGAR HISTORICO");
		console.log(req.body);
		db2.historicos.insert(req.body, function(err,docs){
			res.json(docs);
		});
});

app.delete("/cerrarCartera/:id", function(req, res){
	var id = req.params.id;
	console.log("ELIMINAR");
	console.log(id);
	db.cartera.remove({_id: mongojs.ObjectId(id)}, function(err,docs){
		res.json(docs);
	});
	
});
		   
app.listen(3000);
console.log("Server listening on port 4000");