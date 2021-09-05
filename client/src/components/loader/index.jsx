import React from 'react'
import S from './loader.module.css'
//import img from '../home/img/psyduck_02.jpg'

export default function Loader() {
    return (
        <div id={S.container}>
            {/* <img style={{background: 'none'}} src={img} alt="img landing" /> */}
            <div id={S.loader}></div>
        </div>
    )
}
