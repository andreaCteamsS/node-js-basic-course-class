const { deleteBookOpts, postBookOpts, getBookOpts, getBooksOpts, putBookOpts } = require('../../schema/books');




module.exports.bookRoutes = async (fastify) => {
    fastify.get('/books', getBooksOpts, async (req, res) => {
        let query = "SELECT * FROM books";
        const { authordName, publicationYear, orderBy, page, rowPage } = req.query;
        if (!!authordName.length || !!publicationYear.length) {
            query += " WHERE "
            if (!!authordName.length) {
                query += "author in ('" +
                authordName.join("','")
                + "')";
                if (!!publicationYear.length) query += " AND "
            }
            if (!!publicationYear.length) {
                query += "published_year in (" + publicationYear.join(",") + ")";
            }
        }

        if (!!orderBy) {
            query += " ORDER BY published_year " + orderBy;
        }

        const client = await fastify.pg.connect();
        try {
            const { rows } = await client.query(query);
            res.send({ result: !!page && !!rowPage ? paginate(rows, rowPage, page) : rows });
        } catch (error) {
            console.error(error)
            res.code(500).send('Error getting all boooks')
        } finally {
            client.release()
        }
    });

    fastify.get('/books/:id', getBookOpts, async (req, res) => {
        const client = await fastify.pg.connect(), { id } = req.params;
        try {
            console.log("retrieving book id: " + id);
            const { rows } = await client.query(`SELECT * FROM books where id=$1`, [id]);
            res.send({ result: rows });
        } catch (error) {
            console.error(error)
            res.code(500).send('Error getting all books')
        } finally {
            client.release()
        }
    });

    fastify.post('/books', postBookOpts, async (req, res) => {
        const client = await fastify.pg.connect();
        try {
            const { title, author, isbn, published_year } = req.body;
            const { rows } = await client.query(
                'INSERT INTO books(title,author,isbn,published_year) VALUES($1,$2,$3,$4) RETURNING id',
                [title, author, isbn, published_year]
            );
            res.send({ bookAdded: rows[0].id });
        } catch (error) {
            console.error(error)
            res.code(500).send('Error posting book')
        } finally {
            client.release()
        }
    });

    fastify.put('/books/:id', putBookOpts, async (req, res) => {
        const client = await fastify.pg.connect(), { id } = req.params;
        try {
            const { title, author, isbn, published_year } = req.body;
            await client.query(
                'UPDATE books SET title=COALESCE($2,title), author=COALESCE($3,author), isbn=COALESCE($4,isbn), published_year=COALESCE($5,published_year) WHERE id=$1',
                [id, title, author, isbn, published_year]
            );
            res.send({ success: true });
        } catch (error) {
            console.error(error)
            res.code(500).send('Error modifiyng book ' + id)
        } finally {
            client.release()
        }
    });

    fastify.delete('/books/:id', deleteBookOpts, async (req, res) => {
        const client = await fastify.pg.connect(), { id } = req.params;
        try {
            await client.query(`DELETE FROM books where id=$1`, [id]);
            res.send({ success: true });
        } catch (error) {
            console.error(error)
            res.code(500).send('Error getting all books')
        } finally {
            client.release()
        }
    });
}

function paginate(rows, rownNum, page) {
    const start = (page - 1) * rownNum, end = start + rownNum;
    return rows.slice(start, end);
}