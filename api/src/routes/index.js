const { Router } = require('express');

const pokesRoutes = require('./pokes.routes');
const typesRoutes = require('./types.routes');
const router = Router();


router.use('/pokeAPP', pokesRoutes);

router.use('/types', typesRoutes);

module.exports = router;
