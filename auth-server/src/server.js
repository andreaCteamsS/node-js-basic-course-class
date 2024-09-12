
const { POSTGRES_DB_CONNECTION, PORT, BCRYPT_SALT, JWT_SECRET } = require('./config/env');

const app = require('./app').build(
    { logger: true },
    {
        openapi: {
            openapi: "3.0.3",
            info: {
                title: "Library API",
                description: "Library Management API",
                version: "0.1.0"
            },
            servers: [{
                url: "https://turbo-goggles-v6pvwp4w56p9cx9qx-3001.app.github.dev",
                description: "Develpement Server"
            }]
        }
    },
    {
        routePrefix: "/docs",
        uriConfig: { docExpansion: "full", deepLinking: false }
    },
    {
        connectionString: POSTGRES_DB_CONNECTION
    },
    { saltWorkFactor: BCRYPT_SALT },
    { secret: JWT_SECRET }
);

app.listen({ port: PORT, host: "localhost" }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
})