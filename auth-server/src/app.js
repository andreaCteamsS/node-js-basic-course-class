const fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUI = require("@fastify/swagger-ui");
const { healthCheck } = require('./routes/v1/healthCheck');
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fastifyPOstgres = require("@fastify/postgres");
const { authRoutes } = require("./routes/v1/auth");
const fBcrypt = require('fastify-bcrypt')
module.exports.build = (
    opts = {},
    swaggerOpts = {},
    swaggerUiOpts = {},
    fastifyPOstgresOpts = {},
    fBcryptOpts = {},
    fJwtOpts = {}
) => {
    const app = fastify(opts);
    app.register(fastifySwagger, swaggerOpts);
    app.register(fastifySwaggerUi, swaggerUiOpts);
    app.register(fastifyPOstgres, fastifyPOstgresOpts);
    app.register(require("@fastify/jwt"), fJwtOpts)
    app.register(fBcrypt, fBcryptOpts)
    //
    app.register(authRoutes);
    app.register(healthCheck);
    return app;
}
