import axios from 'axios';

export function getGames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames')
        
        return dispatch({
        type: 'GET_GAMES',
        payload: json.data
        })
    }
}
export function getGenres(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/genres')
        
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}
export function filterByGenres(payload){
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}
export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}
export function filterGameByQuery(name){
    return async function(dispatch){
            try{
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: 'FILTER_BY_QUERY',
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }
}
export function getGameByParams(id){
    return async function (dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogame/${id.id}`)
            return dispatch({
                type: 'GET_GAME_BY_ID',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function cleanDetail(){
    return{
        type: 'CLEAN_DETAIL'
    }
}
export function postGame(payload){
    return async function(){
        const json = await axios.post('http://localhost:3001/videogames', payload)
        return json
    }
}