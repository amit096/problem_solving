/*
 * Write 3 different functions that return promises 
   that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for
    all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


// 3-promise-all.js

function waitOneSecond(a) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitOneSecond');
        }, a * 1000);
    });
}

function waitTwoSecond(b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitTwoSecond');
        }, b * 1000);
    });
}

function waitThreeSecond(c) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('waitThreeSecond');
        }, c * 1000);
    });
}

function calculateTime(a, b, c) {
    return new Promise((resolve) => {
        let start = new Date().getTime();
        Promise.all([waitOneSecond(a), waitTwoSecond(b), waitThreeSecond(c)]).then(() => {
            let end = new Date().getTime();
            resolve(end - start);
        });
    });
}

module.exports = calculateTime;
