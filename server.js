var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var abakus = express();

var USERS_FILE = path.join(__dirname, "users.json");

abakus.set("port", (process.env.port || 3000));

abakus.use("/", express.static(path.join(__dirname, "public")));
abakus.use(bodyParser.json());
abakus.use(bodyParser.urlencoded({extended:true}));

abakus.listen(abakus.get("port"), function(){
	console.log("Server started: http://localhost" + abakus.get("port") + "/");
});