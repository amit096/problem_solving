let fs = require('fs');

fs.readFile('3-read-from-file.md','utf-8',(err,data)=>{
let start =  new Date().getTime();

console.log(data);


let end =  new Date().getTime();

console.log(`time of expensive task : ${end-start}`);
});
expensivie();

function expensivie(){
let count=0;

for(let i=0;i<10000000000;i++){
    count++;
}

console.log(count);
}