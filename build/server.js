'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _store = require('./common/store/');

var _store2 = _interopRequireDefault(_store);

var _AccountsManager = require('./common/containers/AccountsManager');

var _AccountsManager2 = _interopRequireDefault(_AccountsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var abakus = (0, _express2.default)();

var USERS_FILE = _path2.default.join(__dirname, "/../persistence/users.json");
var MOVEMENTS_FILE = _path2.default.join(__dirname, "/../persistence/movements.json");

abakus.set("port", process.env.OPENSHIFT_NODEJS_PORT || 8080);
abakus.set("ip", process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
abakus.use("/", _express2.default.static(_path2.default.join(__dirname, "../public")));
abakus.use(_bodyParser2.default.json());
abakus.use(_bodyParser2.default.urlencoded({ extended: true }));
abakus.set("views", _path2.default.join(__dirname, "/../views"));
abakus.set("view engine", "pug");

var removeMovement = function removeMovement(movements, removeId) {
	if (!movements.length) return;
	removeId--;
	movements.splice(removeId, 1);
	while (removeId < movements.length) {
		movements[removeId].id--;
		removeId++;
	}
};

var getMovements = function getMovements(callback) {
	_fs2.default.readFile(MOVEMENTS_FILE, function (error, data) {
		if (error) return callback(error);
		var movements = JSON.parse(data);
		return callback(null, movements);
	});
};

abakus.get("/", function (req, res) {
	getMovements(function (error, movements) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		//Computes initial state
		var initialState = {
			error: null,
			fetching: false,
			movements: movements
		};
		var store = (0, _store2.default)(initialState);
		var html = (0, _server.renderToString)(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(_AccountsManager2.default, null)
		));
		var finalState = JSON.stringify(store.getState());
		res.render("index", { html: html, finalState: finalState });
	});
});

abakus.get("/api/movements", function (req, res) {
	_fs2.default.readFile(MOVEMENTS_FILE, function (error, data) {
		if (error) {
			console.error(error);
			process.exit(1);
		}

		var movements = JSON.parse(data);
		res.json(movements);
	});
});

abakus.post("/api/movements", function (req, res) {

	_fs2.default.readFile(MOVEMENTS_FILE, function (error, data) {

		if (error) {
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

		_fs2.default.writeFile(MOVEMENTS_FILE, JSON.stringify(movements, null, 4), function (error) {
			if (error) {
				console.error(error);
				process.exit(1);
			}
			res.json(movements);
		});
	});
});

abakus.post("/api/movements/remove", function (req, res) {

	_fs2.default.readFile(MOVEMENTS_FILE, function (error, data) {

		if (error) {
			console.error(error);
			process.exit(1);
		}

		var movements = JSON.parse(data);
		var id = parseInt(req.body.id);
		removeMovement(movements, id);

		_fs2.default.writeFile(MOVEMENTS_FILE, JSON.stringify(movements, null, 4), function (error) {
			if (error) {
				console.error(error);
				process.exit(1);
			}
			res.json(movements);
		});
	});
});

abakus.listen(abakus.get("port"), abakus.get("ip"), function () {
	console.log("Server started: " + abakus.get("ip") + ":" + abakus.get("port") + "/");
});
//# sourceMappingURL=server.js.map