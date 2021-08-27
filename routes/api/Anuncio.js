const router = require('express').Router();

const Usuarios = require('../../database/models/usuario');
const bcrypt = require('bcryptjs');
const Anuncio = require('../../database/models/Anuncio');

//consultar todos los usuarios
router.get('/', async(req, res) => {
    const anuncio = await Anuncio.findAll(
        {
        include: [{
            model: Usuarios,
            attributes: ['nombreUsuario']
            }],

        attributes: ['idAnuncio','estadoAnuncio','mensajeAnuncio','fechaInicio','fechaFinal']
    });
   
     res.json(anuncio);
});



router.get('/:idAnuncio', async (req, res) => {
    const anuncio =  Anuncio.findAll(
    {
        include: {
            model: Usuarios,
            attributes: ['nombreUsuario']
        },
        attributes: ['idAnuncio','estadoAnuncio','mensajeAnuncio','fechaInicio','fechaFinal']
    });
   
     res.json(anuncio);
});


// CREATE 
router.post('/', async (req, res) => {
   
   const anuncio = Anuncio.create(  {
    estadoAnuncio: req.body.estadoAnuncio,
    mensajeAnuncio: req.body.mensajeAnuncio,
    fechaInicio: req.body.fechaInicio,
    fechaFinal: req.body.fechaFinal
   });
    res.json({ anuncio, success:'Anuncio creado Con Exito' });
     
});

// UPDATE
router.put('/:idAnuncio', async(req, res) => {
     Anuncio.update({
        estadoAnuncio: req.body.estadoAnuncio,
        mensajeAnuncio: req.body.mensajeAnuncio,
        fechaInicio: req.body.fechaInicio,
        fechaFinal: req.body.fechaFinal
    },{
        where: { idAnuncio: req.params.idAnuncio }
    });
    const usuario = Usuarios.update({
        nombreUsuario: req.body.nombreUsuario
    }, {
        where: { UsuarioFK: req.params.idUsuario }
    });

     res.json({success:"Anuncio actualizado con exito"});
});

router.delete('/:idAnuncio', async(req, res) => {
    Anuncio.destroy({
        where: { idAnuncio: req.params.idAnuncio}
    });
     res.json({succes: 'Anuncio eliminado con exito'});
});

module.exports = router;