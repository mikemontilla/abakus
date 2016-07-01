"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMovements = getMovements;
exports.saveMovement = saveMovement;
exports.deleteMovement = deleteMovement;

var _connection = require("./connection");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToDatabase(movement) {
    return {
        business_id: movement.businessId,
        description: movement.description,
        type: movement.type,
        amount: parseInt(movement.amount),
        comment: movement.comment,
        date: movement.date
    };
}

function mapFromDatabase(movement) {
    return {
        id: parseInt(movement.movement_id),
        businessId: parseInt(movement.business_id),
        description: movement.description,
        type: movement.type,
        amount: parseInt(movement.amount),
        comment: movement.comment,
        date: movement.date
    };
}

function getMovements(id, callback) {
    var query = "SELECT * FROM abakus.movements WHERE business_id = " + id;
    _connection2.default.query(query, function (error, rows, field) {
        if (error) return callback(error);

        var movements = rows.map(function (row) {
            return mapFromDatabase(row);
        });
        return callback(null, movements);
    });
}

function saveMovement(movement, callback) {
    var query = "INSERT INTO abakus.movements SET ?";
    var newMovement = mapToDatabase(movement);
    _connection2.default.query(query, newMovement, function (error, result) {
        if (error) return callback(error);
        return callback(null, result.insertId);
    });
}

function deleteMovement(id, callback) {
    var query = "DELETE FROM abakus.movements WHERE movement_id = ?";
    _connection2.default.query(query, [id], function (error, result) {
        if (error) return callback(error);
        return callback(null, result.affectedRows);
    });
}
//# sourceMappingURL=movements.js.map