// app.js
// const dotenv = require("dotenv").config({ path: __dirname + `/../.env` }); // dotenv

// const API_KEY = process.env.API_KEY;

// console.log(API_KEY)

var request = require('request');
const { Client } = require('pg');

// PARTICLE PHOTON
var device_id = '24001e001047353136383631'
var access_token = 'db1c57113235b967cf71f0276fab7008d5d83f8a';
var particle_variable = 'tVal';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jotnajoa';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        
        // Store sensor value(s) in a variable
        var sv = JSON.parse(body).result;
        
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 3000);


