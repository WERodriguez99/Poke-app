const initialState = {
    pokes: undefined,
    names: undefined,
    dataPoke: undefined,
    types: undefined,
    all: undefined,
    page: 0
}

export default function rootReducer(state=initialState, action){
    const GETs = {
        GET_POKE: {...state, pokes: action.payload},
        GET_TYPES: {...state, types: action.payload},
        POKE_DETAILS: {...state, dataPoke: action.payload},
        GET_NAMES: {...state, names: action.payload},
        CLEAN_DATA: {...state, dataPoke: action.payload},
        GET_LENGTH: {...state, all: action.payload},
        GET_PAGE: {...state, page: action.payload},
    };

    return GETs[action.type] || state;
}