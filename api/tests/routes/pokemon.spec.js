/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  hp: 27,
  attack: 20,
  defense: 38,
  special_attack: 18,
  special_defense: 13,
  speed: 63,
  height: 23.4,
  weight: 20.6,
};

xdescribe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokeAPP', () => {
    it('should get 200', () =>
      agent.get('/pokeAPP').expect(200)
    );
  });
});



describe('Type route', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('GET /types', () => {
    it('shoul get 404', () => agent.get('/types').expect(200))
  })
})

describe('Poke routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  it('POST', () => {
    agent
      .post('/pokeAPP/pokemon/create')
      .send({
        name: "Pikachu",
        hp: 27,
        attack: 20,
        defense: 38,
        special_attack: 18,
        special_defense: 13,
        speed: 63,
        height: 23.4,
        weight: 20.6,
        types: [{
          id: 1,
          type: "normal"
        }]
      })
      .expect(200)
  });

  describe('Search poke', () => {
    beforeEach(() =>
      agent
        .post('/pokeAPP/pokemon/create')
        .send({
          name: "Pikachu",
          hp: 27,
          attack: 20,
          defense: 38,
          special_attack: 18,
          special_defense: 13,
          speed: 63,
          height: 23.4,
          weight: 20.6,
          types: [{
            id: 13,
            type: "electric"
          }]
        }),
      agent
        .post('/pokeAPP/pokemon/create')
        .send({
          name: "Charizard",
          hp: 80,
          attack: 40,
          defense: 38,
          special_attack: 78,
          special_defense: 23,
          speed: 60,
          height: 50,
          weight: 23,
          types: [{
            id: 10,
            type: "fire"
          },
          {
            id: 3,
            type: "flying"
          }]
        }));

        it('search poke name', () => {
          agent.get('/pokeAPP/pokemon')
          .send({name: 'Pikachu'})
          .expect(200)
        })
  })
})


