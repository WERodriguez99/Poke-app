const { Router } = require('express');
const typesRoutes = Router();

const { Type } = require('../db.js');

const Types = async () => {
    const DB = await Type.findAll();
    return DB.map(type => { return {id: type.id, type: type.name}});
}

typesRoutes.get('/', async (_req, res) => {
    const types = await Types()

    try {
        res.status(200).json(types)
    }
    catch (err) {
        res.status(404).json(err)
    }
})

module.exports = typesRoutes;