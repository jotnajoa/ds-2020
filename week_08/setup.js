const { Client } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jotnajoa'
db_credentials.host = 'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa'
db_credentials.password = 'wndeoalska86',
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});

