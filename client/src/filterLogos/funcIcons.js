import bug from './Bug.png';
import dark from './Dark.png';
import dragon from './Dragon.png';
import electric from './Electric.png';
import fairy from './Fairy.png';
import fighting from './Fighting.png';
import fire from './Fire.png';
import flying from './Flying.png';
import ghost from './Ghost.png';
import grass from './Grass.png';
import ground from './Ground.png';
import ice from './Ice.png';
import normal from './Normal.png';
import poison from './Poison.png';
import psychic from './Psychic.png';
import rock from './Rock.png';
import steel from './Steel.png';
import water from './Water.png';


/* export const typesArr = [ bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water ] */

export const iconFilter = type => {
    
    const filter = {
        bug,
        dark,
        dragon,
        electric,
        fairy,
        fighting,
        fire,
        flying,
        ghost,
        grass,
        ground,
        ice,
        normal,
        poison,
        psychic,
        rock,
        steel,
        water
    }

    return filter[type]

} 