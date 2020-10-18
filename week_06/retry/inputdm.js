var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var {diaryEntries} =require('./createdm.js');

var dynamodb = new AWS.DynamoDB();

console.log(diaryEntries)

for (let items of diaryEntries){
    
var params = {};
params.Item = items 
params.TableName = "diary-20";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}