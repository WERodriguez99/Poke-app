import { GET_POKE, GET_TYPES, POKE_DETAILS, GET_NAMES, CLEAN_DATA, GET_LENGTH, GET_PAGE } from './varActions';
import axios from 'axios';

export function getPokes({ page, order, type_stats, filter, data }){
    return async function (dispatch) {
        const pokes = await axios.get(`/pokeAPP?page=${page}&order=${order}&type_stats=${type_stats}&filter=${filter}&data=${data}`);

        dispatch({
            type: GET_POKE, payload: pokes.data
        })
    };
};

export function getTypes(){
    return async function (dispatch){
        const types = await axios.get("/types");

        dispatch({
            type: GET_TYPES, payload: types.data
        })
    };
};

export function getNames(){
    return async function (dispatch){
        const names = await axios.get("/pokeAPP/pokesName");

        dispatch({
            type: GET_NAMES, payload: names.data
        })
    };
};

export function getDetails(id){
    return async function (dispatch){
        const details = await axios.get(`/pokeAPP/pokemon/${id}`);

        dispatch({
            type: POKE_DETAILS, payload: details.data
        })
    };
};

export function getPokeName(name){
    return async function (dispatch){
        const poke = await axios.get(`/pokeAPP/pokemon?name=${name}`);

        dispatch({
            type: GET_POKE, payload: poke.data
        })
    };
};

export function getLength({ order, type_stats, filter, data }) {
    return async function (dispatch){
        const length = await axios.get(`/pokeAPP/allPokesLenghts?order=${order}&type_stats=${type_stats}&filter=${filter}&data=${data}`);

        dispatch({
            type: GET_LENGTH, payload: length.data
        })
    }
}

export function getPage(num) {
    return function (dispatch) {
        dispatch({
            type: GET_PAGE, payload: num
        })
    }
}

export function cleanData() {
    return function (dispach) {
        dispach({
            type: CLEAN_DATA, payload: undefined
        })
    }
}
