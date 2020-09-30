const {Client} = require('pg'),
      dotenv = require('dotenv'),
      async = require('async');

dotenv.config(); 
let db_credentials = {
    host: 'data-structures.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'jotnajoa',
    password: 'wndeoalska86',
    port: 5432,
}

let addressesForDb = [
  {address: '63 Fifth Ave, New York, NY', latLong: {lat: 40.7353041, lng: -73.99413539999999} },
  {address: '16 E 16th St, New York, NY', latLong: {lat: 40.736765,  lng: -73.9919024} },
  {address: '2 W 13th St, New York, NY',  latLong: {lat: 40.7353297, lng: -73.99447889999999} }
];

async.eachSeries(addressesForDb, function(value, callback) {
    let client = new Client(db_credentials);
    client.connect();

    // When mixing variables into a query, place them in a `values` array and then refer to those 
    // elements within the `text` portion of the query using $1, $2, etc.
    let query = {
      text: "INSERT INTO aalocations VALUES($1, $2, $3)",
      values: [value.address, value.latLong.lat, value.latLong.lng]
    };

    client.query(query, (err, res) => {
        if (err){ throw err; }

        console.log(res);
        client.end();
    });
    setTimeout(callback, 1000);
});