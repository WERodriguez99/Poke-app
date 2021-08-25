import React from 'react';
import { useSelector } from 'react-redux';

import Cards from '../cards';
import FilterPage from '../home/filterPage';
import S from './home.module.css';
import Loader from '../loader';

export default function Home() {

    const store = useSelector(store => store.pokes)
    return (
        <div id={S.container}>
            <div id={S.background}>

                <FilterPage />
                {
                    Array.isArray(store) || typeof store === 'object' ? <Cards /> : <div id={S.imgCarga}> <Loader/> </div>
                }
                </div>
        </div>
    )
}
