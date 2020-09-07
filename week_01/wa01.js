"use strict"
var request = require('request');
var fs = require('fs');


for (let i=1; i<10; i++){
    
request(`https://parsons.nyc/aa/m0${i}.html`, function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/data/thesis${i}.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    };
    
    console.log("congratulations, you're done!")
    
    
});

// 10th element can't be looped. so I manually hard-coded it.
    
request('https://parsons.nyc/aa/m10.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/data/thesis10.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    };
})
    
    
    
    



}

// https://parsons.nyc/aa/m01.html