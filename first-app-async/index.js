// require("./app/index");
const mathUtils = require('./app/math-utils');

let start=0, end=10,i = 1;
const max = 100;
let result = [];

otherIncomingRequests();
const INTERVAL = setInterval(() => {
        const primes = longRequest(start, end);
        result = [...result, ...primes];
        start += 10;
        end += 10;
        if (end > max) {
            console.log("______________ end")
            console.log(result);        
            clearInterval(INTERVAL);
        }
}, 35);



/**
 * DO NOT CHANGE IT
 */
function otherIncomingRequests() {
    setInterval(() => {
        console.log(`Id: ${i++}. Doing new incoming request`);
    }, 50);
}

/**
 * DO NOT CHANGE IT
 * @param {*} n
 * @returns
 */
function longRequest(rangeStart,rangeend) {
    let id = i++;
    console.log(`Id: ${id}. Starting non blocking request. Find primes from ${rangeStart} to ${rangeend}`);
    const start = new Date();

    const primes = mathUtils.getPrimeNumbersWithinRange(rangeStart, rangeend);

    const end = new Date();
    console.log(`Id: ${id}. Finished non blocking request. Elapsed ms: ${end.getTime() - start.getTime()}`);

    return primes;
}