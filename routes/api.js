const router = require('express').Router();

const apiAnuncioRouter = require('./api/AnuncioRoute');
const apiUsuariosRouter = require('./api/usuarios');
const apiCredencialesRouter = require('./api/credenciales');
const apitipoUsuarioRouter = require('./api/tipoUsuario');
const apiRequisitosRouter = require('./api/RequisitosRoute');
const apiEstadoRouter = require('./api/EstadoRoute');
const apiInscriRequiRouter = require('./api/InscriRequiRoute');
const apiInscripcionRouter = require('./api/InscripcionRoute');
const apiTipoCursoRouter = require('./api/TipoCursoRoute');
const apiCursoRouter = require('./api/CursoRoute');
const apiCursoRequisitoRouter = require('./api/CursoRequisitos');
const apitipoDocRouter = require('./api/tipoDoc');


const middelware = require('./middelwares');


router.use('/InscriRequi',apiInscriRequiRouter);
router.use('/CursoRequisito', apiCursoRequisitoRouter);
router.use('/TipoCurso', apiTipoCursoRouter);
router.use('/Curso', apiCursoRouter);
router.use('/Curso/img',  apiCursoRouter);
router.use('/Requisito', apiRequisitosRouter);
router.use('/Inscripcion', apiInscripcionRouter);
router.use('/Estado', apiEstadoRouter);

router.use('/Anuncio', apiAnuncioRouter);


router.use('/usuarios', apiUsuariosRouter);
router.use('/tipoUsuario', apitipoUsuarioRouter);
router.use('/tipoDoc', apitipoDocRouter);
router.use('/credenciales', apiCredencialesRouter);





module.exports = router;