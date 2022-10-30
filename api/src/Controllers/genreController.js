const axios = require('axios')
const { Genre } = require('../db')
const API_KEY = 'd1f19f9e0799425f879300a3b00a61c2'


const getGenres = async (req, res) => {
    try {
        let findGenreDb = Genre.findAll()
        if(findGenreDb.length > 0){
            res.status(200).send(findGenreDb.map(d => d.name))
        }else{
            const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const infoApiUrl = apiUrl.data.results.map(g => g.name)
            infoApiUrl.forEach(el => {
                Genre.findOrCreate({
                    where: {name: el}
                })
            })

            let otraInfo = await Genre.findAll()
            let utilInfo = otraInfo.map(d => d.name)
            console.log(utilInfo.length)
            res.status(200).send(utilInfo)
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getGenres
}