const initialState = {
    games: [],
    allGames: [],
    genres: [],
    detail: []
}

function rootReducer (state=initialState, action){
    switch(action.type){
        case 'GET_GAMES':
            return{
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        case 'FILTER_BY_GENRES':
            const allVideogames = state.allGames.map(g => ({
                id: g.id,
                name: g.name,
                image: g.image,
                // description: g.description ? g.description : 'No tiene descripcion',
                released: g.released,
                rating: g.rating,
                platforms: g.platforms,
                types: g.types ? g.types.map(p =>  p) : 'holaasdasda'
            }))
            const genresFiltered = allVideogames.filter(e => e.types.includes(action.payload))
            
            return{
                ...state,
                games: genresFiltered
            }
            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc' ? state.games.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                
                state.games.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    games: sortedArr
                }
            case 'FILTER_CREATED':
                const gameCreated = state.allGames
                const filterCreated = action.payload === 'created' ? gameCreated.filter(e=>e.createdInDb === true) :
                gameCreated.filter(e=>e.createdInDb !== true)
    
                return{
                    ...state,
                    games: action.payload ===  'all' ? gameCreated : filterCreated
                    }
            case 'ORDER_BY_RATING':
            let orderRating = action.payload === 'asc' ?
                state.games.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0
                }) :
                state.games.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    games: orderRating
                }
            case 'FILTER_BY_QUERY':
                return {
                    ...state,
                    games: action.payload
                }
            case 'GET_GAME_BY_ID':
                return{
                    ...state,
                    detail: action.payload
                }
        
            case 'CLEAN_DETAIL':
                return{
                    ...state,
                    detail: []
                }
            case 'POST_GAME':
                return{
                    ...state,
                    videogames: action.payload
                }

        default:
            return state
    }
        
}

export default rootReducer;