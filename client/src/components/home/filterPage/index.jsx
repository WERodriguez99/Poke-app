import React, { useState, useEffect } from 'react';
import Type from './types/type'
import { useDispatch, useSelector } from 'react-redux';

import { getPokes, getLength, getNames } from '../../actions';
import Pagination from './pagination'
import S from './filterPage.module.css';

export default function FilterPage() {

    const store = useSelector(store => store);
    const dispatch = useDispatch();
    
    const [state, setState] = useState({
        page: 0,
        order: 'DEFAULT',
        type_stats: 'UNDEFINED',
        filter: 'ALL',
        data: '',
    });

    const [switc, setSwitc] = useState({
        type: false,
        stats: false,
    })

    useEffect(() => {
        setState({...state, page: store.page})
    }, [store.page])

    useEffect(() => {
        dispatch(getPokes(state))
        dispatch(getLength(state))
        dispatch(getNames())
    }, [state])


    const card = type => {
        return (
            <Type
                key={type.id}
                id={type.id}
                type={type.type}
            />

        )
    }

    const types = () => store.types && store.types.map(type => <li value={type.type} className={S.type} onClick={() => setState({ ...state, type_stats: 'TYPE', page: 0, data: type.type })}>{card(type)}</li>);
                                          
    const upgradeTypeStats = () => {
        setState({...state, data: '', type_stats: 'UNDEFINED'})
        setSwitc({type: false, stats: false})
    }
    
    const upgradeState = (e) => {
        const value = e.target.value;
        const id = e.target.name;

        id !== 'type_stats' ? setState({ ...state, page: 0, [id]: value}) : value === 'type' ? setSwitc({type: switc.type?false:true, stats: false}) : value === 'stats' ? setSwitc({stats: switc.stats?false:true, type: false}) : value === 'none' ? upgradeTypeStats() : setSwitc({type: false, stats: false});
    }


    return (
        <div id={S.container}>

            {<div id={S.containerFilters}>

                <select onChange={e => upgradeState(e)} name="type_stats">
                    <option id='type_stats' value="none"> types/stats </option>
                    <option id='type_stats' value="type"> Types </option>
                    <option id='type_stats' value="stats"> Stats </option>
                </select>

                <select onChange={e => upgradeState(e)} name="filter" >
                    <option name='filter' value="ALL" selected>All pokes</option>
                    <option name='filter' value="EXISTG">pokes existg</option>
                    <option name='filter' value="CREATES">pokes creates</option>
                </select>

                <select onChange={e => upgradeState(e)} name="order">
                    <option name='order' value="DEFAULT" selected>Order</option>
                    <option name='order' value="ASCENDANT">ascendant</option>
                    <option name='order' value="DESCENDANT">descendant</option>

                </select>
            </div>}
            {switc.type && <ul id={S.containerTypes}>{types()}</ul>}
            
            { switc.stats && <ul id={S.containerStats}>
                <li className={S.stats} onClick={() => setState({ ...state, page: 0, type_stats: 'STATS', data: 'hp'})}>HP</li>
                <li className={S.stats} onClick={() => setState({ ...state, page: 0, type_stats: 'STATS', data: 'attack'})}>ATTACK</li>
                <li className={S.stats} onClick={() => setState({ ...state, page: 0,  type_stats: 'STATS', data: 'defense'})}>DEFENSE</li>
                <li className={S.stats} onClick={() => setState({ ...state, page: 0, type_stats: 'STATS', data: 'special_attack'})}>SPECIAL AT.</li>
                <li className={S.stats} onClick={() => setState({ ...state, page: 0, type_stats: 'STATS', data: 'special_defense'})}>SPECIAL DEF.</li>
                <li className={S.stats} onClick={() => setState({ ...state, page: 0, type_stats: 'STATS', data: 'speed'})}>SPEED</li>
            </ul>}

            <Pagination/>
        </div>
    )
}
