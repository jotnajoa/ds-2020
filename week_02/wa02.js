const axois = require('axios');
const cheerio =require('cheerio');
const fs = require('fs');
const myData=[];

axois.get('https://parsons.nyc/aa/m02').then((res)=>{
    // console.log(res.data)
    const $ = cheerio.load(res.data);
    
    // $('tr').each((index,element)=>{
    //     console.log($(element).children('td').children('b').eq(0).html())
    // })
    let entireData=$('div > table > tbody > tr')
    
    entireData.each((index,element)=>{
        
        function typeOperator(){
            if($(element).children('td').eq(1).children('b').eq(3).html()==null){
            return $(element).children('td').eq(1).children('b').eq(1).html()
            }else{
             return $(element).children('td').eq(1).children('b').eq(3).html()
            }
            
        }
        
        myData[index]=
        {'address':
        $(element).children('td').eq(0).html()
        .split('<br>')[2].replace('\n\t\t\t\t\t\t','')
        .split('\n')[0].replace(',',''),
        'hours': $(element).children('td').eq(1).html().split('</b>')[1].replace('<b>to','')+'~'
        +$(element).children('td').eq(1).html().split('</b>')[2].replace('<br><b>Meeting Type',''),
        'meeting_type':$(element).children('td').eq(1).html().split('=')[1]
            
        }
    }
    )
    
    console.log(myData)
    
    // console.log(address.split('<br>')[2])
    
    
    
})