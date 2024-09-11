
const { POSTGRES_DB_CONNECTION } = require('./config/env');

const app = require('./app').build(
    { logger: true },
    {
        openapi: {
            openapi: "3.0.0",
            info: {
                title: "Library api",
                description: "Library management api",
                version: "0.1.0"
            },
            servers: [{
                url: "http://localhost:3000",
                description: "Dev server",
            }]
        },

    },
    {
        routePrefix: "/docs",
        uriConfig: { docExpansion: "full", deepLinking: false }
    },
    {
        connectionString: POSTGRES_DB_CONNECTION
    }
);

app.listen({ port: 3000, host: "localhost" }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
})