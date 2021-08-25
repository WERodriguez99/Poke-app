export default function validate(state, key) {

    const error = {
        name: !state[key] && { [key]: `${key} is required` },
        hp: !state[key] && { [key]: `${key} is required` },
        attack: !state[key] && { [key]: `${key} is required` },
        defense: !state[key] && { [key]: `${key} is required` },
        special_attack: !state[key] && { [key]: `SP.Attack is required` },
        special_defense: !state[key] && { [key]: `SP.Defense is required` },
        speed: !state[key] && { [key]: `${key} is required` },
        type: !state[key] && { [key]: `${key} is required` },
        height: !state[key] &&  { [key]: `${key} is required` },
        weight: !state[key] &&  { [key]: `${key} is required` },
    }

    return error[key]



    /* if(!state.name) errors.name = `Name is required`;
    if (!state.attack) errors.attack = `Attack is required`;
    if (!state.hp) errors.hp = `HP is required`;
    if (!state.defense) errors.defense = `Defense is required`;
    if (!state.speed) errors.speed = `Speed is required`;
    if (!state.special_defense) errors.special_defense = `SP.defense is required`;
    if (!state.height) errors.height = `Height is required`;
    if (!state.special_attack) errors.special_attack = `SP.attack is required`;
    if (!state.weight) errors.weight = `Weight is required`; */


    /* for(let key in state) {
        if(!state[key]) errors[key] = `${key} is required`;
    }  */

}