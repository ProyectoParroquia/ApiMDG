const jwt = require('jwt-simple')
const moment = require('moment');

const checkToken = (req, res, next) => {

    if (!req.headers['token']) {
        return  res.status(403).json({error: "Necesitas incluir el token"});
    }

    const token = req.headers['token'];
    
    let payload = {};
    
    try {
        payload = jwt.decode(token, "SACRIS");
    } catch (e) {
        return  res.status(403).json({error:'token erroneo'});
    }

    if (payload.expiredAt < moment().unix()) {
        return  res.status(403).json({error:`el token usado ya expiro`});
    }

    req.nombreUsu = payload.nombre;
    req.tipoUsuario = payload.tipoUsuario
    
    next();
}


const comprobarFeligres = (req, res, next) => {
    if (req.tipoUsuario == 3 ) {
        res.status(403).json({ error:"Eres un Feligres, no tienes acceso a esta accion"});
    } else {
        next();
    }
}
module.exports = {
    checkToken: checkToken,
    comprobarFeligres: comprobarFeligres
}