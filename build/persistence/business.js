"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBusiness = getBusiness;
exports.getSingleBusiness = getSingleBusiness;
exports.saveBusiness = saveBusiness;

var _connection = require("./connection");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToDatabase(business) {
    return {
        name: business.name,
        creation_date: business.date
    };
}

function mapFromDatabase(business) {
    return {
        id: parseInt(business.business_id),
        name: business.name
    };
}

function getBusiness(callback) {
    var query = "SELECT * FROM abakus.business";
    _connection2.default.query(query, function (error, rows, field) {
        if (error) return callback(error);

        var business = rows.map(function (business) {
            return mapFromDatabase(business);
        });
        return callback(null, business);
    });
}

function getSingleBusiness(id, callback) {
    var query = "SELECT * FROM abakus.business WHERE business_id = " + id;
    _connection2.default.query(query, function (error, rows) {
        if (error) return callback(error);
        var business = mapFromDatabase(rows[0]);
        callback(null, business);
    });
}

function saveBusiness(business, callback) {
    var query = "INSERT INTO abakus.business SET ?";
    var newBusiness = mapToDatabase(business);
    _connection2.default.query(query, newBusiness, function (error, result) {
        if (error) return callback(error);
        return callback(null, result.insertId);
    });
}
//# sourceMappingURL=business.js.map