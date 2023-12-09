
let counter = 0;
let intervals = function () {

    setTimeout(() => {
        counter++;
        console.log(counter);
        intervals();
    }, 1000);
}

intervals();


// tried to stop it at 10 sec

// let counter =0;
// let stopAt=10;
// let intervals= function(){
// setTimeout(()=>{
// counter++;
// console.log(counter);
// if(counter!=stopAt){
// intervals();}
// },1000);
// }

// intervals();
