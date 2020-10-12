const {Client} = require('pg');
const dotenv = require("dotenv")
dotenv.config(); 

var db_credentials ={
    user:'jotnajoa',
    host:'data-structures.crrxaw2b5hr1.us-east-1.rds.amazonaws.com',
    database:'aa',
    password:process.env.AWSRDS_PW,
    port: 5432
}

const client = new Client(db_credentials);
client.connect();

var thisQuery = 'SELECT mtgday, mtgtime, mtglocation, mtgaddress, mtgtypes FROM aadata WHERE mtgday = "Monday" and mtghour >=7;';

client.query(thisQuery, (err,res)=>{
    if(err){throw err}
    else{
        console.table(res.rows);
        client.end()
    }
})
console.log(process.env.AWSRDS_PW);
console.log(process.env.API_KEY)
