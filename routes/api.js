const router = require('express').Router();

const apiAnuncioRouter = require('./api/Anuncio');
const apiUsuariosRouter = require('./api/usuarios');
const apiCredencialesRouter = require('./api/credenciales');
const apitipoUsuarioRouter = require('./api/tipoUsuario');
const apiIncripcionRouter = require('./api/InscripcionRoute');
const apiTipoCursoRouter = require('./api/TipoCursoRoute');
const apiCursoRouter = require('./api/CursoRoute');
const apitipoDocRouter = require('./api/tipoDoc');
const apiServicioRouter = require('./api/servicio');
const apiServicioUsuarioRouter = require('./api/serviUsu');
const apiTipoServicioUsuarioRouter = require('./api/tipoServi');

const middelware = require('./middelwares');

router.use('/InscripcionRoute', apiIncripcionRouter);
router.use('/TipoCursoRoute', apiTipoCursoRouter);
router.use('/CursoRoute', apiCursoRouter);

router.use('/Anuncio', apiAnuncioRouter);



router.use('/usuarios'/* ,middelware.checkToken */, apiUsuariosRouter);
router.use('/tipoUsuario'/* ,middelware.checkToken */, apitipoUsuarioRouter);
router.use('/tipoDoc',/* middelware.checkToken, */ apitipoDocRouter);
router.use('/credenciales', apiCredencialesRouter);

router.use('/servicio', apiServicioRouter);
router.use('/serviUsu', apiServicioUsuarioRouter);
router.use('/tipoServi', apiTipoServicioUsuarioRouter);



module.exports = router;