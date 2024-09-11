const fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUI = require("@fastify/swagger-ui");
const { bookRoutes } = require('./routes/v1/books');
const { healthCheck } = require('./routes/v1/healthCheck');
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fastifyPOstgres = require("@fastify/postgres");

module.exports.build = (
    opts = {},
    swaggerOpts = {},
    swaggerUiOpts = {},
    fastifyPOstgresOpts = {}
) => {
    const app = fastify(opts);
    app.register(fastifySwagger, swaggerOpts);
    app.register(fastifySwaggerUi, swaggerUiOpts);
    app.register(fastifyPOstgres, fastifyPOstgresOpts);
    app.register(bookRoutes);
    app.register(healthCheck);
    return app;
}
