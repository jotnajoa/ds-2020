const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./data/addressObj.json'))

var dataEntry = [];


// class dataClass {
//   constructor(primaryKey, date, entry, happy, iate) {
//     this.pk = {};
//     this.pk.N = primaryKey.toString();
//     this.date = {}; 
//     this.date.S = new Date(date).toDateString();
//     this.entry = {};
//     this.entry.S = entry;
//     this.happy = {};
//     this.happy.BOOL = happy; 
//     if (iate != null) {
//       this.iate = {};
//       this.iate.SS = iate; 
//     }
//     this.month = {};
//     this.month.N = new Date(date).getMonth().toString();
//   }
// }
class dataClass{
  constructor(key,input){
    this.pk ={};
    this.pk.N = key.toString();
    this.venue={};this.address={};this.mtgday={};this.mtgtime={};this.mtgtype={};
    this.venue.S= input.venue;this.address.S=input.address;this.mtgday.S=input.mtgday;
    this.mtgtime.S=input.mtgtime;
    this.mtgtype.S=input.mtgtype;
  }
}

for(let i=0; i<content.length; i++){
  
  dataEntry.push(new dataClass(i,content[i]))
  
}


exports.dataEntry = dataEntry;