const router = require('express').Router();

const Credenciales = require('../../database/models/credenciales');

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');


router.post('/login', async(req, res) => {
    const credencial = await Credenciales.findOne({ where: { username: req.body.username } });
    if (credencial) {
        const igual = bcrypt.compareSync(req.body.password, credencial.password);
        if (igual) {
            res.status(201).json({ success: createToken(credencial) });
        } else {
             res.json({error:"error en usuario o contraseña" });
        }
    } else {
         res.json({error:"error en usuario o contraseña" });
    }
});

const createToken = (credencial) => {
    const payload = {
        credencialId: credencial.credencialId,
        createAt: moment().unix(),
        expiredAt: moment().add(45,'minutes').unix()
    }
    return jwt.encode(payload, 'SACRIS');
}


module.exports = router;