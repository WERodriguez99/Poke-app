import React from 'react';
import S from './card.module.css';

import {iconFilter} from '../../../filterLogos/funcIcons';

export default function Card({ id, name, img, types }) {

    return (
        <div key={id} id={S.pokeCard}>
            <table>
                <tr className={S.pokeImg}> 
                    <td>
                        <img src={img} alt="IMG poke" />
                    </td>
                </tr>

                <div className={S.containerData}>
                    <tr className={S.pokeName}>
                        <td>
                            <p>{name}</p>
                        </td>
                    </tr>
                    {types && <tr className={S.containerTypes}>
                     
                        {types.slot2 ? 
                        <td className={S.pokeType}> 
                            <img src={iconFilter(types.slot1)} alt="IMG type poke"/> 
                            <img src={iconFilter(types.slot2)} alt="IMG type poke"/> 
                        </td> : 
                        <td className={S.pokeType}> 
                            <img src={iconFilter(types.slot1)} alt="IMG type poke"/>  
                        </td>} 
                                           
                    </tr>}
                </div>
            </table>
        </div>
    )
}
