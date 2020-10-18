// const axois = require('axios');
const cheerio =require('cheerio');
const fs = require('fs');
const myData=[];
let contentArray=[];

for (let m=1;m<11;m++){

const content = fs.readFileSync(`./data/thesis${m}.txt`);


const $ = cheerio.load(content)
let addressContainer=[];
let infoContainer=[];
let urlContainer=[];
let allData=[];
let mtgtype=[];



$('tbody > tr').each(function(i,e){
    addressContainer.push($(e).children('td').eq(0))
    infoContainer.push($(e).children('td').eq(1))
    urlContainer.push($(e).children('td').eq(2))
})

// Check if all the resources are having same length
console.log(addressContainer.length)
console.log(infoContainer.length)
console.log(urlContainer.length)

// Sampling Test

console.log(addressContainer[3].children('h4').html())
//venue
console.log(addressContainer[3].html().split('<b>')[1].split('<br>')[1].split(',')[0].trim())
//address
console.log(infoContainer[3].html().split('From</b>')[0].split('<b>')[1].trim())
//meetingdays first entry only
console.log(infoContainer[3].html().split('<br><b>Meeting Type</b>')[0].split('From</b>')[1].split('<b>to</b>')[0].trim())
//meeting time from
console.log(infoContainer[3].html().split('<br><b>Meeting Type</b>')[0].split('From</b>')[1].split('<b>to</b>')[1].trim())
//meeting time to
console.log(infoContainer[3].html().split('<br><b>Meeting Type</b>')[1].replace('<br>','').replace('<br>','').trim())
//meeting type

// 

for (let i=3; i<addressContainer.length-1; i++){
    
    allData.push(
        {
            venue:addressContainer[i].children('h4').html(),
            address:addressContainer[i].html().split('<b>')[1].split('<br>')[1].split(',')[0].trim(),
            meetingday:infoContainer[i].html().split('From</b>')[0].split('<b>')[1].trim(),
            meetingtime:infoContainer[i].html().split('<br><b>Meeting Type</b>')[0].split('From</b>')[1].split('<b>to</b>')[0].trim()+' to '+infoContainer[3].html().split('<br><b>Meeting Type</b>')[0].split('From</b>')[1].split('<b>to</b>')[1].trim(),

        }
        
        )
}


for (let i=3;i<addressContainer.length-1;i++){
    if(infoContainer[i].text().split('Meeting Type')[1]){
    mtgtype.push(infoContainer[i].text().split('Meeting Type')[1].split('meeting')[0])
    }else{
    console.log('value does not exist in',i)
    mtgtype.push('Special')
    }
}

for (let i=0; i<allData.length;i++){
    allData[i].meetingtype=mtgtype[i]
}
console.log(allData);
console.log(mtgtype.length);

fs.writeFileSync(`./myset/dataset${m}.json`,JSON.stringify(allData))
}