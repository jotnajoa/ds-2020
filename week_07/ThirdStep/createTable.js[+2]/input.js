// creating pg database


const {Client} = require('pg'),
      dotenv = require('dotenv'),
      async = require('async'),
      fs = require('fs')

dotenv.config(); 
let db_credentials = {
    host: 'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database: 'aa',
    user: 'jotnajoa',
    password: process.env.AWSRDS_PW,
    port: 5432,
}
let addressObj=[];
let newArray=[];
// let addressesForDb = [
//   {address: '63 Fifth Ave, New York, NY', latLong: {lat: 40.7353041, lng: -73.99413539999999} },
//   {address: '16 E 16th St, New York, NY', latLong: {lat: 40.736765,  lng: -73.9919024} },
//   {address: '2 W 13th St, New York, NY',  latLong: {lat: 40.7353297, lng: -73.99447889999999} }
// ];


for (let m=1;m<11;m++){
    
let coordinateObj=JSON.parse(fs.readFileSync(`../week_03/myset/coordinate${m}.json`));
let infoObj=JSON.parse(fs.readFileSync(`../week_03/myset/dataset${m}.json`));


for (let i=0;i<coordinateObj.length;i++){
    let newObj={
        coord:{}
    };
    newObj.venue=infoObj[i].venue
    newObj.address=infoObj[i].address
    newObj.coord.lat=coordinateObj[i].lat
    newObj.coord.lon=coordinateObj[i].lon
    newObj.mtgday=infoObj[i].meetingday
    newObj.mtgtime=infoObj[i].meetingtime
    newObj.mtgtype=infoObj[i].meetingtype
    addressObj.push(newObj)
}

}
console.log(addressObj)


async.eachSeries(addressObj, function(value, callback) {
    let client = new Client(db_credentials);
    client.connect();

    // When mixing variables into a query, place them in a `values` array and then refer to those 
    // elements within the `text` portion of the query using $1, $2, etc.
    
    let query = {
      text: "INSERT INTO locationtable VALUES($1, $2, $3, $4,$5,$6,$7)",
      values: [value.address, value.venue, value.mtgday, value.mtgtime, value.mtgtype, value.coord.lat, value.coord.lon]
    };
    
    

    client.query(query, (err, res) => {
        if (err){ throw err; }

        console.log(res);
        client.end();
    });
    setTimeout(callback, 30);
});


fs.writeFileSync('../week_05/data/addressObj.json',JSON.stringify(addressObj))


    // let query = `DROP TABLE aalocations`;
    
    
    /*
    새롭게 표를 생성하고 테스트하고싶어서 밑의 코드를 한번 돌려서 데이터베이스에 표를 생성하였다.
    
    let newquery =`CREATE TABLE aalocations (address VARCHAR(100),   
                                                    lat double precision,
                                                    long double precision);`
                                                    
    let client = new Client(db_credentials);
    client.connect();

    client.query(newquery, (err, res) => {
        if (err){ throw err; }

        console.log(res);
        client.end();
    });
    
    */