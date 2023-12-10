/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */


function waitOneSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitOneSecond');
        }, 1000);
    });
}

function waitTwoSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitTwoSecond');
        }, 2000);
    });

}

function waitThreeSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitThreeSecond');
        }, 3000);
    });

}

function calculateTime() {
    let start = new Date().getTime();
    waitOneSecond().then((value) => {
        console.log(value);
        let end = new Date().getTime();
        console.log(`Time taken to reach 1: ${(end - start) / 1000}`);
        return waitTwoSecond()
    }).then((value) => {
        console.log(value);
        let end = new Date().getTime();
        console.log(`Time taken to reach 2: ${(end - start) / 1000}`);
        return waitThreeSecond()
    }).then((value) => {
        console.log(value);
        let end = new Date().getTime();
        console.log(`Time taken to reach 3: ${(end - start) / 1000}`);
    })
}

calculateTime();// it takes total sec in this case it's 6