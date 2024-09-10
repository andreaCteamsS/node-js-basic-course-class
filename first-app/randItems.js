module.exports.getRandCustomer = (customerList) => {
    const randomIndex = Math.ceil(Math.random() * customerList.length - 1);
    return customerList[randomIndex];
}