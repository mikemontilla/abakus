import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import cookieParser from 'cookie-parser'
import React from 'react'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import {getMovements, saveMovement, deleteMovement} from './persistence/movements'
import {getBusiness, getSingleBusiness, saveBusiness} from './persistence/business'
import configureBusinessStore from './common/business/store/'
import configureMovementsStore from './common/movements/store/'
import AccountsManager from './common/movements/containers/AccountsManager'
import BusinessManager from './common/business/containers/BusinessManager'

const abakus = express();

abakus.set("port", (process.env.OPENSHIFT_NODEJS_PORT || 8080));
abakus.set("ip", (process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"))
abakus.use(cookieParser());
abakus.use("/", express.static(path.join(__dirname, "../public")));
abakus.use(bodyParser.json());
abakus.use(bodyParser.urlencoded({extended:true}));
abakus.set("views", path.join(__dirname, "/../views"));
abakus.set("view engine", "pug");

abakus.get("/business", function(req, res){

	//Reseting cookie
	res.clearCookie("business_id");
	res.clearCookie("business_name")

	getBusiness(function(error, business){
		if(error){
			console.error(error);
			process.exit(1);
		}
		//Computes initial state
		const initialState = {
			error: null,
			business
		};
		const store = configureBusinessStore(initialState);
		const html = renderToString(
			<Provider store={store}>
				<BusinessManager />
			</Provider>
		);
		const finalState = JSON.stringify(store.getState());
		res.render("business", {html, finalState});
	})
});

abakus.get("/movements/:id", function(req, res){

	const businessId = parseInt(req.params.id);
	getSingleBusiness(businessId, function(error, business){
		if(error){
			console.error(error);
			process.exit(1);
		}
		//Cookie set to identify the business in other requests
		res.cookie("business_id", business.id);

		getMovements(business.id, function(error, movements){
			if(error){
				console.error(error);
				process.exit(1);
			}
			//Computes initial state
			const initialState = {
				error: null,
				fetching: false,
				movements: {
					past: [],
					present: movements,
					future: []
				}
			};

			const store = configureMovementsStore(initialState);
			const html = renderToString(
				<Provider store={store}>
					<AccountsManager businessName={business.name}/>
				</Provider>
			);
			const finalState = JSON.stringify(store.getState());
			const businessName = JSON.stringify(business.name);
			res.render("movements", {html, finalState, businessName});
		});
	});
});

abakus.post("/api/movements", function(req, res){

	const businessId = parseInt(req.cookies.business_id);
	const newMovement = {
		businessId,
		date: req.body.date,
		description: req.body.description,
		type: req.body.type,
		amount: parseInt(req.body.amount),
		comment: req.body.comment
	};

	saveMovement(newMovement, function(error, newMovementId){
		if(error){
			console.error(error);
			process.exit(1);
		}
		if(newMovementId){
			getMovements(businessId, function(error, movements){
				if(error){
					console.error(error);
					process.exit(1);
				}
				res.json(movements);
			});
		}
	});
});

abakus.post("/api/business", function(req, res){

	const newBusiness = {
		date: req.body.date,
		name: req.body.name
	};

	saveBusiness(newBusiness, function(error, savedFlag) {
		if(error){
			console.error(error);
			process.exit(1);
		}
		if(savedFlag){
			getBusiness(function(error, business){
				if(error){
					console.error(error);
					process.exit(1);
				}
				res.json(business);
			});
		}
	});
});

abakus.post("/api/movements/remove", function(req, res){

	const businessId = parseInt(req.cookies.business_id);
	const id = parseInt(req.body.id);
	deleteMovement(id, function(error, deletedFlag) {
		if(error){
			console.error(error);
			process.exit(1);
		}
		if(deletedFlag){
			getMovements(businessId, function(error, movements){
				if(error){
					console.error(error);
					process.exit(1);
				}
				res.json(movements);
			});
		}
	});
});

abakus.listen(abakus.get("port"), abakus.get("ip"), function(){
	console.log("Server started: " + abakus.get("ip") + ":" + abakus.get("port") + "/");
});
