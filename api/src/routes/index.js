const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getGameByQuery, getGameById, postGame, deleteGame } = require('../controllers/gameController');
const { getGenres } = require('../controllers/genreController')
const {Videogame} = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getGameByQuery)

router.get('/genres', getGenres)

router.get('/videogame/:id', getGameById)

router.post('/videogames', postGame)

router.delete('/:id', deleteGame)



module.exports = router;