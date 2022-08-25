const axios = require('axios')

const URL = `http://swapi.dev/api/people`

async function getUsers (name){
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

module.exports = {
    getUsers
}