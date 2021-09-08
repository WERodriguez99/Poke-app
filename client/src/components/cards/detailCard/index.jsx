import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { iconFilter } from '../../../filterLogos/funcIcons';
import { Link } from 'react-router-dom'

import { cleanData } from '../../actions';
import S from './details.module.css';
export default function DetailPoke() {

    const store = useSelector(state => state.dataPoke);
    const dispatch = useDispatch()

    //const [ type, setType ] = useState(undefined)

    return (
        <div id={S.container}>
            {
                store && <table id={S.containerDetails}>
                    <tr colspan='2' id={S.containerBTN}>
                        <td>
                            <Link style={{ textDecoration: 'none', color: 'black'  }} to="/pokeApp" onClick={() => dispatch(cleanData())}>
                                <p> X </p>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td  colspan='2'>
                            <img src={store.sprite_front} alt="IMG poke" id={S.imgPoke} />
                        </td>
                    </tr>


                        <tr>
                            <td className={S.ns}  colspan='2'>
                                <h2>{store.name}</h2>
                            </td>
                        </tr>

                        <tr>
                            <td className={S.ns}  colspan='2'>
                                <h3>Stats</h3>
                            </td>
                        </tr>

                    <div id={S.containerData}>
                        <tr>
                            <td>hp</td>
                            <td>{store.stats.hp}</td>
                        </tr>
                        <tr>
                            <td>attack</td>
                            <td>{store.stats.attack}</td>
                        </tr>
                        <tr>
                            <td>defense</td>
                            <td>{store.stats.defense}</td>
                        </tr>
                        <tr>
                            <td>sp attack.</td>
                            <td>{store.stats.special_attack}</td>
                        </tr>
                        <tr>
                            <td>sp defense.</td>
                            <td>{store.stats.special_defense}</td>
                        </tr>
                        <tr>
                            <td>speed</td>
                            <td>{store.stats.speed}</td>
                        </tr>
                    </div>

                        <tr id={S.containerTypes}>
                            <td><img src={iconFilter(store.types.slot1)} alt="IMG type poke" /></td>
                            { store.types.slot2 && <td><img src={iconFilter(store.types.slot2)} alt="IMG type poke"/></td> }
                        </tr>
                </table>
            }
        </div>
    )
}
