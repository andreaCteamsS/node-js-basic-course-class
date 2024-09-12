const { signOpts, loginOpts, verifyOpts } = require('../../schema/user');


module.exports.authRoutes = async (fastify) => {
    fastify.post('/sign', signOpts, async (req, res) => {
        const {UserName, password, isAdmin} = req.body;
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
                const userToken = getJwtUser(addedUser.id,UserName,isAdmin);
                return res.send({userToken});
            }
            throw new Error();
        } catch (error) {
            console.error(error)
            res.code(500).send('Error adding user')
        } finally {
            client.release()
        }


    });

    fastify.post('/login', loginOpts, async (req, res) => {
        const {UserName, password} = req.body;
        let client;
        try {
            client = await fastify.pg.connect();
            const { rows } = await client.query(
                'SELECT id, CRCPassword, isAdmin FROM siteuser WHERE username=$1',
                [UserName]
            );
            if (rows.length === 0) {
                return res.code(404).send("User not found");
            }
            const {crcpassword, id, isadmin} = rows[0];
            const comparison = await fastify.bcrypt.compare(password, crcpassword);
            if (!comparison) {
                return res.code(401).send("unauthorized");
            }            
            const userToken = getJwtUser(fastify, id, UserName, isadmin);
            return res.send({userToken});
        } catch (error) {
            console.error(error)
            res.code(500).send('Error login user')
        } finally {
            client.release()
        }

    });

    fastify.post('/verify', verifyOpts, async (req, res) => {
      
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