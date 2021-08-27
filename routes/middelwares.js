const jwt = require('jwt-simple')
const moment = require('moment');

const checkToken = (req, res, next) => {
    if (!req.headers['credencial-token']) {
        return  res.json({error: "Necesitas incluir la credencial en la cabecera"});
    }
/* 
const tokenCredencial=req.headers['credencial-token'] */
    let payload = {};
    try {
        payload = jwt.decode(tokenCredencial,'SACRIS');
        
    } catch (e) {
        return  res.json({error:'token erroneo'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.json({error:'el token ha expirado'});
    }

    req.credencialId = payload.credencialId;
    next();
}

module.exports = {
    checkToken:checkToken
}