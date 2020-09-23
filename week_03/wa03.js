// const fs = require('fs'),
// myArray = ['banana','apple','melon'];

// fs.writeFileSync('data/text.json',JSON.stringify(myArray))

// "use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// var addressinfo = require('./wa02.js');
      


// TAMU api key
dotenv.config();
const API_KEY = process.env.MY_APIKEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
let addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St","232 West 11th"];

// upto street address,this api would work, need to clean up the address from the imported js

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);

    // console.log(apiRequest);
    
    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        // let entireGeo = JSON.parse(body)
        // JSON.parse(body) => string to JSON!
        
        console.log(tamuGeo);
        meetingsData.push(tamuGeo);
        // console.log('entire geodata is ',entireGeo)
        // clean this data later
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
    
}, function() {
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});


// console.log(addressinfo)