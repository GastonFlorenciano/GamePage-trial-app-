import React from 'react';
import '../CSS/Paginado.css'


export default function Paginado({gamesPerPage, allGames, paginado}){
    const pageNumber=[]

    for (let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++) {
        pageNumber.push(i)
    }
    return(
        <nav className='all'>
            <ul className='list'>
                {
                    pageNumber && pageNumber.map(num=>(
                    <button className='num' key={num} 
                    onClick={() => paginado(num)}>{num}</button>
                ))}
            </ul>
        </nav>
    )
}
