/*
    Write a function that returns a promise that resolves after n seconds have passed,
     where n is passed as an argument to the function.
*/

function wait(n) {

    return new Promise((resolve)=>{
    //    if(err) reject('some issue'); 
    setTimeout(()=>{
          resolve(`wait ended after : ${n/1000}`);
       
    },n)})
}

wait(5000).then((data)=>console.log(data));