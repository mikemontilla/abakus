'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _movements = require('./persistence/movements');

var _business = require('./persistence/business');

var _store = require('./common/business/store/');

var _store2 = _interopRequireDefault(_store);

var _store3 = require('./common/movements/store/');

var _store4 = _interopRequireDefault(_store3);

var _AccountsManager = require('./common/movements/containers/AccountsManager');

var _AccountsManager2 = _interopRequireDefault(_AccountsManager);

var _BusinessManager = require('./common/business/containers/BusinessManager');

var _BusinessManager2 = _interopRequireDefault(_BusinessManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var abakus = (0, _express2.default)();

abakus.set("port", process.env.OPENSHIFT_NODEJS_PORT || 8080);
abakus.set("ip", process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
abakus.use((0, _cookieParser2.default)());
abakus.use("/", _express2.default.static(_path2.default.join(__dirname, "../public")));
abakus.use(_bodyParser2.default.json());
abakus.use(_bodyParser2.default.urlencoded({ extended: true }));
abakus.set("views", _path2.default.join(__dirname, "/../views"));
abakus.set("view engine", "pug");

abakus.get("/business", function (req, res) {

	//Reseting cookie
	res.clearCookie("business_id");
	res.clearCookie("business_name");

	(0, _business.getBusiness)(function (error, business) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		//Computes initial state
		var initialState = {
			error: null,
			business: business
		};
		var store = (0, _store2.default)(initialState);
		var html = (0, _server.renderToString)(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(_BusinessManager2.default, null)
		));
		var finalState = JSON.stringify(store.getState());
		res.render("business", { html: html, finalState: finalState });
	});
});

abakus.get("/movements/:id", function (req, res) {

	var businessId = parseInt(req.params.id);
	(0, _business.getSingleBusiness)(businessId, function (error, business) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		//Cookie set to identify the business in other requests
		res.cookie("business_id", business.id);

		(0, _movements.getMovements)(business.id, function (error, movements) {
			if (error) {
				console.error(error);
				process.exit(1);
			}
			//Computes initial state
			var initialState = {
				error: null,
				fetching: false,
				movements: {
					past: [],
					present: movements,
					future: []
				}
			};

			var store = (0, _store4.default)(initialState);
			var html = (0, _server.renderToString)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(_AccountsManager2.default, { businessName: business.name })
			));
			var finalState = JSON.stringify(store.getState());
			var businessName = JSON.stringify(business.name);
			res.render("movements", { html: html, finalState: finalState, businessName: businessName });
		});
	});
});

abakus.post("/api/movements", function (req, res) {

	var businessId = parseInt(req.cookies.business_id);
	var newMovement = {
		businessId: businessId,
		date: req.body.date,
		description: req.body.description,
		type: req.body.type,
		amount: parseInt(req.body.amount),
		comment: req.body.comment
	};

	(0, _movements.saveMovement)(newMovement, function (error, newMovementId) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		if (newMovementId) {
			(0, _movements.getMovements)(businessId, function (error, movements) {
				if (error) {
					console.error(error);
					process.exit(1);
				}
				res.json(movements);
			});
		}
	});
});

abakus.post("/api/business", function (req, res) {

	var newBusiness = {
		date: req.body.date,
		name: req.body.name
	};

	(0, _business.saveBusiness)(newBusiness, function (error, savedFlag) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		if (savedFlag) {
			(0, _business.getBusiness)(function (error, business) {
				if (error) {
					console.error(error);
					process.exit(1);
				}
				res.json(business);
			});
		}
	});
});

abakus.post("/api/movements/remove", function (req, res) {

	var businessId = parseInt(req.cookies.business_id);
	var id = parseInt(req.body.id);
	(0, _movements.deleteMovement)(id, function (error, deletedFlag) {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		if (deletedFlag) {
			(0, _movements.getMovements)(businessId, function (error, movements) {
				if (error) {
					console.error(error);
					process.exit(1);
				}
				res.json(movements);
			});
		}
	});
});

abakus.listen(abakus.get("port"), abakus.get("ip"), function () {
	console.log("Server started: " + abakus.get("ip") + ":" + abakus.get("port") + "/");
});
//# sourceMappingURL=server.js.map