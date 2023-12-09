let fs = require('fs');

fs.readFile('4-write-to-file.md','utf-8',(err,data)=>{ // if we won't write utf-8 it will still work and by default it will take utf-8 only
    console.log(data);
    let newData = data + 'Writing somthing to test';
    fs.writeFile('4-write-to-file.md',newData,'utf8',(err)=>{
    console.log('wrote successfully');
    })
})