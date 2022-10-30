import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getGames, getGenres, filterByGenres, orderByName, filterCreated, orderByRating } from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import '../CSS/Home.css'
import loading from '../img/3F3F.gif'
import title from '../img/gamepage2.png'



export default function Home(){
    const dispatch = useDispatch()
    const allGames = useSelector(state=> state.games)
    const allGenres = useSelector(state=> state.genres)
    const [order, setOrder] = useState('')
    const [rating, setRating] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)
   
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getGames());
        dispatch(getGenres());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getGames());
    }
    function handleFilterByGenre(e) {
        e.preventDefault()
        if (e.target.value === 'all') {
            dispatch(getGames())
        } else {
            dispatch(filterByGenres(e.target.value))
            setCurrentPage(1)
        }
    }
    function handleOrder(e){
        e.preventDefault()
        if (e.target.value === 'all') {
            dispatch(getGames())
        }else{
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
        }
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleOrderByRating(e) {
        if (e.target.value === 'all') {
            dispatch(getGames())
        } else {
            e.preventDefault();
            dispatch(orderByRating(e.target.value))
            setCurrentPage(1)
            setRating(`('Ordenado', ${e.target.value})`)
        }
    }

    return (
    <div className="bodyHome">
        <div className="navBar">
          <img className="titleHome" onClick={e=>handleClick(e)} src={title} alt='GamePage'></img>
          <Link className="create" to='/create'>Crear Juego</Link>
          <button className="reset" onClick={e=>handleClick(e)}>Recargar Juegos</button> 
          <SearchBar setCurrentPage={setCurrentPage}/>
        </div>
        
        <div className="contentHome">
          <h2 className="filter">FILTRAR:</h2>
          <div className="contSelects">
            <select className="selects" onChange={e=>handleOrder(e)}>
                <option value="all">Por nombre</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
            </select>
            <select className="selects" onChange={e=> handleFilterByGenre(e)}>
                <option value="all">Todos los géneros</option>
                {
                    allGenres.map((e,i)=>{
                        return(
                            <option key={i}>{e}</option>
                            )
                        })
                    }
            </select>
            <select className="selects" onChange={e=>handleFilterCreated(e)}>
                <option value="all">Todos los juegos</option>
                <option value="api">Predeterminados</option>
                <option value="created">Creados</option>
            </select>
            <select className="selects" onChange={e=>handleOrderByRating(e)}>
                <option value="all">Todos los ratings</option>
                <option value="asc">Menor a mayor</option>
                <option value="des">Mayor a menor</option>
            </select>
            </div>
        </div>
            
            <Paginado
                gamesPerPage={gamesPerPage}
                allGames={allGames.length}
                paginado={paginado}/>
                
            <div className="cards">
            {
                currentGames.length > 0 ? currentGames.map((e,i)=>{
                    return(
                        <div key={i}>
                            <Link to={'/videogame/' + e.id} className='cardLink'>
                            <Card 
                            name={e.name} 
                            image={e.image} 
                            genres={e.types ?  '' + e.types   : e.genres.map(e => '' + e.name )} 
                            rating={e.rating} 
                            />
                            </Link>
                        </div>
                    )
                }) : (
                    <div className="loading">
                        <img className="sonic" src={loading} alt="loading" />
                    </div>
                )
            }
            
          </div>
        
    </div>
)

}
                            

