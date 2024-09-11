module.exports.bookRoutes = async (fastify) => {
    fastify.get('/books', async (req, res) => {
        const client = await fastify.pg.connect();
        try {
            const { rows } = await client.query("SELECT * FROM books");
            res.send({result: rows});
        } catch (error) {
            console.error(error)
            res.code(500).send('Error getting all boooks')
        } finally {
            client.release()
        }
    });

    fastify.get('/books/:id', async (req, res) => {
        const client = await fastify.pg.connect(), {id} = req.params;
        try {
            console.log("retrieving book id: " + id);
            const { rows } = await client.query(`SELECT * FROM books where id=$1`, [id]);
            res.send({result: rows});
        } catch (error) {
            console.error(error)
            res.code(500).send('Error getting all books')
        } finally {
            client.release()
        }
    });
    
    fastify.post('/books', async (req, res) => {
        const client = await fastify.pg.connect();
        try {
            const {title,author,isbn,published_year} = req.body;
            const {rows} = await client.query(
                'INSERT INTO books(title,author,isbn,published_year) VALUES($1,$2,$3,$4) RETURNING id',
                 [title,author,isbn,published_year]
                );
            res.send({bookAdded: rows[0].id});
        } catch (error) {
            console.error(error)
            res.code(500).send('Error posting book')
        } finally {
            client.release()
        }
    });
       
    fastify.put('/books/:id', async (req, res) => {
        const client = await fastify.pg.connect(), {id} = req.params;
        try {
            const {title, author, isbn, published_year} = req.body;
            await client.query(
                'UPDATE books SET title=COALESCE($2,title), author=COALESCE($3,author), isbn=COALESCE($4,isbn), published_year=COALESCE($5,published_year) WHERE id=$1',
                 [id, title,author,isbn,published_year]
                );
            res.send({success: true});
        } catch (error) {
            console.error(error)
            res.code(500).send('Error modifiyng book ' + id)
        } finally {
            client.release()
        }
    });
       
    fastify.delete('/books/:id', async (req, res) => {
        const client = await fastify.pg.connect(), {id} = req.params;
        try {
            await client.query(`DELETE FROM books where id=$1`, [id]);
            res.send({success: true});
        } catch (error) {
            console.error(error)
            res.code(500).send('Error getting all books')
        } finally {
            client.release()
        }
    });
}

