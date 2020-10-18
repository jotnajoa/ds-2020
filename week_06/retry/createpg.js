const {Client} = require('pg'),
      dotenv = require('dotenv');

// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
let db_credentials = {
    host: 'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'jotnajoa',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

console.log(process.env)
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();
// ㅇㅣ거를 통해서 데이터 베이스로 접근하는 채널이 열린것이라고 보면됨!

// Sample SQL statement to create a table (using ` quotes to break into multiple lines):
// let query = `DROP TABLE locationtable`
let query = `CREATE TABLE diary (
  subject varchar(100),
  dt varchar(100),
  entry varchar(100)
);`;

// Sample SQL statement to delete a table:
// let query = "DROP TABLE aalocations;";

client.query(query, (err, res) => {
    if (err){throw err; }

    console.log(res);
    client.end();
});