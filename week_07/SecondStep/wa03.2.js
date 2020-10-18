"use strict"
class datainput{
      constructor(input){
            this.address=input.InputAddress.StreetAddress+','+input.InputAddress.City+','+input.InputAddress.State;
            this.lat=input.OutputGeocodes[0].OutputGeocode.Latitude;
            this.lon=input.OutputGeocodes[0].OutputGeocode.Longitude;
      }
}
// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();

const API_KEY = process.env.API_KEY;
// console.log(API_KEY)

const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'


for (let m=1;m<11;m++){
    

// geocode addresses
let meetingsData = [];

// console.log(fs.readFileSync('./address.json'))
// Address information 은 json 포맷으로 저장해버렸기때문에 위의 위치에서 읽어오면된다 (윅 투에서 저장함)

var addresses = JSON.parse(fs.readFileSync(`./myset/dataset${m}.json`));

// 그냥 읽어오면, array형태가 아니기 때문에, 어레이 형태로 만들기위해서 제이썬 파쓰를 썼다네


// console.log(addresses);
// 테스트해보니 아주잘 워크함.



// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
      
    let query = {
        streetAddress: value.address,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
      //   let addressObj={address:'',lat:'',lon:''}
        let addressObject = new datainput(tamuGeo)
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
      //   addressObj.address=tamuGeo.InputAddress.StreetAddress+','+tamuGeo.InputAddress.City+','+tamuGeo.InputAddress.State;
      //   addressObj.lat=tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude;
      //   addressObj.lon=tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude;
        
        meetingsData.push(addressObject);
        
      //   오브젝트를 다수 생산해내기 위해서 그냥 클래스를 만들어서 오브젝트오리엔티드 코딩을 해보았다.
      // OutputGeocodes looks just like a key-value pair but it isn't it's actually an array whose length is one. it was quite confusing.
      
      
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync(`./myset/coordinate${m}.json`, JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
    console.log(addresses.length)
});

}
// Documentation
// Texas A&M Geoservices Geocoding APIs
// Node querystring module
// npm async module
// npm dotenv module
// Sample API Response
// {
//   "version" : "4.01",
//   "TransactionId" : "d119d15f-5221-446e-9d6d-fa779a5be9c3",
//   "Version" : "4.01",
//   "QueryStatusCodeValue" : "200",
//   "FeatureMatchingResultType" : "Success",
//   "FeatureMatchingResultCount" : "7",
//   "TimeTaken" : "0.203184",
//   "ExceptionOccured" : "False",
//   "Exception" : "",
//   "InputAddress": {
//     "StreetAddress" : "45 CHRISTOPHER ST New York NY ",
//     "City" : "New York",
//     "State" : "NY",
//     "Zip" : ""
//   },
//   "OutputGeocodes": [
//     {
//       "OutputGeocode": {
//         "Latitude" : "40.7338458",
//         "Longitude" : "-74.0018119",
//         "NAACCRGISCoordinateQualityCode" : "00",
//         "NAACCRGISCoordinateQualityType" : "AddressPoint",
//         "MatchScore" : "97.3372781065089",
//         "MatchType" : "Relaxed",
//         "FeatureMatchingResultType" : "Success",
//         "FeatureMatchingResultCount" : "1",
//         "FeatureMatchingGeographyType" : "Parcel",
//         "RegionSize" : "0",
//         "RegionSizeUnits" : "Meters",
//         "MatchedLocationType" : "LOCATION_TYPE_STREET_ADDRESS",
//         "ExceptionOccured" : "False",
//         "Exception" : "",
//         "ErrorMessage" : ""
//       }
//     }
//   ]
// }