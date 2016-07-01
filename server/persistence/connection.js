import mysql from 'mysql'

const connectionOptions = {
    host: "localhost",
    user: "root",
    password: "@MorionMysql2016",
    database: "abakus"
};

const connection = mysql.createConnection(connectionOptions);
connection.connect(function(error) {
    if(error){
        console.error(error);
        process.exit(1);
    }
    console.log("Database connection successfully established");
});

export default connection
