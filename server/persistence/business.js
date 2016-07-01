import connection from './connection'

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

export function getBusiness(callback) {
    const query = "SELECT * FROM abakus.business";
    connection.query(query, function(error, rows, field){
        if(error)
            return callback(error);

        const business = rows.map(function(business){
            return mapFromDatabase(business);
        });
        return callback(null, business);
    });
}

export function getSingleBusiness(id, callback) {
    const query = "SELECT * FROM abakus.business WHERE business_id = " + id;
    connection.query(query, function(error, rows){
        if(error)
            return callback(error);
        const business = mapFromDatabase(rows[0]);
        callback(null, business);
    });
}

export function saveBusiness(business, callback) {
    const query = "INSERT INTO abakus.business SET ?";
    const newBusiness = mapToDatabase(business);
    connection.query(query, newBusiness, function(error, result) {
        if(error)
            return callback(error);
        return callback(null, result.insertId);
    });
}
