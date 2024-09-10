const MAX_COUNTER = 5;
const { sendmail } = require("./sendmail");
const { callCustomer } = require("./callcustomer");
const { getRandCustomer } = require("./randItems");
const { customerList } = require("./list");
let counter = 0;





const interval = setInterval(() => {
    const customer = getRandCustomer(customerList);
    callCustomer(customer.id);
    if (counter % 2 === 0) {
        sendmail(customer.id)
    }
    counter++;
    if (counter === MAX_COUNTER) {
        console.log("clear interval");
        clearInterval(interval);
    }
}, 5000);
