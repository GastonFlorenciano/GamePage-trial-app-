import React from 'react';
import '../CSS/Card.css'

export default function Card({name, image, genres, rating}){
   var validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(image);
   
   return(
      <div className='card'>
         <h3>{name}</h3>
         <img className='imgbig' src={validateUrl?image:'https://www.muylinux.com/wp-content/uploads/2014/01/mljuegos0.png'} alt="imgcard" width='300px' height='200px' />
         <h4>Géneros: {genres}</h4>
         <div className='ratinglog'>
            <h5 className='rating'>Rating: {rating}</h5>
         </div>           
      </div>
      );
   }
   

        
    
            