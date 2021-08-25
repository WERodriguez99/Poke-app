import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getTypes } from '../../actions';
import  SearchPoke  from './search/index';

import S from './nav.module.css';

export default function Nav() {
 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes())
    }, [])


    return (
        <div id={S.containerNav}>
            <ol>
                <Link style={{ textDecoration: 'none', color: 'black'  }} to='/pokeApp'>
                    <li className={S.liNav}><p>Home</p></li>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/pokeApp/create'>
                    <li className={S.liNav}><p>Create</p></li>
                </Link>
                <li id={S.search}><SearchPoke/></li>   
            </ol>

        </div>
    )
}
