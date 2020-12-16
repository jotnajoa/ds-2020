const { Client } = require('pg');
const cTable = require('console.table');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jotnajoa';
db_credentials.host = 'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com'
db_credentials.database = 'aa';
db_credentials.password = 'wndeoalska86'
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statements for checking your work: 
var thisQuery = "SELECT * FROM sensorData;"; // print all values
var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
     client.end();
});

// client.query(secondQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
// });

// client.query(thirdQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
//     client.end();
// });