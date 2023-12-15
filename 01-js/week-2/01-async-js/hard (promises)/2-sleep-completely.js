/*
 * Write a function that halts the JS thread (make it busy wait)
   for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(seconds) {

  let start = new Date().getTime();
  return new Promise((resolve, reject) => {
    while (new Date().getTime() - start <= seconds) {
      // let time = new Date().getTime() - start;
      // console.log(time / 1000);
    }
    resolve();
  })



}


console.log('to start');
sleep(5000).then(()=>
  console.log('to end')
);

module.exports = sleep;