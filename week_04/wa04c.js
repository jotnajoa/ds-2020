const {Client} = require('pg'),
      dotenv = require('dotenv');

dotenv.config(); 
let db_credentials = {
    host: 'data-structures.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'jotnajoa',
    password: 'wndeoalska86',
    port: 5432,
}

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
let query = "SELECT * FROM aalocations;";

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res.rows);
    client.end();
});