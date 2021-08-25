const { Router } = require('express');

const axios = require('axios');
const { Pokemon, Type, poke_type } = require('../db.js');
const pokesRoutes = Router();

const { Op } = require('sequelize')

const Pokes = async () => {

    try {
        let url = await axios.get('https://pokeapi.co/api/v2/pokemon');
        let pokes = []
        const generation_v = 'generation-v'
        const black_white = 'black-white'

        while (url.data.next) {
            pokes = [...pokes, ...url.data.results]
            let next = await axios.get(url.data.next)
            url = next
        }
        
        pokes.map(async poke => {
            const res = await axios.get(poke.url);
            const type = {
                slot1: await Type.findAll({ where: { name: res.data.types[0].type.name } }),
                slot2: res.data.types[1] ? await Type.findAll({ where: { name: res.data.types[1].type.name } }) : null
            }

            const pokeData = {
                /* id: res.data.id, */
                name: res.data.name.replace('-', ' '),
                sprite_front: res.data.sprites.versions[generation_v][black_white].animated.front_default ? res.data.sprites.versions[generation_v][black_white].animated.front_default : res.data.sprites.front_default,

                hp: res.data.stats[0].base_stat,
                attack: res.data.stats[1].base_stat,
                defense: res.data.stats[2].base_stat,
                special_attack: res.data.stats[3].base_stat,
                special_defense: res.data.stats[4].base_stat,
                speed: res.data.stats[5].base_stat,

                types: type.slot2 ? [
                    {
                        id: type.slot1[0].dataValues.id,
                        type: type.slot1[0].dataValues.name,
                    },

                    {
                        id: type.slot2[0].dataValues.id,
                        type: type.slot2[0].dataValues.name,
                    }

                ] : [

                    {
                        id: type.slot1[0].dataValues.id,
                        type: type.slot1[0].dataValues.name,
                    },
                ],

                height: res.data.height,
                weight: res.data.weight,


            };

            pokeCreate(pokeData)
        })
    }

    catch (err) {
        console.log(`Error Pokes: ${err}`)
    }
}

const PokesExistg = async () => {
    try {
        const pokes = await Pokemon.findAll({ where: { mine: false }, include: Type })

        return pokes.map(poke => {
            return {
                id: poke.id,
                name: poke.name.replace('-', ' '),
                sprite_front: poke.sprite_front,
                types: {
                    slot1: poke.types[0].name,
                    slot2: poke.types[1] ? poke.types[1].name : null
                },
                stats: {
                    hp: poke.hp,

                    attack: poke.attack,

                    defense: poke.defense,

                    special_attack: poke.special_attack,

                    special_defense: poke.special_defense,

                    speed: poke.speed,
                },
                height: poke.height,
                weight: poke.weight,
                mine: poke.mine,
            }
        })
    }

    catch (err) {
        console.log('Error existg', err)
    }

}

const PokesCreates = async () => {
    try {
        const pokes = await Pokemon.findAll({ where: { mine: true }, include: Type })

        return pokes.map(poke => {
            return {
                id: poke.id,
                name: poke.name.replace('-', ' '),
                sprite_front: poke.sprite_front,
                types: {
                    slot1: poke.types[0].name,
                    slot2: poke.types[1] ? poke.types[1].name : null
                },
                stats: {
                    hp: poke.hp,

                    attack: poke.attack,

                    defense: poke.defense,

                    special_attack: poke.special_attack,

                    special_defense: poke.special_defense,

                    speed: poke.speed,
                },
                height: poke.height,
                weight: poke.weight,
                mine: poke.mine,
            }
        })
    }

    catch (err) {
        console.log('Error existg', err)
    }

}

const Paginate = p => {
    const pokeRender = 12
    let page = p+1
    return {
        page_size: pokeRender * page,
        skip: (page - 1) * pokeRender
    }
}

const PokeName = async name => {

    return await Pokemon.findAll({ include: Type, where: { name: { [Op.iLike]: name } } })

}

const PokeID = async id => {


    poke = await Pokemon.findByPk(id, { include: Type });
    return {
        id: poke.id,
        name: poke.name.replace('-', ' '),
        sprite_front: poke.sprite_front,
        types: {
            slot1: poke.types[0].name,
            slot2: poke.types[1] ? poke.types[1].name : null
        },
        stats: {
            hp: poke.hp,

            attack: poke.attack,

            defense: poke.defense,

            special_attack: poke.special_attack,

            special_defense: poke.special_defense,

            speed: poke.speed,
        },
        height: poke.height,
        weight: poke.weight,

    }
}


