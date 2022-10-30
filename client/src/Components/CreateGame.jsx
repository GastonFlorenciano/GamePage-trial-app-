import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { postGame, getGenres } from '../Actions'
import '../CSS/CreateGame.css'



function validate(input){
    let errors = {}
    if(!input.name) errors.name = 'Ingrese un nombre'
    if(!input.description) errors.description = 'El juego debe tener una descripción'
    if(!input.rating || input.rating < 1 || input.rating > 5) errors.rating = 'El rating debe ser entre 1 a 5'
    if(!input.released) errors.released = 'Debe tener fecha de lanzamiento'
    if(!input.platform.length) errors.platform = 'Ingrese las plataformas del videojuego' 
    return errors
}

export default function CreateGame(){
    const dispatch = useDispatch();
    const history = useHistory()
    const allGenres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    const [ input, setInput ] = useState({
        name: '',
        released: '',
        rating: '',
        platform: '',
        genres: [],
        description: ''
    })
    const [errors, setErrors] = useState({})


    function handleChange(e){
        if(e.target.name === 'genres' || e.target.name === 'platform'){
            setInput({
                ...input,
                [e.target.name]: [e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }else{
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
    }


    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        const errorSubmit = validate(input)
        if(Object.values(errorSubmit).length !== 0 || !input.genres.length){
            alert('Datos erroneos o faltantes')
        }else{
        dispatch(postGame(input))
        alert('¡Juego creado con exito!')
        setInput({
            name: '',
            released: '',
            rating: '',
            platform: '',
            genres: [],
            description: ''
        })
        history.push('/home')
    }
    }


    function handleDelete(e){
        e.preventDefault()
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e.target.value)
        })
    }


    function handleSelectGenre(e) {
        if(!input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
    }


    return(
        <div className='contForm'>
            <div className='titleForm'>
                <h1>CREA TU JUEGO</h1>
            </div>
            <div className='btnBk'>
                <button className="btnBack"><Link className="linkBackHome" to='/home'>«</Link></button>
            </div>
            <div className='box'>
                <form className='forms'>
                    <input 
                    type="text" 
                    placeholder='Nombre de tu juego...'
                    className='inputsForm'
                    name='name'
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                    <input 
                    type="text" 
                    placeholder='URL de la imagen...'
                    className='inputsForm'
                    name='image'
                    value={input.image}
                    onChange={(e) => handleChange(e)}
                    />
                    <input 
                    type="text" 
                    placeholder='Fecha de lanzamiento... Ej: 00/00/0000'
                    className='inputsForm'
                    name='released'
                    value={input.released}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.released && (
                            <p>{errors.released}</p>
                        )
                    }
                    <input 
                    type="text" 
                    placeholder='Rating...'
                    className='inputsForm'
                    name='rating'
                    value={input.rating}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.rating && (
                            <p>{errors.rating}</p>
                        )
                    }
                    <input 
                    type="text" 
                    placeholder='Plataformas disponibles...'
                    className='inputsForm'
                    name='platform'
                    value={input.platform}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.platform && (
                            <p>{errors.platform}</p>
                        )
                    }
                    <textarea 
                    type="text" 
                    placeholder='Descipción del juego...'
                    className='inputsForm'
                    name='description'
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.description && (
                            <p>{errors.description}</p>
                        )
                    }
                </form>
            
        
                <div className='gens'>
                    <select className='selectGen' onChange={(e) => handleSelectGenre(e)}>
                        <option>Generos</option>
                        {
                            allGenres?.map((genre, i) => {
                                return (
                                    <option key={i} value={genre}>{genre}</option>
                                )
                            })
                        }
                    </select>
                    <div>
                        {
                            input.genres?.map((e, i) => (
                                <div key={i}>
                                    <p className='inputGen'>{e}</p>
                                    <br />
                                    <button className='btnX' value={e} onClick={(e) => handleDelete(e)}>X</button>
                                </div>
                            ))
                        }
                        {
                            errors.genres && (
                                <p>{errors.genres}</p>
                                )
                            }   
                    </div>
                </div>
                </div>
            <div>
                <button className='btnCreate' type='submit' onClick={(e) => handleSubmit(e)}>Crear Videojuego</button>
                
            </div>
        </div>

    )
}