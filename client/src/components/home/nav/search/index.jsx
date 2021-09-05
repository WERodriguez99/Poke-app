import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokeName } from '../../../actions';

//import S from './search.module.css'

export default function SearchPoke() {
    const dispatch = useDispatch()
    const store = useSelector(store => store)
    const [state, setState] = useState(undefined);

    const handleChange = e => {
        const id = e.target.id;
        const value = e.target.value;
        setState({ ...state, [id]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getPokeName(state.name))
        setState({ ...state, name: ''})
    }

    /* useEffect(() => {
        state ? dispatch(getPokeName(state.name)) : dispatch(getPokes(1))

    }, [state]) */

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>

                    <input id='name' list="names" onChange={e => handleChange(e)} value={state && state.name}/>
                    <datalist id="names">
                        {store.names && store.names.map(n => <option value={n.name} />)}
                    </datalist>
                    <button type='submit' >SEARCH</button>
                </div>
            </form>
        </div>
    )
}
