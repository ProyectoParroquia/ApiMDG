const express = require('express');
const app = express();
const sequelize = require('./database/db');
const path =require('path');

//solucion a CORS
const cors  = require('cors')
app.use(cors())

app.use(express.static(path.join(__dirname,'./routes/images')));

app.use(express.static(path.join(__dirname,'./routes/requisitos')))
require('dotenv').config();


// Setting
const PORT = process.env.PORT || 3000;

// Middleware
// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get('/', function (req, res) {
    res.json("Hola Mundo");
});

/* //Solucion A cors
const cors = require('./helpers/CorsHelper')
//referencia a la carpeta de rutas
 */
app.use('/api', require('./routes/api'));


// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arrancado en http://localhost:${PORT}`);

    // Conectase a la base de datos
    // Force true: DROP TABLES
    sequelize.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })

});