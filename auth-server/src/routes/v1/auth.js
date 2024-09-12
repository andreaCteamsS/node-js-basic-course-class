const { signOpts, loginOpts, verifyOpts } = require('../../schema/user');


module.exports.authRoutes = async (fastify) => {
    fastify.post('/sign', signOpts, async (req, res) => {
        const {UserName, CRCPassword, isAdmin} = req.body;
        let client;
        try {
            client = await fastify.pg.connect();
            const hashedPassword = await fastify.bcrypt.hash(CRCPassword);
            const { rows } = await client.query(
                'INSERT INTO siteuser(UserName, CRCPassword, isAdmin) VALUES($1,$2,$3) RETURNING id',
                [UserName, hashedPassword, isAdmin ? 1 : 0]
            );
            const addedUser = rows[0];
            if (!!addedUser) {
                const userToken = fastify.jwt.sign({
                    sub: addedUser.id,
                    name: UserName,
                    admin: isAdmin,
                    exp: jwtExpDate()  
                });
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
      
    });

    fastify.post('/verify', verifyOpts, async (req, res) => {
      
    });
    
}


function jwtExpDate() {
    let now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    return now.getTime();
}