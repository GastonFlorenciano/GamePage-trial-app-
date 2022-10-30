import React from 'react';
import {Link} from 'react-router-dom';
import '../CSS/LandingPage.css';
import title from '../img/gamepage3.png'

export default function LandingPage(){
    return(
        <div className='bodyLan'>
        <div>
            <img className='titleLan' src={title} alt="GamePage" />
            <Link to='/home'>
                <button className='btnLan'><span>Ingresar </span></button>
            </Link>
        </div>
        </div>
    )
}
