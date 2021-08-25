import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetails } from '../actions'

import S from './cards.module.css'
import Card from './pokeCard';

export default function Cards () {
    const store = useSelector(store => store);
    const dispatch = useDispatch()

    const card = (poke) => {
        return <Card
                    key={poke.id}
                    id={poke.id}
                    name={poke.name}
                    img={poke.sprite_front}
                    types={poke.types}
                    />
    }

    const poke = () => Array.isArray(store.pokes) ? store.pokes.map(poke => <Link style={{ textDecoration: 'none', color: 'black' }} to={`pokeApp/pokemon/${poke.id}`} onClick={()=> dispatch(getDetails(poke.id))}><div className={S.cards}>{card(poke)}</div></Link>) : card(store.pokes)
    
    return (
        <div>
            {poke()}
        </div>
    )
}
