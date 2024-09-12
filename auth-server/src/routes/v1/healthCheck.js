module.exports.healthCheck = async (fastify) => {
    fastify.get('/', async (req, res) => {
        const client = await fastify.pg.connect();
        try {
            const {rows} = await client.query("SELECT now()")
            res.send(rows[0]);
        } catch (error) {
            console.error(error)
            res.code(500).send('Error connecting to database')
        } finally {
            client.release()
        }
    })
}

