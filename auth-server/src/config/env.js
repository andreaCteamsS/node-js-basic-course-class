require("dotenv").config();
const envalid = require('envalid')
module.exports = envalid.cleanEnv(process.env, {
    POSTGRES_DB_CONNECTION: envalid.str({}),
    PORT: envalid.num({}),
    JWT_SECRET:  envalid.str({}),
    BCRYPT_SALT:  envalid.num({}),
});

