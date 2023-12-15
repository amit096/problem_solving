/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */


function waitOneSecond(a) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitOneSecond');
        }, a*1000);
    });
}

function waitTwoSecond(b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitTwoSecond');
        }, b*1000);
    });

}

function waitThreeSecond(c) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitThreeSecond');
        }, c*1000);
    });

}

function calculateTime(a,b,c) {
    let start = new Date().getTime();
    return waitOneSecond(a).then((value) => {
        console.log(value);
        let end = new Date().getTime();
        console.log(`Time taken to reach 1: ${(end - start)}`);
        return waitTwoSecond(b)
    }).then((value) => {
        console.log(value);
        let end = new Date().getTime();
        console.log(`Time taken to reach 2: ${(end - start)}`);
        return waitThreeSecond(c)
    }).then((value) => {
        console.log(value);
        let end = new Date().getTime();
        console.log(`Time taken to reach 3: ${(end - start)}`);
        return end - start; // Resolve the total time taken
    }).catch((err)=>{
      console.log(err);
    })
}

//calculateTime(1,2,3);// it takes total sec in this case it's 6


module.exports=calculateTime;