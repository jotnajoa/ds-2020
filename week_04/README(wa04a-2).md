const {Client} = require('pg'),
      dotenv = require('dotenv');

// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
let db_credentials = {
    host: 'data-structures.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'jotnajoa',
    password: 'wndeoalska86',
    port: 5432,
}

Soonk: for some reason, password can't be read from environment file, so for now, I put my password as string itself.

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

Soonk: When did we create the class Client? I don't remember. for now, I just kept the code as it is

// Sample SQL statement to create a table (using ` quotes to break into multiple lines):
let query = `CREATE TABLE aalocations ( address varchar(100), lat double precision, long double precision);`;

Soonk: Minimum number of characters is 100. It could be 125 or something else.


// Sample SQL statement to delete a table:
// let query = "DROP TABLE aalocations;";

Soonk: Since 'DROP TABLE' command is for removing the table in the db, for now I did commented this out

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res);
    client.end();
});
