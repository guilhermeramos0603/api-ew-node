const service = require('./service')

Array.prototype.myMap = function(callback){
    const myArray = []
    for (let i = 0; i < this.length; i++){
        const result = callback(this[i], i)
        myArray.push(result)
    }
    return myArray;
}
async function main() {
    try {
        const results =  await service.getUsers('a')
        const names = results.results.myMap(function(item, i){return item.name})
        console.log(names)
    }
    catch (error) {
        console.log('Deu Ruim', error)
    }
}

main()