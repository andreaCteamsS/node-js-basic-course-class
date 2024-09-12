const { signOpts, loginOpts, verifyOpts } = require('../../schema/user');


module.exports.authRoutes = async (fastify) => {
    fastify.post('/sign', signOpts, async (req, res) => {
        const { UserName, password, isAdmin } = req.body;
        let client;
        try {
            client = await fastify.pg.connect();
            const CRCPassword = await fastify.bcrypt.hash(password);
            const { rows } = await client.query(
                'INSERT INTO siteuser(UserName, CRCPassword, isAdmin) VALUES($1,$2,$3) RETURNING id',
                [UserName, CRCPassword, isAdmin ? 1 : 0]
            );
            const addedUser = rows[0];
            if (!!addedUser) {
                const token = getJwtUser(fastify, addedUser.id, UserName, isAdmin);
                return res.status(201).send(successResponse(201, { token }));
            }
            throw new Error();
        } catch (error) {
            res.status(500).send(errorResponse(500, 'Error adding user'))
        } finally {
            client.release()
        }
    });

    fastify.post('/login', loginOpts, async (req, res) => {
        const { UserName, password } = req.body;
        let client;
        try {
            client = await fastify.pg.connect();
            const { rows } = await client.query(
                'SELECT id, CRCPassword, isAdmin FROM siteuser WHERE username=$1',
                [UserName]
            );
            if (rows.length === 0) {
                return res.code(404).send(errorResponse(401, "Not Found", "User doesnt exist"));
            }
            const { crcpassword, id, isadmin } = rows[0];
            const comparison = await fastify.bcrypt.compare(password, crcpassword);
            if (!comparison) {
                return res.code(401).send(errorResponse(401, "Unauthorized", "Passowrd not matching"));
            }
            const userToken = getJwtUser(fastify, id, UserName, isadmin);
            return res.status(200).send(successResponse(200, { userToken }));
        } catch (error) {
            res.status(500).send(errorResponse(500, 'Error login user'))
        } finally {
            client.release()
        }

    });

    fastify.get('/verify', verifyOpts, async (req, res) => {
        const { sub, name, admin, exp } = await req.jwtVerify();
        if (verifyIfDateIsExpired(exp)) {
            res.code(401).send("expired token");
        }
        return res.status(200).send(successResponse(200, { isAdmin: !!admin }));
    });

}

function getJwtUser(fastify, sub, name, admin) {
    return fastify.jwt.sign({
        sub,
        name,
        admin,
        exp: jwtExpDate()
    });
}

function jwtExpDate() {
    let now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    return now.getTime();
}

function verifyIfDateIsExpired(milliseconds) {
    return milliseconds < new Date().getTime();
}

function successResponse(statusCode, payload) {
    return { statusCode, payload }
}

function errorResponse(statusCode, error, message = null) {
    return { statusCode, error, ...message && { message } }
}