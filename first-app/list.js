const { Customer } = require("./customer");

const _list = [
    new Customer(1,"pippo","pippo@email", 12345),
    new Customer(2,"caio","caio@email", 12345),
    new Customer(3,"paperino","paperino@email", 12345),
];

module.exports.customerList = [..._list];