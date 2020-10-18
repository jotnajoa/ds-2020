const obj=[
     {subject:'mydiary',dt:'2020.09.08',entry:'feeling good'},
     {subject:'work',dt:'2020.11.08',entry:'feeling good'},
     {subject:'mydiary',dt:'2020.10.08',entry:'feeling bad'},
     {subject:'mydiary',dt:'2020.05.08',entry:'feeling ok'},
     {subject:'mydiary',dt:'2020.06.08',entry:'feeling great'},
    ];
let diaryEntries=[];

class BlogEntry {
  constructor(subject,object) {
    this.subject = {};
    this.subject.N = subject.toString();
    this.dt = {}; 
    this.dt.S = new Date(object.dt).toDateString();
    this.entry = {};
    this.entry.S = object.entry.toString();
  }
}

obj.forEach((t)=>{
    diaryEntries.push(new BlogEntry('subject',t))
})

console.log(diaryEntries)

// console.log(blogEntries);

exports.diaryEntries = diaryEntries;