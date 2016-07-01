"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionOptions = {
    host: "localhost",
    user: "root",
    password: "@MorionMysql2016",
    database: "abakus"
};

var connection = _mysql2.default.createConnection(connectionOptions);
connection.connect(function (error) {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log("Database connection successfully established");
});

exports.default = connection;
//# sourceMappingURL=connection.js.map