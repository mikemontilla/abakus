"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionOptions = {
    port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || "127.0.0.1",
    user: process.env.NODE_ENV === "production" ? "adminrIe5g14" : "root",
    password: process.env.NODE_ENV === "production" ? "KU2SnnwC2T65" : "@MorionMysql2016",
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