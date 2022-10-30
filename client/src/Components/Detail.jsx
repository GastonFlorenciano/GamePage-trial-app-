import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameByParams, cleanDetail } from '../Actions'
import { useEffect } from "react";
import '../CSS/Detail.css'
import loading from '../img/3F3F.gif'






export default function Detail(id){
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.detail)
    var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(videogames.image);

    useEffect(() =>{
        dispatch(getGameByParams(id))
    },[dispatch])

    useEffect(() => {
        return function () {
            dispatch(cleanDetail())
        }
    },[dispatch])


    return(
        <div className="bgDetail">
            {
                videogames && videogames.name ?
                <div>
                   <button className="back"><Link className="linkBack" to='/home'>«</Link></button>
                    <div className="cont">
                        <div className="imgDesc">
                            <h1>{videogames.name}</h1>
                            <p><h2>Descripción:</h2> {videogames.description}</p>
                        </div>
                        <div className="info">
                            <img src={validateUrl?videogames.image:'https://www.muylinux.com/wp-content/uploads/2014/01/mljuegos0.png'} alt="logoimg" />
                            <div>
                                <h3>Plataformas: {videogames.platforms ? videogames.platforms +' ': '-'}</h3>
                                
                                <h3>Géneros: {videogames.genres ? videogames.genres.map(e => e.name) + ' ' : videogames.types + ' ' }</h3>
                                
                                <h4>Rating: {videogames.rating}</h4>
                                
                                <h4>Fecha de lanzamiento: {videogames.released}</h4>
                            </div>
                        </div>
                    </div>
                </div> : (
                    <div className="loadingDetail">
                        <img className="sonicDetail" src={loading} alt="loading" />
                    </div>
                )
            }
        </div>
    )
}