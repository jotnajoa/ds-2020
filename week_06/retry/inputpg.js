//load data for pg
const {Client} = require('pg'),
      dotenv = require('dotenv');
const async = require('async');
const obj=[
     {subject:'mydiary',dt:'2020.09.08',entry:'feeling good'},
     {subject:'work',dt:'2020.11.08',entry:'feeling good'},
     {subject:'mydiary',dt:'2020.10.08',entry:'feeling bad'},
     {subject:'mydiary',dt:'2020.05.08',entry:'feeling ok'},
     {subject:'mydiary',dt:'2020.06.08',entry:'feeling great'},
    ];

dotenv.config(); 
let db_credentials = {
    host: 'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'jotnajoa',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// Connect to the AWS RDS Postgres database
async.eachSeries(obj,function(value,callback){
    const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
let query = {
    text:"INSERT INTO diary VALUES($1,$2,$3)",
    values:[value.subject,value.dt,value.entry]
}

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res.rows);
    client.end();
});
    
});
