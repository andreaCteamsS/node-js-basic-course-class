
const { POSTGRES_DB_CONNECTION, PORT } = require('./config/env');

const app = require('./app').build(
    { logger: true },
    {},
    {
        routePrefix: "/docs",
        uriConfig: { docExpansion: "full", deepLinking: false }
    },
    {
        connectionString: POSTGRES_DB_CONNECTION
    },
    { saltWorkFactor: 12 }
);

app.listen({ port: PORT, host: "localhost" }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
})