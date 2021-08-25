const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Pokemon.sync({ force: true }),  
  Pokemon.create({
    name: "Pikachu",
    hp: 27,
    attack: 20,
    defense: 38,
    special_attack: 18,
    special_defense: 13,
    speed: 63,
    height: 23.4,
    weight: 20.6,
  }),

  Pokemon.create({
    name: "Chimchard",
    hp: 15,
    attack: 30,
    defense: 38,
    special_attack: 28,
    special_defense: 13,
    speed: 50,
    height: 13,
    weight: 20,
  })
  
  
  );

  describe('Pokemon name', ()=> {
    
    it('name pke', (done)=> {
      Pokemon.findAll()
      .then(r => expect(r[0].name).to.be.true("Pikachu"))
      .catch(()=>done())
    })

    it('name fake', (done)=> {
      Pokemon.findAll()
      .then(r => expect(r[0].name).to.be.false("Chimchard"))
      .catch(()=>done())
    })
  })

  xdescribe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });


});
