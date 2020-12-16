<h1>Set the automated uploading</h1>

<p> Setting the writing function</p>
<hr>
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


setInterval(getAndWriteData, 30000);

<hr>
<p>config.js</p>

module.exports = {
  apps : [{
    script: 'app.js',
    watch: '.',
    env: {
      'PHOTON_ID': 'jotnajoa',
      'PHOTON_TOKEN':'db1c57113235b967cf71f0276fab7008d5d83f8a',
      'AWSRDS_PW': 'wndeoalska86',
      'PHOTON_ID': 'jotnajoa',
      'AWSRDS_EP':'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com'
    }
    
  }], 

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

<p>checking if the data were updated successfully</p>

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





