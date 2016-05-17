var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var abakus = express();

var USERS_FILE = path.join(__dirname, "users.json");
var MOVEMENTS_FILE = path.join(__dirname, "movements.json");

abakus.set("port", (process.env.OPENSHIFT_NODEJS_PORT || 8080));
abakus.set("ip", (process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"))
abakus.use("/", express.static(path.join(__dirname, "public")));
abakus.use(bodyParser.json());
abakus.use(bodyParser.urlencoded({extended:true}));

var removeMovement = function(movements, removeId){
	if(!movements.length)
		return;
	removeId--;
	movements.splice(removeId, 1);
	while(removeId < movements.length){
		movements[removeId].id--;
		removeId++;
	}
};

abakus.get("/api/movements", function(req, res){
	fs.readFile(MOVEMENTS_FILE, function(error, data){
		if(error){
			console.error(error);
			process.exit(1);
		}

		var movements = JSON.parse(data);
		res.json(movements);
	});
});

abakus.post("/api/movements", function(req, res){

	fs.readFile(MOVEMENTS_FILE, function(error, data){

		if(error){
			console.error(error);
			process.exit(1);
		}

		var movements = JSON.parse(data);

		var newMovement = {
			id: parseInt(req.body.id),
			date: req.body.date,
			description: req.body.description,
			type: req.body.type,
			amount: parseInt(req.body.amount),
			comment: req.body.comment
		};

		movements.push(newMovement);

		fs.writeFile(MOVEMENTS_FILE, JSON.stringify(movements, null, 4), function(error){
			if(error){
				console.error(error);
				process.exit(1);
			}
			res.json(movements);
		});
	});
});

abakus.post("/api/movements/remove", function(req, res){

	fs.readFile(MOVEMENTS_FILE, function(error, data){

		if(error){
			console.error(error);
			process.exit(1);
		}

		var movements = JSON.parse(data);
		var id = parseInt(req.body.id);
		removeMovement(movements, id);

		fs.writeFile(MOVEMENTS_FILE, JSON.stringify(movements, null, 4), function(error){
			if(error){
				console.error(error);
				process.exit(1);
			}
			res.json(movements);
		});
	});
});

abakus.listen(abakus.get("port"), abakus.get("ip"), function(){
	console.log("Server started: " + abakus.get("ip") + ":" + abakus.get("port") + "/");
});
