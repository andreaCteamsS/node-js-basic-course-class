
const { POSTGRES_DB_CONNECTION } = require('./config/env');

const app = require('./app').build(
    { logger: true },
    {},
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