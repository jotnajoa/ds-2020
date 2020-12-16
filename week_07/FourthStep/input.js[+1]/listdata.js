var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var {dataEntry} =require('./input.js');
let blogEntries=[];
var dynamodb = new AWS.DynamoDB();

for (let i=0; i<dataEntry.length; i++){
    blogEntries[i]=dataEntry[i]
};

console.log(blogEntries)

for (let items of blogEntries){
    
var params = {};
params.Item = items 
params.TableName = "processblog-20";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}