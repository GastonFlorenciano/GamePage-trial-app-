import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGameByQuery } from '../Actions'
import '../CSS/SearchBar.css'

export default function SearchBar({setCurrentPage}){

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const allGames = useSelector(state => state.allGames)

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        const gameFilter = allGames.filter(g => g.name.toLowerCase().includes(name.toLowerCase()))
        if(name && (!gameFilter || gameFilter.length === 0)){
            alert('No existe el juego ingresado!')
        }
        
        else if(!name){
            alert('¡Para buscar ingrese un nombre!')
        }
        else{
            dispatch(filterGameByQuery(name))
            setName('')
            setCurrentPage(1)
        }
    }

    return(
        <div className='princ'>
            <form  onSubmit={e => handleSubmit(e)}>
            <input 
            className='inputSearch'
            type="text"
            placeholder='Buscar juego...'
            onChange={e => handleInputChange(e)}
            value={name}
            />
            <button className='btnSearch' type='submit'>🔎</button>
            </form>
        </div>
)
}
        