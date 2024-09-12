const fetch = require('node-fetch')


module.exports.verifyToken = (allowOnlyAdmin = false) => async (req, reply) => {
    const headers = {"authorization": req.headers.authorization}
    const response = await (await fetch('http://localhost:3001/verify', {headers})).json()
    if (response.statusCode === 401) {
        return reply.status(401).send("Not authorized");
    } 
    if (response.statusCode === 404) {
        return reply.status(404).send("Not found");
    } 
    if (response.statusCode === 200) {
        const { isAdmin } = response.payload;
        if (allowOnlyAdmin && !isAdmin) {
            return reply.status(401).send("Not admin");
        }
        
    }
};