const axios = require('axios')

const URL = `http://swapi.dev/api/people`

async function getUsers (name){
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)   
    return response.data.results.map(mapData)
}

function mapData(item){
    return {
        name: item.name,
        height: item.height
    }
}

module.exports = {
    getUsers
}