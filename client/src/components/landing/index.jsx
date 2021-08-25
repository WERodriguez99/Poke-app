import React from 'react';
import { Link } from 'react-router-dom';
import S from './landing.module.css';

export default function Landing () {
    return (
        <div id={S.landing}>
            <Link to='/pokeAPP'>
                <div id={S.back}>
                </div>
            </Link>
        </div>
    )
}