import React from 'react';
import S from './card.module.css';

import {iconFilter} from '../../../filterLogos/funcIcons';

export default function Card({ id, name, img, types }) {

    return (
        <div key={id} id={S.pokeCard}>
            <table>
                <tr className={S.pokeImg}>  <img src={img} alt="" /></tr>

                <div className={S.containerData}>
                    <tr className={S.pokeName}><p>{name}</p></tr>
                    {types && <tr className={S.containerTypes}>
                     
                        {!Array.isArray(types) ? <td className={S.pokeType}> <img src={iconFilter(types.slot1)}/> <img src={iconFilter(types.slot2)}/> </td> : <td className={S.pokeType}> <img src={iconFilter(types[0].name)}/> { types[1] && <img src={iconFilter(types[1].name)}/> } </td>} 
                    
                    </tr>}
                </div>
            </table>
        </div>
    )
}
