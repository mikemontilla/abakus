import connection from './connection'

function mapToDatabase(movement) {
    return {
        business_id: movement.businessId,
        description: movement.description,
        type: movement.type,
        amount: parseInt(movement.amount),
        comment: movement.comment,
        date: movement.date
    }
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

export function getMovements(id, callback) {
    const query = "SELECT * FROM abakus.movements WHERE business_id = " + id;
    connection.query(query, function(error, rows, field) {
        if(error)
            return callback(error);

        const movements = rows.map(function(row) {
            return mapFromDatabase(row);
        });
        return callback(null, movements);
    });
}

export function saveMovement(movement, callback) {
    const query = "INSERT INTO abakus.movements SET ?";
    const newMovement = mapToDatabase(movement);
    connection.query(query, newMovement, function(error, result) {
        if(error)
            return callback(error);
        return callback(null, result.insertId);
    });
}

export function deleteMovement(id, callback) {
    const query = "DELETE FROM abakus.movements WHERE movement_id = ?";
    connection.query(query, [id], function(error, result) {
        if(error)
            return callback(error);
        return callback(null, result.affectedRows);
    });
}
