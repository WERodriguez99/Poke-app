import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { iconFilter } from '../../filterLogos/funcIcons';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'

import S from './create.module.css';
import validate from './validate';

export default function CreatePoke() {
    const store = useSelector(state => state.types);
    const [state, setState] = useState({
        name: undefined,
        sprite_front: '',
        hp: undefined,
        attack: undefined,
        defense: undefined,
        special_attack: undefined,
        special_defense: undefined,
        speed: undefined,
        type: undefined,
        types: [],
        height: undefined,
        weight: undefined,
        mine: true,
    })

    const [errors, setErrors] = useState({})

    const sendData = async ({ name, hp, attack, defense, special_attack, special_defense, speed, types, height, weight }) => {
        try {

            if (name && hp && attack && defense && special_attack && special_defense && speed && types.length > 0 && height && weight) {

                axios.post(`http://localhost:3001/pokeApp/pokemon/create`, state)
                reset()
                swal("Gooooood!!!", "Poke created!", "success");
            }

            else {
                swal("Upppps!", "Incomplete fields", "error")
            }
        }
        catch (e) {
            alert(e)
        }
    }

    const deleteType = e => {
        let id = e.target.id
        return setState({ ...state, types: state.types.filter(t => t.id !== parseInt(id)) })

    }

    const handleChange = e => {

        let d = e.target.id;
        let val = e.target.value;
        setState({ ...state, [d]: val });

        let objError = validate({ ...state, [d]: val }, d)

        objError ? !errors ? setErrors({ [d]: objError[d] }) : setErrors({ ...errors, [d]: objError[d] }) : delete errors[d]

    }

    const add = () => {
        state.type ? !state.types[0] ? setState({ ...state, types: [...state.types, store.filter(t => t.type === state.type)[0]], type: '' }) : state.types[0].type !== state.type ? setState({ ...state, types: [...state.types, store.filter(t => t.type === state.type)[0]], type: '' }) : setState({ ...state, type: '' }) : alert('Insert type')
    }

    const reset = () => {
        setState({
            ...state,
            name: '', sprite_front: '',
            hp: '',
            attack: '',
            defense: '',
            special_attack: '',
            special_defense: '',
            speed: '',
            type: '',
            types: [],
            height: '',
            weight: '',
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div id={S.container}>


            <form method='post' onSubmit={e => handleSubmit(e)}>
                <table id={S.createTable}>
                    <tr colspan='2'>
                        <td>
                            <Link id={S.containerBTN} to="/pokeApp" >
                                <p> X </p>
                            </Link>
                            <label>name</label><br />
                            <input type="text" id='name' autoComplete='off' value={state.name} onChange={e => handleChange(e)} />

                            {errors && errors.name &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.name}</p>
                                    </td>
                                </tr>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>attack</label><br />
                            <input type="number" id='attack' autoComplete='off' value={state.attack} onChange={e => handleChange(e)} />
                            {errors && errors.attack &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.attack}</p>
                                    </td>
                                </tr>)}
                        </td>

                        <td>
                            <label>hp</label><br />
                            <input type="number" id='hp' autoComplete='off' value={state.hp} onChange={e => handleChange(e)} />

                            {errors && errors.hp &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.hp}</p>
                                    </td>
                                </tr>)}
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <label>defense</label><br />
                            <input type="number" id='defense' autoComplete='off' value={state.defense} onChange={e => handleChange(e)} />

                            {errors && errors.defense &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.defense}</p>
                                    </td>
                                </tr>)}
                        </td>
                        <td>
                            <label>speed</label><br />
                            <input type="number" id='speed' autoComplete='off' value={state.speed} onChange={e => handleChange(e)} />

                            {errors && errors.speed &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.speed}</p>
                                    </td>
                                </tr>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>special defense</label><br />
                            <input type="number" id='special_defense' autoComplete='off' value={state.special_defense} onChange={e => handleChange(e)} />

                            {errors && errors.special_defense &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.special_defense}</p>
                                    </td>
                                </tr>)}
                        </td>
                        <td>
                            <label>height</label><br />
                            <input type="number" id='height' autoComplete='off' value={state.height} onChange={e => handleChange(e)} />

                            {errors && errors.height &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.height}</p>
                                    </td>
                                </tr>)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>special attack</label><br />
                            <input type="number" id='special_attack' autoComplete='off' value={state.special_attack} onChange={e => handleChange(e)} />

                            {errors && errors.special_attack &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.special_attack}</p>
                                    </td>
                                </tr>)}
                        </td>
                        <td>
                            <label>weight</label><br />
                            <input type="number" id='weight' autoComplete='off' value={state.weight} onChange={e => handleChange(e)} />

                            {errors && errors.weight &&
                                (<tr className={S.errContainer}>
                                    <td>
                                        <p className={S.error}>{errors.weight}</p>
                                    </td>
                                </tr>)}
                        </td>
                    </tr>

                    <tr colspan='2'>
                        <td id={S.btnContainer}>
                            <button type='submit' onClick={() => sendData(state)}>enviar</button>
                        </td>
                    </tr>
                </table>

            </form>



            <table id={S.tableTypes}>

                <tr colspan='2'>
                    <td>
                        <label>types</label><br />
                        <input id='type' list="types" value={state.type} onChange={e => handleChange(e)} />
                        <datalist id="types">
                            {store && store.map(t => <option value={t.type} />)}
                        </datalist><br />
                        <button id={S.btn} onClick={() => state.types.length < 2 && add()}>add</button>
                    </td>
                </tr>

                {state.types[0] && <tr id={S.trTymes}>
                    <td>
                        <div className={S.typesContainer}>
                            {<button id={state.types[0].id} onClick={e => deleteType(e)}>x</button>}
                            <img src={iconFilter(state.types[0].type)} alt={`Type pokemon: ${state.types[0].type}`} />
                        </div>
                    </td>
                    {state.types[1] && <td>
                        <div className={S.typesContainer}>
                            {<button id={state.types[1].id} onClick={e => deleteType(e)}>x</button>}
                            <img src={iconFilter(state.types[1].type)} alt={`Type pokemon: ${state.types[1].type}`} />
                        </div>
                    </td>}
                </tr>
                }
            </table>

        </div>
    )
}
