import React from 'react';
import S from './type.module.css';
import { iconFilter } from '../../../../../filterLogos/funcIcons'

export default function Type({ type }) {

    return (
        <div>
            <div id={S.containerType}>
                <img src={iconFilter(type)}/>
            </div>
        </div>
    )
}