const Filter = async () => {

    
    const existg = await PokesExistg();
    const creates = await PokesCreates();
    
    
    existg.length <= 0 && await Pokes();

    return function (order, type_stats, filter, data) {

        const filt = {

            DEFAULT: order === 'DEFAULT' && {
                UNDEFINED: {

                    ALL: [...creates, ...existg],

                    EXISTG: existg,

                    CREATES: creates,
                },

                TYPE: {
                    ALL: [...creates, ...existg].filter(poke => poke.types.slot1 === data || poke.types.slot2 === data),

                    EXISTG: existg.filter(poke => poke.types.slot1 === data || poke.types.slot2 === data),

                    CREATES: creates.filter(poke => poke.types.slot1 === data || poke.types.slot2 === data),
                },

                STATS: {
                    ALL:  [...creates, ...existg].sort((a, b) => a.stats[data] > b.stats[data] ? 1 : -1 || 0),

                    EXISTG: existg.sort((a, b) => a.stats[data] > b.stats[data] ? 1 : -1 || 0),

                    CREATES: creates.sort((a, b) => a.stats[data] > b.stats[data] ? 1 : -1 || 0)
                }
            },

            DESCENDANT: order === 'DESCENDANT' && {
                UNDEFINED: {
                    ALL:  [...creates, ...existg].sort((a, b) => a.name > b.name ? 1 : -1 || 0),

                    EXISTG: existg.sort((a, b) => a.name < b.name ? 1 : -1 || 0),

                    CREATES: creates.sort((a, b) => a.name < b.name ? 1 : -1 || 0),
                },

                TYPE: {
                    ALL:  [...creates, ...existg].filter(poke => poke.types.slot1 === data || poke.types.slot2 === data).sort((a, b) => a.name > b.name ? 1 : -1 || 0),

                    EXISTG: existg.filter(poke => poke.types.slot1 === data || poke.types.slot2 === data).sort((a, b) => a.name > b.name ? 1 : -1 || 0),

                    CREATES: creates.filter(poke => poke.types.slot1 === data || poke.types.slot2 === data).sort((a, b) => a.name > b.name ? 1 : -1 || 0),
                },

                STATS: {
                    ALL:  [...creates, ...existg].sort((a, b) => a.stats[data] < b.stats[data] ? 1 : -1 || 0),

                    EXISTG: existg.sort((a, b) => a.stats[data] < b.stats[data] ? 1 : -1 || 0),

                    CREATES: creates.sort((a, b) => a.stats[data] < b.stats[data] ? 1 : -1 || 0),
                }
            },

            ASCENDANT: order === 'ASCENDANT' && {
                UNDEFINED: {
                    ALL:  [...creates, ...existg].sort((a, b) => a.name > b.name ? 1 : -1 || 0).reverse(),

                    EXISTG: existg.sort((a, b) => a.name > b.name ? 1 : -1 || 0).reverse(),

                    CREATES: creates.sort((a, b) => a.name > b.name ? 1 : -1 || 0).reverse(),
                },

                TYPE: {
                    ALL:  [...creates, ...existg].filter(poke => poke.types.slot1 === data || poke.types.slot2 === data).sort((a, b) => a.name > b.name ? 1 : -1 || 0).reverse(),

                    EXISTG: existg.filter(poke => poke.types.slot1 === data || poke.types.slot2 === data).sort((a, b) => a.name > b.name ? 1 : -1 || 0).reverse(),

                    CREATES: creates.filter(poke => poke.types.slot1 === data || poke.types.slot2 === data).sort((a, b) => a.name > b.name ? 1 : -1 || 0).reverse(),
                },

                STATS: {
                    ALL:  [...creates, ...existg].sort((a, b) => a.stats[data] < b.stats[data] ? 1 : -1 || 0).reverse(),

                    EXISTG: existg.sort((a, b) => a.stats[data] < b.stats[data] ? 1 : -1 || 0).reverse(),

                    CREATES: creates.sort((a, b) => a.stats[data] < b.stats[data] ? 1 : -1 || 0).reverse(),
                }
            }
        
        }

        return filt[order][type_stats][filter];
    }
}

const pokeCreate = async ( { name, sprite_front, hp, attack, defense, special_attack, special_defense, speed, height, weight, types, mine=false} ) => {


    let typeId = [];
    types.map(type => typeId.push(type.id))

    try {
        let [poke, created] = await Pokemon.findOrCreate({
            where: {
                name, sprite_front, hp, attack, defense, special_attack, special_defense, speed, height, weight, mine
            }
        })

        await poke.setTypes(typeId);

        return created
    }
    catch (err) {
        console.log('error ruta create: ', err);
    }
}


pokesRoutes.get('/', async (req, res) => {

    const { page, order, type_stats, filter, data } = req.query;
    const pokes = await Filter();

    const { skip, page_size } = Paginate(parseInt(page));
    try {
        res.status(200).json(pokes(order, type_stats, filter, data).slice(skip, page_size))
    }
    catch (err) {
        console.log(err)
        res.status(404).json('pokes not found: ', err)
    }
});

pokesRoutes.get('/pokesName', async (__req, res) => {
    try {
        const pokes = await Pokemon.findAll()
        const names = pokes.map(poke => { 
            return {
                name : poke.name.replace('-', ' ')
            }
        });

        res.status(200).json(names)
    }

    catch(err){
        res.status(404).json(err)
    }
})

pokesRoutes.get('/pokemon/:id', async (req, res) => {
    const id = req.params.id
    const pokemon = await PokeID(id)

    try {
        res.status(200).json(pokemon)
    }
    catch (err) {
        res.staus(404).json(err)
    }

});

pokesRoutes.get('/pokemon', async (req, res) => {
    const name = req.query.name;

    try {
        const pokemon = await PokeName(name)
        res.status(200).json(pokemon)
    }
    catch (err) {
        res.status(404).json(err)
    }

});

pokesRoutes.post('/pokemon/create', async (req, res) => {

    const pokeData = req.body;
    const create = await pokeCreate(pokeData)

    try {
        res.status(200).json(create)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

pokesRoutes.get('/allPokesLenghts', async (req, res) => {
    try {
        const { order, type_stats, filter, data } = req.query;
        const pokes = await Filter();

        res.status(200).json(pokes(order, type_stats, filter, data).length)
    }
    catch(err){
        res.status(400).json({err: err})
    }
})

module.exports = pokesRoutes;