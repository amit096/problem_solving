
setInterval(() => {
    let now = new Date();
    let hh = now.getHours();
    let mm = now.getMinutes();
    let ss = now.getSeconds();
    let ampm = hh >= 12 ? 'PM' : 'AM';
 
    hh=padZero(hh);
    mm=padZero(mm);
    ss=padZero(ss);

    console.log(`current time : ${hh}:${mm}:${ss}`);
    console.log(`current time : ${hh}:${mm}:${ss} ${ampm}`);
}, 1000);


function padZero(value) {
    return value < 10 ? '0' + value : value;
}