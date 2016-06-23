import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import React from 'react'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import configureStore from './common/store/'
import AccountsManager from './common/containers/AccountsManager'
import jade from 'jade'

const abakus = express();

const USERS_FILE = path.join(__dirname, "/../persistence/users.json");
const MOVEMENTS_FILE = path.join(__dirname, "/../persistence/movements.json");

abakus.set("port", (process.env.OPENSHIFT_NODEJS_PORT || 8080));
abakus.set("ip", (process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"))
abakus.use("/", express.static(path.join(__dirname, "../public")));
abakus.use(bodyParser.json());
abakus.use(bodyParser.urlencoded({extended:true}));
abakus.engine("jade", jade.__express);
abakus.set("view engine", "jade");

const removeMovement = function(movements, removeId){
	if(!movements.length)
		return;
	removeId--;
	movements.splice(removeId, 1);
	while(removeId < movements.length){
		movements[removeId].id--;
		removeId++;
	}
};

const getMovements = function(callback) {
	fs.readFile(MOVEMENTS_FILE, function(error, data){
		if(error)
			return callback(error);
		const movements = JSON.parse(data);
		return callback(null, movements);
	});
};

abakus.get("/", function(req, res){
	getMovements(function(error, movements){
		if(error){
			console.error(error);
			process.exit(1);
		}
		//Computes initial state
		const initialState = {
			error: null,
			fetching: false,
			movements
		};
		const store = configureStore(initialState);
		const html = renderToString(
			<Provider store={store}>
				<AccountsManager />
			</Provider>
		);
		const finalState = JSON.stringify(store.getState());
		res.render("index", {html, finalState});
	});
});

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
			id: movements.length + 1,
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
